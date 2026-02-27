const db = require('../config/db');

exports.addschedulebus = async (req, res) => {
    try {
        const { route_ids } = req.body; // Expecting an array: [1, 2, 3]

        if (!route_ids || !Array.isArray(route_ids) || route_ids.length === 0) {
            return res.status(400).json({ message: "No routes selected!" });
        }

        // Batch insert: [[id1], [id2], [id3]]
        const values = route_ids.map(id => [id]);
        const insertSql = "INSERT INTO scheduled_bus (route_id) VALUES ?";
        
        await db.query(insertSql, [values]);

        res.json({ message: `${route_ids.length} schedules deployed successfully` });
    } catch (err) {
        console.error("Error adding schedule:", err);
        res.status(500).json({ message: "Database error", error: err.message });
    }
};

exports.getAllSchedule = async (req, res) => {
    try {
        const sql = `
            SELECT 
                sb.id,
                sb.route_id,
                br.depart_location,
                br.depart_time,
                br.arrive_location,
                br.arrive_time,
                br.day_assigned,
                b.bus_code,
                b.capacity_seat
            FROM scheduled_bus sb
            LEFT JOIN bus_routes br ON br.id = sb.route_id
            LEFT JOIN buses b ON b.id = br.bus_id
            WHERE sb.deleted_at IS NULL
        `;
        
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (err) {
        console.error("Error fetching schedules:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getScheduleById = async (req, res) => {
    try {
        const scheduleID = req.params.id;
        const sql = `
            SELECT 
                sb.id,
                sb.route_id,
                b.bus_code,
                br.depart_location,
                br.arrive_location,
                br.depart_time,
                br.arrive_time
            FROM scheduled_bus sb
            LEFT JOIN bus_routes br ON br.id = sb.route_id
            LEFT JOIN buses b ON b.id = br.bus_id
            WHERE sb.id = ?
        `;

        const [rows] = await db.query(sql, [scheduleID]);

        if (rows.length > 0) {
            res.json(rows[0]); 
        } else {
            res.status(404).json({ message: "Schedule not found" });
        }
    } catch (err) {
        console.error("Error fetching schedule by ID:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.deleteSchedule = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = 'UPDATE scheduled_bus SET deleted_at = NOW() WHERE id = ?';

        const [result] = await db.query(sql, [id]);

        if (result.affectedRows > 0) {
            res.json({ message: "Scheduled Bus deleted successfully" });
        } else {
            res.status(404).json({ message: "Route not found" });
        }
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ message: "Delete failed", error: err.message });
    }
};