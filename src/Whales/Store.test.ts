import { expect } from "chai"
import Whale from "./Whale"

beforeEach(() => {
    delete require.cache[require.resolve('./Store')];
})

describe("Whales Store", () => {
    it("should return zero whales on empty store", () => {
        const Store = require("./Store")
        expect(Store.getAll()).is.empty
    })

    it("should return created whales", () => {
        const Store = require("./Store")
        const whales: Whale[] = [
            { name: "Whally", age: 87 },
            { name: "Blui", age: 42 },
        ]

        whales.forEach((whale) => Store.create(whale))
        expect(Store.getAll()).deep.equals(whales)
    })

    it("should remove a whale", () => {
        const Store = require("./Store")
        const whales: Whale[] = [
            { name: "Whally", age: 87 },
            { name: "Blui", age: 42 },
        ]

        whales.forEach((whale) => Store.create(whale))
        whales.forEach((whale) => {
            Store.remove(whale.name)
            expect(Store.getAll()).not.contains(whale)
        })
        
        expect(Store.getAll()).is.empty
    })
})