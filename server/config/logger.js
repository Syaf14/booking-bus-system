const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

const logFile = path.join(logsDir, 'app.log');

// Simple logger utility
const logger = {
    info: (message, data = {}) => {
        const timestamp = new Date().toISOString();
        const logEntry = JSON.stringify({
            timestamp,
            level: 'INFO',
            message,
            data
        });
        console.log(`[INFO] ${message}`, data);
        fs.appendFileSync(logFile, logEntry + '\n');
    },

    error: (message, data = {}) => {
        const timestamp = new Date().toISOString();
        const logEntry = JSON.stringify({
            timestamp,
            level: 'ERROR',
            message,
            data
        });
        console.error(`[ERROR] ${message}`, data);
        fs.appendFileSync(logFile, logEntry + '\n');
    },

    warn: (message, data = {}) => {
        const timestamp = new Date().toISOString();
        const logEntry = JSON.stringify({
            timestamp,
            level: 'WARN',
            message,
            data
        });
        console.warn(`[WARN] ${message}`, data);
        fs.appendFileSync(logFile, logEntry + '\n');
    },

    debug: (message, data = {}) => {
        if (process.env.NODE_ENV === 'development') {
            const timestamp = new Date().toISOString();
            const logEntry = JSON.stringify({
                timestamp,
                level: 'DEBUG',
                message,
                data
            });
            console.log(`[DEBUG] ${message}`, data);
            fs.appendFileSync(logFile, logEntry + '\n');
        }
    }
};

module.exports = logger;
