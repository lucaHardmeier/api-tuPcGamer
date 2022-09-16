import mongoose from "mongoose"
import { Schema } from "mongoose"

export const ProductSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    thumbnail: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const Product = mongoose.model('products', ProductSchema)