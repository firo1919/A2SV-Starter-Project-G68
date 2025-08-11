import { auth } from "@/auth";
import { RouteHandlerResponse } from "@/types/RouteHandler";
import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.API_BASE;

<<<<<<< HEAD:src/app/api/profile/me/route.ts
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

=======
>>>>>>> origin/feat/applicant-form:src/app/api/profile/route.ts
export async function PUT(req: NextRequest): Promise<NextResponse<RouteHandlerResponse>> {
	const session = await auth();
	if (!session?.user?.accessToken) {
		return NextResponse.json({ success: false, message: "Not authenticated", data: null }, { status: 401 });
	}

	let body;
	try {
		body = await req.json();
	} catch {
		return NextResponse.json({ success: false, message: "Invalid JSON body", data: null }, { status: 400 });
	}

	let { full_name, fullName, email, role } = body || {};
	full_name = full_name || fullName;

	if (!full_name && !email && !role) {
		return NextResponse.json(
			{
				success: false,
				message: "Nothing to update (provide at least one of full_name, email, role)",
				data: null,
			},
			{ status: 400 }
		);
	}

	if (!API_BASE) {
		return NextResponse.json({ success: false, message: "API_BASE not configured", data: null }, { status: 500 });
	}

	const payload: Record<string, any> = {};
	if (full_name) payload.full_name = full_name;
	if (email) payload.email = email;
	if (role) payload.role = role;

	try {
		const response = await fetch(`${API_BASE}/profile/me`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			body: JSON.stringify(payload),
		});
		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json(
				{
					success: false,
					message: data?.message || "Failed to update profile",
					data,
				},
				{ status: response.status }
			);
		}

		return NextResponse.json({ success: true, message: "Profile updated", data }, { status: 200 });
	} catch (error) {
		console.error("PUT /api/profile/me error:", error);
		return NextResponse.json({ success: false, message: "Something went wrong", data: null }, { status: 500 });
	}
}