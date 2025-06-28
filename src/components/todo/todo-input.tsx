"use client"

import { Dispatch, SetStateAction } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

interface TodoInputProps {
   value: string
   setValue: Dispatch<SetStateAction<string>>
   addTodo: (val: string) => void
}

export default function TodoInput({ addTodo, setValue, value }: TodoInputProps) {
   return (
      <div className="relative">
         <Input
            type="text"
            value={value}
            onChange={(e) => {
               setValue(e.target.value)
            }}
            onKeyDown={(e) => {
               if (e.key === 'Enter') {
                  addTodo(value)
               }
            }}
            className="h-12 rounded-lg"
            placeholder="what needs to be done"
         />
         {value.length > 0 && (
            <Button
               onClick={() => addTodo(value)}
               size="icon"
               className="absolute top-1/2 right-3 -translate-y-1/2 size-6 cursor-pointer"
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="size-3" width={24} height={24} viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 20V4m0 0l6 6m-6-6l-6 6"></path>
               </svg>
            </Button>
         )}
      </div>
   )
}