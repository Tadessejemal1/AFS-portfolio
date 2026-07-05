import { useMemo, useState, useEffect } from "react";

const BUSINESS_TZ = "Africa/Addis_Ababa";
const SLOT_START_HOUR = 9;
const SLOT_END_HOUR = 17;
const SLOT_MINUTES = 30;

const COMMON_TZS = [
  "Africa/Addis_Ababa",
  "Africa/Nairobi",
  "Africa/Cairo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Dubai",
  "Asia/Riyadh",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "America/New_York",
  "America/Chicago",
  "America/Los_Angeles",
  "UTC",
];

type SlotDate = { key: string; date: Date; label: string; sub: string };

function pad(n: number) { return String(n).padStart(2, "0"); }

// Next 14 weekdays starting tomorrow (business days only)
function generateDates(): SlotDate[] {
  const out: SlotDate[] = [];
  const now = new Date();
  const cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  while (out.length < 14) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) {
      const key = `${cursor.getFullYear()}-${pad(cursor.getMonth() + 1)}-${pad(cursor.getDate())}`;
      out.push({
        key,
        date: new Date(cursor),
        label: cursor.toLocaleDateString(undefined, { weekday: "short", day: "2-digit" }),
        sub: cursor.toLocaleDateString(undefined, { month: "short" }),
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
}

// Deterministic "booked" state per date+slot so slots look realistic without a backend
function seededBooked(dateKey: string, slotIdx: number): boolean {
  let h = 0;
  const s = `${dateKey}#${slotIdx}`;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h) % 7 === 0;
}

// Build slots as absolute instants at Addis Ababa business hours.
// Addis Ababa has no DST and is fixed UTC+3, so we can build the instant directly.
function slotsForDate(d: Date): { iso: string; localHHmm: string; idx: number }[] {
  const y = d.getFullYear();
  const m = d.getMonth();
  const day = d.getDate();
  const slots: { iso: string; localHHmm: string; idx: number }[] = [];
  let idx = 0;
  for (let h = SLOT_START_HOUR; h < SLOT_END_HOUR; h++) {
    for (let mm = 0; mm < 60; mm += SLOT_MINUTES) {
      // Business local time -> UTC by subtracting +03:00
      const utc = Date.UTC(y, m, day, h - 3, mm, 0);
      slots.push({
        iso: new Date(utc).toISOString(),
        localHHmm: `${pad(h)}:${pad(mm)}`,
        idx: idx++,
      });
    }
  }
  return slots;
}

function fmtInTZ(iso: string, tz: string) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit", minute: "2-digit", hour12: false, timeZone: tz,
  }).format(new Date(iso));
}

function fmtLongInTZ(iso: string, tz: string) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "long", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: false,
    timeZone: tz, timeZoneName: "short",
  }).format(new Date(iso));
}

export type SchedulerValue = {
  slotIso: string;
  timezone: string;
  displayLocal: string;
  displayBusiness: string;
};

export function InspectionScheduler({
  value, onChange, error,
}: {
  value: SchedulerValue | null;
  onChange: (v: SchedulerValue | null) => void;
  error?: string;
}) {
  const dates = useMemo(generateDates, []);
  const [activeKey, setActiveKey] = useState<string>(dates[0].key);
  const [tz, setTz] = useState<string>(BUSINESS_TZ);

  useEffect(() => {
    try {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (detected) setTz(detected);
    } catch { /* noop */ }
  }, []);

  const activeDate = dates.find((d) => d.key === activeKey) ?? dates[0];
  const slots = useMemo(() => slotsForDate(activeDate.date), [activeDate]);

  const tzOptions = useMemo(() => {
    const set = new Set(COMMON_TZS);
    set.add(tz);
    return Array.from(set).sort();
  }, [tz]);

  const select = (iso: string) => {
    onChange({
      slotIso: iso,
      timezone: tz,
      displayLocal: fmtLongInTZ(iso, tz),
      displayBusiness: fmtLongInTZ(iso, BUSINESS_TZ),
    });
  };

  // Reformat existing selection if tz changes
  useEffect(() => {
    if (value) {
      onChange({
        slotIso: value.slotIso,
        timezone: tz,
        displayLocal: fmtLongInTZ(value.slotIso, tz),
        displayBusiness: fmtLongInTZ(value.slotIso, BUSINESS_TZ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tz]);

  return (
    <div className={`scheduler${error ? " has-err" : ""}`}>
      <div className="sched-head">
        <div>
          <span className="sched-label">Preferred Date &amp; Time</span>
          <p className="sched-sub">
            Slots shown in <b>{tz.replace(/_/g, " ")}</b> · business hours 09:00–17:00 EAT
          </p>
        </div>
        <div className="sched-tz">
          <label htmlFor="sched-tz-select">Timezone</label>
          <select
            id="sched-tz-select"
            value={tz}
            onChange={(e) => setTz(e.target.value)}
          >
            {tzOptions.map((z) => (
              <option key={z} value={z}>{z.replace(/_/g, " ")}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="sched-dates" role="tablist" aria-label="Select date">
        {dates.map((d) => (
          <button
            key={d.key}
            type="button"
            role="tab"
            aria-selected={d.key === activeKey}
            className={`sched-date${d.key === activeKey ? " active" : ""}`}
            onClick={() => setActiveKey(d.key)}
          >
            <span className="sd-day">{d.label.split(" ")[0]}</span>
            <span className="sd-num">{d.label.split(" ")[1]}</span>
            <span className="sd-mon">{d.sub}</span>
          </button>
        ))}
      </div>

      <div className="sched-slots" role="listbox" aria-label="Available times">
        {slots.map((s) => {
          const booked = seededBooked(activeKey, s.idx);
          const selected = value?.slotIso === s.iso;
          const local = fmtInTZ(s.iso, tz);
          const business = s.localHHmm;
          return (
            <button
              key={s.iso}
              type="button"
              role="option"
              aria-selected={selected}
              disabled={booked}
              className={`sched-slot${selected ? " selected" : ""}${booked ? " booked" : ""}`}
              onClick={() => select(s.iso)}
              title={booked ? "Unavailable" : `${local} local · ${business} EAT`}
            >
              <span className="ss-local">{local}</span>
              {tz !== BUSINESS_TZ && <span className="ss-biz">{business} EAT</span>}
              {booked && <span className="ss-tag">Booked</span>}
            </button>
          );
        })}
      </div>

      {value && (
        <div className="sched-selected" aria-live="polite">
          <span className="sched-check" aria-hidden>✓</span>
          <div>
            <b>{value.displayLocal}</b>
            {tz !== BUSINESS_TZ && <em>({value.displayBusiness} at our facility)</em>}
          </div>
        </div>
      )}

      {error && <span className="err">{error}</span>}
    </div>
  );
}
