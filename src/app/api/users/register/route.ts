import { AuthResponse, User } from "@/types/auth";

const baseUrl = process.env.API_BASE;

export async function POST(request: Request) {
	try {
		const data: User = await request.json();
		const response = await fetch(`${baseUrl}/auth/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});

		const res: AuthResponse = await response.json();

		return new Response(JSON.stringify(res), {
			status: response.status,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
