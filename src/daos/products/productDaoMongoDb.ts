import MongoDbContainer from "../../containers/mongoDbContainer"


class ProductDaoMongoDb extends MongoDbContainer {
    constructor() {
        super('product')
    }
}

export default ProductDaoMongoDb