import express from 'express'
import { addProductToACart, deleteCart, removeProductFromACart, showProducts } from '../controllers/carts.controllers'
const routes = express.Router()

routes.post('/',)

routes.delete('/:id', deleteCart)

routes.get('/:id/products', showProducts)

routes.post('/:id/products/:id_item', addProductToACart)

routes.delete('/:id/products/:id_item', removeProductFromACart)

export default routes