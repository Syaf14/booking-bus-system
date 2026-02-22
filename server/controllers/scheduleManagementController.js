const db = require('../config/db');

exports.addschedulebus = async (req, res) => {
    try {
        const { route_id } = req.body;
        
        // 1. Check if schedule already exists for this route
        const checkSql = `SELECT * FROM scheduled_bus WHERE route_id = ? AND deleted_at IS NULL`;
        const [existing] = await db.query(checkSql, [route_id]);

        if (existing.length > 0) {
            return res.status(400).json({ message: "Bus schedule already exists!" });
        }

        // 2. Insert the new schedule
        const insertSql = "INSERT INTO scheduled_bus (route_id) VALUES (?)";
        await db.query(insertSql, [route_id]);

        res.json({ message: "Bus schedule added successfully" });
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