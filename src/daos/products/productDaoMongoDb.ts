import MongoDbContainer from "../../containers/mongoDbContainer"

type Product = {
    title: string,
    price: Number,
    thumbnail: string
}

class ProductDaoMongoDb extends MongoDbContainer {
    constructor() {
        super('Product', {
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
        })
    }

    async save(product: Product) {
        const newProduct = new this.collection(product)
        try {
            const newProductSaved = await newProduct.save(product)
            return newProductSaved
        } catch (err) {
            console.log(err)
            return null
        }
    }

    async edit(id, product: Product) {
        try {
            const editedProduct = this.collection.findByIdAndUpdate(id, product)
            return editedProduct
        } catch (err) {
            console.log(err)
            return null
        }
    }
}

export default ProductDaoMongoDb