import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth"; 

const API_BASE = process.env.API_BASE;

export async function PUT(req: NextRequest, { params }: { params: { user_id: string } }) {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  const { user_id } = params;

  try {
    const body = await req.json();

    if (!body.full_name || !body.email || !body.role) {
      return NextResponse.json({ detail: "Missing required fields" }, { status: 400 });
    }

    const response = await fetch(`${API_BASE}/admin/users/${user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("PUT /admin/users/[user_id] error:", error);
    return NextResponse.json({ detail: "Something went wrong" }, { status: 500 });
  }
}
