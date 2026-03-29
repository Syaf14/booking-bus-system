const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.addbooking = async (req, res) => {
    // 1. Get user_id from the authenticated token instead of the body
    // This assumes your auth middleware attaches the user object to req
    const user_id = req.user.id; 
    const { scheduled_id, seat_id, booking_type } = req.body;

    if (!scheduled_id || !seat_id) {
        return res.status(400).json({ message: "Missing schedule or seat information." });
    }

    try {
        const [profile] = await db.execute(
            `SELECT class_id FROM profiles WHERE user_id = ?`,
            [user_id]
        );

        if (profile.length === 0) {
            return res.status(404).json({ message: "User profile not found." });
        }

        const class_id = profile[0].class_id;
        // 2. Check if this specific seat is already booked for THIS schedule
        const [existing] = await db.execute(
            `SELECT id FROM bookings WHERE scheduled_id = ? AND seat_id = ? AND status = "confirmed"`,
            [scheduled_id, seat_id]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: "This seat has just been taken. Please choose another." });
        }

        // 3. Insert the booking using the Secure user_id from the token
        const sql = `INSERT INTO bookings (user_id, scheduled_id, seat_id, booking_type, class_id, status) 
        VALUES (?, ?, ?, ?, ?, 'confirmed')`;
        const [result] = await db.execute(sql, [user_id, scheduled_id, seat_id, booking_type, class_id]);

        // 4. Return the new booking ID so the frontend can navigate to the ticket
        res.status(201).json({ 
            success: true, 
            message: "Booking confirmed!", 
            booking_id: result.insertId,
            user_id: user_id,
            class_id: class_id, // Pass this back so frontend knows where to navigate
        });

    } catch (error) {
        console.error("DB Error:", error);
        res.status(500).json({ message: "Database error", error: error.message });
    }
};

exports.classRepDeleteBooking = async (req,res) => {
    try {
        const bookingId = req.params.id;
        const sql = `UPDATE bookings
        SET status = 'cancelled', deleted_at = NOW()
        WHERE id = ?`;

        const [result] = await db.query(sql, [bookingId]);

        if (result.affectedRows > 0) {
            res.json({ message: "Booking deleted successfully" });
        } else {
            res.status(404).json({ message: "Bus not found" });
        }
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ message: "Delete failed", error: err.message });
    }
};

exports.cancelClassBookings = async (req, res) => {
    const { scheduled_id, class_id } = req.body;
    const user_role = req.user.role; // From your auth middleware

    // 1. Authorization Check
    if (user_role !== 'class rep' && user_role !== 'admin_hep') {
        return res.status(403).json({ message: "Unauthorized to cancel class bookings." });
    }

    try {
        // 2. Mass Update
        // This updates ALL students who booked as 'class' type for this class and trip
        const sql = `
            UPDATE bookings 
            SET status = 'cancelled', deleted_at = NOW() 
            WHERE scheduled_id = ? 
            AND class_id = ? 
            AND booking_type = 'class' 
            AND status = 'confirmed'`;

        const [result] = await db.execute(sql, [scheduled_id, class_id]);

        res.status(200).json({ 
            success: true, 
            message: `Successfully cancelled ${result.affectedRows} bookings for your class.` 
        });
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
};

exports.getTicket = async (req, res) => {
    const userId = req.params.id;
    try {
        const sql = `
            SELECT 
                b.id AS booking_id,
                b.scheduled_id,
                b.class_id,
                b.status,
                b.booking_type,
                br.depart_location AS 'from',
                br.arrive_location AS 'to',
                br.depart_time,
                br.day_assigned,
                bus.bus_name,
                bus.bus_code,
                bus.plate_no AS 'plateNo',
                seat.seat_number AS seat
            FROM bookings b
            LEFT JOIN scheduled_bus s ON b.scheduled_id = s.id
            LEFT JOIN bus_routes br ON s.route_id = br.id
            LEFT JOIN buses bus ON br.bus_id = bus.id
            LEFT JOIN bus_seats seat ON b.seat_id = seat.id
            WHERE b.user_id = ?`
            ;

        const [rows] = await db.query(sql, [userId]);
        console.log("Found rows for user:", userId, rows); // Check your terminal/console!
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message });
    }
};

exports.getBookedSeats = async (req, res) => {
    const scheduleId = req.params.id;
    try {
        const [rows] = await db.execute(
            'SELECT seat_id FROM bookings WHERE scheduled_id = ? AND status = "confirmed" AND deleted_at IS NULL                                        ',
            [scheduleId]
        );
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};