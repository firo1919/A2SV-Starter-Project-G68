import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.API_BASE;

function err(message: string, status = 400) {
	return NextResponse.json({ success: false, message, data: null }, { status });
}

function extract(raw: any) {
	return raw?.data?.data?.user ?? raw?.data?.user ?? raw?.data?.data ?? raw?.data ?? raw;
}

export async function GET() {
	const session = await auth();
	if (!session?.user?.accessToken) return err("Not authenticated", 401);
	if (!API_BASE) return err("API_BASE not configured", 500);

	try {
		const upstream = await fetch(`${API_BASE}/profile/me`, {
			headers: {
				Authorization: `Bearer ${session.user.accessToken}`,
				Accept: "application/json",
			},
			cache: "no-store",
		});
		const ct = upstream.headers.get("content-type") || "";
		const json = ct.includes("application/json") ? await upstream.json().catch(() => ({})) : {};
		if (!upstream.ok) return err(json?.message || "Failed to fetch profile", upstream.status);
		return NextResponse.json({ success: true, message: "Profile fetched", data: extract(json) });
	} catch (e) {
		console.error("GET /api/profile error", e);
		return err("Unexpected error", 500);
	}
}

export async function PUT(req: NextRequest) {
	const session = await auth();
	if (!session?.user?.accessToken) return err("Not authenticated", 401);
	if (!API_BASE) return err("API_BASE not configured", 500);

	const contentType = req.headers.get("content-type") || "";
	let formOut: FormData;

	if (contentType.startsWith("multipart/form-data")) {
		const inFd = await req.formData();
		formOut = new FormData();

		const profile_picture = inFd.get("profile_picture") as File | null;
		const full_name = (inFd.get("full_name") as string | null)?.trim();
		const email = (inFd.get("email") as string | null)?.trim();

		if (profile_picture) {
			const blob = new Blob([await profile_picture.arrayBuffer()], { type: profile_picture.type });
			formOut.set("profile_picture", blob, profile_picture.name);
		}
		if (full_name) formOut.set("full_name", full_name);
		if (email) formOut.set("email", email);

		if (![...formOut.keys()].length) return err("Nothing to update");
	} else {
		// JSON fallback
		const body = await req.json().catch(() => ({}));
		const full_name = (body.full_name || body.fullName || "").trim();
		const email = (body.email || "").trim();
		if (!full_name && !email) return err("Nothing to update");
		formOut = new FormData();
		if (full_name) formOut.set("full_name", full_name);
		if (email) formOut.set("email", email);
	}

	try {
		const upstream = await fetch(`${API_BASE}/profile/me`, {
			method: "PUT",
			headers: { Authorization: `Bearer ${session.user.accessToken}` },
			body: formOut as any,
		});
		const ct = upstream.headers.get("content-type") || "";
		const json = ct.includes("application/json") ? await upstream.json().catch(() => ({})) : {};
		if (!upstream.ok) return err(json?.message || "Failed to update profile", upstream.status);
		return NextResponse.json({ success: true, message: "Profile updated", data: extract(json) });
	} catch (e) {
		console.error("PUT /api/profile error", e);
		return err("Unexpected error", 500);
	}
}
