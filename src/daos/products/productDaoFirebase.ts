import FirebaseContainer from "../../containers/firebaseContainer"

type Product = {
    title: string,
    price: Number,
    thumbnail: string
}

class CartDaoFirebase extends FirebaseContainer {
    constructor() {
        super('products')
    }

    async save(product: Product) {
        try {
            const doc = this.collection.doc()
            const newProduct = doc.create(product)
            console.log(newProduct.id)
            return newProduct
        } catch (err) {
            console.log(err)
            return null
        }
    }

    async edit(id, product: Product) {
        try {
            const doc = this.collection.doc(id)
            const editedProduct = await doc.update(product)
            return editedProduct
        } catch (err) {
            console.log(err)
            return null
        }
    }
}

export default CartDaoFirebase