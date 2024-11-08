const routes = require("express").Router();
const passengerRoutes = require('./app/routes/passengerRoutes');
const driverRoutes = require('./app/routes/driverRoutes');
const rideRoutes = require('./app/routes/rideRoutes');

routes.use('/passengers', passengerRoutes);
routes.use('/drivers', driverRoutes);
routes.use('/rides', rideRoutes);

module.exports = routes;