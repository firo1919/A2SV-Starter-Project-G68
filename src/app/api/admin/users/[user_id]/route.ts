//app/api/admin/users/[user_id].route.ts
import { auth } from "@/auth";
import { RouteHandlerResponse } from "@/types/RouteHandler";
import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.API_BASE;

export async function PUT(
	req: NextRequest,
	{ params }: { params: { user_id: string } }
): Promise<NextResponse<RouteHandlerResponse>> {
	const session = await auth();

	if (!session?.user?.accessToken) {
		return NextResponse.json({ success: false, message: "Not authenticated", data: null });
	}

	const { user_id } = params;

	try {
		const body = await req.json();

		if (!body.full_name || !body.email || !body.role) {
			return NextResponse.json({ success: false, message: "Missing required fields", data: null });
		}

		const response = await fetch(`${API_BASE}/admin/users/${user_id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			body: JSON.stringify(body),
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ success: false, message: data?.detail || "Failed to update user", data });
		}

		return NextResponse.json({ success: true, message: "User updated successfully", data });
	} catch (error) {
		console.error("PUT /admin/users/[user_id] error:", error);
		return NextResponse.json({ success: false, message: "Something went wrong", data: null });
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { user_id: string } }
): Promise<NextResponse<RouteHandlerResponse>> {
	const session = await auth();

	if (!session?.user?.accessToken) {
		return NextResponse.json({ success: false, message: "Not authenticated", data: null });
	}

	const { user_id } = await params;

	try {

		const response = await fetch(`${API_BASE}/admin/users/${user_id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ success: false, message: data?.detail || "Failed to delete user", data });
		}

		return NextResponse.json({ success: true, message: "User deleted successfully", data: null });
	} catch (error) {
		console.error("DELETE /admin/users/[user_id] error:", error);
		return NextResponse.json({ success: false, message: "Something went wrong", data: null });
	}
}
