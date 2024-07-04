import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import authConfig from "@/auth.config" 
import { getUserById } from "./data/user"


export const { auth, handlers, signIn, signOut } = NextAuth({
    pages: {
      signIn:"/auth/login",
      error: "/auth/error"
    },
    events: {
     async linkAccount({user}){
        await db.user.update({
          where:{id:user.id},
          data : {emailVerified: new Date()}
        })
      }
    },
    callbacks : {
      async signIn({user, account}){
        if(account?.provider !== "credential") return true;
        
        // Prevent sign in without email verification
        const existingUser = await getUserById(user.id);
        if(!existingUser?.emailVerified) return false;

        //TODO: Add 2FA check

        return true;
      },
      async session({token,session}){

        if(token.sub && session.user) {
          session.user.id = token.sub;
        }

        if(token.role && session.user){
          session.user.role = "USER" // token.role
          //TODO : implement ROle based authentications 
        }
        
        return session;
      },
      async jwt({token}){ 
        if(!token.sub) return token;

        const existingUser = await getUserById(token.sub);
        if(!existingUser) return token;
 
        return token;
      }
    },
    adapter : PrismaAdapter(db),
    session : { strategy: "jwt"},
    ...authConfig,
     
  })