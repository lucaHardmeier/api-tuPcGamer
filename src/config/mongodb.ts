import mongoose from "mongoose";

async function mongoDbConnection() {
    try {
        await mongoose.connect('mongodb://localhost:27017/tu-pc-gamer')
        console.log('Connected to MongoDb')
    } catch (err) {
        console.log(err)
    }
}
mongoDbConnection()