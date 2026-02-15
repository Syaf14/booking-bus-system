const express = require('express')
const router = express.Router()
const { addbus,getAllBuses } = require('../controllers/busManagementController')

router.post('/add-bus', addbus)
router.get('/all-buses', getAllBuses)

module.exports = router