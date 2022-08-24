import express from 'express'
import Contenedor from '../Contenedor'
const routes = express.Router()

const isAdmin = async (req, res, next) => {
    if (true) next()
    else res.send({ error: -1, desc: `ruta ${req.originalUrl()} metodo ${req.method} no autorizado` })
}
const container = new Contenedor('./products.json')

routes.get('/', async (req, res) => {
    const productos = await container.getAll()
    res.send(productos)
})

routes.get('/:id', async (req, res) => {
    const allProducts = await container.getAll()
    const product = allProducts.find((prod: { id: string }) => prod.id === req.params.id)
    if (!product) res.send({ error: 'producto no encontrado' })
    res.send(product)
})

routes.post('/', isAdmin, async (req, res) => {
    const productId = await container.save(req.body)
    if (productId) {
        res.json(req.body)
    }
    else res.json({ error: 'no se pudo guardar el producto' })
})

routes.put('/:id', isAdmin, async (req, res) => {
    const productos = await container.getAll()
    const index = productos.findIndex((producto: { id: string }) => producto.id == req.params.id)
    if (index === -1) res.send({ error: 'producto no encontrado' })

    else {
        await container.deleteById(req.params.id)
        await container.save(req.body, req.params.id)
        res.json({
            mensaje: "producto modificado correctamente"
        })
    }
})

routes.delete('/:id', isAdmin, async (req, res) => {
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

export default routes