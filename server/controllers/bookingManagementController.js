const db = require('../config/db')

// Change (res, req) to (req, res)
exports.getAllBooking = async (req, res) => { 
    try {
        const sql = `SELECT 
            b.id,
            u.email,
            buses.bus_code, 
            bs.seat_number,
            bs.seat_type 
            FROM bookings b
            LEFT JOIN users u ON u.id = b.user_id
            LEFT JOIN scheduled_bus sb ON sb.id = b.scheduled_id
            LEFT JOIN bus_routes br ON br.id = sb.route_id
            LEFT JOIN buses ON buses.id = br.bus_id
            LEFT JOIN bus_seats bs ON bs.id = b.seat_id
            WHERE b.deleted_at IS NULL`;
            
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (err) {
        console.error("Error fetching bookings:", err);
        res.status(500).json({ message: "Database error", error: err.message });
    }
}