"use client"

import React, { useEffect, useState } from 'react'
import { client } from '@/lib/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import TodoInput from './todo-input';
import TodoList from './todo-list';
import { Todo } from '@/types';
import { Checkbox } from '../ui/checkbox';
import { motion } from "motion/react"
import { pusherClient } from '@/lib/puhser';
import { authClient } from '@/lib/auth-client';

export default function TodosContainer() {
   const queryClient = useQueryClient()
   const { data, isLoading } = useQuery({
      queryKey: ["todos"],
      queryFn: async () => {
         const res = await client.todo.list.$get()

         return await res.json()
      }
   })

   const addTodoMutation = useMutation({
      mutationFn: (content: string) => client.todo.add.$post({ content, done: false }),
      onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
   })

   const { isPending, variables } = addTodoMutation

   const [value, setValue] = useState("")
   const [todos, setTodos] = useState<Todo[]>(data ?? [])
   
   const session = authClient.useSession()
   const userId = session.data?.user.id

   async function addTodo(value: string) {
      addTodoMutation.mutate(value)
      setValue("")
   }

   async function toggleTodo(id: string) {
      setTodos(prev =>
         prev.map(todo =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
         )
      );

      await client.todo.toggle.$post({ todoId: id })
      queryClient.invalidateQueries({ queryKey: ["todos"] })
   }

   async function deleteTodo(id: string) {
      const todoToDel = todos.find(todo => todo.id === id)

      if (!todoToDel) return

      setTodos(prev => prev.filter(todo => todo.id !== todoToDel.id))
      await client.todo.delete.$post({ todoId: id })
      queryClient.invalidateQueries({ queryKey: ["todos"] })
   }

   useEffect(() => {
      if (data) {
         setTodos(data);
      }
   }, [data])

   useEffect(() => {
      if (!userId) return
      
      const channel = pusherClient.subscribe(`${userId}-channel`)
      
      console.log("connected");
      
      channel.bind("todo", () => {
         queryClient.invalidateQueries({ queryKey: ["todos"] })
      });

      return () => {
         channel.unbind_all();
         channel.unsubscribe();
      };
   }, [userId, queryClient])

   return (
      <div className=" max-w-lg mx-auto">
         <TodoInput
            addTodo={addTodo}
            setValue={setValue}
            value={value}
         />

         {isLoading ? (
            <div className='grid gap-2 mt-8'>
               {Array.from({ length: 6 }).map((_, i) => (
                  <div
                     key={i}
                     className='h-[50px] rounded-md bg-secondary border border-border/30 animate-pulse'
                  />
               ))}
            </div>
         ) : (
            <>
               {isPending &&
                  <motion.li layout className='mt-2 p-3 rounded-lg bg-secondary border border-border/30 flex items-center gap-2' style={{ opacity: 0.5 }}>
                     <Checkbox
                        className='rounded-fAnimatePresencel'
                     />
                     {variables}
                  </motion.li>
               }
               <TodoList
                  deleteTodo={deleteTodo}
                  todos={todos}
                  toggleTodo={toggleTodo}
               />
            </>
         )}
      </div>
   )
}
