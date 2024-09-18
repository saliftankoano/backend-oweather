import mongoose from "mongoose"
import { clothingSchema } from "./Clothing"
import { outfitSchema } from "./Outfit"
// the clothing schema is necessary, but may bring storage concerns in the future

const userSchema = mongoose.Schema({
    user_id: String,
    customer_id: String,

    wardrobe: [clothingSchema],
    outfits: [outfitSchema]
})

export default User = mongoose.model('User', userSchema)