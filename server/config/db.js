const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",  // default XAMPP password
    database: "booking_bus_system"
})

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err)
    } else {
        console.log("MySQL Connected")
    }
})

module.exports = db
