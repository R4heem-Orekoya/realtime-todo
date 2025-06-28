import { Checkbox } from "../ui/checkbox"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { Todo } from "@/types"
import { motion } from "motion/react"

interface TodoItemProps {
   todo: Todo;
   toggleTodo: (id: string) => void;
   deleteTodo: (id: string) => void;
}

export default function TodoItem({ todo, deleteTodo, toggleTodo }: TodoItemProps) {
   return (
      <motion.li
         exit={{ opacity: 0, x: -10 }}
         layout
         className='p-3 rounded-lg bg-secondary border border-border/30'
      >
         <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
               <Checkbox
                  onClick={() => {
                     toggleTodo(todo.id)
                  }}
                  checked={todo.done}
                  className='rounded'
               />
               <p className={cn("text-base", { "line-through opacity-60": todo.done })}>{todo.content}</p>
            </div>
            <Button
               onClick={() => deleteTodo(todo.id)}
               variant="ghost" size="icon"
               className='text-destructive hover:text-destructive hover:bg-destructive/20 dark:hover:bg-destructive/20 size-6 cursor-pointer'
            >
               <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.5} d="M9.17 4a3.001 3.001 0 0 1 5.66 0m5.67 2h-17m15.333 2.5l-.46 6.9c-.177 2.654-.265 3.981-1.13 4.79s-2.196.81-4.856.81h-.774c-2.66 0-3.991 0-4.856-.81c-.865-.809-.954-2.136-1.13-4.79l-.46-6.9M9.5 11l.5 5m4.5-5l-.5 5"></path>
               </svg>
            </Button>
         </div>
      </motion.li>
   )
}
