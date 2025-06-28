import type { AppRouter } from "@/server"
import { createClient } from "jstack"

export const client = createClient<AppRouter>({
  baseUrl: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api`,
})