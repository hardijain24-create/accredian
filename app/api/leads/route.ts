import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

export async function GET(req: NextRequest) {
  try {
    let leads = [];
    try {
      const data = await fs.readFile(LEADS_FILE, "utf-8");
      leads = JSON.parse(data);
    } catch (e) {
      // Ignore if file doesn't exist, return empty array
    }

    // Sort leads by newest first
    leads.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error("API GET LEADS ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
