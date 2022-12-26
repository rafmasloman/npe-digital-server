const mongoose = require('mongoose');
const { dbUrl } = require('../config');

mongoose.set('strictQuery', false);
mongoose.connect(dbUrl);
const db = mongoose.connection;

module.exports = db;
