// import { createAuthClient } from "better-auth/react"
// export const authClient = createAuthClient({
//     /** The base URL of the server (optional if you're using the same domain) */
//     baseURL: "http://localhost:3000"
// })
// export const { signIn, signUp, useSession } = createAuthClient()

import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
//     baseURL: "http://localhost:3000"
 baseURL: "https://skillsphere-vert.vercel.app"
})

export const { signIn, signUp, useSession, signOut } = authClient;