import SigninButton from "@/components/sign-in-btn"
import { getServerSideSession } from "@/lib/server-utils"
import { redirect } from "next/navigation"

export default async function Page() {
   const session = await getServerSideSession()
   
   if(session) redirect("/")
   
   return (
      <main className="w-screen h-screen px-4 sm:px-6 grid place-items-center bg-secondary dark:bg-background">
         <div className="w-[380px] p-6 text-center bg-background border dark:border-border/30 dark:bg-secondary rounded-lg">
            <h2 className="text-2xl font-medium text-secondary-foreground">Welcome Back</h2>
            <p className="text-muted-foreground text-sm">Sign in to continue with your todos</p>
            <SigninButton />
            <p className="text-xs text-muted-foreground">By signing in, you agree to our Terms and Privacy Policy</p>
         </div>
      </main>
   )
}