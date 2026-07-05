import { useState, type FormEvent } from "react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  company: z.string().trim().min(2, "Company or organization is required").max(120),
  fleet: z.string().min(1, "Select an approximate fleet size"),
  message: z.string().trim().max(600, "Keep it under 600 characters").optional().or(z.literal("")),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const FLEET_OPTIONS = ["1–10", "11–50", "51–200", "200+"];

export default function RequestDemo() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [confirmedName, setConfirmedName] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      fleet: String(fd.get("fleet") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const result = schema.safeParse(data);
    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 900));
    setConfirmedName(result.data.name.split(" ")[0] ?? result.data.name);
    setStatus("success");
  };

  return (
    <section className="demo-band">
      <div className="demo-orb demo-orb-a" aria-hidden />
      <div className="demo-orb demo-orb-b" aria-hidden />
      <div className="wrap demo-grid">
        <div className="demo-copy">
          <span className="label blue">Private Demonstration</span>
          <h2>
            Request a <b><i>tailored demo</i></b> of our fleet operations.
          </h2>
          <p>
            Walk our workshop, meet our lead engineers, and see the systems trusted by UN,
            diplomatic and enterprise fleets across Addis Ababa.
          </p>
          <ul className="demo-list">
            <li><span>01</span> Facility & diagnostics walkthrough</li>
            <li><span>02</span> Fleet health & SLA review</li>
            <li><span>03</span> EV readiness assessment</li>
          </ul>
        </div>

        <div className="demo-card">
          {status === "success" ? (
            <div className="demo-confirm" role="status" aria-live="polite">
              <div className="demo-check" aria-hidden>
                <svg viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 20.5l5.5 5.5L28 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="label blue">Request Received</span>
              <h3>Thank you, {confirmedName}.</h3>
              <p>
                A member of our client team will reach out within one business day to
                schedule your private demonstration.
              </p>
              <button
                type="button"
                className="btn outline"
                onClick={() => {
                  setStatus("idle");
                  setConfirmedName("");
                }}
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form className="demo-form" onSubmit={onSubmit} noValidate>
              <span className="label blue">Book a Demo</span>
              <h3>Reserve your session</h3>

              <div className="demo-row">
                <Field label="Full name" name="name" placeholder="Amanuel Bekele" error={errors.name} />
                <Field label="Work email" name="email" type="email" placeholder="you@company.com" error={errors.email} />
              </div>

              <div className="demo-row">
                <Field label="Company / Organization" name="company" placeholder="AFS International" error={errors.company} />
                <div className={`cfield${errors.fleet ? " has-err" : ""}`}>
                  <label htmlFor="fleet">Fleet size</label>
                  <select id="fleet" name="fleet" defaultValue="">
                    <option value="" disabled>Select range</option>
                    {FLEET_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o} vehicles</option>
                    ))}
                  </select>
                  {errors.fleet && <span className="err">{errors.fleet}</span>}
                </div>
              </div>

              <div className={`cfield${errors.message ? " has-err" : ""}`}>
                <label htmlFor="message">What would you like to see? (optional)</label>
                <textarea id="message" name="message" rows={3} placeholder="Priorities, fleet composition, timeline…" maxLength={600} />
                {errors.message && <span className="err">{errors.message}</span>}
              </div>

              <button type="submit" className="btn dark solid" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending…" : "Request Demo"}
              </button>
              <p className="demo-fine">We reply within one business day. Your information stays private.</p>
            </form>
          )}
        </div>
      </div>
    </section>
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
