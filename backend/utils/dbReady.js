const mongoose = require('mongoose');

const isDbReady = () => mongoose.connection.readyState === 1;

module.exports = { isDbReady };
