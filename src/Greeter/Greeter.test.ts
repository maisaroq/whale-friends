import {expect} from "chai"
import * as Greeter from "./Greeter"

describe("Greeter", () => {
    it("should greet the given name", () => {
        const greeting = Greeter.greet("Whally")
        expect(greeting).equals("Hi Whally!")
    })
})
