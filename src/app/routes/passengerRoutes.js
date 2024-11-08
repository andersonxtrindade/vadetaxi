const express = require('express');
const router = express.Router();
const passengerController = require('../controllers/PassengerController');

router.get('/', passengerController.getAllPassengers);

router.post('/', passengerController.createPassenger);

module.exports = router;