import FsContainer from "../../containers/fsContainer"

class CartDaoFs extends FsContainer {
    constructor() {
        super('../db/cart.json')
    }

    async addProduct(id: Id, id_item: Id) {
        try {
            const cart = {}
            return cart
        } catch (err) {
            console.log(err)
            return null
        }
    }

    async removeProduct(id: Id, id_item: Id) {
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