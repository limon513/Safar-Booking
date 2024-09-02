const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SALTROUND: process.env.SALT_ROUND,
    JWTSECRET: process.env.JWT_SECRET,
    JWTEXPIRY: process.env.JWT_EXPIRY,
    SAFAR_SEAT_BLOCK_URL: process.env.SAFAR_SEAT_BLOCK_URL,
    SAFAR_SEAT_BOOK_URL: process.env.SAFAR_SEAT_BOOK_URL,
    PAYMENT_GATEWAY_URL: process.env.PAYMENT_GATEWAY_URL,
    LCASH_API_KEY: process.env.LCASH_API_KEY,
}