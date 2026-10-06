import { GraduationCap, MapPin, Mail, FileDown, FlaskConical, Wrench, Cpu, AppWindow, CircleCheck, ArrowUpRight } from "lucide-react";
import { PROFILE, SKILLS } from "../data";
import { Reveal, SectionHeading } from "./chrome";

const ICONS: Record<string, React.ReactNode> = {
  drafting: <FlaskConical size={16} />,
  osc: <Wrench size={16} />,
  cpu: <Cpu size={16} />,
  app: <AppWindow size={16} />,
};

export function About() {
  return (
    <section id="about" className="scroll-mt-[80px] py-[72px] md:py-[100px]">
      <div className="max-w-[1180px] mx-auto px-5 md:px-8">
        <SectionHeading
          num="01 · ABOUT"
          title="Engineer first, builder always."
          blurb="Fourth-year EE at CCNY working across analog, embedded and DSP. I like closing the loop — hand calc, sim, bench — and documenting what actually happened, tolerances included."
          right={<a href="mailto:email@ccny.cuny.edu" className="hidden md:inline-flex items-center gap-1.5 font-mono2 text-[11px] tracking-[0.1em] uppercase text-[#3eff7b] border border-[rgba(62,255,123,0.3)] rounded-full px-4 py-2 hover:bg-[rgba(62,255,123,0.1)] transition-colors">References on request <ArrowUpRight size={12} /></a>}
        />

        <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
          {/* main narrative */}
          <Reveal className="rounded-[16px] border border-white/[0.08] bg-[#0b1210] p-7 md:p-10 card-ring">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-[10px] bg-[rgba(62,255,123,0.1)] border border-[rgba(62,255,123,0.25)] grid place-items-center text-[#3eff7b]"><GraduationCap size={18} /></span>
              <div>
                <p className="font-display font-semibold text-white leading-tight">{PROFILE.degree}</p>
                <p className="font-mono2 text-[11px] text-[#6b7f75] tracking-[0.06em]">{PROFILE.school} · {PROFILE.grad}</p>
              </div>
              <span className="ml-auto font-mono2 text-[10px] tracking-[0.1em] uppercase text-[#3eff7b] bg-[rgba(62,255,123,0.08)] border border-[rgba(62,255,123,0.25)] rounded-full px-3 py-1">GPA on résumé</span>
            </div>

            <div className="space-y-4 text-[15px] leading-[1.8] text-[#a8bab0]">
              <p><span className="text-white font-medium">I bridge theory and hardware.</span> From a first schematic to a working prototype — bias networks sized by hand, verified in LTspice / Multisim / MATLAB, then measured on the bench with scope + DMM.</p>
              <p>Coursework across circuits, electronics, digital systems and signal processing. This fall I started <span className="text-white">senior design (SafeSense)</span> — a year-long ISAC mesh capstone where energy and emergency response are the same control problem.</p>
              <p>Outside the lab I ship software I actually need: <span className="text-white">three offline-first apps</span> — a Quran reader (iOS/Android) and two installable PWAs — zero backends, zero tracking, live today.</p>
            </div>

            {/* focus areas */}
            <div className="mt-7 grid sm:grid-cols-3 gap-3">
              {[
                ["Analog focus", "Op-amps · BJT · regulation"],
                ["Embedded + DSP", "VHDL · FIR · ESP32"],
                ["Shipped software", "React Native · PWA"],
              ].map(([t, d]) => (
                <div key={t} className="rounded-[10px] border border-white/[0.07] bg-white/[0.02] p-4">
                  <p className="font-mono2 text-[10px] tracking-[0.14em] uppercase text-[#3eff7b] mb-1">{t}</p>
                  <p className="text-[13px] text-[#c8d8ce]">{d}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 pt-6 border-t border-white/[0.07] grid sm:grid-cols-3 gap-4 font-mono2 text-[12px]">
              <div><p className="text-[10px] tracking-[0.14em] uppercase text-[#6b7f75] mb-1">Location</p><p className="text-[#c8d8ce] flex items-center gap-1.5"><MapPin size={13} className="text-[#3eff7b]" /> Jamaica, NY</p></div>
              <div><p className="text-[10px] tracking-[0.14em] uppercase text-[#6b7f75] mb-1">Email</p><a href={`mailto:${PROFILE.email}`} className="text-[#3eff7b] hover:underline flex items-center gap-1.5"><Mail size={13} /> {PROFILE.email}</a></div>
              <div><p className="text-[10px] tracking-[0.14em] uppercase text-[#6b7f75] mb-1">Elsewhere</p><p className="text-[#c8d8ce]">Family · community · reading</p></div>
            </div>
          </Reveal>

          {/* side card */}
          <Reveal delay={0.12} className="rounded-[16px] border border-white/[0.08] bg-[#0b1210] overflow-hidden card-ring lg:sticky lg:top-[90px]">
            <div className="relative aspect-[4/4.4] overflow-hidden">
              <img src="/images/portrait.jpg" alt="Abdullah Majid in the lab" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1210] via-transparent to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="font-mono2 text-[10px] tracking-[0.1em] uppercase bg-black/60 backdrop-blur border border-[rgba(62,255,123,0.3)] text-[#3eff7b] rounded-full px-3 py-1.5">Class of 2027</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <p className="font-display font-bold text-white text-lg leading-tight">{PROFILE.first} {PROFILE.last}</p>
                  <p className="font-mono2 text-[11px] text-[#a8bab0]">EE · Analog / Embedded</p>
                </div>
                <span className="w-10 h-10 rounded-full bg-[#3eff7b] grid place-items-center text-black"><CircleCheck size={18} /></span>
              </div>
            </div>
            <div className="p-5">
              <div className="rounded-[10px] overflow-hidden border border-white/[0.07] mb-4">
                <img src="/images/bench.jpg" alt="Bench with oscilloscope and breadboard" className="w-full h-[140px] object-cover" />
              </div>
              <a href="mailto:email@ccny.cuny.edu" className="flex items-center justify-center gap-2 w-full bg-white/[0.06] hover:bg-[#3eff7b] hover:text-black border border-white/10 hover:border-[#3eff7b] text-white font-mono2 text-[11px] tracking-[0.1em] uppercase font-semibold rounded-[8px] py-3.5 transition-colors">
                <FileDown size={14} /> Download Résumé (PDF)
              </a>
              <p className="mt-3 text-center font-mono2 text-[10px] text-[#6b7f75] tracking-[0.06em]">References · transcript · lab reports on request</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-[80px] py-[72px] md:py-[96px] border-t border-white/[0.06] bg-[#070d0b]">
      <div className="max-w-[1180px] mx-auto px-5 md:px-8">
        <SectionHeading
          num="02 · SKILLS & TOOLS"
          title="What I reach for on the bench."
          blurb="Ordered by fluency. Highlighted = I can defend it in an interview with a schematic or a scope capture."
          right={<span className="font-mono2 text-[10px] tracking-[0.12em] uppercase text-[#6b7f75] hidden md:block">●○○○○ = exposure → ●●●●● = fluent</span>}
        />
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {SKILLS.map((col, ci) => (
            <Reveal key={col.label} delay={ci * 0.08} className="rounded-[14px] border border-white/[0.08] bg-[#0b1210] p-6 hover:border-[rgba(62,255,123,0.3)] transition-colors group">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-8 h-8 rounded-[8px] bg-[rgba(62,255,123,0.1)] border border-[rgba(62,255,123,0.2)] grid place-items-center text-[#3eff7b]">{ICONS[col.icon]}</span>
                <p className="font-mono2 text-[11px] tracking-[0.14em] uppercase text-white">{col.label}</p>
              </div>
              <ul className="space-y-3.5">
                {col.items.map((s) => (
                  <li key={s.n}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[13px] ${s.l >= 4 ? "text-white font-medium" : "text-[#a8bab0]"}`}>{s.n}</span>
                      <span className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((d) => (
                          <span key={d} className={`w-1.5 h-1.5 rounded-full ${d <= s.l ? "bg-[#3eff7b]" : "bg-white/10"}`} />
                        ))}
                      </span>
                    </div>
                    <div className="h-[3px] rounded-full bg-white/[0.07] overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#17c964] to-[#3eff7b]" style={{ width: `${(s.l / 5) * 100}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-6 rounded-[14px] border border-[rgba(62,255,123,0.2)] bg-[linear-gradient(135deg,rgba(62,255,123,0.08),transparent_60%)] p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <p className="font-mono2 text-[10px] tracking-[0.16em] uppercase text-[#3eff7b] mb-1.5">How I work</p>
            <p className="text-[14px] text-[#c8d8ce] leading-relaxed max-w-[70ch]">Hand calc first, simulate second, measure third — and write down where they disagree. Every lab below lists what was <em className="text-white not-italic font-medium">specified, simulated and measured</em>, not just what was built.</p>
          </div>
          <a href="#projects" className="shrink-0 inline-flex items-center gap-2 font-mono2 text-[11px] tracking-[0.1em] uppercase font-semibold bg-[#3eff7b] text-black rounded-[8px] px-5 py-3 hover:bg-white transition-colors">See proof below <ArrowUpRight size={14} /></a>
        </Reveal>
      </div>
    </section>
  );
}
