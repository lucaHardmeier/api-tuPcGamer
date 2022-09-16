import { productDao } from "../daos"

export const getProducts = async (req, res) => {
    try {
        const productos = await productDao.getAll()
        res.send(productos)
    } catch (err) {
        res.send(err)
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await productDao.getById(req.params.id)
        if (!product) res.send({ error: 'producto no encontrado' })
        res.send(product)
    } catch (err) {
        res.send(err)
    }
}

export const createProduct = async (req, res) => {
    try {
        const product = await productDao.save(req.body)
        if (product) {
            res.json(product)
        }
        else res.json({ error: 'no se pudo guardar el producto' })
    } catch (err) {
        res.send(err)
    }
}

export const editProduct = async (req, res) => {
    try {
        const product = await productDao.edit(req.params.id, req.body)
        if (product) {
            res.json(product)
        }
        else res.json({ error: 'no se pudo guardar el producto' })
    } catch (err) {
        res.send(err)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const deletedItem = await productDao.deleteById(req.params.id)
        res.json({ deletedItem })
    } catch (err) {
        res.json({ error: err })
    }
}