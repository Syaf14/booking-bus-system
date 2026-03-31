const db = require('../config/db');

// Get all users with their profile details
exports.getAllUsers = async (req, res) => {
    try {
        const query = `
            SELECT 
                u.id, 
                u.name, 
                u.email, 
                u.role, 
                u.created_at,
                p.full_name, 
                p.phone_no, 
                p.gender, 
                p.college_name, 
                p.student_id,
                sc.name AS class_name,
                /* Fallback: if profile name is missing, use account name */
                COALESCE(p.full_name, u.name) AS display_name
            FROM users u
            LEFT JOIN profiles p ON u.id = p.user_id
            LEFT JOIN student_classes sc ON sc.id = p.class_id
            WHERE u.role IN ('student','class rep', 'admin') 
            AND u.deleted_at IS NULL
            ORDER BY u.created_at DESC
        `;

        // With promise clients, db.query returns an array: [rows, fields]
        const [rows] = await db.query(query);
        
        res.status(200).json(rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const query =  `UPDATE users
        SET deleted_at = NOW()
        WHERE id = ?`;

        const [result] = await db.query(query, [id]);
        if (result.affectedRows > 0) {
            res.json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "User Not Found" });
        }
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ message: "Failed to delete user" });
    }
};

// 1. Add this to your Class Controller (or User Controller)
// Fetches all classes so the Admin can pick one from a dropdown
exports.getActiveClasses = async (req, res) => {
    try {
        const query = `SELECT id, name FROM student_classes WHERE deleted_at IS NULL ORDER BY name ASC`;
        const [rows] = await db.query(query);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ message: "Error fetching classes" });
    }
};

// 2. Update the existing getUserById to also return the current class_id
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT 
                u.id, u.name, u.email, u.role, 
                p.full_name, p.phone_no, p.college_name, 
                p.class_id  /* Added this */
            FROM users u
            LEFT JOIN profiles p ON u.id = p.user_id
            WHERE u.id = ? AND u.deleted_at IS NULL LIMIT 1
        `;
        const [rows] = await db.query(query, [id]);
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ message: "Error" });
    }
};

// 3. Update the updateUser function to include class_id
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, role, full_name, phone_no, college_name, class_id } = req.body;

    try {
        await db.query('START TRANSACTION');

        await db.query(
            `UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?`,
            [name, email, role, id]
        );

        // Update profile including the class_id
        await db.query(
            `UPDATE profiles SET full_name = ?, phone_no = ?, college_name = ?, class_id = ? WHERE user_id = ?`,
            [full_name, phone_no, college_name, class_id || null, id]
        );

        await db.query('COMMIT');
        res.json({ message: "User updated successfully" });
    } catch (err) {
        await db.query('ROLLBACK');
        res.status(500).json({ message: "Update failed" });
    }
};