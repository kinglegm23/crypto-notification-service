import express from "express";
import { connectDB } from "./db/index.mjs";
import notificationController from "./controllers/notification.controller.mjs";


const app = express();

app.use(express.json())


const SERVER_PORT = 3000;

app.get("/ping", (req, res, next) => {
    res.send({
        msg: "pong"
    })
})

app.use("/notification", notificationController)

const startup = async () => {
    // connect db
    await connectDB();
}

startup().then(() => {
    app.listen(SERVER_PORT, () => {
        console.log(`app listening on ${SERVER_PORT}`)
    })
})

