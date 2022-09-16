import express from 'express'
import products from './routes/products'
import shoppingCart from './routes/shoppingCart'
const app = express()

app.use(express.json(), express.urlencoded({ extended: true }))

app.use('/api/products', products)
app.use('/api/cart', shoppingCart)
app.use('*', (req, res) => {
    res.status(404).send({ error: -2, desc: "path not found" })
})
const PORT = 8080
app.listen(8080, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})