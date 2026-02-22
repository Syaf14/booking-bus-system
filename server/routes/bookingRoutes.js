const express = require('express')
const router = express.Router()
const { addbooking  } = require('../controllers/bookingController')
const { getAllBooking } = require('../controllers/bookingManagementController')

router.post('/add-booking', addbooking)
router.get('/get-booking-management', getAllBooking)


module.exports = router