import * as z from "zod"

export const zFindShots = z.object({
  text: z.string().max(512),
  skip: z.number(),
})
