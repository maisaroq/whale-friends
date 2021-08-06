import Whale from "./Whale"

let whales: Whale[] = []

export function getAll(): Whale[] {
    return whales
}

export function create(whale: Whale): void {
    whales.push(whale)
}

export function remove(name: string): void {
    whales = whales.filter((whales) => whales.name !== name)
}
