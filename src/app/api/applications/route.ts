import { auth } from "@/auth";
import { RouteHandlerResponse } from "@/types/RouteHandler";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse<RouteHandlerResponse>> {
	const session = await auth();

	if (!session?.user?.accessToken) {
		return NextResponse.json({
			success: false,
			message: "Not authenticated",
			data: null,
		});
	}

	const formData = await req.formData();

	const resume = formData.get("resume") as File | null;
	const school = formData.get("school") as string | null;
	const student_id = formData.get("student_id") as string | null;
	const leetcode_handle = formData.get("leetcode_handle") as string | null;
	const codeforces_handle = formData.get("codeforces_handle") as string | null;
	const essay_why_a2sv = formData.get("essay_why_a2sv") as string | null;
	const essay_about_you = formData.get("essay_about_you") as string | null;

	if (
		!resume ||
		!school ||
		!student_id ||
		!leetcode_handle ||
		!codeforces_handle ||
		!essay_why_a2sv ||
		!essay_about_you
	) {
		return NextResponse.json({ success: false, message: "Missing required fields", data: null });
	}

	const resumeBlob = new Blob([await resume.arrayBuffer()], { type: resume.type });

	const apiFormData = new FormData();
	apiFormData.set("resume", resumeBlob, resume.name);
	apiFormData.set("school", school);
	apiFormData.set("student_id", student_id);
	apiFormData.set("leetcode_handle", leetcode_handle);
	apiFormData.set("codeforces_handle", codeforces_handle);
	apiFormData.set("essay_why_a2sv", essay_why_a2sv);
	apiFormData.set("essay_about_you", essay_about_you);

	const API_BASE = process.env.API_BASE;
	if (!API_BASE) {
		console.error("API_BASE is not set in the environment");
		return NextResponse.json({ success: false, message: "API_BASE is not set in the environment", data: null });
	}

	try {
		const response = await fetch(`${API_BASE}/applications/`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			body: apiFormData,
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ success: false, message: "Failed to submit application", data });
		}

		return NextResponse.json({ success: true, message: "Application submitted successfully", data });
	} catch (error) {
		console.error("Application submission error:", error);
		return NextResponse.json({ success: false, message: "Application submission error", data: null });
	}
}
