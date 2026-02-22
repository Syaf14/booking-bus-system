const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.addbooking = async (req, res) => {
    const { user_id, scheduled_id, seat_id } = req.body;

    try {
        // 1. Check if this specific seat is already booked for THIS schedule
        const [existing] = await db.execute(
            'SELECT id FROM bookings WHERE scheduled_id = ? AND seat_id = ? AND status = "confirmed"',
            [scheduled_id, seat_id]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: "This seat has just been taken. Please choose another." });
        }

        // 2. Insert the booking (matching your column names exactly)
        const sql = `INSERT INTO bookings (user_id, scheduled_id, seat_id, status) VALUES (?, ?, ?, 'confirmed')`;
        await db.execute(sql, [user_id, scheduled_id, seat_id]);

        res.status(201).json({ success: true, message: "Booking confirmed!" });
    } catch (error) {
        console.error("DB Error:", error);
        res.status(500).json({ message: "Database error", error: error.message });
    }
}