import NextAuth from "next-auth";
import authConfig from "@/auth.config"
import {DEFAULT_LOGIN_REDIRECT, apiAuthPrefix,publicRoutes,authRoutes } from "@/routes" 
 
const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute =     authRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute){
        return null;
    }

    console.log("ROUTE : ",req.nextUrl.pathname);
    console.log("IS LOGGEDIN: ",isLoggedIn);
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  //matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}