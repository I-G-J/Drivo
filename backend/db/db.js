const mongoose = require('mongoose')
function connectToDB(){
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log('Connected to MongoDB')
    }).catch(error => {
        console.log('MongoDB connection error:', error)
    })
}

module.exports = connectToDB;