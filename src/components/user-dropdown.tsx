"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "better-auth";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UserDropdownProps {
   user: User
}

export default function UserDropdown({ user }: UserDropdownProps) {
   const router = useRouter()
   const [isLoggingOut, setIsLoggingOut] = useState(false)

   return (
      <DropdownMenu>
         <DropdownMenuTrigger className="cursor-pointer">
            <Avatar>
               <AvatarImage src={user.image ?? `https://api.dicebear.com/9.x/dylan/svg?seed=${user.name}`} />
               <AvatarFallback className="font-medium">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end" className="w-[240px] mt-2 rounded-lg">

            <div className="p-1 flex items-center gap-2">
               <Avatar className="size-9">
                  <AvatarImage src={user.image ?? `https://api.dicebear.com/9.x/dylan/svg?seed=${user.name}`} />
                  <AvatarFallback className="font-medium">{user.name.charAt(0)}</AvatarFallback>
               </Avatar>
               <div className="grid">
                  <div className="flex items-center gap-1">
                     <p className="text-sm">{user.name}</p>
                     <Badge variant="secondary" className="px-0.2 aspect-square rounded-2xl text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                           <path fill="currentColor" d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436c.55.096.756-.233.756-.522c0-.262-.013-1.128-.013-2.049c-2.764.509-3.479-.674-3.699-1.292c-.124-.317-.66-1.293-1.127-1.554c-.385-.207-.936-.715-.014-.729c.866-.014 1.485.797 1.691 1.128c.99 1.663 2.571 1.196 3.204.907c.096-.715.385-1.196.701-1.471c-2.448-.275-5.005-1.224-5.005-5.432c0-1.196.426-2.186 1.128-2.956c-.111-.275-.496-1.402.11-2.915c0 0 .921-.288 3.024 1.128a10.2 10.2 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371c2.104-1.43 3.025-1.128 3.025-1.128c.605 1.513.221 2.64.111 2.915c.701.77 1.127 1.747 1.127 2.956c0 4.222-2.571 5.157-5.019 5.432c.399.344.743 1.004.743 2.035c0 1.471-.014 2.654-.014 3.025c0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11"></path>
                        </svg>
                     </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
               </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
               onClick={async () => {
                  setIsLoggingOut(true)
                  await authClient.signOut({
                     fetchOptions: {
                        onSuccess: () => {
                           router.refresh()
                        },
                        onError: () => {
                           toast.error("Somethig went wrong!")
                        }
                     },
                  })
                  setIsLoggingOut(false)
               }}
               variant="destructive" className="cursor-pointer"
            >
               {isLoggingOut ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-5" width={24} height={24} viewBox="0 0 24 24">
                     <path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity={0.25}></path>
                     <path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                        <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform>
                     </path>
                  </svg>
               ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                     <path fill="currentColor" d="M5.47 12.53a.75.75 0 0 1 0-1.06l2-2a.75.75 0 0 1 1.06 1.06l-.72.72H15a.75.75 0 0 1 0 1.5H7.81l.72.72a.75.75 0 1 1-1.06 1.06z"></path>
                     <path fill="currentColor" fillRule="evenodd" d="M13.945 1.25h1.11c1.368 0 2.47 0 3.337.117c.9.12 1.658.38 2.26.981c.602.602.86 1.36.982 2.26c.116.867.116 1.97.116 3.337v8.11c0 1.367 0 2.47-.116 3.337c-.121.9-.38 1.658-.982 2.26s-1.36.86-2.26.982c-.867.116-1.97.116-3.337.116h-1.11c-1.367 0-2.47 0-3.337-.116c-.9-.122-1.658-.38-2.26-.982c-.398-.4-.647-.868-.805-1.402c-.951-.001-1.744-.012-2.386-.098c-.764-.103-1.426-.325-1.955-.854s-.751-1.19-.854-1.955c-.098-.73-.098-1.656-.098-2.79V9.447c0-1.133 0-2.058.098-2.79c.103-.763.325-1.425.854-1.954s1.19-.751 1.955-.854c.642-.086 1.435-.097 2.386-.098c.158-.534.407-1.003.806-1.402c.601-.602 1.36-.86 2.26-.981c.866-.117 1.969-.117 3.336-.117M7.252 17.004c.004.645.014 1.225.05 1.745c-.834-.003-1.454-.018-1.945-.084c-.598-.08-.89-.224-1.094-.428s-.348-.496-.428-1.094c-.083-.619-.085-1.443-.085-2.643v-5c0-1.2.002-2.024.085-2.643c.08-.598.224-.89.428-1.094s.496-.348 1.094-.428c.491-.066 1.111-.08 1.946-.084c-.037.52-.047 1.1-.051 1.745a.75.75 0 0 0 1.5.008c.006-1.093.034-1.868.142-2.457c.105-.566.272-.895.515-1.138c.277-.277.666-.457 1.4-.556c.755-.101 1.756-.103 3.191-.103h1c1.436 0 2.437.002 3.192.103c.734.099 1.122.28 1.4.556c.276.277.456.665.555 1.4c.102.754.103 1.756.103 3.191v8c0 1.435-.001 2.436-.103 3.192c-.099.734-.279 1.122-.556 1.399s-.665.457-1.399.556c-.755.101-1.756.103-3.192.103h-1c-1.435 0-2.436-.002-3.192-.103c-.733-.099-1.122-.28-1.399-.556c-.243-.244-.41-.572-.515-1.138c-.108-.589-.136-1.364-.142-2.457a.75.75 0 1 0-1.5.008" clipRule="evenodd"></path>
                  </svg>
               )}
               Logout
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
