const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from "Bearer <token>"

    if (!token) return res.status(403).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, "SECRET_KEY");
        req.user = decoded; // This adds the id and role to the request object
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = {verifyToken};