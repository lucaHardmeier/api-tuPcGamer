import mongoose from "mongoose"
import { Schema } from "mongoose"
import { ProductSchema } from "./product"

const CartSchema = new Schema({
    products: {
        type: [ProductSchema],
        default: []
    }
})

export const products = mongoose.model('carts', CartSchema)