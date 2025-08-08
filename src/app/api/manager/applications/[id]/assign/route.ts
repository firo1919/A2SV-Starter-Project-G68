import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const API_BASE = process.env.API_BASE;

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  const { id } = params;

  if (!id) {
    return NextResponse.json({ detail: "Missing application id in path" }, { status: 400 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ detail: "Invalid JSON body" }, { status: 400 });
  }

  const { reviewer_id } = body;

  if (!reviewer_id) {
    return NextResponse.json({ detail: "Missing reviewer_id in request body" }, { status: 400 });
  }

  try {
    const response = await fetch(`${API_BASE}/manager/applications/${id}/assign`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: JSON.stringify({ reviewer_id }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json({ success: true, data, message: "" });
  } catch (error) {
    console.error(`PATCH /manager/applications/${id}/assign error:`, error);
    return NextResponse.json({ detail: "Something went wrong" }, { status: 500 });
  }
}
