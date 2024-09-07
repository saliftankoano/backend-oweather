import mongoose from "mongoose"
// clothes may use their own schema, but this may be a storage concern on mongo
// if clothes are made into their own schema, then wardrobe should include an array of cloth models
// this would make the creation of outfits easier. outfits may need to be their own schema

const userSchema = mongoose.Schema({
    user_id: String,
    customer_id: String,

    // wardrobe: [{
    //     id: String,
    //     type: String,
    //     warmth: String,
    //     color: Number,
    // }],

    // outfits: [{

    // }]
    
})

export default mongoose.model('User', userSchema)