import mongoose from "mongoose"
import { productDao } from ".."
import MongoDbContainer from "../../containers/mongoDbContainer"

type Id = mongoose.Types.ObjectId

class CartDaoMongoDb extends MongoDbContainer {
    constructor() {
        super('Cart', {
            products: {
                type: [Object],
                default: []
            }
        })
    }

    async save() {
        const cart = new this.collection()
        try {
            const newCart = cart.save()
            return newCart
        } catch (err) {
            console.log(err)
            return null
        }
    }

    async addProduct(id: Id, id_item: Id) {
        try {
            const product = await productDao.getById(id_item)
            const cart = this.collection.findByIdAndUpdate(id, { $push: { products: product } })
            return cart
        } catch (err) {
            return null
        }
    }

    async removeProduct(id: Id, id_item: Id) {
        try {
            // el pull no funciona
            const cart = await this.collection.findByIdAndUpdate(id, { $pull: { products: { _id: id_item } } })
            return cart
        } catch (err) {
            console.log(err)
            return null
        }
    }
}

export default CartDaoMongoDb