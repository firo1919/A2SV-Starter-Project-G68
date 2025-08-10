import { auth } from "@/auth";
import { RouteHandlerResponse } from "@/types/RouteHandler";
import { NextResponse } from "next/server";

const API_BASE = process.env.API_BASE;

export async function GET(): Promise<NextResponse<RouteHandlerResponse>> {
	const session = await auth();

	if (!session?.user?.accessToken) {
		return NextResponse.json({
			success: false,
			message: "Not authenticated",
			data: null,
		});
	}

	if (!API_BASE) {
		return NextResponse.json({ success: false, message: "API_BASE is not set in the environment", data: null });
	}

	try {
		const response = await fetch(`${API_BASE}/applications/my-status`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ success: false, message: "Failed to fetch application status", data });
		}

		return NextResponse.json({ success: true, message: "Application status fetched successfully", data });
	} catch (error) {
		return NextResponse.json({ success: false, message: "Application status fetch error", data: null });
	}
}
