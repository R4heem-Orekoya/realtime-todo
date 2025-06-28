import "server-only"
import { auth } from "./auth"
import { headers } from "next/headers"

export async function getServerSideSession() {
  return await auth.api.getSession({
    headers: await headers()
  })
}