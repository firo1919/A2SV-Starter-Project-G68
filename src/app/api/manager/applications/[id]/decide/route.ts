import { auth } from "@/auth";
import { RouteHandlerResponse } from "@/types/RouteHandler";
import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.API_BASE;

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: string } }
): Promise<NextResponse<RouteHandlerResponse>> {
	const session = await auth();

	if (!session?.user?.accessToken) {
		return NextResponse.json({ success: false, message: "Not authenticated", data: null });
	}

	const { id } = params;

	if (!id) {
		return NextResponse.json({ success: false, message: "Missing application id in path", data: null });
	}

	let body;
	try {
		body = await req.json();
	} catch {
		return NextResponse.json({ success: false, message: "Invalid JSON body", data: null });
	}

	const { status, decision_notes } = body;

	if (!status || typeof status !== "string") {
		return NextResponse.json({ success: false, message: "Missing or invalid status in body", data: null });
	}

	if (decision_notes === undefined || typeof decision_notes !== "string") {
		return NextResponse.json({ success: false, message: "Missing or invalid decision_notes in body", data: null });
	}

	try {
		const response = await fetch(`${API_BASE}/manager/applications/${id}/decide`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			body: JSON.stringify({ status, decision_notes }),
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ success: false, message: data?.detail || "Failed to decide application", data });
		}

		return NextResponse.json({ success: true, message: "", data });
	} catch (error) {
		console.error(`PATCH /manager/applications/${id}/decide error:`, error);
		return NextResponse.json({ success: false, message: "Something went wrong", data: null });
	}
}
