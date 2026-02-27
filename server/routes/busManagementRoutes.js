const express = require('express')
const router = express.Router()
const { addbus,getAllBuses, deleteBuses, getBusesByID, updateBus, getBusSeat } = require('../controllers/busManagementController')
const { addroutebus, getAllBusRoutes, getBusRouteByID, updateBusRoute, deleteBusRoute, getAvailableBusRoutes} = require('../controllers/busRouteManagementController')

router.post('/add-bus', addbus)
router.post('/add-bus-route', addroutebus)
router.get('/all-buses', getAllBuses)
router.get('/all-bus-route', getAllBusRoutes)
router.get('/get-bus/:id', getBusesByID)
router.get('/get-bus-seat/', getBusSeat)
router.get('/get-bus-route/:id', getBusRouteByID)
router.get('/get-available-bus-route', getAvailableBusRoutes)
router.put('/update-bus/:id', updateBus)
router.put('/update-bus-route/:id', updateBusRoute)
router.delete('/delete-bus-route/:id', deleteBusRoute)
router.delete('/delete-bus/:id', deleteBuses)

module.exports = router