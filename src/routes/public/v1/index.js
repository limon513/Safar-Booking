const express = require('express');
const bookingRoutes = require('./booking-route');
const infoRoutes = require('./info-route');

const router = express.Router();

router.use('/book',bookingRoutes);

router.use('/info',infoRoutes);

module.exports = router;