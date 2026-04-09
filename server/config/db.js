const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",  
    database: "booking_bus_system",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection()
    .then(connection => {
        console.log("MySQL Connected via mysql2 Pool");
        connection.release();
    })
    .catch(err => {
        console.error("Database connection failed:", err);
    });

module.exports = db;
