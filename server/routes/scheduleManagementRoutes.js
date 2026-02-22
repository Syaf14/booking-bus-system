const express = require('express')
const router = express.Router()
const {addschedulebus, getAllSchedule, getScheduleById} = require('../controllers/scheduleManagementController')

router.post('/add-schedule-bus', addschedulebus)
router.get('/get-all-schedule-bus', getAllSchedule)
router.get('/get-schedule-by-id/:id', getScheduleById)

module.exports = router