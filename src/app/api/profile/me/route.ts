import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const API_BASE = process.env.API_BASE;

export async function PUT(req: NextRequest) {
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

  const { full_name, email } = body;

  if (!full_name || typeof full_name !== "string") {
    return NextResponse.json({ detail: "Missing or invalid full_name in body" }, { status: 400 });
  }

  if (!email || typeof email !== "string") {
    return NextResponse.json({ detail: "Missing or invalid email in body" }, { status: 400 });
  }

  try {
    const response = await fetch(`${API_BASE}/profile/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: JSON.stringify({ full_name, email }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json({ success: true, data, message: "" });
  } catch (error) {
    console.error("PUT /profile/me error:", error);
    return NextResponse.json({ detail: "Something went wrong" }, { status: 500 });
  }
}
