const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    name : {
        type : String,
    }
})

module.exports = mongoose.model('skill' , ItemSchema)