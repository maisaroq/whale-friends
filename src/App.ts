import express, {Request, Response} from "express"
import GreeterRouter from "./Greeter/Router"
import WhalesRouter from "./Whales/Router"

const server = express()
server.use("/greet", GreeterRouter)
server.use("/whales", WhalesRouter)

const port: number = parseInt(<string>process.env.PORT, 10) || 8080
server.listen(port, () => {
    console.log("Server is now running on port", port)
})

process.on("unhandledRejection", console.error)
