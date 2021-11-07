import * as z from "zod"

export const zCreateShot = z.object({
  url: z.string().min(4).max(64),
})
