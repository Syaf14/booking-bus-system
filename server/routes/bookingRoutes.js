const express = require('express')
const router = express.Router()
const { addbooking, getTicket, getBookedSeats, classRepDeleteBooking } = require('../controllers/bookingController')
const { getAllBooking } = require('../controllers/bookingManagementController')
const {verifyToken} = require('../middleware/auth');

router.post('/add-booking',verifyToken, addbooking)
router.get('/get-ticket/:id', getTicket)
router.get('/get-booked-seats/:id', getBookedSeats)
router.get('/get-booking-management', getAllBooking)
router.delete('/delete-booking/:id', classRepDeleteBooking)


module.exports = router