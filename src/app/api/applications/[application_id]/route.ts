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

  const formData = await req.formData();
  const leetcode_handle = formData.get("leetcode_handle");
  const codeforces_handle = formData.get("codeforces_handle");

  if (!leetcode_handle || typeof leetcode_handle !== "string" || leetcode_handle.trim() === "") {
    return NextResponse.json({ detail: "leetcode_handle is required" }, { status: 400 });
  }

  if (!codeforces_handle || typeof codeforces_handle !== "string" || codeforces_handle.trim() === "") {
    return NextResponse.json({ detail: "codeforces_handle is required" }, { status: 400 });
  }

  try {
    const response = await fetch(`${API_BASE}/applications/${application_id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(`PUT /applications/${application_id} error:`, error);
    return NextResponse.json({ detail: "Something went wrong" }, { status: 500 });
  }
}




export async function DELETE(req: NextRequest, { params }: { params: { application_id: string } }) {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  const { application_id } = params;

  if (!application_id) {
    return NextResponse.json({ detail: "Missing application_id in path" }, { status: 400 });
  }

  try {
    const response = await fetch(`${API_BASE}/applications/${application_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(`DELETE /applications/${application_id} error:`, error);
    return NextResponse.json({ detail: "Something went wrong" }, { status: 500 });
  }
}





export async function PATCH(
  req: NextRequest,
  { params }: { params: { application_id: string } }
) {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  const { application_id } = params;

  if (!application_id) {
    return NextResponse.json(
      { detail: "Missing application_id in path" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${API_BASE}/applications/${application_id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json({ success: true, data, message: "" });
  } catch (error) {
    console.error(`PATCH /applications/${application_id} error:`, error);
    return NextResponse.json(
      { detail: "Something went wrong" },
      { status: 500 }
    );
  }
}
