const Crud = require("./crud-repository");
const {Booking} = require('../models');

class BookingRepository extends Crud{
    constructor(){
        super(Booking);
    }
    async createBooking(data,transaction) {
        try {
            const response = await Booking.create(data,{transaction:transaction});
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getBookings(id,status){
        try {
            let response;
            if(id){
                response = await Booking.findAll({
                    where:{
                        id:id,
                        status:status,
                    },
                });
            }
            else{
                response = await Booking.findAll({
                    where:{
                        status:status,
                    }
                });
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    async updateBooking(data,bookingId,transaction){
        try {
            const response = await Booking.update(data,{
                where:{
                    id:bookingId,
                },
                transaction:transaction,
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = BookingRepository;