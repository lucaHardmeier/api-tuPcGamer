import express from 'express'
import Contenedor from '../daos/indexFs'
const routes = express.Router()

const cartContainer = new Contenedor('./carts.json')
const productsContainer = new Contenedor('./products.json')

routes.post('/', async (req, res) => {
    const cartId = await cartContainer.save()
    if (cartId) {
        res.json(cartId)
    }
    else res.json({ error: 'no se pudo guardar el producto' })
})

routes.delete('/:id', async (req, res) => {
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
})

routes.get('/:id/products', async (req, res) => {
    const carts = await cartContainer.getAll()
    const index = carts.findIndex((cart: { id: string }) => cart.id == req.params.id)
    if (index === -1) {
        res.send({ error: 'carrito no encontrado' })
    }
    else res.send(carts[index].products)
})

routes.post('/:id/products/:id_item', async (req, res) => {
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
})

routes.delete('/:id/products/:id_item', async (req, res) => {
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
})

export default routes