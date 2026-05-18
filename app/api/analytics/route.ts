import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, referrer, userAgent } = body as {
      path: string;
      referrer?: string;
      userAgent?: string;
    };

    const supabase = createClient();
    const { error } = await supabase.from("page_views").insert({
      path,
      referrer: referrer || null,
      user_agent: userAgent || null,
    });

    if (error) {
      console.error("[analytics]", error.message);
      return NextResponse.json({ ok: false });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[analytics]", err);
    return NextResponse.json({ ok: false });
  }
}
