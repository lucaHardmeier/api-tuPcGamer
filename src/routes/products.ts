import express from 'express'
import { createProduct, deleteProduct, editProduct, getProductById, getProducts } from '../controllers/products.controllers'
const routes = express.Router()

const isAdmin = async (req, res, next) => {
    if (true) next()
    else res.send({ error: -1, desc: `ruta ${req.originalUrl()} metodo ${req.method} no autorizado` })
}

routes.get('/', getProducts)

routes.get('/:id', getProductById)

routes.post('/', isAdmin, createProduct)

routes.put('/:id', isAdmin, editProduct)

routes.delete('/:id', isAdmin, deleteProduct)

export default routes