import "server-only";
import { Redis } from "@upstash/redis";

// Server-side lead storage (Upstash Redis via the Vercel Marketplace).
// Sign-ups and started checkouts are pushed to one list so the store owner
// can follow up. If the database isn't connected yet, everything no-ops.

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

const LIST_KEY = "leads";
const MAX_LEADS = 5000;

let client: Redis | null | undefined;

function redis(): Redis | null {
  if (client !== undefined) return client;
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  client = url && token ? new Redis({ url, token }) : null;
  return client;
}

export function leadsConfigured(): boolean {
  return redis() !== null;
}

export async function saveLead(lead: Lead): Promise<boolean> {
  const r = redis();
  if (!r) return false;
  await r.lpush(LIST_KEY, JSON.stringify(lead));
  await r.ltrim(LIST_KEY, 0, MAX_LEADS - 1);
  return true;
}

export async function getLeads(limit = 500): Promise<Lead[]> {
  const r = redis();
  if (!r) return [];
  const raw = await r.lrange<string | Lead>(LIST_KEY, 0, limit - 1);
  // Upstash auto-parses JSON strings, so entries may already be objects.
  return raw.map((x) => (typeof x === "string" ? (JSON.parse(x) as Lead) : x));
}
