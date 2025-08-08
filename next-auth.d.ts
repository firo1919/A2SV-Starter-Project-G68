import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		user: {
			accessToken: string;
			refreshToken: string;
			role: string;
		} & DefaultSession;
	}

	interface User extends DefaultUser {
		accessToken: string;
		refreshToken: string;
		role: string;
		expiresIn: number | undefined;
	}
}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		accessToken: string;
		refreshToken: string;
		role: string;
		expiresIn: number | undefined;
	}
}
