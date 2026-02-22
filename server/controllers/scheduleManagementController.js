const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.addschedulebus = (req, res) => {
    const { route_id } = req.body;
    const checkSql = `SELECT * FROM scheduled_bus WHERE route_id = ? AND deleted_at IS NULL`;

    db.query(checkSql, [route_id], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });

        if (result.length > 0) {
            return res.status(400).json({ message: "Bus schedule already exists!" });
        }

        const insertSql = "INSERT INTO scheduled_bus (route_id) VALUES (?)";
        db.query(insertSql, [route_id], (err, result) => {
            if (err) return res.status(500).json({ message: "Database error", error: err });
            res.json({ message: "Bus schedule added successfully" });
        });
    });
}

exports.getAllSchedule = (req,res) => {
    const sql = `SELECT 
    sb.id,
    sb.route_id,
    br.depart_location,
    br.depart_time,
    br.arrive_location,
    br.arrive_time,
    b.bus_code,
    b.capacity_seat
    FROM scheduled_bus sb
    LEFT JOIN bus_routes br on br.id = sb.route_id
    LEFT JOIN buses b on b.id = br.bus_id
    WHERE sb.deleted_at IS NULL`;
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
}

exports.getScheduleById = (req, res) => {
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

    db.query(sql, [scheduleID], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length > 0) {
            res.json(result[0]); 
        } else {
            res.status(404).json({ message: "Schedule not found" });
        }
    });
}