const express = require('express')
const router = express.Router()
const { getAllUsers, deleteUser } = require('../controllers/userManagementController')
const { getStudentClasses } = require('../controllers/profileController')

router.get('/get-all-user', getAllUsers)
router.delete('/delete-user/:id',deleteUser)
router.get('/all-student-classes', getStudentClasses)

module.exports = router