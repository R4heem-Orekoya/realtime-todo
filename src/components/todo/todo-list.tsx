"use client"

import { AnimatePresence, motion } from "motion/react"
import { Todo } from "@/types"
import TodoItem from "./todo-item";

interface TodoListProps {
   todos: Todo[];
   toggleTodo: (id: string) => void;
   deleteTodo:(id: string) => void;
}

export default function TodoList({ deleteTodo, todos, toggleTodo }:TodoListProps) {
   return (
      <ul className='grid gap-2 mt-8'>
         <AnimatePresence>
            {todos[0] ? todos.map((todo) => (
               <TodoItem 
                  deleteTodo={deleteTodo}
                  todo={todo}
                  toggleTodo={toggleTodo}
                  key={todo.id}
               />
            )) : (
               <AnimatePresence>
                  <motion.p exit={{ opacity: 0 }} key="empty-state" className='text-muted-foreground text-sm text-center'>No todos yet. Add one above.</motion.p>
               </AnimatePresence>
            )}
         </AnimatePresence>
      </ul>
   )
}
