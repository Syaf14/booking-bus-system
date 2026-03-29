const express = require('express')
const router = express.Router()
const { reportSubmit, getReport, updateReportStatus } = require('../controllers/reportManagementController')

router.get('/get-report', getReport)
router.post('/submit-report', reportSubmit)
router.put('/update-status/:id', updateReportStatus);

module.exports = router