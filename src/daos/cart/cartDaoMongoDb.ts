import MongoDbContainer from "../../containers/mongoDbContainer"

class CartDaoMongoDb extends MongoDbContainer {
    constructor() {
        super('cart')
    }
}

export default CartDaoMongoDb