// import { NextResponse } from "next/server";

// export function middleware(req) {
//   const { pathname } = req.nextUrl; // Get the requested path
//   const token = req.cookies.get("authToken"); // Assume token is stored in cookies

//   // Define protected routes
//   const protectedRoutes = ["/", "/home","/waterQuality"];


//   if (protectedRoutes.includes(pathname)) {
//     if (!token) {
    
//       const loginUrl = new URL("/login", req.url);
//       return NextResponse.redirect(loginUrl);
//     }
//   }

//   // Continue to the requested route if authenticated
//   return NextResponse.next();
// }
