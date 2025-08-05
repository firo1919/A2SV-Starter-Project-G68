import { auth } from "@/auth";
import { UserLogin } from "@/lib/zod/UserLogin";
import LoginResponse from "@/types/LoginResponse";
import RefreshTokenResponse from "@/types/RefreshTokenResponse";

const baseUrl = process.env.API_BASE;

export async function loginUser(data: UserLogin): Promise<LoginResponse | null> {
	const url = `${baseUrl}/auth/token`;
	console.log("Attempting to login user", url);
	try {
		const response = await fetch(url, {
			headers: { "Content-Type": "application/json" },
			method: "POST",
			body: JSON.stringify(data),
		});

		const responseData: LoginResponse = await response.json();
		return responseData;
	} catch (error) {
		console.log("Failed logging in user", error);
	}
	return null;
}

export async function refreshToken(): Promise<RefreshTokenResponse | null> {
	const url = `${baseUrl}/auth/token/refresh`;
	const session = await auth();
	console.log("Attempting to refresh token", url);
	try {
		const response = await fetch(url, {
			method: "POST",
			body: "",
			headers: { Authorization: `Bearer ${session?.user.accessToken}` },
		});
		if (!response.ok) {
			console.log("Failed refreshing token");
			return null;
		}

		const responseData: RefreshTokenResponse = await response.json();
		return responseData;
	} catch (error) {
		console.log("Failed refreshing token", error);
	}
	return null;
}
