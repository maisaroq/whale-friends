import Shark from "./Shark"


let sharks: Shark[] = []

export function getAll(): Shark[] {
  return sharks
}

export function create(shark: Shark): void {
  if (sharks.find(sh => sh.name === shark.name)) {
    throw new Error("Duplicated names")
  }

  sharks.push(shark)
}

export function remove(name: string): void {
  sharks = sharks.filter((sharks) => sharks.name !== name)
}
