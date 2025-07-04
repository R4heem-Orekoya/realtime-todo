import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";

export const auth = betterAuth({
   database: prismaAdapter(db, {
      provider: "postgresql",
   }),
   session: {
      cookieCache: {
         enabled: true,
         maxAge: 5 * 60 * 60
      }
   },
   socialProviders: {
      github: {
         clientId: process.env.GITHUB_CLIENT_ID as string,
         clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      },
   }
})