import { NextRequest, NextResponse } from "next/server";
import { validateLead } from "@/lib/validation";
import { saveLead } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Execute server-side validation using shared helper
    const { isValid, errors } = validateLead(body);

    if (!isValid) {
      return NextResponse.json(
        { success: false, errors, message: "Invalid form inputs provided." },
        { status: 400 }
      );
    }

    // Append new lead details
    const newLead = {
      id: crypto.randomUUID(),
      name: body.name,
      email: body.email,
      company: body.company,
      teamSize: body.teamSize,
      message: body.message || "",
      timestamp: new Date().toISOString(),
    };

    // Save lead using resilient filesystem/memory database helper
    await saveLead(newLead);

    // Also log to console
    console.log("=========================================");
    console.log("NEW PERSISTED ENTERPRISE LEAD SUBMISSION:");
    console.log(`Name:      ${newLead.name}`);
    console.log(`Email:     ${newLead.email}`);
    console.log(`Company:   ${newLead.company}`);
    console.log(`Team Size: ${newLead.teamSize}`);
    console.log(`ID:        ${newLead.id}`);
    console.log("=========================================");

    // Simulate lag (300ms)
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json({ success: true, message: "Lead submitted and saved successfully." });
  } catch (error) {
    console.error("API LEAD POST ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
