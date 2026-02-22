const express = require('express')
const router = express.Router()
const { addbus,getAllBuses, deleteBuses, getBusesByID, updateBus, getBusSeat } = require('../controllers/busManagementController')
const { addroutebus, getAllBusRoutes, deleteBusRoute} = require('../controllers/busRouteManagementController')

router.post('/add-bus', addbus)
router.post('/add-bus-route', addroutebus)
router.get('/all-buses', getAllBuses)
router.get('/all-bus-route', getAllBusRoutes)
router.get('/get-bus/:id', getBusesByID)
router.get('/get-bus-seat/', getBusSeat)
router.put('/update-bus/:id', updateBus)
router.delete('/delete-bus-route/:id', deleteBusRoute)
router.delete('/delete-bus/:id', deleteBuses)

module.exports = router