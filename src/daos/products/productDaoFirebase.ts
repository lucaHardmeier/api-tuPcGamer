import FirebaseContainer from "../../containers/firebaseContainer"

class CartDaoFirebase extends FirebaseContainer {
    constructor() {
        super('product')
    }
}

export default CartDaoFirebase