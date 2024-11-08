const express = require('express');
const router = express.Router();
const driverController = require('../controllers/DriverController');

router.get('/', driverController.getAllDrivers);

router.post('/', driverController.createDriver);

module.exports = router;