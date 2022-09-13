import Contenedor from "../daos/indexFs"

const container = new Contenedor('./products.json')

export const getProducts = async (req, res) => {
    const productos = await container.getAll()
    res.send(productos)
}

export const getProductById = async (req, res) => {
    const allProducts = await container.getAll()
    const product = allProducts.find((prod: { id: string }) => prod.id === req.params.id)
    if (!product) res.send({ error: 'producto no encontrado' })
    res.send(product)
}

export const createProduct = async (req, res) => {
    const productId = await container.save(req.body)
    if (productId) {
        res.json(req.body)
    }
    else res.json({ error: 'no se pudo guardar el producto' })
}

export const editProduct = async (req, res) => {
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
}

export const deleteProduct = async (req, res) => {
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
}