import mongoose from "mongoose"
import { Schema } from "mongoose"
import { ProductSchema } from "./product"

const CartSchema = new Schema({
    products: {
        type: [ProductSchema],
        default: []
    }
}, { timestamps: true })

export const Cart = mongoose.model('carts', CartSchema)