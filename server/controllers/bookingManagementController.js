const db = require('../config/db')

// Change (res, req) to (req, res)
exports.getAllBooking = async (req, res) => { 
    try {
        const sql = `SELECT 
            b.id,
            b.status,
            u.email,
            buses.bus_code, 
            bs.seat_number,
            bs.seat_type,
            br.day_assigned
            FROM bookings b
            LEFT JOIN users u ON u.id = b.user_id
            LEFT JOIN scheduled_bus sb ON sb.id = b.scheduled_id
            LEFT JOIN bus_routes br ON br.id = sb.route_id
            LEFT JOIN buses ON buses.id = br.bus_id
            LEFT JOIN bus_seats bs ON bs.id = b.seat_id`;
            
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (err) {
        console.error("Error fetching bookings:", err);
        res.status(500).json({ message: "Database error", error: err.message });
    }
}

exports.getBookingById = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the URL

        const sql = `
            SELECT 
                b.id,
                b.status,
                b.seat_id, -- Needed for the Edit Seat layout
                u.email,
                buses.bus_code, 
                bs.seat_number,
                bs.seat_type,
                br.day_assigned,
                br.depart_location,
                br.arrive_location,
                br.depart_time,
                br.arrive_time
            FROM bookings b
            LEFT JOIN users u ON u.id = b.user_id
            LEFT JOIN scheduled_bus sb ON sb.id = b.scheduled_id
            LEFT JOIN bus_routes br ON br.id = sb.route_id
            LEFT JOIN buses ON buses.id = br.bus_id
            LEFT JOIN bus_seats bs ON bs.id = b.seat_id
            WHERE b.id = ?
        `;

        const [rows] = await db.query(sql, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json(rows[0]); // Return only the single booking object
    } catch (err) {
        console.error("Error fetching booking by ID:", err);
        res.status(500).json({ message: "Database error", error: err.message });
    }
};