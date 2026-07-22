import { NextRequest, NextResponse } from "next/server";
import { getLeads } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    // Get leads using resilient database manager
    const leadsList = await getLeads();

    // Clone array and sort leads by newest first
    const leads = [...leadsList].sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error("API GET LEADS ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
