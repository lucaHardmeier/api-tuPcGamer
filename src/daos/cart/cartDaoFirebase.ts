import FirebaseContainer from "../../containers/firebaseContainer"

class CartDaoFirebase extends FirebaseContainer {
    constructor() {
        super('cart')
    }
}

export default CartDaoFirebase