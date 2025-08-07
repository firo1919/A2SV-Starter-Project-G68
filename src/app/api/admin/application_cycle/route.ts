import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const API_BASE = process.env.API_BASE;

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, start_date, end_date } = body;

    if (!name || !start_date || !end_date) {
      return NextResponse.json({ detail: "Missing required fields" }, { status: 400 });
    }

    const response = await fetch(`${API_BASE}/admin/cycles`, {
      method: "POST",
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
    console.error("POST /admin/application_cycle error:", error);
    return NextResponse.json({ detail: "Something went wrong" }, { status: 500 });
  }
}

