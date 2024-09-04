const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    profile:{
        name: String,
        wardrobe: [{
            id: String,
            type: String,
            warmth: String,
            color: Number,
        }]
    }
})

module.exports = mongoose.model('User',userSchema)