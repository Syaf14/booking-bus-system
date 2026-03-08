const db = require('../config/db')

exports.getStudentClasses = async (req, res) => {
    try {
        const sql = `
            SELECT 
                sc.id,
                sc.name AS class_name, 
                sc.semester, 
                sc.capacity_class,
                -- We get the specific name and email of the Class Rep for THIS class
                (SELECT p.full_name FROM profiles p 
                 JOIN users u ON u.id = p.user_id 
                 WHERE p.class_id = sc.id AND u.role = 'class rep' 
                 LIMIT 1) AS rep_name,
                (SELECT u.email FROM profiles p 
                 JOIN users u ON u.id = p.user_id 
                 WHERE p.class_id = sc.id AND u.role = 'class rep' 
                 LIMIT 1) AS rep_email
            FROM student_classes sc
            WHERE sc.deleted_at IS NULL
        `;
        const [rows] = await db.query(sql);
        res.status(200).json(rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};