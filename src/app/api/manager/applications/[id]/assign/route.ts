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
		return NextResponse.json({ success: false, message: "Not authenticated", data: null }, { status: 401 });
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

	const { reviewer_id } = body;

	if (!reviewer_id) {
		return NextResponse.json({ success: false, message: "Missing reviewer_id in request body", data: null });
	}

	try {
		const response = await fetch(`${API_BASE}/manager/applications/${id}/assign`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			body: JSON.stringify({ reviewer_id }),
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ success: false, message: data?.message || "Failed to assign reviewer", data });
		}

		return NextResponse.json({ success: true, message: "", data }, { status: 200 });
	} catch (error) {
		console.error(`PATCH /manager/applications/${id}/assign error:`, error);
		return NextResponse.json({ success: false, message: "Something went wrong", data: null }, { status: 500 });
	}
}
