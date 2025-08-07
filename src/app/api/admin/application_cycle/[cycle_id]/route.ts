import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const API_BASE = process.env.API_BASE;

export async function PATCH(req: NextRequest, { params }: { params: { cycle_id: string } }) {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  const { cycle_id } = params;

  if (!cycle_id) {
    return NextResponse.json({ detail: "Missing cycle_id in path" }, { status: 400 });
  }

  try {
    const response = await fetch(`${API_BASE}/admin/cycles/${cycle_id}/activate`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(`PATCH /admin/cycles/${cycle_id}/activate error:`, error);
    return NextResponse.json({ detail: "Something went wrong" }, { status: 500 });
  }
}


export async function PUT(req: NextRequest, { params }: { params: { cycle_id: string } }) {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  const { cycle_id } = params;

  if (!cycle_id) {
    return NextResponse.json({ detail: "Missing cycle_id in path" }, { status: 400 });
  }

  const body = await req.json();
  const { name, start_date, end_date } = body;

  if (!name || !start_date || !end_date) {
    return NextResponse.json({ detail: "name, start_date, and end_date are required" }, { status: 400 });
  }

  try {
    const response = await fetch(`${API_BASE}/admin/cycles/${cycle_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: JSON.stringify({ name, start_date, end_date }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(`PUT /admin/cycles/${cycle_id} error:`, error);
    return NextResponse.json({ detail: "Something went wrong" }, { status: 500 });
  }
}



export async function DELETE(req: NextRequest, { params }: { params: { cycle_id: string } }) {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  const { cycle_id } = params;

  if (!cycle_id) {
    return NextResponse.json({ detail: "Missing cycle_id in path" }, { status: 400 });
  }

  try {
    const response = await fetch(`${API_BASE}/admin/cycles/${cycle_id}`, {
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
    console.error(`DELETE /admin/cycles/${cycle_id} error:`, error);
    return NextResponse.json({ detail: "Something went wrong" }, { status: 500 });
  }
}
