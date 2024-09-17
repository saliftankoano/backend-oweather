import mongoose from "mongoose"
import { clothingSchema } from "./Clothing"

//TODO: add layering of clothes in the future
export const outfitSchema = mongoose.Schema({
    top:clothingSchema,
    bottom:clothingSchema
})

export default mongoose.model('Outfit', outfitSchema)

