import mongoose, { model } from "mongoose"

export const clothingSchema = new mongoose.Schema({
    id: String,
    type: String,
    warmth: String,
    color: Number,
})

export default Clothing = mongoose.model('Clothing', clothingSchema)
