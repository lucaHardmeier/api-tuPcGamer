import mongoose from "mongoose"
import FirebaseContainer from "../../containers/firebaseContainer"
import db from "../../config/firebase"
import { FieldValue } from 'firebase-admin/firestore'

type Id = mongoose.Types.ObjectId
class CartDaoFirebase extends FirebaseContainer {
    constructor() {
        super('carts')
    }

    async save() {
        const doc = this.collection.doc()
        const newCart = doc.create({ products: [] })
        return newCart
    }

    async addProduct(id: Id, id_item: Id) {
        try {
            const product = db.collection('products').doc(id_item)
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
            const cart = await doc.update({ products: FieldValue.arrayRemove(id_item) })
            return cart
        } catch (err) {
            console.log(err)
            return null
        }
    }
}

export default CartDaoFirebase