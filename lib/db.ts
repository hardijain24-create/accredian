import fs from "fs/promises";
import path from "path";

const SEED_LEADS = [
  {
    id: "e5c7a421-2e11-4770-bc4f-4d3f2c5e6f7a",
    name: "Sarah Connor",
    email: "sconnor@cyberdyne.com",
    company: "Cyberdyne Systems",
    teamSize: "201-1000",
    message: "Looking to train our automation team on AI Infrastructure and secure copilot pipelines.",
    timestamp: "2026-07-22T10:14:00.000Z"
  },
  {
    id: "f8a9d32b-31cc-4890-a50d-2b4f6d8c0f7b",
    name: "Miles Dyson",
    email: "mdyson@skynet.org",
    company: "Skynet Labs",
    teamSize: "1000+",
    message: "We need custom Kubernetes pathways for our global platform engineering teams.",
    timestamp: "2026-07-22T11:20:00.000Z"
  },
  {
    id: "a1b2c3d4-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
    name: "Gordon Freeman",
    email: "gfreeman@blackmesa.org",
    company: "Black Mesa Research",
    teamSize: "100-200",
    message: "We would like to review L&D courses for product managers handling research sprints.",
    timestamp: "2026-07-22T12:05:00.000Z"
  },
  {
    id: "b2c3d4e5-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
    name: "Alyx Vance",
    email: "avance@resistance.net",
    company: "Resistance Tech",
    teamSize: "20-99",
    message: "Interested in devops foundations for our engineering hub.",
    timestamp: "2026-07-22T14:40:00.000Z"
  }
];

// Global in-memory cache to handle read-only Lambdas
let globalLeads: any[] = [...SEED_LEADS];

const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

export async function getLeads(): Promise<any[]> {
  try {
    const data = await fs.readFile(LEADS_FILE, "utf-8");
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Sync from local file if it contains records
      globalLeads = parsed;
    }
  } catch (e) {
    // If file read fails (e.g. not bundled in Vercel function root), use cache
  }
  return globalLeads;
}

export async function saveLead(newLead: any): Promise<boolean> {
  globalLeads.push(newLead);
  
  try {
    // Attempt local file write for local persistent development
    await fs.mkdir(path.dirname(LEADS_FILE), { recursive: true });
    await fs.writeFile(LEADS_FILE, JSON.stringify(globalLeads, null, 2), "utf-8");
  } catch (e) {
    // Capture and ignore read-only errors on Vercel deployment containers
    console.warn("Fell back to in-memory lead storage on serverless handler: ", e);
  }
  return true;
}
