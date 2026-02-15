const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.addbus = async (req, res) => {
    const { bus_code,bus_name,capacity } = req.body
    const checkSql = "SELECT * FROM buses WHERE bus_code = ?"

    db.query(checkSql, [bus_code], async (err, result) => {
        if (result.length > 0) {
            return res.status(400).json({ message: "Code already exists" })
        }

        const insertSql = "INSERT INTO buses (bus_code,bus_name,capacity) VALUES (?, ?, ?)"

        db.query(insertSql, [bus_code,bus_name,capacity], (err, result) => {
            if (err) return res.status(500).json(err)
            res.json({ message: "Bus added successfully" })
        })
    })
}

exports.getAllBuses = (req, res) => {
  const sql = "SELECT * FROM buses WHERE deleted_at IS NULL"; // ignore soft-deleted
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};