const express = require('express')
const router = express.Router()
const { getAllUsers, deleteUser, getUserById, updateUser, getActiveClasses } = require('../controllers/userManagementController')
const { getStudentClasses } = require('../controllers/profileController')

router.get('/get-all-user', getAllUsers)
router.get('/get-all-user-by-id/:id', getUserById)
router.get('/get-active-class', getActiveClasses)
router.put('/update-user/:id', updateUser)
router.delete('/delete-user/:id',deleteUser)
router.get('/all-student-classes', getStudentClasses)

module.exports = router