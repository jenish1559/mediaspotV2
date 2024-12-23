import NextAuth from "next-auth";
import authConfig from "@/auth.config"

import {DEFAULT_LOGIN_REDIRECT,apiPrefix, apiAuthPrefix,publicRoutes,authRoutes } from "@/routes" 
 
const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute =     authRoutes.includes(nextUrl.pathname);

    

    if(isApiAuthRoute){
      return null;
    }
    
    if(isApiRoute){
      return null;
    }
    

    if(isAuthRoute){
      if(isLoggedIn){
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl));
      }
      return null
    }

    if(!isLoggedIn && !isPublicRoute){
      return Response.redirect(new URL("/auth/login",nextUrl));
    }

    return null
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  //matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
} 