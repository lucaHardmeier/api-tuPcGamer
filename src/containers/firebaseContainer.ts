import db from "../config/firebase"

class FirebaseContainer {

    public collection

    constructor(name: string) {
        this.collection = db.collection(name)
    }

    async getAll() {
        try {
            const docs = (await this.collection.get()).docs
            const response = docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            return response
        } catch (err) {
            console.log(err)
            return []
        }
    }

    async getById(id: string) {
        try {
            const doc = this.collection.doc(id)
            const product = await doc.get()
            return product.data()
        } catch (err) {
            console.log(err)
        }
    }

    async deleteAll() {
        try {
            const docs = (await this.collection.get()).docs
            const products = docs.delete()
            console.log('Archivo vaciado')
            return products
        } catch (err) {
            console.log("No se encontró el archivo", err)
        }
    }

    async deleteById(id: string) {
        try {
            const doc = this.collection.doc(id)
            const product = await doc.delete()
            return product
        } catch (err) {
            console.log(err)
        }
    }
}

export default FirebaseContainer