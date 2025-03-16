// import { Sequelize } from "sequelize";
const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize(process.env.DB_NAME , process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  timezone: '+07:00',

  dialectOptions: {
    // Ambil timezone dari sistem
    useUTC: false,
    timezone: '+07:00',
  },
});

module.exports = db;