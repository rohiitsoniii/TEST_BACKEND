import express from "express";
const app = express()
import cors from "cors"
import dotenv from "dotenv"
import UserRouter from "./src/routes/user.routes.js";


const corsOptions = {
    origin: '*',
    credentials: true,
}

app.use("/user",UserRouter)

app.use(cors(corsOptions))

dotenv.config({
    path: "./.env"
})


app.use(express.json({
    limit: '50mb'
}))
app.use(express.urlencoded({
    limit: '50mb',
}))
app.use(express.static('public'))




app.get("/radhe", (req, res) => {
    res.send("Hello World")
})

export default app
