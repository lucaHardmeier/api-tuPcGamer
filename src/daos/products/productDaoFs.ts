import FsContainer from "../../containers/fsContainer"

type Product = {
    title: string,
    price: Number,
    thumbnail: string
}

class ProductDaoFs extends FsContainer {
    constructor() {
        super('../db/product.json')
    }

    async save(product: Product) {
        try {
            const newProduct = {}
            return newProduct
        } catch (err) {
            console.log(err)
            return null
        }
    }

    async edit(id, product: Product) {
        try {
            const editedProduct = {}
            return editedProduct
        } catch (err) {
            console.log(err)
            return null
        }
    }
}

export default ProductDaoFs