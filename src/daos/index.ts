
let productDao
let cartDao

const dao: string = 'firebase'

switch (dao) {
    case 'firebase':
        const runFirebase = async () => {
            const { default: ProductsDaoFirebase } = await import("./products/productDaoFirebase")
            productDao = new ProductsDaoFirebase()
            const { default: CartDaoFirebase } = await import("./cart/cartDaoFirebase")
            cartDao = new CartDaoFirebase()
        }
        runFirebase();
        break;
    case 'fs':
        break;
    default:
    case 'mongodb':
        const RunMongoDb = async () => {
            await import("../config/mongodb")
            const { default: ProductsDaoMongoDb } = await import("./products/productDaoMongoDb")
            productDao = new ProductsDaoMongoDb()
            const { default: CartDaoMongoDb } = await import("./cart/cartDaoMongoDb")
            cartDao = new CartDaoMongoDb()
        }
        RunMongoDb();
        break;

}

export { productDao, cartDao }