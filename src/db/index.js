const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI
        await mongoose.connect(MONGO_URI);
        console.log(`Mongodb connected successfully`)
    } catch (error) {
        throw error
    }
   
}

module.exports = { connectDb };