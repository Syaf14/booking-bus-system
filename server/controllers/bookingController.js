const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.addbooking = async (req, res) => {
    const {user_id, trip_id, seat_type} = req.body

    db.query(user_id)
}