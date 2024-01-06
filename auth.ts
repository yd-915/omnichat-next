import { FirestoreAdapter } from "@auth/firebase-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { adminAuth, adminDb } from "./firebase-admin";
import type { Adapter } from "next-auth/adapters";

export const authOptions:NextAuthOptions = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        session:async ({ session, token }) => {
          if(session?.user){
              if(token.sub){
                  session.user.id = token.sub
                  const firebaseToken= await adminAuth.createCustomToken(token.sub)
                  session.firebaseToken = firebaseToken
                }  
         }

          return session
        },
        jwt:async ({ token, user }) => {
            if(user){
                token.sub = user.id
            }

            return token
        },
    },
    adapter: FirestoreAdapter(adminDb) as Adapter,

} satisfies NextAuthOptions
