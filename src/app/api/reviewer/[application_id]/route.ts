import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const API_BASE = process.env.API_BASE;

export async function PUT(req: NextRequest, { params }: { params: { application_id: string } }) {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  const { application_id } = params;

  if (!application_id) {
    return NextResponse.json({ detail: "Missing application_id in path" }, { status: 400 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ detail: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const response = await fetch(`${API_BASE}/reviews/${application_id}`, {
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
    console.error(`PUT /reviews/${application_id} error:`, error);
    return NextResponse.json({ detail: "Something went wrong" }, { status: 500 });
  }
}
