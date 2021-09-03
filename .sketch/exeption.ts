const store: string[] = []

function create(value: string): void {
  if (!store.includes(value)) {
    store.push(value)
  } else {
    throw Error("Cannot create multiple elements with the same value")
  }
}

try {
  create("Blui")
  create("Nano")
  create("Blui")
  create("Blui")
  create("Blui")
  create("Blui")
} catch(e) {
  console.error("You cannot create duplicated elements in the store")
}


console.log(store)
