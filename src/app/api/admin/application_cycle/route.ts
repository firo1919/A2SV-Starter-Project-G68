import { auth } from "@/auth";
import { RouteHandlerResponse } from "@/types/RouteHandler";
import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.API_BASE;

export async function POST(req: NextRequest): Promise<NextResponse<RouteHandlerResponse>> {
	const session = await auth();

	if (!session?.user?.accessToken) {
		return NextResponse.json({ success: false, message: "Not authenticated", data: null });
	}

	try {
		const body = await req.json();
		const { name, start_date, end_date, description } = body;

		if (!name || !start_date || !end_date || !description) {
			return NextResponse.json({ success: false, message: "Missing required fields", data: null });
		}

		const response = await fetch(`${API_BASE}/admin/cycles`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			body: JSON.stringify({ name, start_date, end_date, description }),
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ success: false, message: data?.detail || "Failed to create cycle", data });
		}

		return NextResponse.json({ success: true, message: "Cycle created successfully", data }, { status: 200 });
	} catch (error) {
		console.error("POST /admin/application_cycle error:", error);
		return NextResponse.json({ success: false, message: "Something went wrong", data: null }, { status: 500 });
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } }
): Promise<NextResponse<RouteHandlerResponse>> {
	const session = await auth();

	if (!session?.user?.accessToken) {
		return NextResponse.json({
			success: false,
			message: "Not authenticated",
			data: null,
		});
	}
	const { id } = params;
	try {
		const backendRes = await fetch(`${API_BASE}/admin/cycles/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		});

		const data = await backendRes.json();

		if (!backendRes.ok) {
			return NextResponse.json({
				success: false,
				message: data?.detail || "Failed to delete cycle",
				data,
			});
		}

		return NextResponse.json({ success: true, message: "Cycle deleted successfully", data }, { status: 200 });
	} catch (error) {
		console.error("DELETE /admin/application_cycle/[id] error:", error);
		return NextResponse.json({ success: false, message: "Something went wrong", data: null }, { status: 500 });
	}
}
