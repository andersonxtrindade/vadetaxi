const express = require('express');
const router = express.Router();
const rideController = require('../controllers/RideController');

router.get('/', rideController.getAllRides);
router.post('/', rideController.createRide);
router.get('/:id', rideController.getRideById);
router.patch('/:id', rideController.updateRide);
router.delete('/:id', rideController.deleteRide);

module.exports = router;