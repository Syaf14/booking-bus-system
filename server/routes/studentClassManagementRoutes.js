const express = require('express')
const router = express.Router()
const { getStudentClasses, getStudentClassById, updateStudentClasses } = require('../controllers/studentClassManagementController')

router.get('/get-all-student-classes', getStudentClasses)
router.get('/get-all-student-classes-by-id/:id', getStudentClassById)
router.put('/update-student-class/:id', updateStudentClasses)

module.exports = router