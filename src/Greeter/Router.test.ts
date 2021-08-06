import chai, {expect} from "chai"
import chaiHttp from "chai-http"
import express from "express"
import sinon from "sinon"
import GreeterRouter from "./Router"
import * as Greeter from "./Greeter"

chai.use(chaiHttp)

describe("Greeter Router", () => {

    const server = express()
    server.use(GreeterRouter)

    describe("GET /:name", () => {
        it("should response with a greeting", async () => {
            const greeter = sinon.mock(Greeter)
            greeter.expects("greet").withArgs("Whally").once().returns("Test greeting")

            const res = await chai.request(server).get("/Whally")
            expect(res).to.have.status(200)
            expect(res.text).equals("Test greeting")
            greeter.verify()
        })
    })
})
