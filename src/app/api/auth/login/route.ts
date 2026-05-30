import { NextRequest, NextResponse } from "next/server";
import { loginAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim();
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json({ error: "Заполните email и пароль" }, { status: 400 });
    }

    const result = await loginAdmin(email, password);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/auth/login]", error);
    return NextResponse.json({ error: "Ошибка входа" }, { status: 500 });
  }
}
