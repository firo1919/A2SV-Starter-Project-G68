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

  const { status, decision_notes } = body;

  if (!status || typeof status !== "string") {
    return NextResponse.json({ detail: "Missing or invalid status in body" }, { status: 400 });
  }

  if (decision_notes === undefined || typeof decision_notes !== "string") {
    return NextResponse.json({ detail: "Missing or invalid decision_notes in body" }, { status: 400 });
  }

  try {
    const response = await fetch(`${API_BASE}/manager/applications/${id}/decide`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: JSON.stringify({ status, decision_notes }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json({ success: true, data, message: "" });
  } catch (error) {
    console.error(`PATCH /manager/applications/${id}/decide error:`, error);
    return NextResponse.json({ detail: "Something went wrong" }, { status: 500 });
  }
}
