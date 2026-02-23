const db = require('../config/db');

// Get all users with their profile details
exports.getAllUsers = async (req, res) => {
    try {
        const query = `
            SELECT 
                u.id, u.name, u.email, u.role, u.created_at,
                p.full_name, p.phone_no, p.gender, p.college_name, p.student_id
            FROM users u
            LEFT JOIN profiles p ON u.id = p.user_id
            WHERE u.role IN ('student', 'admin') 
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
    const { id } = req.params;
    try {
        const query = "DELETE FROM users WHERE id = ?";
        await db.query(query, [id]);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ message: "Failed to delete user" });
    }
};