const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('MongoDB connected');
    })
}

module.exports = connectDB;
