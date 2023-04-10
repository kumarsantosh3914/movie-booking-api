const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect('mongodb://localhost/movieApi');
}

module.exports = connect;