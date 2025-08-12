import { auth } from "@/auth";
import { RouteHandlerResponse } from "@/types/RouteHandler";
import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.API_BASE;

export async function PUT(req: NextRequest): Promise<NextResponse<RouteHandlerResponse>> {
	const session = await auth();
	if (!session?.user?.accessToken) {
		return NextResponse.json({
			success: false,
			message: "Not authenticated",
			data: null,
		});
	}
	const formData = await req.formData();

	const profile_picture = formData.get("profile_picture") as File | null;
	const full_name = formData.get("full_name") as string | null;
	const email = formData.get("email") as string | null;

	if (!profile_picture || !full_name || !email) {
		return NextResponse.json({ success: false, message: "Missing required fields", data: null });
	}

	const profile_pictureBlob = new Blob([await profile_picture.arrayBuffer()], { type: profile_picture.type });

	const apiFormData = new FormData();
	apiFormData.set("profile_picture", profile_pictureBlob, profile_picture.name);
	apiFormData.set("full_name", full_name);
	apiFormData.set("email", email);

	if (!API_BASE) {
		console.error("API_BASE is not set in the environment");
		return NextResponse.json({ success: false, message: "API_BASE is not set in the environment", data: null });
	}

	try {
		const response = await fetch(`${API_BASE}/profile/me`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			body: apiFormData,
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ success: false, message: "Failed to update profile", data });
		}

		return NextResponse.json({ success: true, message: "Profile updated successfully", data });
	} catch (error) {
		console.error("Application submission error:", error);
		return NextResponse.json({ success: false, message: "profile update error", data: null });
	}
}
