import { useState } from "react";
import { Radio, Wifi, BrainCircuit, BellRing, LayoutDashboard, BatteryCharging, ArrowUpRight, Mail, Copy, Check, Send, MapPin, CalendarClock, Users } from "lucide-react";
import { PROFILE } from "../data";
import { Reveal, SectionHeading } from "./chrome";

function MeshDiagram() {
  // Simple animated mesh SVG
  return (
    <div className="rounded-[14px] border border-[rgba(62,255,123,0.2)] bg-black/50 p-5 md:p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono2 text-[10px] tracking-[0.16em] uppercase text-[#6b7f75]">System · Cooperative ISAC Mesh</p>
        <span className="flex items-center gap-1.5 font-mono2 text-[10px] text-[#3eff7b]"><span className="w-1.5 h-1.5 rounded-full bg-[#3eff7b] animate-pulse" /> LIVE CONCEPT</span>
      </div>
      <svg viewBox="0 0 520 220" className="w-full h-auto" role="img" aria-label="SafeSense mesh architecture diagram">
        {/* links */}
        {[
          "M110,60 L200,90", "M110,60 L200,150", "M200,90 L290,60", "M200,90 L290,150",
          "M200,150 L290,60", "M200,150 L290,150", "M290,60 L380,105", "M290,150 L380,105",
        ].map((d, i) => (
          <path key={i} d={d} stroke="rgba(62,255,123,0.25)" strokeWidth="1.2" strokeDasharray="5 5">
            <animate attributeName="stroke-dashoffset" from="0" to="20" dur={`${1.2 + i * 0.15}s`} repeatCount="indefinite" />
          </path>
        ))}
        {/* nodes */}
        {[
          [110, 60, "N1"], [200, 90, "N2"], [200, 150, "N3"], [290, 60, "N4"], [290, 150, "N5"],
        ].map(([x, y, l]) => (
          <g key={l as string}>
            <circle cx={x as number} cy={y as number} r="22" fill="#0b1210" stroke="#3eff7b" strokeWidth="1.5" />
            <circle cx={x as number} cy={y as number} r="5" fill="#3eff7b">
              <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x={x as number} y={(y as number) + 38} textAnchor="middle" fill="#a8bab0" fontSize="10" fontFamily="JetBrains Mono">{l}</text>
            <text x={x as number} y={(y as number) + 4} textAnchor="middle" fill="#060a09" fontSize="8" fontWeight="700" fontFamily="JetBrains Mono">ESP</text>
          </g>
        ))}
        {/* fusion */}
        <rect x="360" y="65" width="140" height="80" rx="10" fill="#0e1a15" stroke="rgba(62,255,123,0.4)" strokeWidth="1.2" />
        <text x="430" y="92" textAnchor="middle" fill="#3eff7b" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="1">FUSION + ML</text>
        <text x="430" y="108" textAnchor="middle" fill="#e9f1ec" fontSize="11" fontWeight="700" fontFamily="Space Grotesk">CSI → occupancy</text>
        <text x="430" y="124" textAnchor="middle" fill="#6b7f75" fontSize="9" fontFamily="JetBrains Mono">empty · still · motion</text>
        {/* dashboard arrow */}
        <path d="M380,145 L430,175 L480,145" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
        <text x="430" y="195" textAnchor="middle" fill="#a8bab0" fontSize="10" fontFamily="JetBrains Mono">DASHBOARD · headcount · routes</text>
      </svg>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          ["SENSE", "Wi-Fi CSI packets"],
          ["DECIDE", "Sleep vs full-rate"],
          ["RESPOND", "Override on alarm"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-[8px] border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 text-center">
            <p className="font-mono2 text-[10px] tracking-[0.14em] text-[#3eff7b]">{k}</p>
            <p className="text-[11px] text-[#a8bab0] mt-0.5">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SeniorDesign() {
  return (
    <section id="senior-design" className="scroll-mt-[80px] py-[72px] md:py-[100px] border-t border-white/[0.06] bg-[#070d0b] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(62,255,123,0.08),transparent)] pointer-events-none" />
      <div className="relative max-w-[1180px] mx-auto px-5 md:px-8">
        <SectionHeading
          num="04 · CAPSTONE 2026–27"
          title="SafeSense — energy-aware cooperative ISAC."
          blurb="One observation drives the whole system: energy efficiency and emergency response are the same question at opposite ends of a spectrum. Quiet space → sense rarely, sleep nodes. Alarm → override everything, sense at full rate. Same controller, same data requirement: who is in which zone, and how fresh must that knowledge be?"
          right={<span className="font-mono2 text-[10px] tracking-[0.12em] uppercase bg-[#3eff7b] text-black font-semibold rounded-full px-3.5 py-1.5">In progress · Team 4–5</span>}
        />

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-5 items-start">
          <div className="space-y-4">
            <Reveal className="rounded-[16px] border border-white/[0.08] bg-[#0b1210] p-6 md:p-8 card-ring">
              <p className="font-mono2 text-[10px] tracking-[0.16em] uppercase text-[#3eff7b] mb-3">What it is</p>
              <p className="text-[14.5px] leading-[1.75] text-[#a8bab0]">
                A cooperative mesh of <span className="text-white font-medium">ESP32 nodes</span> that reuses scheduled Wi-Fi packets for <span className="text-white font-medium">both communication and occupancy sensing</span> — a hardware implementation of Integrated Sensing and Communication (ISAC). An ML model fuses Channel State Information across receivers to classify <span className="text-white">empty / stationary / motion</span> per zone, and the controller uses that estimate to decide how aggressively to sleep idle nodes.
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {[
                  [Radio, "Cooperative mesh", "ESP32s share scheduled packets; every TX is also a sensing probe."],
                  [BrainCircuit, "CSI fusion + ML", "Multi-RX channel state fused to zone occupancy + headcount."],
                  [BatteryCharging, "Energy controller", "Empty → deep sleep cadence. Occupied → raise rate."],
                  [BellRing, "Emergency override", "Alarm fires → duty cycles forced to full-rate instantly."],
                ].map(([Icon, t, d]) => {
                  const I = Icon as typeof Radio;
                  return (
                    <div key={t as string} className="rounded-[12px] border border-white/[0.07] bg-white/[0.02] p-4">
                      <span className="w-8 h-8 rounded-[8px] grid place-items-center bg-[rgba(62,255,123,0.1)] text-[#3eff7b] border border-[rgba(62,255,123,0.2)] mb-2.5"><I size={15} /></span>
                      <p className="text-[13px] font-semibold text-white mb-1">{t as string}</p>
                      <p className="text-[12.5px] leading-relaxed text-[#6b7f75]">{d as string}</p>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.08} className="rounded-[16px] border border-[rgba(62,255,123,0.25)] bg-[linear-gradient(135deg,rgba(62,255,123,0.1),rgba(62,255,123,0.02))] p-6 md:p-7">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-[10px] bg-[#3eff7b] grid place-items-center text-black shrink-0"><LayoutDashboard size={18} /></span>
                <div>
                  <p className="font-mono2 text-[10px] tracking-[0.16em] uppercase text-[#3eff7b] mb-1">Central deliverable</p>
                  <p className="font-display font-semibold text-[17px] text-white leading-snug mb-1.5">A measured Pareto curve: energy saved vs detection retained.</p>
                  <p className="text-[13.5px] text-[#a8bab0] leading-relaxed">On real hardware, across multiple evaluation days — with inference + server cost honestly included in the energy budget. No simulation-only claims.</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="space-y-4">
            <Reveal delay={0.1}><MeshDiagram /></Reveal>
            <Reveal delay={0.15} className="rounded-[14px] border border-white/[0.08] bg-[#0b1210] p-6">
              <p className="font-mono2 text-[10px] tracking-[0.16em] uppercase text-[#6b7f75] mb-4">Timeline · Two semesters</p>
              <div className="space-y-0">
                {[
                  ["FALL ’26", "Mesh link + CSI capture", "ESP32 packet schedule, multi-RX logging, dashboard skeleton", true],
                  ["WINTER", "ML + controller", "Occupancy classifier, sleep policy, alarm override path", false],
                  ["SPRING ’27", "Evaluation + Pareto", "Multi-day energy vs accuracy, evacuation UX, expo", false],
                ].map(([q, t, d, done], i) => (
                  <div key={q as string} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${done ? "bg-[#3eff7b] shadow-[0_0_10px_rgba(62,255,123,.7)]" : "border border-white/20 bg-transparent"}`} />
                      {i < 2 && <span className="w-px flex-1 bg-white/10 my-1" />}
                    </div>
                    <div className="pb-6">
                      <p className="font-mono2 text-[10px] tracking-[0.12em] text-[#3eff7b]">{q as string} {done ? "· ACTIVE" : ""}</p>
                      <p className="text-[14px] font-semibold text-white">{t as string}</p>
                      <p className="text-[12.5px] text-[#6b7f75]">{d as string}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-white/[0.07] flex flex-wrap gap-2">
                {["ESP32", "Wi-Fi CSI", "Python", "TinyML", "React dashboard", "Pareto eval"].map((t) => (
                  <span key={t} className="font-mono2 text-[10px] px-2.5 py-1 rounded border border-white/10 text-[#a8bab0]">{t}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 font-mono2 text-[11px] text-[#6b7f75]">
                <Users size={13} className="text-[#3eff7b]" /> Team of 4–5 · Advisor TBA · Seeking industry feedback
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);

  const copy = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch {}
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(`${form.msg}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="scroll-mt-[80px] py-[72px] md:py-[100px] border-t border-white/[0.06]">
      <div className="max-w-[1180px] mx-auto px-5 md:px-8">
        <SectionHeading num="05 · CONTACT" title="Let’s talk hardware." blurb="Fastest reply by email — I read everything. Lab reports, résumé, transcript and references available on request." />

        <div className="grid lg:grid-cols-[1fr_1fr] gap-5 items-stretch">
          {/* left CTA */}
          <Reveal className="rounded-[20px] border border-[rgba(62,255,123,0.25)] bg-[linear-gradient(160deg,#0e1a15,#0b1210_60%)] p-8 md:p-10 relative overflow-hidden card-ring flex flex-col">
            <div className="absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full bg-[radial-gradient(closest-side,rgba(62,255,123,0.18),transparent)] pointer-events-none" />
            <p className="font-mono2 text-[11px] tracking-[0.18em] uppercase text-[#3eff7b] mb-4 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#3eff7b] animate-pulse" /> {PROFILE.availability}</p>
            <h3 className="font-display font-bold tracking-[-0.03em] leading-[1.02] text-[clamp(2rem,4.5vw,3rem)] text-white mb-4">Have a bench<br />I can learn on?</h3>
            <p className="text-[14.5px] text-[#a8bab0] leading-relaxed mb-8 max-w-[44ch]">Internships, lab assistant roles, or feedback on SafeSense — if it involves a scope probe or a soldering iron, I want to hear about it.</p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a href={`mailto:${PROFILE.email}`} className="flex-1 inline-flex items-center justify-center gap-2 bg-[#3eff7b] text-black font-mono2 text-[12px] font-semibold tracking-[0.08em] uppercase rounded-[10px] px-6 py-4 hover:bg-white transition-colors"><Mail size={15} /> {PROFILE.email}</a>
              <button onClick={copy} className="inline-flex items-center justify-center gap-2 border border-[rgba(62,255,123,0.35)] text-[#3eff7b] font-mono2 text-[12px] tracking-[0.08em] uppercase rounded-[10px] px-5 py-4 hover:bg-[rgba(62,255,123,0.1)] transition-colors">
                {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-3">
              <div className="rounded-[10px] border border-white/[0.08] bg-black/30 p-4">
                <p className="font-mono2 text-[10px] tracking-[0.12em] uppercase text-[#6b7f75] mb-1 flex items-center gap-1.5"><MapPin size={11} /> Based in</p>
                <p className="text-[13px] text-white font-medium">Jamaica, Queens<br /><span className="text-[#6b7f75] font-normal">On-site NYC · hybrid OK</span></p>
              </div>
              <div className="rounded-[10px] border border-white/[0.08] bg-black/30 p-4">
                <p className="font-mono2 text-[10px] tracking-[0.12em] uppercase text-[#6b7f75] mb-1 flex items-center gap-1.5"><CalendarClock size={11} /> Reply time</p>
                <p className="text-[13px] text-white font-medium">Within 24h<br /><span className="text-[#6b7f75] font-normal">Usually same evening</span></p>
              </div>
            </div>

            <div className="mt-5 flex gap-2.5">
              <a href={PROFILE.github} target="_blank" rel="noopener" className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-[10px] border border-white/10 py-3 font-mono2 text-[11px] tracking-[0.08em] uppercase text-[#a8bab0] hover:text-[#3eff7b] hover:border-[rgba(62,255,123,0.4)] transition-colors">GitHub <ArrowUpRight size={13} /></a>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener" className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-[10px] border border-white/10 py-3 font-mono2 text-[11px] tracking-[0.08em] uppercase text-[#a8bab0] hover:text-[#3eff7b] hover:border-[rgba(62,255,123,0.4)] transition-colors">LinkedIn <ArrowUpRight size={13} /></a>
              <a href="https://expo.dev/@amajid17/quran-reader" target="_blank" rel="noopener" className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-[10px] border border-white/10 py-3 font-mono2 text-[11px] tracking-[0.08em] uppercase text-[#a8bab0] hover:text-[#3eff7b] hover:border-[rgba(62,255,123,0.4)] transition-colors">Expo <ArrowUpRight size={13} /></a>
            </div>
          </Reveal>

          {/* right form */}
          <Reveal delay={0.1} className="rounded-[20px] border border-white/[0.08] bg-[#0b1210] p-8 md:p-10 card-ring">
            <p className="font-mono2 text-[10px] tracking-[0.16em] uppercase text-[#6b7f75] mb-1">Quick note → opens your mail app</p>
            <h4 className="font-display font-semibold text-[20px] text-white tracking-tight mb-6">No backend. No tracking. Just email.</h4>
            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="font-mono2 text-[10px] tracking-[0.12em] uppercase text-[#6b7f75] block mb-2">Your name</span>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Engineer" className="w-full rounded-[10px] bg-black/40 border border-white/10 px-4 py-3.5 text-[14px] text-white placeholder:text-[#4a5a53] focus:border-[#3eff7b] outline-none transition-colors" />
                </label>
                <label className="block">
                  <span className="font-mono2 text-[10px] tracking-[0.12em] uppercase text-[#6b7f75] block mb-2">Your email</span>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="w-full rounded-[10px] bg-black/40 border border-white/10 px-4 py-3.5 text-[14px] text-white placeholder:text-[#4a5a53] focus:border-[#3eff7b] outline-none transition-colors" />
                </label>
              </div>
              <label className="block">
                <span className="font-mono2 text-[10px] tracking-[0.12em] uppercase text-[#6b7f75] block mb-2">Message</span>
                <textarea required rows={6} value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} placeholder="Hi Abdullah — we have a summer bench opening working on power + sensing. Are you available for a 20-min chat next week?" className="w-full rounded-[10px] bg-black/40 border border-white/10 px-4 py-3.5 text-[14px] text-white placeholder:text-[#4a5a53] focus:border-[#3eff7b] outline-none transition-colors resize-y" />
              </label>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-white text-black font-mono2 text-[12px] font-semibold tracking-[0.08em] uppercase rounded-[10px] py-4 hover:bg-[#3eff7b] transition-colors">
                {sent ? <><Check size={15} /> Opening mail…</> : <><Send size={15} /> Send via email</>}
              </button>
              <p className="font-mono2 text-[10px] text-[#6b7f75] text-center tracking-[0.04em]">Prefer attachments? Email your JD directly — I reply with résumé + reports.</p>
            </form>
          </Reveal>
        </div>


      </div>
    </section>
  );
}

export function WifiIcon() {
  return <Wifi size={14} />;
}
