import { auth } from "@/auth";
import { RouteHandlerResponse } from "@/types/RouteHandler";
import { NextRequest, NextResponse } from "next/server";
const API_BASE = process.env.API_BASE;

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { cycle_id: string } }
): Promise<NextResponse<RouteHandlerResponse>> {
	const session = await auth();

	if (!session?.user?.accessToken) {
		return NextResponse.json({
			success: false,
			message: "Not authenticated",
			data: null,
		});
	}
	const { cycle_id } = params;
	try {
		const backendRes = await fetch(`${API_BASE}/admin/cycles/${cycle_id}`, {
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
		console.error("DELETE /admin/application_cycle/[cycle_id] error:", error);
		return NextResponse.json({ success: false, message: "Something went wrong", data: null }, { status: 500 });
	}
}
