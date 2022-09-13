import Contenedor from '../containers/fsContainer'
const cartContainer = new Contenedor('./carts.json')
const productsContainer = new Contenedor('./products.json')

export const createCart = async (req, res) => {
    const cartId = await cartContainer.save()
    if (cartId) {
        res.json(cartId)
    }
    else res.json({ error: 'no se pudo guardar el producto' })
}

export const deleteCart = async (req, res) => {
    try {
        const newCart = await cartContainer.deleteById(req.params.id)
        res.json({
            msj: newCart
        })
    } catch (err) {
        res.json({
            error: "Ocurrió un error al intentar borrar el carrito. Inténtelo nuevamente"
        })
    }
}

export const showProducts = async (req, res) => {
    const carts = await cartContainer.getAll()
    const index = carts.findIndex((cart: { id: string }) => cart.id == req.params.id)
    if (index === -1) {
        res.send({ error: 'carrito no encontrado' })
    }
    else res.send(carts[index].products)
}

export const addProductToACart = async (req, res) => {
    const allCarts = await cartContainer.getAll()
    const cart = allCarts.find((cart: { id: string }) => cart.id == req.params.id)
    const products = await productsContainer.getAll()
    const product = products.find((prod: { id: string }) => prod.id === req.params.id_item)
    if (!cart) res.send({ error: 'carrito no encontrado' })
    else if (!product) res.send({ error: 'producto no encontrado' })
    else {
        cart.products.push(product)
        await cartContainer.deleteById(cart.id)
        await cartContainer.save(cart, cart.id)
        res.json({
            mensaje: "producto agregado correctamente"
        })
    }
}

export const removeProductFromACart = async (req, res) => {
    const allCarts = await cartContainer.getAll()
    const cart = allCarts.find((cart: { id: string }) => cart.id == req.params.id)
    if (!cart) res.send({ error: 'Carrito no encontrado' })

    else {
        cart.products = cart.products.filter(product => product.id != req.params.id_item)
        await cartContainer.deleteById(cart.id)
        await cartContainer.save(cart, cart.id)
        res.json({
            mensaje: "Producto eliminado correctamente"
        })
    }
}