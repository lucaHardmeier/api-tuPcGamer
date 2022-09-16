import FsContainer from "../../containers/fsContainer"
import fs from 'fs/promises'

type Product = {
    id: string,
    title: string,
    price: Number,
    thumbnail: string
}

class ProductDaoFs extends FsContainer {
    constructor() {
        super('../db/product.json')
    }

    async save(item: Product | null = null, itemId: string | null = null) {
        const items = await this.getAll()
        const id = itemId !== null ? itemId : items.length === 0 ? 1 : items[items.length - 1].id + 1
        const timestamp = Date.now()
        const content = item ? item : { products: [] }
        items.push({
            ...content,
            id,
            timestamp
        })

        try {
            await fs.writeFile(this.fileRoute, JSON.stringify(items.sort((a: Product, b: Product) => +a.id - +b.id)))
            return id
        } catch (err) {
            console.log('No se pudo guardar el objeto', err)
            return null
        }
    }

    async edit(id: string, product: Product) {

        try {
            const productos = await this.getAll()
            const index = productos.findIndex((prod: Product) => prod.id == id)
            if (index === -1) throw new Error('producto no encontrado')
            else {
                await this.deleteById(id)
                await this.save(product, id)
                return product
            }
        } catch (err) {
            console.log(err)
            return null
        }
    }
}

export default ProductDaoFs