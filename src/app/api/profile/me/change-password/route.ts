import { auth } from "@/auth";
import { RouteHandlerResponse } from "@/types/RouteHandler";
import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.API_BASE;

export async function PATCH(req: NextRequest): Promise<NextResponse<RouteHandlerResponse>> {
	const session = await auth();

	if (!session?.user?.accessToken) {
		return NextResponse.json({ success: false, message: "Not authenticated", data: null });
	}

	let body;
	try {
		body = await req.json();
	} catch {
		return NextResponse.json({ success: false, message: "Invalid JSON body", data: null });
	}

	const { old_password, new_password } = body;

	if (!old_password || typeof old_password !== "string") {
		return NextResponse.json({ success: false, message: "Missing or invalid old_password in body", data: null });
	}

	if (!new_password || typeof new_password !== "string") {
		return NextResponse.json({ success: false, message: "Missing or invalid new_password in body", data: null });
	}

	try {
		const response = await fetch(`${API_BASE}/profile/me/change-password`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			body: JSON.stringify({ old_password, new_password }),
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ success: false, message: data?.message || "Failed to change password", data });
		}

		return NextResponse.json({ success: true, message: "Password changed successfully", data: null });
	} catch (error) {
		console.error("PATCH /profile/me/change-password error:", error);
		return NextResponse.json({ success: false, message: "Something went wrong", data: null }, { status: 500 });
	}
}
