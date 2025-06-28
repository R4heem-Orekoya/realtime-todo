import { j } from "./jstack"
import { todoRouter } from "./routers/todo-router"

const api = j
  .router()
  .basePath("/api")
  .use(j.defaults.cors)
  .onError(j.defaults.errorHandler)

const appRouter = j.mergeRouters(api, {
  todo: todoRouter,
})

export type AppRouter = typeof appRouter

export default appRouter