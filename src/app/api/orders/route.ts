import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      name?: string;
      phone?: string;
      occasion?: string;
      budget?: string;
      comment?: string;
    };

    const name = body.name?.trim();
    const phone = body.phone?.trim();

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Укажите имя" }, { status: 400 });
    }

    if (!phone || phone.length < 6) {
      return NextResponse.json({ error: "Укажите корректный телефон" }, { status: 400 });
    }

    const order = await db.order.create({
      data: {
        name,
        phone,
        occasion: body.occasion?.trim() || null,
        budget: body.budget?.trim() || null,
        comment: body.comment?.trim() || null,
        status: "new",
      },
    });

    return NextResponse.json({ ok: true, id: order.id });
  } catch (error) {
    console.error("[api/orders]", error);
    return NextResponse.json({ error: "Не удалось отправить заявку. Попробуйте позже." }, { status: 500 });
  }
}
