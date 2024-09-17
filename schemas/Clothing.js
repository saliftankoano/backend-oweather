import mongoose from "mongoose"

export const clothingSchema = mongoose.Schema({
    id: String,
    type: String,
    warmth: String,
    color: Number,
})

export default mongoose.model('Clothing', clothingSchema)