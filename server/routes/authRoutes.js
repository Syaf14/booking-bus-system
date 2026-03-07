const express = require('express')
const router = express.Router()
const { register, login, logout, getProfile, getUserProfile, updateUserProfile } = require('../controllers/authController')
const {verifyToken} = require('../middleware/auth');

router.get('/profile', verifyToken, getProfile)
router.get('/user-profile/:id', getUserProfile)
router.post('/update-profile/:id', updateUserProfile)
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

module.exports = router
