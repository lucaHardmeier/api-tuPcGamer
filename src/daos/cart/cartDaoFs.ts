import FsContainer from "../../containers/fsContainer"
import fs from 'fs/promises'

type Cart = {
    id: string,
    products: object,
    timestamp: number,
}

class CartDaoFs extends FsContainer {
    constructor() {
        super('../db/cart.json')
    }
    async save() {
        const carts = await this.getAll()
        const id = carts.length === 0 ? 1 : carts[carts.length - 1].id + 1
        const timestamp = Date.now()
        carts.push({
            products: [],
            id,
            timestamp
        })

        try {
            await fs.writeFile(this.fileRoute, JSON.stringify(carts.sort((a: Cart, b: Cart) => +a.id - +b.id)))
            return id
        } catch (err) {
            console.log('No se pudo guardar el objeto', err)
            return null
        }
    }

    async addProduct(id: string, id_item: string) {
        try {
            const cart = {}
            return cart
        } catch (err) {
            console.log(err)
            return null
        }
    }

    async removeProduct(id: string, id_item: string) {
        try {
            const cart = {}
            return cart
        } catch (err) {
            console.log(err)
            return null
        }
    }
}

export default CartDaoFs