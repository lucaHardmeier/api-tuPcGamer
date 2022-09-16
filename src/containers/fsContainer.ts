import fs from 'fs/promises'

type Item = {
    readonly id: string,
    readonly timestamp: string
    products?: object
}

class FsContainer {

    public fileRoute: string

    constructor(fileRoute: string) {
        this.fileRoute = fileRoute
    }

    async getAll() {
        try {
            return JSON.parse(await fs.readFile(this.fileRoute, { encoding: 'utf8' }))
        } catch (err) {
            console.log("No se encontró el archivo", err)
            return []
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.fileRoute, "[]")
            console.log('Archivo vaciado')
        } catch (err) {
            console.log("No se encontró el archivo", err)
        }
    }

    async getById(id: string) {
        try {
            const items = await this.getAll()
            return items.find(item => item.id === id)
        } catch (err) {
            console.log(err)
        }
    }

    async deleteById(id: string) {
        try {
            const productos = await this.getAll()
            if (!productos.find(producto => producto.id == id)) throw new Error("No se encontró el producto")
            await fs.writeFile(this.fileRoute, JSON.stringify(productos.filter(producto => producto.id != id)))
            return "La eliminación ha sido exitosa"
        } catch (err) {
            return "No se ha encontrado el elemento buscado"
        }
    }
}

export default FsContainer