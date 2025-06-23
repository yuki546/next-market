import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../../utils/database";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ [key: string]: string | string[] }> }
) {
  const reqBody = await request.json();
  const { id } = await params;

  try {
    const { error } = await supabase.from("items").update(reqBody).eq("id", id);
    if (error) throw new Error(error.message);
    return NextResponse.json({ message: "アイテム編集成功" });
  } catch (err) {
    return NextResponse.json({ message: `アイテム編集失敗：${err}` });
  }
}
