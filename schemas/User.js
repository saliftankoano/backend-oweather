const mongoose = require('mongoose')
// clothes may use their own schema, but this may be a storage concern on mongo
// if clothes are made into their own schema, then wardrobe should include an array of cloth models
// this would make the creation of outfits easier. outfits may need to be their own schema

const userSchema = mongoose.Schema({
    user_id: String,
    customer_id: String,
    profile:{
        name: String,
        wardrobe: [{
            id: String,
            type: String,
            warmth: String,
            color: Number,
        }],
        // outfits: [{

        // }]
    }
})

module.exports = mongoose.model('User', userSchema)