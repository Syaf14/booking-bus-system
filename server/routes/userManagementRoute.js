const express = require('express')
const router = express.Router()
const { getAllUsers, deleteUser } = require('../controllers/userManagementController')

router.get('/get-all-user', getAllUsers)
router.delete('/delete-user/:id',deleteUser)

module.exports = router