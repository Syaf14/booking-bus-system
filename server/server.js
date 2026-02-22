const express = require('express')
const cors = require('cors')
const path = require('path')

const authRoutes = require('./routes/authRoutes')
const busManagementRoutes = require('./routes/busManagementRoutes')
const scheduleManagementRoutes = require('./routes/scheduleManagementRoutes')
const bookingManagement = require('./routes/bookingRoutes')

const app = express()

app.use(express.static(path.join(__dirname,"public")))
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/busManagement', busManagementRoutes)
app.use('/api/scheduleManagement', scheduleManagementRoutes)
app.use('/api/bookingManagement', bookingManagement)

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000")
})