import { auth } from "@/auth";
import { RouteHandlerResponse } from "@/types/RouteHandler";
import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.API_BASE;
export async function PUT(
	req: NextRequest,
	{ params }: { params: { application_id: string } }
): Promise<NextResponse<RouteHandlerResponse>> {
	const session = await auth();

	if (!session?.user?.accessToken) {
		return NextResponse.json({ success: false, message: "Not authenticated", data: null });
	}

	const { application_id } = params;

	if (!application_id) {
		return NextResponse.json({ success: false, message: "Missing application_id in path", data: null });
	}

	let body;
	try {
		body = await req.json();
	} catch {
		return NextResponse.json({ success: false, message: "Invalid JSON body", data: null });
	}

	try {
		const response = await fetch(`${API_BASE}/reviews/${application_id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			body: JSON.stringify(body),
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ success: false, message: data?.detail || "Failed to update review", data });
		}

		return NextResponse.json({ success: true, message: "Review updated successfully", data });
	} catch (error) {
		console.error(`PUT /reviews/${application_id} error:`, error);
		return NextResponse.json({ success: false, message: "Something went wrong", data: null });
	}
}
