const express = require('express')
const router = express.Router()
const { addbooking  } = require('../controllers/bookingController')

router.post('/add-booking', addbooking)


module.exports = router