const db = require('../config/db');

exports.addroutebus = async (req, res) => {
    try {
        const { bus_id, depart_location, depart_time, arrive_location, arrive_time, day_assigned } = req.body;

        // 1. Check if the bus already has an active trip
        const checkBusRoute = "SELECT * FROM bus_routes WHERE bus_id = ? AND depart_time = ? AND arrive_time = ? AND day_assigned = ? AND deleted_at IS NULL";
        const [existingRoutes] = await db.query(checkBusRoute, [bus_id, depart_time, arrive_time, day_assigned]);

        if (existingRoutes.length > 0) {
            return res.status(400).json({ message: "Bus already has an active trip" });
        }

        // 2. Insert the new route
        const insertSql = `
            INSERT INTO bus_routes (bus_id, depart_location, depart_time, arrive_location, arrive_time, day_assigned) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        await db.query(insertSql, [bus_id, depart_location, depart_time, arrive_location, arrive_time, day_assigned]);

        res.json({ message: "Route added to bus successfully" });
    } catch (err) {
        console.error("Error adding bus route:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getAllBusRoutes = async (req, res) => {
    try {
        const sql = `
            SELECT br.*, b.bus_name, b.bus_code, b.plate_no
            FROM bus_routes br
            LEFT JOIN buses b ON b.id = br.bus_id
            WHERE br.deleted_at IS NULL
            ORDER BY 
                FIELD(br.day_assigned, 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu', 'Ahad') ASC,
                br.depart_time ASC
        `;
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Database error" });
    }
};

exports.getAvailableBusRoutes = async (req, res) => {
    try {
        const sql = `
            SELECT br.*, b.bus_name, b.bus_code, b.plate_no
            FROM bus_routes br
            LEFT JOIN buses b ON b.id = br.bus_id
            WHERE br.deleted_at IS NULL
            /* Only show routes not yet scheduled */
            AND br.id NOT IN (
                SELECT route_id FROM scheduled_bus WHERE deleted_at IS NULL
            )
            ORDER BY 
                FIELD(br.day_assigned, 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu', 'Ahad') ASC,
                br.depart_time ASC
        `;
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Database error" });
    }
};

exports.getBusRouteByID = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM bus_routes WHERE id = ?", [req.params.id]);
        if (rows.length > 0) return res.json(rows[0]);
        res.status(404).json({ message: "Bus Route not found" });
    } catch (err) {
        res.status(500).json(err);
    }
};
exports.updateBusRoute = async (req, res) => {
    try {
        const busRouteID = req.params.id;
        const { bus_id, depart_location, depart_time, arrive_location, arrive_time, day_assigned } = req.body;
        
        const sql = `
            UPDATE bus_routes 
            SET bus_id = ?, depart_location = ?, depart_time = ?, arrive_location = ?, arrive_time = ?, day_assigned = ?
            WHERE id = ?
        `;

        const [result] = await db.query(sql, [bus_id, depart_location, depart_time, arrive_location, arrive_time, day_assigned, busRouteID]);

        if (result.affectedRows > 0) {
            res.json({ message: "Update successful" });
        } else {
            res.status(404).json({ message: "Bus Route not found or no changes made" });
        }
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ message: "Update failed", error: err.message });
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