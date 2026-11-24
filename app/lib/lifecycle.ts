// Microsoft end-of-support dates for the /microsoft-end-of-support tracker.
//
// Source: Microsoft's lifecycle pages (learn.microsoft.com/lifecycle/products/…),
// checked 23 Nov 2026. Microsoft shows end dates as "<next day> 6:59:59 AM"
// (UTC midnight in Pacific time), so the date stored here is the last day of
// support, which is the date Microsoft uses in its announcements.
//
// `end` is an ISO date (YYYY-MM-DD). When only the month is certain, set
// `endLabel` too: the label is shown and `end` (the first of that month) is only
// used to work out the status.

export type LifecycleRow = {
  product: string;
  end: string; // last day of support (extended support where there are two phases)
  endLabel?: string; // shown instead of the exact day when only the month is certain
  note?: string;
  upgrade?: { label: string; href: string };
};

export type LifecycleGroup = {
  id: string;
  title: string;
  intro: string;
  rows: LifecycleRow[];
};

const WIN11 = { label: "Windows 11 Pro", href: "/products/windows-11-pro" };
const OFFICE = { label: "Office 2024 Pro Plus", href: "/products/office-2024-professional-plus" };
const VISIO = { label: "Visio Professional 2024", href: "/products/visio-professional-2024" };
const SERVER = { label: "Windows Server 2025", href: "/products/windows-server-2025-standard" };
const SQL = { label: "SQL Server 2022", href: "/products/sql-server-2022-standard" };
const VS = { label: "Visual Studio 2022", href: "/products/visual-studio-2022-professional" };

export const LIFECYCLE_CHECKED = "2026-11-23";

export const lifecycleGroups: LifecycleGroup[] = [
  {
    id: "windows",
    title: "Windows (Home & Pro)",
    intro:
      "Windows 11 itself has no end date. Each yearly version gets 24 months of updates on Home and Pro, so staying on the latest version keeps you covered.",
    rows: [
      { product: "Windows 7", end: "2020-01-14", upgrade: WIN11 },
      { product: "Windows 8.1", end: "2023-01-10", upgrade: WIN11 },
      {
        product: "Windows 10 (22H2)",
        end: "2025-10-14",
        note: "Free consumer Extended Security Updates (ESU) run to 12 October 2027 for enrolled PCs.",
        upgrade: WIN11,
      },
      { product: "Windows 11, version 23H2", end: "2025-11-11", note: "Update to the latest version for free in Windows Update." },
      { product: "Windows 11, version 24H2", end: "2026-10-13", note: "Update to the latest version for free in Windows Update." },
      { product: "Windows 11, version 25H2", end: "2027-10-12" },
      { product: "Windows 11, version 26H2", end: "2028-10-01", endLabel: "October 2028" },
    ],
  },
  {
    id: "office",
    title: "Office (one-time purchase)",
    intro:
      "One-time-purchase Office versions get a fixed support window. Microsoft 365 is a subscription and stays supported while you pay.",
    rows: [
      { product: "Office 2013", end: "2023-04-11", upgrade: OFFICE },
      { product: "Office 2016", end: "2025-10-14", upgrade: OFFICE },
      { product: "Office 2019", end: "2025-10-14", upgrade: OFFICE },
      { product: "Office 2021", end: "2026-10-13", upgrade: OFFICE },
      { product: "Office 2024", end: "2029-10-09" },
      {
        product: "Microsoft Publisher (all versions)",
        end: "2026-10-01",
        endLabel: "October 2026",
        note: "Publisher is retired and isn't included in Office 2024.",
      },
    ],
  },
  {
    id: "visio-project",
    title: "Visio & Project",
    intro: "Visio and Project follow the same support dates as the Office version of the same year. Project Professional 2024 is the matching upgrade for Project.",
    rows: [
      { product: "Visio 2016 / Project 2016", end: "2025-10-14", upgrade: VISIO },
      { product: "Visio 2019 / Project 2019", end: "2025-10-14", upgrade: VISIO },
      { product: "Visio 2021 / Project 2021", end: "2026-10-13", upgrade: VISIO },
      { product: "Visio 2024 / Project 2024", end: "2029-10-09" },
    ],
  },
  {
    id: "server",
    title: "Windows Server",
    intro: "Dates are the end of extended support, after which there are no more security updates without paid ESU.",
    rows: [
      {
        product: "Windows Server 2012 / 2012 R2",
        end: "2023-10-10",
        note: "Paid ESU ended 13 October 2026.",
        upgrade: SERVER,
      },
      {
        product: "Windows Server 2016",
        end: "2027-01-12",
        note: "Paid ESU is available for up to three more years.",
        upgrade: SERVER,
      },
      { product: "Windows Server 2019", end: "2029-01-09", upgrade: SERVER },
      { product: "Windows Server 2022", end: "2031-10-14", note: "Mainstream support ended 13 October 2026." },
      { product: "Windows Server 2025", end: "2034-11-14", note: "Mainstream support until 13 November 2029." },
    ],
  },
  {
    id: "sql",
    title: "SQL Server",
    intro: "Dates are the end of extended support.",
    rows: [
      { product: "SQL Server 2016", end: "2026-07-14", note: "Paid ESU is available until July 2029.", upgrade: SQL },
      { product: "SQL Server 2017", end: "2027-10-12", upgrade: SQL },
      { product: "SQL Server 2019", end: "2030-01-08" },
      { product: "SQL Server 2022", end: "2033-01-11" },
      { product: "SQL Server 2025", end: "2036-01-06" },
    ],
  },
  {
    id: "visual-studio",
    title: "Visual Studio",
    intro: "Dates are the end of extended support for the final release of each version.",
    rows: [
      { product: "Visual Studio 2017", end: "2027-04-13", upgrade: VS },
      { product: "Visual Studio 2019", end: "2029-04-10", upgrade: VS },
      { product: "Visual Studio 2022", end: "2032-01-13" },
    ],
  },
];

export type LifecycleStatus = "ended" | "soon" | "supported";

/** Days from `today` to the end date (negative once it has passed). */
export function daysLeft(end: string, today: Date): number {
  const endUtc = Date.parse(`${end}T23:59:59Z`);
  const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  return Math.floor((endUtc - todayUtc) / 86_400_000);
}

export function statusOf(row: LifecycleRow, today: Date): LifecycleStatus {
  if (row.endLabel) {
    // Month-only dates: treat as ended only once that whole month has passed.
    const [y, m] = row.end.split("-").map(Number);
    const monthEnd = new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10);
    const d = daysLeft(monthEnd, today);
    return d < 0 ? "ended" : d <= 365 ? "soon" : "supported";
  }
  const d = daysLeft(row.end, today);
  return d < 0 ? "ended" : d <= 365 ? "soon" : "supported";
}

export function formatEnd(row: LifecycleRow): string {
  if (row.endLabel) return row.endLabel;
  return new Date(`${row.end}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
