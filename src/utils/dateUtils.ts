import type { BlockedRange } from "@/types/reservation";

/** Returns an array of Date objects within [from, to) (checkout day is free). */
export function expandRange(from: Date, to: Date): Date[] {
  const out: Date[] = [];
  const cur = new Date(from);
  cur.setHours(0, 0, 0, 0);
  const end = new Date(to);
  end.setHours(0, 0, 0, 0);
  while (cur < end) {
    out.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return out;
}

export function flattenBlockedDates(ranges: BlockedRange[]): Date[] {
  const seen = new Set<string>();
  const out: Date[] = [];
  for (const r of ranges) {
    for (const d of expandRange(new Date(r.from), new Date(r.to))) {
      const key = d.toISOString().slice(0, 10);
      if (!seen.has(key)) {
        seen.add(key);
        out.push(d);
      }
    }
  }
  return out;
}

export function isRangeAvailable(from: Date, to: Date, blocked: Date[]): boolean {
  const want = expandRange(from, to).map((d) => d.toISOString().slice(0, 10));
  const set = new Set(blocked.map((d) => d.toISOString().slice(0, 10)));
  return want.every((k) => !set.has(k));
}

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
