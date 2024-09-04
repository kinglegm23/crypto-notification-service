import mongoose from "mongoose"
import { mongoConfig } from "../config/db.mjs"


export const connectDB = async () => {
    try {
        console.log("Connecting Mongo DB....")
        await mongoose.connect(mongoConfig.mongoConnectionString)
        console.log("Mongo DB connected")
    } catch (e) {
        console.log("Error connecting with db")
        process.exit(1)
    }
}
