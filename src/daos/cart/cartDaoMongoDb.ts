import mongoose from "mongoose"
import MongoDbContainer from "../../containers/mongoDbContainer"
import { Product } from "../../models/product"

type Id = mongoose.Types.ObjectId

class CartDaoMongoDb extends MongoDbContainer {
    constructor() {
        super('carts', {
            products: {
                type: [Object],
                default: []
            }
        })
    }

    async save() {
        try {
            const newCart = this.collection.save()
            return newCart
        } catch (err) {
            console.log(err)
            return null
        }
    }

    async addProduct(id: Id, id_item: Id) {
        try {
            const product = Product.findById(id_item)
            const cart = this.collection.findByIdAndUpdate(id, { $push: { products: product } })
            return cart
        } catch (err) {
            console.log(err)
            return null
        }
    }

    async removeProduct(id: Id, id_item: Id) {
        try {
            const cart = this.collection.findByIdAndUpdate(id, { $pull: { products: { _id: id_item } } })
            return cart
        } catch (err) {
            console.log(err)
            return null
        }
    }
}

export default CartDaoMongoDb