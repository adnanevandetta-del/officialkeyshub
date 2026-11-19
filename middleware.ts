import { NextResponse, type NextRequest } from "next/server";

// Password-protects the private /admin area (the leads list) with HTTP Basic
// auth. Username: admin. Password: the LEADS_ADMIN_PASSWORD env var. If that
// var isn't set, the admin area stays locked.
export function middleware(req: NextRequest) {
  const password = process.env.LEADS_ADMIN_PASSWORD;
  const header = req.headers.get("authorization") ?? "";
  if (password && header.startsWith("Basic ")) {
    try {
      const [user, pass] = atob(header.slice(6)).split(":");
      if (user === "admin" && pass === password) return NextResponse.next();
    } catch {
      // malformed header: fall through to the challenge
    }
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Official Keys Hub admin"' },
  });
}

export const config = { matcher: ["/admin/:path*"] };
