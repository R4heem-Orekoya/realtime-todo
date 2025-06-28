import type { AppRouter } from "@/server"
import { createClient } from "jstack"

export const client = createClient<AppRouter>({
  baseUrl: `${process.env.BETTER_AUTH_URL}/api`,
})