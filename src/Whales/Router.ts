import express, { Router, Request, Response } from "express"
import {body, validationResult} from "express-validator"
import * as Store from "./Store"

const router = Router()
router.use(express.json())

router.get("/", (req, res) => {
    const whales = Store.getAll()
    res.json(whales)
})

router.get("/:name", (req, res) => {
    const whales = Store.getAll()
    const whale = whales.find((value) => value.name === req.params.name)
    if(!whale){
        res.sendStatus(404)
    } else {
        res.json(whale)
    }
})

router.post("/", [
    body("name").exists().isLength({min: 3}),
    body("age").exists().isInt({gt: 0}),
], (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
        res.sendStatus(422)
    } else {
        try {
          Store.create(req.body)
          res.sendStatus(201)
        } catch(e) {
          res.sendStatus(400)
        }
    }
})

router.delete("/:name", (req, res) => {
    Store.remove(req.params.name)
    res.sendStatus(204)
})

export default router
