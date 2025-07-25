import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImV4cCI6MTc1MzQ1NTE4NH0.xMckpTUafH15lBXM4cl8cpDZqc6cBpFwRa2AqOwlc50";

  // await request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "トークンがありません" });
  }

  try {
    const secretKey = new TextEncoder().encode("next-market-route-handlers");
    const decodedJwt = await jwtVerify(token, secretKey);
    return NextResponse.next();
  } catch {
    return NextResponse.json({
      message: "トークンが正しくないので、ログインしてください",
    });
  }
}

export const config = {
  matcher: [
    "/api/item/create",
    "/api/item/update/:path*",
    "/api/item/delete/:path*",
  ],
};
