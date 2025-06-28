"use client"

import { PropsWithChildren } from "react"
import { QueryClientProviderWrapper } from "./query-client"
import { ThemeProvider } from "./theme-provider"

export default function Providers({ children }: PropsWithChildren) {
   return (
      <QueryClientProviderWrapper>
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
         >
            {children}
         </ThemeProvider>
      </QueryClientProviderWrapper>
   )
}