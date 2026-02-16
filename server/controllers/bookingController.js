const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.addbooking = async (req, res) => {
    const {user_id, trip_id, seat_type} = req.body

    const insertSql = "INSERT INTO bookings (user_id,trip_id,seat_type) values (?, ?, ?)"

    db.query(insertSql, [user_id, trip_id, seat_type], (err,result) => {
        if (err) return res.status(500).json(err)
            res.json({message: "Book add successfully"})
    })
}