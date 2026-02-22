const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.addroutebus = async (req, res) => {
    const { bus_id, depart_location, depart_time, arrive_location, arrive_time } = req.body
    const checkBusRoute = "SELECT * FROM bus_routes where bus_id = ? AND deleted_at IS NULL"

    db.query(checkBusRoute, [bus_id], async (err,result) => {
        if (result.length > 0) {
            return res.status(400).json({message: "bus already have trip" })
        }

        const insertSql = "INSERT INTO bus_routes (bus_id, depart_location, depart_time, arrive_location, arrive_time) VALUES (?, ?, ?, ?, ?)"

        db.query(insertSql, [bus_id, depart_location, depart_time, arrive_location, arrive_time], (err,result) => {
            if(err) return res.status(500).json(err)
            res.json({message: "add route to bus successfully"})
        })
    })
}

exports.getAllBusRoutes = (req, res) => {
    const sql = `SELECT
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
    WHERE br.deleted_at IS NULL`;
    db.query(sql, (err,result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

exports.deleteBusRoute = (req, res) => {
    const id = req.params.id;

    console.log("Bus ID: ", id);

    const sql = 'UPDATE bus_routes SET deleted_at = NOW() WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                message: "Delete failed"
            });
        }

        res.json({
            message: "Bus deleted successfully"
        });
    })
}