import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const API_BASE = process.env.API_BASE;

export async function PATCH(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ detail: "Invalid JSON body" }, { status: 400 });
  }

  const { old_password, new_password } = body;

  if (!old_password || typeof old_password !== "string") {
    return NextResponse.json({ detail: "Missing or invalid old_password in body" }, { status: 400 });
  }

  if (!new_password || typeof new_password !== "string") {
    return NextResponse.json({ detail: "Missing or invalid new_password in body" }, { status: 400 });
  }

  try {
    const response = await fetch(`${API_BASE}/profile/me/change-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: JSON.stringify({ old_password, new_password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json({ success: true, data: null, message: "" });
  } catch (error) {
    console.error("PATCH /profile/me/change-password error:", error);
    return NextResponse.json({ detail: "Something went wrong" }, { status: 500 });
  }
}
