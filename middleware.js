import NextAuth from "next-auth";
import authConfig from "@/auth.config"

import {DEFAULT_LOGIN_REDIRECT, apiAuthPrefix,publicRoutes,authRoutes } from "@/routes" 
 
const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute =     authRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute){
      console.log(" is apiauth route",isLoggedIn);
      return null;
    }
    
    console.log("isAuthRoute ",isAuthRoute);
    console.log("ROUTE : ",req.nextUrl.pathname);
    
    if(isAuthRoute){
      console.log("isAuthRoute ",isLoggedIn);
      if(isLoggedIn){
        console.log(" isLoggedIn",isLoggedIn);
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl));
      }
      return null
    }

    if(!isLoggedIn && !isPublicRoute){
      console.log(" is not log in , is not public route",isLoggedIn);
      return Response.redirect(new URL("/auth/login",nextUrl));
    }

    console.log("ROUTE : ",req.nextUrl.pathname);
    console.log("IS LOGGEDIN: ",isLoggedIn);

    return null
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  //matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}