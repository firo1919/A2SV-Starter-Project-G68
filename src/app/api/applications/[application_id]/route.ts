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
		return NextResponse.json({ success: false, message: "Not authenticated", data: null }, { status: 401 });
	}

	const { application_id } = params;

	if (!application_id) {
		return NextResponse.json({ success: false, message: "Missing application_id in path", data: null });
	}

	const formData = await req.formData();
	const leetcode_handle = formData.get("leetcode_handle");
	const codeforces_handle = formData.get("codeforces_handle");

	if (!leetcode_handle || typeof leetcode_handle !== "string" || leetcode_handle.trim() === "") {
		return NextResponse.json({ success: false, message: "leetcode_handle is required", data: null });
	}

	if (!codeforces_handle || typeof codeforces_handle !== "string" || codeforces_handle.trim() === "") {
		return NextResponse.json({ success: false, message: "codeforces_handle is required", data: null });
	}

	try {
		const response = await fetch(`${API_BASE}/applications/${application_id}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			body: formData,
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ success: false, message: data?.detail || "Failed to update application", data });
		}

		return NextResponse.json({ success: true, message: "Application updated successfully", data }, { status: 200 });
	} catch (error) {
		console.error(`PUT /applications/${application_id} error:`, error);
		return NextResponse.json({ success: false, message: "Something went wrong", data: null }, { status: 500 });
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { application_id: string } }
): Promise<NextResponse<RouteHandlerResponse>> {
	const session = await auth();

	if (!session?.user?.accessToken) {
		return NextResponse.json({ success: false, message: "Not authenticated", data: null }, { status: 401 });
	}

	const { application_id } = params;

	if (!application_id) {
		return NextResponse.json({ success: false, message: "Missing application_id in path", data: null });
	}

	try {
		const response = await fetch(`${API_BASE}/applications/${application_id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ success: false, message: data?.detail || "Failed to delete application", data });
		}

		return NextResponse.json({ success: true, message: "Application deleted successfully", data }, { status: 200 });
	} catch (error) {
		console.error(`DELETE /applications/${application_id} error:`, error);
		return NextResponse.json({ success: false, message: "Something went wrong", data: null }, { status: 500 });
	}
}

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { application_id: string } }
): Promise<NextResponse<RouteHandlerResponse>> {
	const session = await auth();

	if (!session?.user?.accessToken) {
		return NextResponse.json({ success: false, message: "Not authenticated", data: null }, { status: 401 });
	}

	const { application_id } = params;

	if (!application_id) {
		return NextResponse.json({ success: false, message: "Missing application_id in path", data: null });
	}

	try {
		const response = await fetch(`${API_BASE}/applications/${application_id}`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ success: false, message: data?.detail || "Failed to patch application", data });
		}

		return NextResponse.json({ success: true, message: "Application patched successfully", data }, { status: 200 });
	} catch (error) {
		console.error(`PATCH /applications/${application_id} error:`, error);
		return NextResponse.json({ success: false, message: "Something went wrong", data: null }, { status: 500 });
	}
}
