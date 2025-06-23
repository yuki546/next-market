import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../../utils/database";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ [key: string]: string | string[] }> }
) {
  const { id } = await params;

  try {
    const { error } = await supabase.from("items").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return NextResponse.json({ message: "アイテム削除成功" });
  } catch (err) {
    return NextResponse.json({ message: `アイテム削除失敗：${err}` });
  }
}
