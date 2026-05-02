import bcrypt from "bcryptjs"
import { authenticate } from "@/app/actions/auth"

vi.mock("next/navigation", () => ({
  redirect: vi.fn()
}))
// whenever any code asks for session.ts, give them this object I'm defining right here instead of the real file.
vi.mock("@/lib/session", () => ({
  createSession: vi.fn()
}))
describe("authenticate action", () => {
  // My dumbass wrote passsword instead of password and spent an hour debugging it
  const mockPassword = "testpasssword"

  beforeAll(() => {})
  afterAll(() => {})
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it("should return undefined (success) when password matches the hash", async () => {
    const formData = new FormData()
    formData.append("password", mockPassword)

    const result = await authenticate({}, formData)
    expect(result).toBeUndefined()
  })
  it("should return an error object when password is incorrect", async () => {
    const formData = new FormData()
    formData.append("password", "wrong-password")

    const result = await authenticate({}, formData)

    expect(result).toEqual({
      errors: { password: ["Incorrect admin credentials."] }
    })
  })
})
