import { z } from "zod"
import { j, privateProcedure } from "../jstack"
import { db } from "@/lib/db"
import { HTTPException } from "hono/http-exception"
import { pusherServer } from "@/lib/puhser"

export const todoRouter = j.router({
  add: privateProcedure
    .input(z.object({
      content: z.string().min(1),
      done: z.boolean()
    }))
    .post(async ({ c, input, ctx }) => {
      await db.todo.create({
        data: {
          content: input.content,
          done: input.done,
          userId: ctx.user.id
        }
      })
      
      await pusherServer.trigger(`${ctx.user.id}-channel`, "todo", {})

      return c.superjson({ success: true })
    }),

  list: privateProcedure.query(async ({ c, ctx }) => {
    const todos = await db.todo.findMany({
      where: {
        userId: ctx.user.id,
      },
      select: {
        id: true,
        content: true,
        done: true,
      },
      orderBy:{
        createdAt: "desc"
      }
    })

    return c.superjson(todos)
  }),

  delete: privateProcedure
    .input(z.object({
      todoId: z.string().min(1)
    }))
    .mutation(async ({ c, input: { todoId }, ctx }) => {
      const todoToDelete = await db.todo.findUnique({
        where: {
          id: todoId
        }
      })

      if (!todoToDelete) {
        throw new HTTPException(404, {
          message: "This todo does not exist!",
        })
      }

      if (todoToDelete.userId !== ctx.user.id) {
        throw new HTTPException(401, {
          message: "Unauthorized, this todo does not belong to you!",
        })
      }

      await db.todo.delete({
        where: {
          id: todoId
        }
      })
      
      await pusherServer.trigger(`${ctx.user.id}-channel`, "todo", {})
      
      return c.json({ success: true })
    }),
  
  toggle: privateProcedure
    .input(z.object({ todoId: z.string() }))
    .mutation(async ({ c, input:{ todoId }, ctx }) => {
      const todoToUpdate = await db.todo.findUnique({
        where: {
          id: todoId
        }
      })
      
      if (!todoToUpdate) {
        throw new HTTPException(404, {
          message: "This todo does not exist!",
        })
      }

      if (todoToUpdate.userId !== ctx.user.id) {
        throw new HTTPException(401, {
          message: "Unauthorized, this todo does not belong to you!",
        })
      }
      
      await db.todo.update({
        where: {
          id: todoId
        },
        data:{
          done: todoToUpdate.done ? false : true
        }
      })
      
      await pusherServer.trigger(`${ctx.user.id}-channel`, "todo", {})
      
      return c.json({ success: true })
    })
})
