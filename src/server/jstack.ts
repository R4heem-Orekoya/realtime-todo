import { auth } from "@/lib/auth"
import { HTTPException } from "hono/http-exception"
import { jstack } from "jstack"

interface Env {
  Bindings: {}
}

export const j = jstack.init<Env>()

export const authMiddleware = j.middleware(async function ({ c, next }) {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session || !session.user) {
    throw new HTTPException(401, {
      message: "Unauthorized, sign in to continue.",
    })
  }

  return await next({ user: session.user })
})

export const publicProcedure = j.procedure
export const privateProcedure = publicProcedure.use(authMiddleware)