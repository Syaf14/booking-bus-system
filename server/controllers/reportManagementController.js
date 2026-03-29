const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getReport = async (req, res) => {
    try{
        const sql = `
            SELECT 
            r.id, 
            r.user_id, 
            r.title, 
            r.category, 
            r.description, 
            r.status, 
            r.created_at, 
            u.name, 
            u.email 
            FROM reports r 
            LEFT JOIN users u ON r.user_id = u.id 
            ORDER BY r.created_at DESC
        `;
        const [rows] = await db.query(sql);
        res.status(200).json(rows);
    }catch (err){
        console.error("Database error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.reportSubmit = async (req, res) => {
    const { user_id, title, category, description } = req.body;
    
    const sql = `INSERT INTO reports (user_id, title, category, description, STATUS) VALUES (?, ?, ?, ?, 'Pending')`;
    
    db.query(sql, [user_id, title, category, description], (err, result) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ error: err.message });
        }
        
        return res.status(201).json({ 
            success: true, 
            message: "Report submitted successfully", 
            id: result.insertId 
        });
    });
};

exports.updateReportStatus = (req, res) => {
    const { id } = req.params;
    const sql = "UPDATE reports SET status = 'Resolved' WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: "Report marked as Resolved" });
    });
};