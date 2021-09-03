import Shark from "./Shark"
import {expect} from "chai"

beforeEach(() => {
 delete require.cache[require.resolve('./Store')]
})

describe("Shark store", () => {
  it("should return zero sharks when store is empty", () => {
    const Store = require("./Store")
    expect(Store.getAll()).is.empty

  })

  it("should return created sharks", () => {
    const Store = require("./Store")
    const sharks: Shark[] = [
      {name: "Toothi", age: 20},
      {name: "Bobi", age: 50}
    ]
    sharks.forEach((shark) => Store.create(shark))
    expect(Store.getAll()).deep.equals(sharks)
  })

  it("should throw an error if create a shark with the same name", () => {
    const Store = require("./Store")


    Store.create({name: "Toothi", age: 20})
    expect(() => Store.create({name: "Toothi", age: 22})).to.throw("Duplicated names")
    expect(Store.getAll()).has.length(1)
  })

  it("should remove a shark", () => {
    const Store = require("./Store")
    const sharks: Shark[] = [
      {name: "Toothi", age: 20},
      {name: "Bobi", age: 50}
    ]

    sharks.forEach((shark) => Store.create(shark))
    sharks.forEach((shark) => {
      Store.remove(shark.name)
      expect(Store.getAll()).not.contains(shark)
    })
    expect(Store.getAll()).is.empty
  })
})
