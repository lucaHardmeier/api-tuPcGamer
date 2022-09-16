import express from 'express'
import products from './routes/products'
import shoppingCart from './routes/shoppingCart'
const app = express()
debugger
console.log('pasa')
import './config/mongodb'

app.use(express.json(), express.urlencoded({ extended: true }))

app.use('/api/products', products)
app.use('/api/cart', shoppingCart)
app.use('*', (req, res) => {
    res.status(404).send({ error: -2, desc: "path not found" })
})
console.log('pasa')
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})