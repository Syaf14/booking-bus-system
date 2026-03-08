const express = require('express')
const router = express.Router()
const { getStudentClasses } = require('../controllers/studentClassManagementController')

router.get('/get-all-student-classes', getStudentClasses)

module.exports = router