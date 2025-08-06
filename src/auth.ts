import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { UserLoginSchema } from "./lib/zod/UserLogin";
import { loginUser, refreshToken } from "./utils/authUtils";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},

			authorize: async (credentials) => {
				console.log("Started to authenticate user");
				try {
					const { email, password } = await UserLoginSchema.parseAsync(credentials);
					const response = await loginUser({
						email: email,
						password: password,
					});
					const user = response?.success
						? {
								accessToken: response.data.access,
								refreshToken: response.data.refresh,
								role: response.data.role,
						  }
						: null;
					return user;
				} catch (error) {
					console.log("Error occured during authentication", error);
				}

				return null;
			},
		}),
	],
	callbacks: {
		authorized: async ({ auth }) => {
			console.log("Checking authorization status:", auth);
			return !!auth?.user;
		},
		async jwt({ token, user }) {
			if (user) {
				token.role = user.role;
				token.accessToken = user.accessToken;
				token.refreshToken = user.refreshToken;
				return token;
			} else if (token.exp && Date.now() < token.exp * 1000) {
				return token;
			} else {
				try {
					const tokens = await refreshToken();

					if (!tokens || !tokens.success) {
						throw Error("Error refreshing token");
					}
					token.accessToken = tokens.data.access;
					console.log("New access token generated");
					return token;
				} catch (error) {
					console.error("Error refreshing access_token", error);
					token.error = "RefreshTokenError";
					return token;
				}
			}
		},
		session({ session, token }) {
			session.user.role = token.role;
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
	session: {
		strategy: "jwt",
	},
	trustHost: true,
});
