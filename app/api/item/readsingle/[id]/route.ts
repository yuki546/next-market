import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../../utils/database";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ [key: string]: string | string[] }> }
) {
  const { id } = await params;

  try {
    const { data, error } = await supabase
      .from("items")
      .select()
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "アイテム読み取り成功（シングル）",
      singleItem: data,
    });
  } catch (err) {
    return NextResponse.json({
      message: `アイテム読み取り失敗（シングル：${err}）`,
    });
  }
}
