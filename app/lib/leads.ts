import "server-only";
import { get, list, put } from "@vercel/blob";

// Server-side lead storage in a private Vercel Blob store ("okh-leads").
// Each sign-up or started checkout is one small private JSON file, so the
// store owner can follow up. If the store isn't connected, everything no-ops.

export type LeadType = "signup" | "checkout";

export interface Lead {
  type: LeadType;
  email: string;
  name?: string;
  items?: { name: string; price: string; quantity: number }[];
  total?: number;
  method?: string;
  promoCode?: string;
  orderId?: string;
  page?: string;
  at: string; // ISO date
}

const PREFIX = "leads/";

export function leadsConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function saveLead(lead: Lead): Promise<boolean> {
  if (!leadsConfigured()) return false;
  // Timestamp first so the pathnames sort chronologically.
  const id = `${lead.at.replace(/[:.]/g, "-")}-${Math.random().toString(36).slice(2, 8)}`;
  await put(`${PREFIX}${id}.json`, JSON.stringify(lead), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
  });
  return true;
}

async function readLead(pathname: string): Promise<Lead | null> {
  try {
    const res = await get(pathname, { access: "private" });
    if (!res || res.statusCode !== 200) return null;
    return JSON.parse(await new Response(res.stream).text()) as Lead;
  } catch {
    return null;
  }
}

/** Newest first. */
export async function getLeads(limit = 500): Promise<Lead[]> {
  if (!leadsConfigured()) return [];
  const paths: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
    paths.push(...page.blobs.map((b) => b.pathname));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  const newest = paths.sort().reverse().slice(0, limit);
  const leads: Lead[] = [];
  for (let i = 0; i < newest.length; i += 20) {
    const batch = await Promise.all(newest.slice(i, i + 20).map(readLead));
    for (const l of batch) if (l) leads.push(l);
  }
  return leads;
}
