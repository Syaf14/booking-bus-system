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

exports.getStudentClassById = async (req, res) => {
    const { id } = req.params;

    try {
        const sql = `
            SELECT 
                sc.id,
                sc.name AS class_name, 
                sc.semester, 
                sc.capacity_class,
                p.full_name AS rep_name,
                u.email AS rep_email,
                u.id AS rep_user_id
            FROM student_classes sc
            LEFT JOIN profiles p ON p.class_id = sc.id
            LEFT JOIN users u ON u.id = p.user_id AND u.role = 'class rep'
            WHERE sc.id = ? AND sc.deleted_at IS NULL
            LIMIT 1
        `;

        const [rows] = await db.query(sql, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Student class not found" });
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.updateStudentClasses = async (req, res) => {
    try {
        const studentClassID = req.params.id;
        const { name, semester, capacity_class } = req.body;
        
        const sql = `
            UPDATE student_classes
            SET name = ?, semester = ?, capacity_class = ? 
            WHERE id = ?
        `;

        // We destructure 'result' because it's not a list of rows, 
        // but an object containing 'affectedRows'
        const [result] = await db.query(sql, [name, semester, capacity_class, studentClassID]);

        if (result.affectedRows > 0) {
            res.json({ message: "Update successful" });
        } else {
            res.status(404).json({ message: "Class not found or no changes made" });
        }
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ message: "Update failed", error: err.message });
    }
};