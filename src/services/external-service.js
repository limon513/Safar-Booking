const axios = require('axios');
const qs = require('qs');

const {server_config} = require('../config');

async function blockSeats(data) {
    //console.log(typeof(data));
    const body = {
        seatIds:data,
    };
    try {
        const response = await axios.put(
            server_config.SAFAR_SEAT_BLOCK_URL,
            qs.stringify(body),
            {
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }
        );
        return response;   
    } catch (error) {
        throw error;    
    }
}

async function bookSeats(data) {
    //console.log(typeof(data));
    const body = {
        seatIds:data,
    };
    try {
        const response = await axios.put(
            server_config.SAFAR_SEAT_BOOK_URL,
            qs.stringify(body),
            {
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }
        );
        return response;   
    } catch (error) {
        throw error;    
    }
}

async function paymentService(data) {
    console.log(data);
    const body = {
        transactionType:'payment',
        amount:data.totalPrice,
    };
    try {
        const response = await axios.post(
            server_config.PAYMENT_GATEWAY_URL,
            qs.stringify(body),
            {
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded',
                    'x-api-key':server_config.LCASH_API_KEY,
                    'x-idempotency-key':data.idempotencyKey,
                    'x-temp-token':data.tempToken,
                }
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    blockSeats,
    bookSeats,
    paymentService,
}