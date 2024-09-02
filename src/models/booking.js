'use strict';
const {
  Model
} = require('sequelize');
const {Enums} = require('../utils/common');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    tripId: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        isEmail:true,
      }
    },
    boardingTerminal: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    seatIds: {
      type: DataTypes.STRING,
      allowNull:false
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10,2),
      allowNull:false,
    },
    status: {
      type: DataTypes.ENUM(Enums.BOOKING_TYPE.PENDING,Enums.BOOKING_TYPE.SUCCESS,Enums.BOOKING_TYPE.CANCLED),
      allowNull:false,
      defaultValue:Enums.BOOKING_TYPE.PENDING,
    },
    ticketStatus: {
      type: DataTypes.ENUM(Enums.TICKET_STATUS.PENDING,Enums.TICKET_STATUS.SENT),
      allowNull:false,
      defaultValue:Enums.TICKET_STATUS.PENDING,
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};