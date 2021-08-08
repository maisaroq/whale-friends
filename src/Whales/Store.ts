import Whale from "./Whale"

let whales: Whale[] = []

export function getAll(): Whale[] {
    return whales
}

export function create(whale: Whale): void {
    if(whales.find(w => w.name === whale.name)) {
      throw new Error("Duplicated element")
    }

    whales.push(whale)
}

export function remove(name: string): void {
    whales = whales.filter((whales) => whales.name !== name)
}
