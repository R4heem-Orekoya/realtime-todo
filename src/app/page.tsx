import Logo from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Themeswitcher from "@/components/theme-switcher";
import { redirect } from "next/navigation";
import { getServerSideSession } from "@/lib/server-utils";
import UserDropdown from "@/components/user-dropdown";
import TodosContainer from "@/components/todo/todos-container";

export default async function Home() {
  const session = await getServerSideSession()

  if (!session) redirect("/auth")

  return (
    <div className="container max-w-3xl mx-auto px-4 sm:px-6">
      <nav className="h-20 flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>

        <div className="flex items-center gap-3">
          <Themeswitcher />

          {session.user ? (
            <UserDropdown user={session.user} />
          ) : (
            <Link href="/auth" className={buttonVariants({ variant: "secondary", className: "rounded-3xl" })}>
              Sign Up
            </Link>
          )}
        </div>
      </nav>

      <main className="py-6">
       <TodosContainer />
      </main>
    </div>
  )
}