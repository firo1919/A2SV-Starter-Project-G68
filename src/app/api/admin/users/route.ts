import { NextRequest, NextResponse } from 'next/server'

const API_BASE = process.env.API_BASE

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const token = req.headers.get('authorization')
    const res = await fetch(`${API_BASE}/admin/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token || ''
      },
      body: JSON.stringify(body)
    })

    const data = await res.json()

    return NextResponse.json(data, { status: res.status })
  } catch (err) {
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
