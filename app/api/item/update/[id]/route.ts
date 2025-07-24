import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../../utils/database";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ [key: string]: string | string[] }> }
) {
  const reqBody = await request.json();
  const { id } = await params;

  try {
    const { data, error } = await supabase
      .from("items")
      .select()
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);

    if (data.email === reqBody.email) {
      const { error } = await supabase
        .from("items")
        .update(reqBody)
        .eq("id", id);
      if (error) throw new Error(error.message);
      return NextResponse.json({ message: "アイテム編集成功" });
    } else {
      return NextResponse.json({ message: "他の人が作成したアイテムです" });
    }
  } catch (err) {
    return NextResponse.json({ message: `アイテム編集失敗：${err}` });
  }
}
