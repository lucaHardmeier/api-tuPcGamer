import mongoose from "mongoose";

async function mongoDbConnection() {
    try {
        const URL = 'mongodb://localhost:27017/tu-pc-gamer'
        let res = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to MongoDb')
    } catch (err) {
        console.log(err)
    }
}
mongoDbConnection()