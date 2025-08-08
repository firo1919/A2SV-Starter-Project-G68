import { auth } from "@/auth";
import { RouteHandlerResponse } from "@/types/RouteHandler";
import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.API_BASE;

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { cycle_id: string } }
): Promise<NextResponse<RouteHandlerResponse>> {
	const session = await auth();

	if (!session?.user?.accessToken) {
		return NextResponse.json({ success: false, message: "Not authenticated", data: null });
	}

	const { cycle_id } = params;

	if (!cycle_id) {
		return NextResponse.json({ success: false, message: "Missing cycle_id in path", data: null });
	}

	try {
		const response = await fetch(`${API_BASE}/admin/cycles/${cycle_id}/activate`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ success: false, message: response.statusText, data });
		}

		return NextResponse.json({ success: true, message: "Successfull", data });
	} catch (error) {
		console.error(`PATCH /admin/cycles/${cycle_id}/activate error:`, error);
		return NextResponse.json({ success: false, message: "Something went wrong", data: null });
	}
}

export async function PUT(
	req: NextRequest,
	{ params }: { params: { cycle_id: string } }
): Promise<NextResponse<RouteHandlerResponse>> {
	const session = await auth();

	if (!session?.user?.accessToken) {
		return NextResponse.json({ success: false, message: "Not authenticated", data: null });
	}

	const { cycle_id } = params;

	if (!cycle_id) {
		return NextResponse.json({ success: false, message: "Missing cycle_id in path", data: null });
	}

	const body = await req.json();
	const { name, start_date, end_date } = body;

	if (!name || !start_date || !end_date) {
		return NextResponse.json({
			success: false,
			message: "name, start_date, and end_date are required",
			data: null,
		});
	}

	try {
		const response = await fetch(`${API_BASE}/admin/cycles/${cycle_id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			body: JSON.stringify({ name, start_date, end_date }),
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ success: false, message: response.statusText, data });
		}

		return NextResponse.json({ success: true, message: "Successfull", data });
	} catch (error) {
		console.error(`PUT /admin/cycles/${cycle_id} error:`, error);
		return NextResponse.json({ success: false, message: "Something went wrong", data: null });
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { cycle_id: string } }
): Promise<NextResponse<RouteHandlerResponse>> {
	const session = await auth();

	if (!session?.user?.accessToken) {
		return NextResponse.json({ success: false, message: "Not authenticated", data: null });
	}

	const { cycle_id } = params;

	if (!cycle_id) {
		return NextResponse.json({ success: false, message: "Missing cycle_id in path", data: null });
	}

	try {
		const response = await fetch(`${API_BASE}/admin/cycles/${cycle_id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ success: false, message: response.statusText, data });
		}

		return NextResponse.json({ success: true, message: "Successfull", data });
	} catch (error) {
		console.error(`DELETE /admin/cycles/${cycle_id} error:`, error);
		return NextResponse.json({ success: false, message: "Something went wrong", data: null });
	}
}
