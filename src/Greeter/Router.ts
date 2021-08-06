import {Request, Response, Router} from "express"
import {param, validationResult} from "express-validator"
import * as Greeter from "./Greeter"

const router = Router()

router.get("/:name", [
    param("name").exists().trim().isLength({min: 1}),
], (req: Request, res: Response) => {
    try {
        validationResult(req).throw()

        const name = req.params.name
        const greeting = Greeter.greet(name)
        res.send(greeting)
    } catch (e) {
        res.sendStatus(400)
    }
})

export default router
