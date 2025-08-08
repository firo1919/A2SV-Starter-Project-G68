import { jwtDecode } from "jwt-decode";
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
					let user = null;
					if (response?.success) {
						const expiresIn = jwtDecode(response.data.access).exp;
						user = {
							accessToken: response.data.access,
							refreshToken: response.data.refresh,
							role: response.data.role,
							expiresIn: expiresIn,
						};
					}
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
		async jwt({ token, user, account }) {
			if (account) {
				token.role = user.role;
				token.accessToken = user.accessToken;
				token.refreshToken = user.refreshToken;
				token.expiresIn = user.expiresIn;
				return token;
			} else if (token.expiresIn && Date.now() < token.expiresIn * 1000 - 4 * 60 * 1000) {
				console.log(
					"access token is active until ",
					new Date(token.expiresIn * 1000 - 4 * 60 * 1000).toTimeString()
				);
				return token;
			} else {
				console.log("Refreshing access Token");
				try {
					const tokens = await refreshToken(token.refreshToken);

					if (!tokens || !tokens.success) {
						console.log("Error refreshing token", tokens);
						return null;
					}
					const expiresIn = jwtDecode(tokens.data.access).exp;
					token.accessToken = tokens.data.access;
					token.expiresIn = expiresIn;
					console.log("New access token generated");
				} catch (error) {
					console.error("Error refreshing access_token", error);
					token.error = "RefreshTokenError";
				}
				return token;
			}
		},
		session({ session, token }) {
			session.user.role = token.role;
			session.user.accessToken = token.accessToken;
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
