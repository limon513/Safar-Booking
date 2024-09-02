const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common")
const AppError = require('../utils/errors/app-error');
const jwt = require('jsonwebtoken');
const { server_config } = require("../config");

function createBooking(req,res,next){
    if(!req.body.tripId){
        ErrorResponse.error = new AppError(['trip Id require'],StatusCodes.BAD_REQUEST);
        return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
    }
    if(!req.body.name){
        ErrorResponse.error = new AppError(['your name required'],StatusCodes.BAD_REQUEST);
        return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
    }
    if(!req.body.phone){
        ErrorResponse.error = new AppError(['your phone required'],StatusCodes.BAD_REQUEST);
        return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
    }
    if(!req.body.email){
        ErrorResponse.error = new AppError(['your email required'],StatusCodes.BAD_REQUEST);
        return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
    }
    if(!req.body.boardingTerminal){
        ErrorResponse.error = new AppError(['boardingTeminal required'],StatusCodes.BAD_REQUEST);
        return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
    }
    if(!req.body.ticketPrice){
        ErrorResponse.error = new AppError(['ticketPrice required'],StatusCodes.BAD_REQUEST);
        return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
    }
    if(!req.body.seatIds){
        ErrorResponse.error = new AppError(['seatIds required'],StatusCodes.BAD_REQUEST);
        return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
    }
    next();
}

function confirmBooking(req,res,next){
    const paymentToken = req.headers['x-payment-token'];
    if(!paymentToken){
        ErrorResponse.error = new AppError(['payment token missing'],StatusCodes.BAD_REQUEST);
        return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
    }
    const idempotencyKey = req.headers['x-idempotency-key'];
    if(!idempotencyKey){
        ErrorResponse.error = new AppError(['idempotency missing'],StatusCodes.BAD_REQUEST);
        return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
    }
    const tempToken = req.headers['x-temp-token'];
    if(!tempToken){
        ErrorResponse.error = new AppError(['temporary token missing'],StatusCodes.BAD_REQUEST);
        return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
    }
    try {
        const paymentTokenResponse = jwt.verify(paymentToken,server_config.JWTSECRET);
        console.log('paytoken',paymentTokenResponse);
        req.body.bookingId = paymentTokenResponse.bookingId;
        req.body.idempotencyKey = idempotencyKey;
        req.body.tempToken = tempToken;
        next();
    } catch (error) {
        if(error.name == 'TokenExpiredError') error.message = "Your booking is cancled due to payment time surpass, you can make new booking always.";
        ErrorResponse.error = new AppError(error.message,StatusCodes.UNAUTHORIZED);
        return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createBooking,
    confirmBooking,
}