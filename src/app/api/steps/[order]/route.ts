import { db } from "@/db/db";
import { steps } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { order: string } }) {
  const order = params.order;

  if (!order || Array.isArray(order)) {
    return NextResponse.json({ message: "Invalid 'order' parameter" }, { status: 400 });
  }

  const body = await req.json();

  try {
    const updated = await db
      .update(steps)
      .set(body)
      .where(eq(steps.order, Number(order)))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ message: "Step not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Step updated", data: updated[0] });
  } catch (error) {
    console.error("PUT /api/steps error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
