import { cartDao } from "../daos"

export const createCart = async (req, res) => {
    const cartId = await cartDao.save()
    if (cartId) {
        res.json(cartId)
    }
    else res.json({ error: 'no se pudo guardar el producto' })
}

export const deleteCart = async (req, res) => {
    try {
        const deletedItem = await cartDao.deleteById(req.params.id)
        res.json({ deletedItem })
    } catch (err) {
        res.json({ error: err })
    }
}

export const showProducts = async (req, res) => {
    try {
        const cart = await cartDao.getById(req.params.id)
        if (!cart) res.send({ error: 'carrito no encontrado' })
        res.send(cart.products)
    } catch (err) {
        res.send(err)
    }
}

export const addProductToACart = async (req, res) => {
    try {
        const cart = await cartDao.addProduct(req.params.id, req.params.id_item)
        if (cart) {
            res.json(cart)
        }
        else res.json({ error: 'no se pudo guardar el producto' })
    } catch (err) {
        res.send(err)
    }
}

export const removeProductFromACart = async (req, res) => {
    try {
        const cart = await cartDao.removeProduct(req.params.id, req.params.id_item)
        if (cart) {
            res.json(cart)
        }
        else res.json({ error: 'no se pudo guardar el producto' })
    } catch (err) {
        res.send(err)
    }
}