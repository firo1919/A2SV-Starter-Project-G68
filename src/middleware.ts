import { auth } from "@/auth";
const publicRoutes = ["/", "/about", "/login", "/register-user", "/forgot-password", "/reset-password", "/denied"];
const rolePaths = {
	applicant: "/applicant",
	admin: "/admin",
	manager: "/manager",
	reviewer: "/reviewer",
};
export default auth((req) => {
	const isAuthenticated = !!req.auth;
	const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
	const newUrl = new URL("/", req.nextUrl.origin);
	const role = req.auth?.user.role;

	if (!isAuthenticated && !isPublicRoute) {
		return Response.redirect(newUrl);
	}
	if (isAuthenticated && !isPublicRoute) {
		if (role && !req.nextUrl.pathname.startsWith(rolePaths[role as keyof typeof rolePaths])) {
			return Response.redirect(newUrl);
		}
	}
});

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
