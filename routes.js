/**
 * An array of routes that are accessible to the public
 * These routes do not required authentication
 */    
export const publicRoutes = [
    "/",
    "/auth/new-verification",
    "/api/:path*",
    "/playground"
];

/**
 * An array of route that are used for authentication
 * These routes will redirect logged in  user to /settings
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
]

/**
 * This prefix for API authentication routes
 * Routes that are start with this prefix used for API authentication purposes
 */
export const apiAuthPrefix = "/api/auth"

export const apiPrefix = "/api"

/**
 * Default redirect path after loggin in
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"