const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.addbus = async (req, res) => {
    try {
        const { bus_code, bus_name, capacity_seat, capacity_standing, plate_no } = req.body;
        const busCodeTrim = bus_code.trim();

        // 1️⃣ Check for active bus
        const [activeBus] = await db.query("SELECT * FROM buses WHERE bus_code = ? AND deleted_at IS NULL", [busCodeTrim]);
        if (activeBus.length > 0) {
            return res.status(400).json({ message: "Code already exists for an active bus" });
        }

        // 2️⃣ Check for soft-deleted bus
        const [deletedBus] = await db.query("SELECT * FROM buses WHERE bus_code = ? AND deleted_at IS NOT NULL", [busCodeTrim]);

        if (deletedBus.length > 0) {
            // Restore logic
            await db.query(
                "UPDATE buses SET bus_name = ?, capacity_seat = ?, capacity_standing = ?, plate_no = ?, deleted_at = NULL WHERE bus_code = ?",
                [bus_name, capacity_seat, capacity_standing, plate_no, busCodeTrim]
            );
            return res.json({ message: "Bus restored successfully" });
        }

        // 3️⃣ Insert new row
        await db.query(
            "INSERT INTO buses (bus_code, bus_name, capacity_seat, capacity_standing, plate_no) VALUES (?, ?, ?, ?, ?)",
            [busCodeTrim, bus_name, capacity_seat, capacity_standing, plate_no]
        );
        res.json({ message: "Bus added successfully" });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getAllBuses = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM buses WHERE deleted_at IS NULL");
        res.json(rows);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getBusesByID = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM buses WHERE id = ?", [req.params.id]);
        if (rows.length > 0) return res.json(rows[0]);
        res.status(404).json({ message: "Bus not found" });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getBusSeat = async (req, res) => {
    try {
        const sql = `SELECT * FROM bus_seats WHERE deleted_at IS NULL`;
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (err) {
        console.error("Error fetching seats:", err);
        res.status(500).json({ message: "Database error", error: err.message });
    }
};

exports.updateBus = async (req, res) => {
    try {
        const busID = req.params.id;
        const { bus_code, bus_name, capacity_seat, capacity_standing } = req.body;
        
        const sql = `
            UPDATE buses 
            SET bus_code = ?, bus_name = ?, capacity_seat = ?, capacity_standing = ? 
            WHERE id = ?
        `;

        // We destructure 'result' because it's not a list of rows, 
        // but an object containing 'affectedRows'
        const [result] = await db.query(sql, [bus_code, bus_name, capacity_seat, capacity_standing, busID]);

        if (result.affectedRows > 0) {
            res.json({ message: "Update successful" });
        } else {
            res.status(404).json({ message: "Bus not found or no changes made" });
        }
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ message: "Update failed", error: err.message });
    }
};

exports.deleteBuses = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = "UPDATE buses SET deleted_at = NOW() WHERE id = ?";

        const [result] = await db.query(sql, [id]);

        if (result.affectedRows > 0) {
            res.json({ message: "Bus deleted successfully" });
        } else {
            res.status(404).json({ message: "Bus not found" });
        }
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ message: "Delete failed", error: err.message });
    }
};