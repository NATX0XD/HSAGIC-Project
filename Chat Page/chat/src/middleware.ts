import { NextRequest, NextResponse } from "next/server";

/**
 * ============================================================
 * DESIGN TO DEPLOY Authentication Middleware
 * ============================================================
 *
 * This middleware protects all routes and redirects
 * unauthenticated users to /login.
 *
 * HOW TO DISABLE LOGIN REQUIREMENT FOR DEVELOPMENT:
 * -------------------------------------------------
 * Option 1 (Recommended): Comment out the entire "Authentication Check"
 *          block below (lines marked with >>> START and >>> END).
 *          This will allow all users to access all routes without logging in.
 *
 * Option 2: Change REQUIRE_AUTH to false.
 *          This achieves the same effect with a single change.
 *
 * Option 3: Comment out the entire middleware export at the bottom
 *          of this file (the `config` export), which will disable
 *          the middleware entirely.
 * ============================================================
 */

// ============================================================
// >>> TOGGLE THIS TO false TO DISABLE AUTH DURING DEVELOPMENT
const REQUIRE_AUTH = true;
// ============================================================

// Routes that don't require authentication
const PUBLIC_ROUTES = ["/login", "/register"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow public routes (login, register) without auth
    if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    // ============================================================
    // >>> START: Authentication Check
    // >>> Comment out this entire block to disable login requirement
    // ============================================================
    if (REQUIRE_AUTH) {
        // Check for the auth token cookie
        const authToken = request.cookies.get("d2d-auth-token");

        // If no auth token present, redirect to /login
        if (!authToken?.value) {
            const loginUrl = new URL("/login", request.url);
            // Preserve the original URL so we can redirect back after login
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }
    // ============================================================
    // >>> END: Authentication Check
    // ============================================================

    return NextResponse.next();
}

/**
 * Matcher configuration:
 * - Protects all routes except Next.js internals and static files
 * - To disable middleware entirely, comment out this export
 */
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization)
         * - favicon.ico (favicon)
         * - public folder assets (images, svg, etc.)
         */
        "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
