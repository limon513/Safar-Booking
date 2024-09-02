const express = require('express');
const { BookingMiddlewares } = require('../../../middlewares');
const { BookingController } = require('../../../controllers');
const router = express.Router();

router.post('/',BookingMiddlewares.createBooking,BookingController.createBooking);
router.post('/confirm',BookingMiddlewares.confirmBooking,BookingController.confirmBooking);

module.exports = router;