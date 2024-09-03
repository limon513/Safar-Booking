const ExternalService = require("./external-service");
const { server_config } = require("../config");
const { sequelize } = require("../models");
const { BookingRepository } = require("../repositories");
const jwt = require('jsonwebtoken');
const strings = require("../utils/strings");
const { Enums } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const BookingRepo = new BookingRepository();

async function createBooking(data) {
    const totalSeats = (data.seatIds.split(',')).length;
    data.totalPrice = data.ticketPrice * totalSeats;
    const transaction = await sequelize.transaction();
    try {
        const response = await BookingRepo.
                                    createBooking(data,transaction);
        const seatIds = response.seatIds;
        const seatResonse = await ExternalService.
                                        blockSeats(seatIds);
        const payload = {
            bookingId:response.id
        };
        const paymentWindowToken = jwt.sign(payload,server_config.JWTSECRET,{expiresIn:server_config.JWTEXPIRY});
        await transaction.commit();
        return {
            msg: strings.successfulBookingMsg,
            paymentToken: paymentWindowToken,
        };
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        if(error.name == 'AxiosError') throw error.response.data.error;
        throw error;
    }
}

async function confirmBooking(data) {
    const transaction = await sequelize.transaction();
    try {
        const booking = await BookingRepo.getBookings(id=data.bookingId ,Enums.BOOKING_TYPE.PENDING);
        //console.log('bookings',booking);
        if(!booking || booking.length <= 0) throw new AppError(['No such booking found'],StatusCodes.NOT_FOUND);
        data = {
            ...data,
            totalPrice:booking[0].totalPrice,
            seatIds:booking[0].seatIds,
        };
        // data.totalPrice = booking.totalPrice;
        // data.seatIds = booking.seatIds;
        const payment = await ExternalService.paymentService(data);
        const bookingResponse = await BookingRepo.updateBooking({status:Enums.BOOKING_TYPE.SUCCESS},data.bookingId,transaction);
        const seatResponse = await ExternalService.bookSeats(data.seatIds);
        await transaction.commit();
        return {
            status:true,
            msg:'Booking confirmed, Ticket can be found in your Email in short time',
        };
    } catch (error) {
        await transaction.rollback();
        if(error.name == 'AxiosError') throw error.response.data.error;
        throw error;
    }
}

async function clearOldBookings() {
    const transaction = await sequelize.transaction();
    try {
        const response = await BookingRepo.getOldBookings();
        for(const booking of response){
            await BookingRepo.clearOldBooking(booking.id,transaction);
            await ExternalService.clearSeats(booking.seatIds);
        }
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

module.exports = {
    createBooking,
    confirmBooking,
    clearOldBookings,
}