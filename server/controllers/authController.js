const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const { name, email, password } = req.body
    const checkSql = "SELECT * FROM users WHERE email = ?"

    db.query(checkSql, [email], async (err, result) => {
        if (result.length > 0) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const insertSql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"

        db.query(insertSql, [name, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json(err)
            res.json({ message: "User registered successfully" })
        })
    })
}

exports.login = (req, res) => {
    const { email, password } = req.body

    const sql = "SELECT * FROM users WHERE email = ?"

    db.query(sql, [email], async (err, result) => {
        if (err) return res.status(500).json(err)

        if (result.length === 0) {
            return res.status(401).json({ message: "User not found" })
        }

        const user = result[0]

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return res.status(401).json({ message: "Wrong password" })
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            "SECRET_KEY",
            { expiresIn: "1d" }
        )

        res.json({
            token,
            role: user.role,
            name: user.name
        })
    })
}
