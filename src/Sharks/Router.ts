import express, { Router, Request, Response } from "express"
import * as Store from "./Store"
import {body, validationResult} from "express-validator"

const router = Router()
router.use(express.json())

router.get("/", (req, res) => {
  const sharks = Store.getAll()
  res.json(sharks)
})

router.get("/:name", (req, res) => {
  const sharks = Store.getAll()
  const shark = sharks.find((value) => value.name === req.params.name)
  if(!shark){
    res.sendStatus(400)
  } else {
    res.json(shark)
  }
})

router.post("/", [
  body("name").exists().isLength({min: 3}),
  body("age").exists().isInt({gt: 0}),
], (req: Request, res: Response) => {
  if(!validationResult(req).isEmpty()){
    res.sendStatus(422)
  } else {
      try {
        Store.create(req.body)
        res.sendStatus(201)
      } catch(e){
        res.sendStatus(400)
      }
  }

  router.delete("/:name", (req, res) => {
    Store.remove("Toothi")
    res.sendStatus(204)
  })
})


export default router
