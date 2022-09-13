
let productDao
let cartDao

const dao: string = 'mongodb'

switch (dao) {
    case 'mongodb':
        const { default: ProductsDaoMongoDb } = await import("./products/productDaoMongoDb")
        productDao = new ProductsDaoMongoDb()
        const { default: CartDaoMongoDb } = await import("./cart/cartDaoMongoDb")
        cartDao = new CartDaoMongoDb()
        break;

    case 'firebase':
        const { default: ProductsDaoFirebase } = await import("./products/productDaoFirebase")
        productDao = new ProductsDaoFirebase()
        const { default: CartDaoFirebase } = await import("./cart/cartDaoFirebase")
        cartDao = new CartDaoFirebase()
        break;

    case 'fs':

        break;

    default:
        break;
}

export { productDao, cartDao }