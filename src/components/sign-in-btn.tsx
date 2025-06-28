"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "./ui/button"
import { useState } from "react"

export default function SigninButton() {
   const [isLoading, setIsLoading] = useState(false)
   
   return (
      <Button
         onClick={async () => {
            setIsLoading(true)
            await authClient.signIn.social({ provider: "github" })
            setIsLoading(false)
         }}
         size="lg"
         className="w-full rounded-md my-6 text-background dark:text-secondary text-base font-medium cursor-pointer"
      >
         {isLoading ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" width={24} height={24} viewBox="0 0 24 24">
               <path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity={0.25}></path>
               <path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                  <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform>
               </path>
            </svg>
         ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" width={24} height={24} viewBox="0 0 24 24">
               <path fill="currentColor" d="M12.001 2c-5.525 0-10 4.475-10 10a9.99 9.99 0 0 0 6.837 9.488c.5.087.688-.213.688-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.337 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.687c-.1-.25-.45-1.275.1-2.65c0 0 .837-.263 2.75 1.024a9.3 9.3 0 0 1 2.5-.337c.85 0 1.7.112 2.5.337c1.913-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.02 10.02 0 0 0 22 12c0-5.525-4.475-10-10-10"></path>
            </svg>
         )}
         Sign in with Github
      </Button>
   )
}
