import * as z from "zod"

export const StoreModalSchema = z.object({
    name: z.string().min(1),
})
