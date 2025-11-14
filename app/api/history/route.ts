import { query } from "@/lib/connectDb";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { ID } = await req.json();

    const historyArticles = await query(
      `
      SELECT 
        a.id, 
        a.title, 
        a.content, 
        a.summary, 
        q.question, 
        q.options, 
        q.answer
      FROM articles a
      LEFT JOIN quiz q ON a.id = q.article_id
      WHERE a.id = $1
      `,
      [ID]
    );

    return NextResponse.json({ data: historyArticles.rows ?? [] });
  } catch (error: any) {
    console.error("Error fetching history:", error);
    return NextResponse.json(
      { error: error.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
