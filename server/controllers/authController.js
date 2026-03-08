const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const connection = await db.getConnection();
    try {
        const { name, email, phone, student_id, class_id,  password, role } = req.body;
        
        const [existingUsers] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUsers.length > 0) {
            await connection.rollback();
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await connection.beginTransaction();

        const [insertUser] = await connection.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", 
            [name, email, hashedPassword, role]
        );

        const newUserId = insertUser.insertId;

        await connection.query(
            "INSERT INTO profiles (user_id, full_name, phone_no, student_id, class_id) VALUES (?, ?, ?, ?, ?)",
            [newUserId, name, phone, student_id, class_id]
        );

        await connection.commit();

        res.json({ message: "User registered successfully" });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ message: "Server error during registration", error: err.message });
    } finally {
        connection.release(); // 👈 prevents connection pool exhaustion
    }
};

exports.registerAdmin = async (req, res) => {
    const connection = await db.getConnection();
    try {
        const { name, email, password, role } = req.body;
        
        const [existingAdmins] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingAdmins.length > 0) {
            await connection.rollback();
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await connection.beginTransaction();

        await connection.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", 
            [name, email, hashedPassword, role]
        );

        await connection.commit();

        res.json({ message: "Admin registered successfully" });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ message: "Server error during registration", error: err.message });
    } finally {
        connection.release(); // 👈 prevents connection pool exhaustion
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // With promises, we await the query result
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (users.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: "Wrong password" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            "SECRET_KEY", // Note: Use an environment variable for this in production!
            { expiresIn: "1d" }
        );

        res.json({
            token,
            role: user.role,
            name: user.name
        });
    } catch (err) {
        res.status(500).json({ message: "Server error during login", error: err.message });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    });
    return res.status(200).json({ message: "Logged out successfully" });
};

// Add this to your auth controller file
exports.getProfile = async (req, res) => {
    try {
        // req.user.id comes from your verifyToken/auth middleware (see step 2)
        const [users] = await db.query(
            "SELECT id, name, email, role FROM users WHERE id = ?", 
            [req.user.id]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(users[0]);
    } catch (err) {
        res.status(500).json({ message: "Error fetching profile", error: err.message });
    }
};

exports.getUserProfile = async (req, res) => {
    const id = req.params.id;

    try {
        // 1. Corrected the spelling of SELECT
        const sql = `SELECT 
        p.full_name,
        p.phone_no,
        p.student_id,
        p.user_id AS id,
        u.email,
        u.role,
        sc.name
        FROM profiles p
        LEFT JOIN users u ON u.id = p.user_id
        LEFT JOIN student_classes sc ON sc.id = p.class_id
        WHERE p.user_id = ?`;

        // 2. Destructure the rows from the result
        const [rows] = await db.query(sql, [id]);

        // 3. Check if a user was actually found
        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // 4. Send the single user object back
        res.status(200).json(rows[0]);
        
    } catch (error) {
        // 5. Always wrap async DB calls in try/catch to prevent server crashes
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.updateUserProfile = async (req, res) => {
    const { id } = req.params; // This is the user_id
    const { full_name, phone_no, student_id } = req.body;

    try {
        const sql = `UPDATE profiles SET full_name = ?, phone_no = ?, student_id = ? WHERE user_id = ?`;
        await db.query(sql, [full_name, phone_no, student_id, id]);
        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating profile" });
    }
};