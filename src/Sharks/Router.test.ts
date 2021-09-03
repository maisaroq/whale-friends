import express from "express"
import SharkRouter from "./Router"
import chai, {expect} from "chai"
import chaiHttp from "chai-http"
import Shark from "./Shark"
import sinon from "sinon"
import * as Store from "./Store"

chai.use(chaiHttp)

describe("Shark Router", () => {

  const server = express()
  server.use(SharkRouter)

  describe("GET /", () => {
    it("Should respone with all sharks", async () => {
      const sharks: Shark[] = [
        {name: "Toothi", age: 20},
        {name: "Bobi", age: 50}
      ]

      const sharkStore = sinon.mock(Store)
      sharkStore.expects("getAll").once().returns(sharks)

      const res = await chai.request(server).get("/")
      expect(res).to.have.status(200)
      expect(res.body).deep.equals(sharks)
      sharkStore.verify()
    })
  })

  describe("GET /:name", () => {
    it("should respone with the shark name", async () => {
      const sharks: Shark[] = [
        {name: "Toothi", age: 20},
        {name: "Bobi", age: 50}
      ]

      const sharkStore = sinon.mock(Store)
      sharkStore.expects("getAll").once().returns(sharks)

      const res = await chai.request(server).get("/Toothi")
      expect(res).to.have.status(200)
      expect(res.body).deep.equals(sharks[0])
      sharkStore.verify()
    })

    it("should respnse with 404 if the queried shark is not exist", async () => {
      const sharks: Shark[] = [
        {name: "Toothi", age: 20},
        {name: "Bobi", age: 50}
      ]
      const sharkStore = sinon.mock(Store)
      sharkStore.expects("getAll").once().returns(sharks)

      const res = await chai.request(server).get("/Unknown")
      expect(res).to.have.status(400)
      expect(res.body).is.empty
      sharkStore.verify()
    })
  })

  describe("POST /", () => {
    it("should create a new shark", async() => {
      const shark = { name: "Toothi", age:20 }
      const sharkStore = sinon.mock(Store)
      sharkStore.expects("create").withArgs(shark).once()

      const res = await chai.request(server).post("/").send(shark)
      expect(res).have.status(201)
      expect(res.body).is.empty
      sharkStore.verify()
    })

    describe("DELETE /:name", () => {
      it("should remove a whale", async () => {
        const sharkStore = sinon.mock(Store)
        sharkStore.expects("remove").withArgs("Toothi").once()

        const res = await chai.request(server).delete("/Toothi")
        expect(res).have.status(204)
        expect(res.body).is.empty
        sharkStore.verify()
      })
    })

  })
})
