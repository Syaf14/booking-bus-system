const db = require('../config/db');

exports.addroutebus = async (req, res) => {
    try {
        const { bus_id, depart_location, depart_time, arrive_location, arrive_time } = req.body;

        // 1. Check if the bus already has an active trip
        const checkBusRoute = "SELECT * FROM bus_routes WHERE bus_id = ? AND deleted_at IS NULL";
        const [existingRoutes] = await db.query(checkBusRoute, [bus_id]);

        if (existingRoutes.length > 0) {
            return res.status(400).json({ message: "Bus already has an active trip" });
        }

        // 2. Insert the new route
        const insertSql = `
            INSERT INTO bus_routes (bus_id, depart_location, depart_time, arrive_location, arrive_time) 
            VALUES (?, ?, ?, ?, ?)
        `;
        await db.query(insertSql, [bus_id, depart_location, depart_time, arrive_location, arrive_time]);

        res.json({ message: "Route added to bus successfully" });
    } catch (err) {
        console.error("Error adding bus route:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getAllBusRoutes = async (req, res) => {
    try {
        const sql = `
            SELECT
                br.id,
                br.depart_location,
                br.depart_time,
                br.arrive_location,
                br.arrive_time,
                b.bus_name,
                b.bus_code,
                b.plate_no
            FROM bus_routes br
            LEFT JOIN buses b ON b.id = br.bus_id
            WHERE br.deleted_at IS NULL
        `;
        
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (err) {
        console.error("Error fetching routes:", err);
        res.status(500).json({ message: "Database error", error: err.message });
    }
};

exports.deleteBusRoute = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = 'UPDATE bus_routes SET deleted_at = NOW() WHERE id = ?';

        const [result] = await db.query(sql, [id]);

        if (result.affectedRows > 0) {
            res.json({ message: "Bus route deleted successfully" });
        } else {
            res.status(404).json({ message: "Route not found" });
        }
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ message: "Delete failed", error: err.message });
    }
};