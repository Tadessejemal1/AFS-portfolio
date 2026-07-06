import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { useSite } from "@/lib/site-context";
import { InspectionScheduler, type SchedulerValue } from "@/components/InspectionScheduler";
import { PageHero } from "@/components/PageHero";


export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book an Inspection — AFS International" },
      { name: "description", content: "Book an inspection with the AFS team in Addis Ababa. Private, priority scheduling for fleet operators." },
      { property: "og:title", content: "Book an Inspection — AFS International" },
      { property: "og:description", content: "Reserve a private inspection with AFS in Addis Ababa." },
    ],
  }),
  component: ContactPage,
});

const SERVICE_OPTIONS = [
  "Full Vehicle Inspection",
  "Scheduled Maintenance",
  "Fleet Management Review",
  "EV Readiness Assessment",
  "Emergency / Roadside",
  "Other",
] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  org: z.string().trim().min(2, "Organization is required").max(120),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  service: z.string().min(1, "Select a service"),
  msg: z.string().trim().max(800, "Keep it under 800 characters").optional().or(z.literal("")),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function ContactPage() {
  const { t } = useSite();
  const [errors, setErrors] = useState<Errors & { slot?: string }>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [refCode, setRefCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [slot, setSlot] = useState<SchedulerValue | null>(null);
  const [confirmedSlot, setConfirmedSlot] = useState<SchedulerValue | null>(null);


  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      org: String(fd.get("org") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      service: String(fd.get("service") ?? ""),
      msg: String(fd.get("msg") ?? ""),
    };
    const result = schema.safeParse(data);
    const next: Errors & { slot?: string } = {};
    if (!result.success) {
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (key && !next[key]) next[key] = issue.message;
      }
    }
    if (!slot) next.slot = "Please select a preferred date and time";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 900));
    const code = `AFS-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    setRefCode(code);
    setFirstName((result.data?.name ?? "").split(" ")[0] ?? "");
    setConfirmedSlot(slot);
    setStatus("success");
  };


  return (
    <>
      <PageHero
        labelKey="con.hero.label"
        h1aKey="con.hero.h1a"
        h1bKey="con.hero.h1b"
        leadKey="con.hero.lead"
        variant="contact"
      >
        <div className="hero-meta">
          <span><em>24/7</em> Emergency Response</span>
          <span className="dot" aria-hidden />
          <span><em>≤ 1</em> Business Day Reply</span>
          <span className="dot" aria-hidden />
          <span><em>Priority</em> Fleet Scheduling</span>
        </div>
      </PageHero>

      <section className="section contact-section">
        <div className="wrap contact-grid-premium">
          <aside className="contact-info-card">
            <span className="label blue">{t("con.info.label")}</span>
            <h3>Speak with our client team.</h3>
            <p className="info-lede">
              Reserve a private inspection or start a conversation about your fleet's
              lifecycle plan. We reply within one business day.
            </p>

            <ul className="info-list">
              <li>
                <span className="ikey">{t("con.info.location")}</span>
                <span className="ival">{t("con.info.locationV")}</span>
              </li>
              <li>
                <span className="ikey">{t("con.info.phone")}</span>
                <a className="ival ilink" href="tel:+251110000000">+251 11 XXX XXXX</a>
              </li>
              <li>
                <span className="ikey">{t("con.info.email")}</span>
                <a className="ival ilink" href="mailto:info@afsinternational.et">info@afsinternational.et</a>
              </li>
              <li>
                <span className="ikey">{t("con.info.hours")}</span>
                <span className="ival">{t("con.info.hoursV")}</span>
              </li>
            </ul>

            <div className="map-block premium">
              <iframe
                title="AFS International — Gotera, Nefas Silk Lafto, Addis Ababa"
                src="https://www.openstreetmap.org/export/embed.html?bbox=38.7540%2C8.9770%2C38.7720%2C8.9930&layer=mapnik&marker=8.9860%2C38.7620"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-frame"
              />
              <div className="map-overlay" aria-hidden />
              <span className="map-cap">Gotera · Nefas Silk Lafto · Addis Ababa</span>
              <a
                className="map-open"
                href="https://www.openstreetmap.org/?mlat=8.9860&mlon=38.7620#map=15/8.9860/38.7620"
                target="_blank"
                rel="noreferrer"
              >
                Open map ↗
              </a>
            </div>

          </aside>

          <div className="contact-form-card">
            <div className="ribbon" aria-hidden />
            {status === "success" ? (
              <div className="demo-confirm" role="status" aria-live="polite">
                <div className="demo-check" aria-hidden>
                  <svg viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12 20.5l5.5 5.5L28 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="label blue">Inspection Requested</span>
                <h3>Thank you, {firstName}.</h3>
                <p>
                  Your inspection request has been received. A member of our client team
                  will confirm your scheduling window within one business day.
                </p>
                {confirmedSlot && (
                  <div className="ref-slot">
                    <span>Scheduled</span>
                    <b>{confirmedSlot.displayLocal}</b>
                    {confirmedSlot.timezone !== "Africa/Addis_Ababa" && (
                      <em>({confirmedSlot.displayBusiness} at our facility)</em>
                    )}
                  </div>
                )}
                <div className="ref-code">
                  <span>Reference</span>
                  <b>{refCode}</b>
                </div>
                <button
                  type="button"
                  className="btn outline"
                  onClick={() => {
                    setStatus("idle"); setRefCode(""); setFirstName("");
                    setSlot(null); setConfirmedSlot(null);
                  }}
                >
                  Submit another request
                </button>

              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="form-head">
                  <span className="label blue">{t("con.form.label")}</span>
                  <h3>Book an inspection</h3>
                  <p>Tell us about your fleet — we'll tailor the visit.</p>
                </div>

                <div className="demo-row">
                  <Field label={t("con.form.name")} name="name" placeholder={t("con.form.namePh")} error={errors.name} />
                  <Field label={t("con.form.org")} name="org" placeholder={t("con.form.orgPh")} error={errors.org} />
                </div>

                <div className="demo-row">
                  <Field label={t("con.form.email")} name="email" type="email" placeholder={t("con.form.emailPh")} error={errors.email} />
                  <Field label="Phone (optional)" name="phone" type="tel" placeholder="+251 …" error={errors.phone} />
                </div>

                <div className={`cfield${errors.service ? " has-err" : ""}`}>
                  <label htmlFor="service">Service</label>
                  <select id="service" name="service" defaultValue="">
                    <option value="" disabled>Select service</option>
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.service && <span className="err">{errors.service}</span>}
                </div>

                <div className={`cfield${errors.msg ? " has-err" : ""}`}>
                  <label htmlFor="msg">{t("con.form.msg")}</label>
                  <textarea id="msg" name="msg" rows={4} placeholder={t("con.form.msgPh")} maxLength={800} />
                  {errors.msg && <span className="err">{errors.msg}</span>}
                </div>

                <InspectionScheduler
                  value={slot}
                  onChange={setSlot}
                  error={errors.slot}
                />

                <button type="submit" className="btn dark solid" disabled={status === "submitting"}>
                  {status === "submitting" ? "Sending…" : t("con.form.submit")}
                </button>

                <p className="demo-fine">Your information stays private. We reply within one business day.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label, name, type = "text", placeholder, error,
}: { label: string; name: string; type?: string; placeholder?: string; error?: string }) {
  return (
    <div className={`cfield${error ? " has-err" : ""}`}>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} placeholder={placeholder} />
      {error && <span className="err">{error}</span>}
    </div>
  );
}
