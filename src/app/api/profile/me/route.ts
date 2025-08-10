import { auth } from "@/auth";
import { RouteHandlerResponse } from "@/types/RouteHandler";
import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.API_BASE;

export async function GET(): Promise<NextResponse<RouteHandlerResponse>> {
	const session = await auth();

	if (!session?.user?.accessToken) {
		return NextResponse.json({ success: false, message: "Not authenticated", data: null });
	}

	if (!API_BASE) {
		return NextResponse.json({ success: false, message: "API_BASE is not set in the environment", data: null });
	}

	try {
		const response = await fetch(`${API_BASE}/profile/me`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ success: false, message: "Failed to fetch profile", data });
		}



		return NextResponse.json({ success: true, message: "Profile fetched successfully", data });
	} catch (error) {
		return NextResponse.json({ success: false, message: "Profile fetch error", data: null });
	}
}

export async function PUT(req: NextRequest): Promise<NextResponse<RouteHandlerResponse>> {
	const session = await auth();

	if (!session?.user?.accessToken) {
		return NextResponse.json({ success: false, message: "Not authenticated", data: null });
	}

	let body;
	try {
		body = await req.json();
	} catch {
		return NextResponse.json({ success: false, message: "Invalid JSON body", data: null }, { status: 400 });
	}

	const { full_name, email } = body;

	if (!full_name || typeof full_name !== "string") {
		return NextResponse.json({ success: false, message: "Missing or invalid full_name in body", data: null });
	}

	if (!email || typeof email !== "string") {
		return NextResponse.json({ success: false, message: "Missing or invalid email in body", data: null });
	}

	try {
		const response = await fetch(`${API_BASE}/profile/me`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			body: JSON.stringify({ full_name, email }),
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ success: false, message: data?.message || "Failed to update profile", data });
		}

		return NextResponse.json({ success: true, message: "", data }, { status: 200 });
	} catch (error) {
		console.error("PUT /profile/me error:", error);
		return NextResponse.json({ success: false, message: "Something went wrong", data: null }, { status: 500 });
	}
}
