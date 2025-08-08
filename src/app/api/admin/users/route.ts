import { auth } from "@/auth";
import { RouteHandlerResponse } from "@/types/RouteHandler";
import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.API_BASE;

export async function POST(req: NextRequest): Promise<NextResponse<RouteHandlerResponse>> {
	try {
		const session = await auth();
		if (!session?.user) {
			return NextResponse.json({ success: false, message: "Unauthorized", data: null }, { status: 401 });
		}

		const accessToken = session.user.accessToken;
		const body = await req.json();

		const res = await fetch(`${API_BASE}/admin/users`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(body),
		});

		const data = await res.json();
		return NextResponse.json(
			{
				success: res.ok,
				message: res.ok ? "User created successfully" : data.message || "Failed to create user",
				data,
			},
			{ status: res.status }
		);
	} catch (err) {
		console.error("Error in admin user creation route:", err);
		return NextResponse.json({ success: false, message: "Something went wrong", data: null }, { status: 500 });
	}
}
