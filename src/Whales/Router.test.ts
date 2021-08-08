import itParam from "mocha-param"
import chai, {expect} from "chai"
import chaiHttp from "chai-http"
import express from "express"
import sinon from "sinon"
import WhalesRouter from "./Router"
import Whale from "./Whale"
import * as Store from "./Store"

chai.use(chaiHttp)

afterEach(() => {
    sinon.restore()
})

describe("Whales Router", () => {

    const server = express()
    server.use(WhalesRouter)

    describe("GET /", () => {
        it("should response with whales", async () => {
            const whales: Whale[] = [
                { name: "Whally", age: 87 },
                { name: "Blui", age: 42 },
            ]

            const whalesStore = sinon.mock(Store)
            whalesStore.expects("getAll").once().returns(whales)

            const res = await chai.request(server).get("/")
            expect(res).to.have.status(200)
            expect(res.body).deep.equals(whales)
            whalesStore.verify()
        })
    })

    describe("GET /:name", () => {
        it("should response with a whale query by name", async () => {
            const whales: Whale[] = [
                { name: "Whally", age: 87 },
                { name: "Blui", age: 42 },
            ]

            const whalesStore = sinon.mock(Store)
            whalesStore.expects("getAll").once().returns(whales)

            const res = await chai.request(server).get("/Whally")
            expect(res).to.have.status(200)
            expect(res.body).deep.equals(whales[0])
            whalesStore.verify()
        })

        it("should response with 404 if the queried whale does not exist", async () => {
            const whales: Whale[] = [
                { name: "Whally", age: 87 },
                { name: "Blui", age: 42 },
            ]

            const whalesStore = sinon.mock(Store)
            whalesStore.expects("getAll").once().returns(whales)

            const res = await chai.request(server).get("/Unknown")
            expect(res).to.have.status(404)
            expect(res.body).is.empty
            whalesStore.verify()
        })
    })

    describe("POST /", () => {
        it("should create a new whale", async () => {
            const whale: Whale = { name: "Whally", age: 87 }
            const whalesStore = sinon.mock(Store)
            whalesStore.expects("create").withArgs(whale).once()

            const res = await chai.request(server).post("/").send(whale)
            expect(res).to.have.status(201)
            expect(res.body).is.empty
            whalesStore.verify()
        })

        it("should return with 400 if whale creation fails", async () => {
          const whale: Whale = { name: "Whally", age: 87 }
          const whalesStore = sinon.mock(Store)
          whalesStore.expects("create").withArgs(whale).once().throws(new Error("Duplicated element"))

          const res = await chai.request(server).post("/").send(whale)
          expect(res).to.have.status(400)
          expect(res.body).is.empty
          whalesStore.verify()
        })

        itParam(
            "should response with 422 if request body is not a whale",
            [
                { age: 87 },
                { name: "Whally" },
                { name: "Wh", age: 87 },
                { name: "Whally", age: 0 },
            ],
            async (payload) => {
                const whalesStore = sinon.mock(Store)
                whalesStore.expects("create").never()

                const res = await chai.request(server).post("/").send(payload)
                expect(res).to.have.status(422)
                expect(res.body).is.empty
                whalesStore.verify()
            })
    })

    describe("DELETE /:name", () => {
        it("should delete a whale", async () => {
            const whalesStore = sinon.mock(Store)
            whalesStore.expects("remove").withArgs("Whally").once()
            const res = await chai.request(server).delete("/Whally")

            expect(res).to.have.status(204)
            expect(res.body).is.empty
            whalesStore.verify()
        })
    })
})
