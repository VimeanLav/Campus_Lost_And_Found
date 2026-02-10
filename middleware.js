import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/home/:path*",
    "/report/:path*",
    "/lost_And_found/:path*",
    "/profile/:path*"
  ]
};
