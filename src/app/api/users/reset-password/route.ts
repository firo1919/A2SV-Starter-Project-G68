import { RouteHandlerResponse } from "@/types/RouteHandler";
import { NextResponse } from "next/server";

const baseUrl = process.env.API_BASE;

export async function POST(request: Request): Promise<NextResponse<RouteHandlerResponse>> {
	try {
		const data = await request.json();
		const response = await fetch(`${baseUrl}/auth/reset-password`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});

		const res = await response.json();

		const responseBody: RouteHandlerResponse = {
			success: response.ok,
			message:
				res.message || (response.ok ? "Reset password request successful" : "Reset password request failed"),
			data: res,
		};

		return NextResponse.json(responseBody, { status: response.status });
	} catch (error) {
		console.log(error);
		const responseBody: RouteHandlerResponse = {
			success: false,
			message: "Internal Server Error",
			data: null,
		};
		return NextResponse.json(responseBody, { status: 500 });
	}
}
