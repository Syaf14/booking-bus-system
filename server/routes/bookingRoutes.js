const express = require('express')
const router = express.Router()
const { addbooking, getTicket, getBookedSeats, classRepDeleteBooking, cancelClassBookings } = require('../controllers/bookingController')
const { getAllBooking, getBookingById } = require('../controllers/bookingManagementController')
const {verifyToken} = require('../middleware/auth');

router.post('/add-booking',verifyToken, addbooking)
router.get('/get-ticket/:id', getTicket)
router.get('/get-booked-seats/:id', getBookedSeats)
router.get('/get-booking-management', getAllBooking)
router.get('/get-booking-by-id/:id', getBookingById)
router.delete('/delete-booking/:id', classRepDeleteBooking)
router.delete('/class-booking-delete', verifyToken, cancelClassBookings)


module.exports = router