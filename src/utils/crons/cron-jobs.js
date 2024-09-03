const cron = require('node-cron');
const { BookingService } = require('../../services');

function scheduleCrons(){
    cron.schedule('*/1 * * * *',async()=>{
        try {
            const response = await BookingService.clearOldBookings();
        } catch (error) {
            console.log(error);
        }
    });
}

module.exports = {
    scheduleCrons
}