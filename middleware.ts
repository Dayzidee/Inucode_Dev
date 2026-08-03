import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// NextAuth middleware to protect all routes under /admin
export default withAuth(
  function middleware(req) {
    // If the user is authenticated, continue.
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Return true if there is a token (user is authenticated)
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
