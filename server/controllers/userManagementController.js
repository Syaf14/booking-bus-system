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
                /* Fallback: if profile name is missing, use account name */
                COALESCE(p.full_name, u.name) AS display_name
            FROM users u
            LEFT JOIN profiles p ON u.id = p.user_id
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

/*try {
        const bookingId = req.params.id;
        const sql = `UPDATE bookings
        SET deleted_at = NOW()
        WHERE id = ?`;

        const [result] = await db.query(sql, [bookingId]);

        if (result.affectedRows > 0) {
            res.json({ message: "Booking deleted successfully" });
        } else {
            res.status(404).json({ message: "Bus not found" });
        }
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ message: "Delete failed", error: err.message });
    }*/