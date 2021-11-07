import { Id } from "integrations/domain"

describe("Id", () => {
  test("new", () => {
    const id = new Id("1234567890")

    expect(id.value.length).toBe(10)
  })
})
