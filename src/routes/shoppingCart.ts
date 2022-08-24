import express from 'express'
import Contenedor from '../Contenedor'
const routes = express.Router()

const container = new Contenedor('../carts.json')

routes.post('/', async (req, res) => {
    const cartId = await container.save()
    if (cartId) {
        res.json(cartId)
    }
    res.send({ error: 'no se pudo guardar el producto' })
})

routes.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await container.deleteById(req.params.id)
        res.json({
            mensaje: deletedItem
        })
    } catch (err) {
        res.json({
            error: err
        })
    }
})

routes.get('/:id/products', async (req, res) => {
    const carts = await container.getAll()
    const index = carts.findIndex((cart: { id: string }) => cart.id == req.params.id)
    if (index === -1) {
        res.send({ error: 'carrito no encontrado' })
    }
    res.send(carts[index].products)
})

routes.post('/:id/products', async (req, res) => {
    const carts = await container.getAll()
    const index = carts.findIndex((cart: { id: string }) => cart.id == req.params.id)
    if (index === -1) res.send({ error: 'carrito no encontrado' })

    else {
        carts[index].products.push(req.body)
        await container.deleteById(req.params.id)
        await container.save(carts[index], index)
        res.json({
            mensaje: "producto agregado correctamente"
        })
    }
})

routes.delete('/:id/products/:id_item', async (req, res) => {
    const carts = await container.getAll()
    const index = carts.findIndex((cart: { id: string }) => cart.id == req.params.id)
    if (index === -1) res.send({ error: 'carrito no encontrado' })

    else {
        carts[index].products.filter(product => product.id != req.params.id_item)
        await container.deleteById(req.params.id)
        await container.save(carts[index], index)
        res.json({
            mensaje: "producto modificado correctamente"
        })
    }
})

export default routes