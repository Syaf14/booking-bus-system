const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.addbus = async (req, res) => {
  try {
    const { bus_code, bus_name, capacity_seat, capacity_standing, plate_no } = req.body;
    const busCodeTrim = bus_code.trim(); // remove spaces

    // 1️⃣ Check if an active bus with same code exists
    const checkSql = "SELECT * FROM buses WHERE bus_code = ? AND deleted_at IS NULL";
    db.query(checkSql, [busCodeTrim], async (err, result) => {
      if (err) {
        console.error("Error checking bus code:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (result.length > 0) {
        // Active bus exists → cannot insert
        return res.status(400).json({ message: "Code already exists for an active bus" });
      }

      // 2️⃣ Check if there is a soft-deleted row with same code
      const deletedSql = "SELECT * FROM buses WHERE bus_code = ? AND deleted_at IS NOT NULL";
      db.query(deletedSql, [busCodeTrim], (err, deletedResult) => {
        if (err) {
          console.error("Error checking soft-deleted bus:", err);
          return res.status(500).json({ message: "Database error", error: err });
        }

        if (deletedResult.length > 0) {
          // Soft-deleted bus exists → "restore" it
          const restoreSql =
            "UPDATE buses SET bus_name = ?, capacity_seat = ?, capacity_standing = ?, plate_no = ?, deleted_at = NULL WHERE bus_code = ?";
          db.query(
            restoreSql,
            [bus_name, capacity_seat, capacity_standing, plate_no, busCodeTrim],
            (err, updateResult) => {
              if (err) {
                console.error("Error restoring bus:", err);
                return res.status(500).json({ message: "Database update error", error: err });
              }
              return res.json({ message: "Bus restored successfully" });
            }
          );
        } else {
          // 3️⃣ No duplicates → insert new row
          const insertSql =
            "INSERT INTO buses (bus_code, bus_name, capacity_seat, capacity_standing, plate_no) VALUES (?, ?, ?, ?, ?)";
          db.query(
            insertSql,
            [busCodeTrim, bus_name, capacity_seat, capacity_standing, plate_no],
            (err, insertResult) => {
              if (err) {
                console.error("Error inserting bus:", err);
                return res.status(500).json({ message: "Database insert error", error: err });
              }
              return res.json({ message: "Bus added successfully" });
            }
          );
        }
      });
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.getAllBuses = (req, res) => {
  const sql = "SELECT * FROM buses WHERE deleted_at IS NULL"; // ignore soft-deleted
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.getBusesByID = (req, res) => {
    const busID = req.params.id;

    const sql = "SELECT * FROM buses WHERE id = ?";

    db.query(sql,[busID], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length > 0) {
            res.json(result[0]); // Send the first (and only) bus object
        } else {
            res.status(404).json({ message: "Bus not found" });
        }
    });
};

exports.getBusSeat = (req, res) => {
  const sql = `SELECT * FROM bus_seats WHERE deleted_at IS NULL`;

  db.query(sql,(err,result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  })
};

exports.updateBus = (req,res) => {
    const busID = req.params.id;
    const { bus_code, bus_name, capacity_seat, capacity_standing } = req.body;
    const sql = "UPDATE buses SET bus_code = ?, bus_name = ?, capacity_seat = ?, capacity_standing = ? WHERE id = ?";

    db.query(sql,[bus_code, bus_name, capacity_seat, capacity_standing, busID], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        // 3. Check affectedRows instead of result.length
        if (result.affectedRows > 0) {
            res.json({ message: "Update successful" });
        } else {
            res.status(404).json({ message: "Bus not found or no changes made" });
        }
    });
}

exports.deleteBuses = (req, res) => {
    const id = req.params.id;

    const sql = "UPDATE buses SET deleted_at = NOW() where id = ?";

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