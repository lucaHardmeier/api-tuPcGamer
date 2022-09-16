import mongoose from "mongoose"
import FirebaseContainer from "../../containers/firebaseContainer"
import { FieldValue } from 'firebase-admin/firestore'
import { productDao } from ".."

type Id = mongoose.Types.ObjectId
class CartDaoFirebase extends FirebaseContainer {
    constructor() {
        super('carts')
    }

    async save() {
        const doc = this.collection.doc()
        const newCart = await doc.create({ products: [] })
        console.log(newCart)
        return newCart
    }

    async addProduct(id: Id, id_item: Id) {
        try {
            const product = await productDao.getById(id_item)
            const doc = this.collection.doc(id)
            const cart = await doc.update({ products: FieldValue.arrayUnion(product) })
            return cart
        } catch (err) {
            console.log(err)
            return null
        }
    }

    async removeProduct(id: Id, id_item: Id) {
        try {
            const doc = this.collection.doc(id)
            //no funciona el remove
            const cart = await doc.update({ products: FieldValue.arrayRemove(id_item) })
            return cart
        } catch (err) {
            console.log(err)
            return null
        }
    }
}

export default CartDaoFirebase