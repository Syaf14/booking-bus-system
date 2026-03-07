const db = require('../config/db');

exports.getStudentClasses = async (req , res) => {
    try {
        const sql = `SELECT * FROM student_classes WHERE deleted_at IS NULL`;

        const [rows] = await db.query(sql);
        
        res.status(200).json(rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};