'use strict';
/** @type {import('sequelize-cli').Migration} */
const {Enums} = require('../utils/common');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tripId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Trips',
          key:'id',
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          isEmail:true,
        }
      },
      boardingTerminal: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      seatIds: {
        type: Sequelize.STRING,
        allowNull:false
      },
      totalPrice: {
        type: Sequelize.DECIMAL(10,2),
        allowNull:false,
      },
      status: {
        type: Sequelize.ENUM(Enums.BOOKING_TYPE.PENDING,Enums.BOOKING_TYPE.SUCCESS,Enums.BOOKING_TYPE.CANCLED),
        allowNull:false,
        defaultValue:Enums.BOOKING_TYPE.PENDING,
      },
      ticketStatus: {
        type: Sequelize.ENUM(Enums.TICKET_STATUS.PENDING,Enums.TICKET_STATUS.SENT),
        allowNull:false,
        defaultValue:Enums.TICKET_STATUS.PENDING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};