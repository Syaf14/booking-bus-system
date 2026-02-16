const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.addroutebus = async (req, res) => {
    const { bus_id, departure, destination } = req.body
    const checkBusRoute = "SELECT * FROM bus_routes where bus_id = ?"

    db.query(checkBusRoute, [bus_id], async (err,result) => {
        if (result.length > 0) {
            return res.status(400).json({message: "bus already have trip" })
        }

        const insertSql = "INSERT INTO bus_routes (bus_id, departure, destination) VALUES (?, ?, ?)"

        db.query(insertSql, [bus_id, departure, destination], (err,result) => {
            if(err) return res.status(500).json(err)
            res.json({message: "add route to bus successfully"})
        })
    })
}

exports.getAllBusRoutes = (req, res) => {
    const sql = "SELECT * FROM bus_routes where deleted_at IS NULL";
    db.query(sql, (err,result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};