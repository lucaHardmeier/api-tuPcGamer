import mongoose from 'mongoose'

class MongoDbContainer {

    public collection

    constructor(name: string, schema) {
        this.collection = mongoose.model(name, schema)
    }

    async getAll() {
        try {
            return await this.collection.find({})
        } catch (err) {
            console.log(err)
            return []
        }
    }

    async deleteAll() {
        try {
            await await this.collection.deleteMany({})
            console.log('Archivo vaciado')
        } catch (err) {
            console.log("No se encontró el archivo", err)
        }
    }

    async getById(id: string) {
        try {
            return await this.collection.findById(id)
        } catch (err) {
            console.log(err)
        }
    }

    async deleteById(id: string) {
        try {
            return await this.collection.findByIdAndDelete(id)
        } catch (err) {
            console.log(err)
        }
    }
}

export default MongoDbContainer