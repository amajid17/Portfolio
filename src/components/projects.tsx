import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, BadgeCheck, FlaskConical, Cpu, Zap, Waves, FileText, ChevronRight } from "lucide-react";
import { LABS, PERSONAL } from "../data";
import { Reveal, SectionHeading } from "./chrome";

const FILTERS = ["All", "Analog", "Power", "Digital", "DSP"] as const;

function CatIcon({ c }: { c: string }) {
  if (c === "Analog") return <Waves size={13} />;
  if (c === "Power") return <Zap size={13} />;
  if (c === "Digital") return <Cpu size={13} />;
  return <FlaskConical size={13} />;
}

/* Interactive comb explorer: N slider + null readout */
function CombExplorer() {
  const [N, setN] = useState(13);

  const W = 600, H = 120;
  const path = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 200; i++) {
      const f = i / 200;
      const mag = Math.abs(Math.sin(Math.PI * N * f));
      const x = (i / 200) * W;
      const y = H - 8 - mag * (H - 20);
      pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(" ");
  }, [N]);

  const nyquistNull = N % 2 === 1;

  return (
    <div className="mt-6 rounded-[12px] border border-[rgba(62,255,123,0.2)] bg-black/40 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-5 md:p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono2 text-[10px] tracking-[0.16em] uppercase text-[#6b7f75]">Interactive · |H(e<sup>jω</sup>)| = |1 − z<sup>−N</sup>|</p>
            <p className="font-mono2 text-[11px] text-[#3eff7b]">N = <span className="text-white font-semibold text-[14px]">{N}</span></p>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[110px]" preserveAspectRatio="none" aria-hidden="true">
            <line x1="0" y1={H - 8} x2={W} y2={H - 8} stroke="rgba(62,255,123,0.25)" strokeWidth="1" strokeDasharray="4 4" />
            {/* Nyquist marker */}
            <line x1={W / 2} y1="0" x2={W / 2} y2={H} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <text x={W / 2 + 6} y="14" fill="#6b7f75" fontSize="10" fontFamily="JetBrains Mono">Nyquist</text>
            <path d={path} fill="none" stroke="#3eff7b" strokeWidth="1.8" style={{ filter: "drop-shadow(0 0 6px rgba(62,255,123,.6))" }} />
            {/* null dots */}
            {Array.from({ length: N + 1 }, (_, k) => {
              const x = (k / N) * W;
              return <circle key={k} cx={x} cy={H - 8} r="3" fill={k === N / 2 && !nyquistNull ? "#ff5d5d" : "#0b1210"} stroke={k === N / 2 && !nyquistNull ? "#ff5d5d" : "#3eff7b"} strokeWidth="1.5" />;
            })}
          </svg>
          <div className="mt-4">
            <label className="font-mono2 text-[11px] text-[#a8bab0] flex justify-between mb-2"><span>Delay stages N</span><span>7 — 16</span></label>
            <input
              type="range" min={7} max={16} value={N}
              onChange={(e) => { setN(Number(e.target.value)); e.target.style.setProperty("--fill", `${((Number(e.target.value) - 7) / 9) * 100}%`); }}
              className="trace-range w-full" style={{ ["--fill" as string]: `${((N - 7) / 9) * 100}%` }}
              aria-label="Comb delay N"
            />
          </div>
        </div>
        <div className="md:w-[280px] shrink-0 border-t md:border-t-0 md:border-l border-[rgba(62,255,123,0.15)] bg-[rgba(62,255,123,0.04)] p-5 md:p-6">
          <p className="font-mono2 text-[10px] tracking-[0.16em] uppercase text-[#3eff7b] mb-3">Lab finding</p>
          <p className="text-[13px] leading-relaxed text-[#c8d8ce] mb-4">
            {nyquistNull
              ? <>N = {N} is <span className="text-[#3eff7b] font-medium">odd</span> → null lands exactly at Nyquist. This is the shipped fix.</>
              : <>N = {N} is <span className="text-[#ff8a8a] font-medium">even</span> → Nyquist sits on a lobe peak. No null — proof you need odd N.</>}
          </p>
          <div className={`rounded-[8px] border px-3 py-2.5 font-mono2 text-[11px] mb-3 ${nyquistNull ? "border-[rgba(62,255,123,0.3)] text-[#3eff7b] bg-[rgba(62,255,123,0.07)]" : "border-[rgba(255,93,93,0.3)] text-[#ff8a8a] bg-[rgba(255,93,93,0.07)]"}`}>
            {nyquistNull ? "✓ NYQUIST NULL PRESENT" : "✕ NYQUIST NULL MISSING"}
          </div>
          <p className="font-mono2 text-[10px] text-[#6b7f75] leading-relaxed">Try N=12 vs N=13 — the exact A/B from the bench sweep to Nyquist.</p>
        </div>
      </div>
    </div>
  );
}

export function EELabs() {
  const [f, setF] = useState<(typeof FILTERS)[number]>("All");
  const list = useMemo(() => (f === "All" ? LABS : LABS.filter((l) => l.category === f)), [f]);
  const featured = LABS.find((l) => l.featured)!;
  const rest = list.filter((l) => !l.featured || f !== "All");

  return (
    <section id="projects" className="scroll-mt-[80px] py-[72px] md:py-[100px] border-t border-white/[0.06]">
      <div className="max-w-[1180px] mx-auto px-5 md:px-8">
        <SectionHeading
          num="03 · PROJECTS"
          title="Engineering, with receipts."
          blurb="Seven bench-verified builds. Each card shows what was specified, simulated and measured — hover any card for the full method."
          right={
            <div className="flex gap-1.5 bg-white/[0.04] border border-white/10 rounded-full p-1">
              {FILTERS.map((x) => (
                <button key={x} onClick={() => setF(x)} className={`font-mono2 text-[10px] tracking-[0.08em] uppercase px-3.5 py-1.5 rounded-full transition-colors ${f === x ? "bg-[#3eff7b] text-black font-semibold" : "text-[#a8bab0] hover:text-white"}`}>{x}</button>
              ))}
            </div>
          }
        />

        {/* featured */}
        {f === "All" && (
          <Reveal className="relative rounded-[16px] border border-[rgba(62,255,123,0.3)] bg-[linear-gradient(180deg,#0d1512,#0b1210)] overflow-hidden card-ring mb-5">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#3eff7b] to-transparent" />
            <div className="p-6 md:p-9">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="inline-flex items-center gap-1.5 font-mono2 text-[10px] tracking-[0.12em] uppercase bg-[#3eff7b] text-black font-semibold rounded-full px-3 py-1"><BadgeCheck size={12} /> Featured · {featured.ch}</span>
                <span className="font-mono2 text-[10px] tracking-[0.12em] uppercase text-[#3eff7b]">{featured.area}</span>
                <span className="font-mono2 text-[10px] text-[#6b7f75] ml-auto hidden md:block">ISE SCHEMATIC → BENCH SWEEP → MATLAB freqz</span>
              </div>
              <h3 className="font-display font-bold text-[clamp(1.4rem,3vw,2rem)] tracking-[-0.02em] text-white leading-tight mb-3">{featured.title}</h3>
              <p className="text-[14.5px] leading-[1.75] text-[#a8bab0] max-w-[90ch]">{featured.summary}</p>
              <div className="mt-5 grid sm:grid-cols-3 gap-2.5">
                {featured.specs.map((s) => (
                  <div key={s.k} className="flex items-center gap-2.5 rounded-[10px] border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                    <BadgeCheck size={15} className="text-[#3eff7b] shrink-0" />
                    <div><p className="font-mono2 text-[10px] tracking-[0.1em] uppercase text-[#6b7f75]">{s.k}</p><p className="text-[13px] text-white font-medium">{s.v}</p></div>
                  </div>
                ))}
              </div>
              <CombExplorer />
              <div className="mt-5 flex flex-wrap gap-2">
                {featured.tags.map((t) => (<span key={t} className="font-mono2 text-[10px] px-2.5 py-1 rounded border border-[rgba(62,255,123,0.25)] text-[#3eff7b] bg-[rgba(62,255,123,0.06)]">{t}</span>))}
              </div>
            </div>
          </Reveal>
        )}

        {/* grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {rest.map((p) => (
              <motion.article
                layout key={p.id}
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="group rounded-[14px] border border-white/[0.08] bg-[#0b1210] p-6 md:p-7 hover:border-[rgba(62,255,123,0.35)] hover:bg-[#0e1713] hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(62,255,123,0.25)] transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 font-mono2 text-[10px] tracking-[0.1em] uppercase text-[#3eff7b]"><CatIcon c={p.category} /> {p.ch} · {p.area}</span>
                  <span className="ml-auto font-mono2 text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-[#6b7f75] uppercase tracking-[0.08em]">{p.category}</span>
                </div>
                <h3 className="font-display font-semibold text-[17px] tracking-tight text-white leading-snug mb-2.5 group-hover:text-[#3eff7b] transition-colors">{p.title}</h3>
                <p className="text-[13.5px] leading-[1.7] text-[#a8bab0] flex-1">{p.summary}</p>
                {p.detail && <p className="mt-2.5 text-[13px] leading-[1.7] text-[#6b7f75] border-l-2 border-[rgba(62,255,123,0.3)] pl-3">{p.detail}</p>}
                <div className="mt-4 pt-4 border-t border-white/[0.06] grid grid-cols-1 gap-1.5 mb-4">
                  {p.specs.map((s) => (
                    <div key={s.k} className="flex items-baseline gap-2 font-mono2 text-[11px]">
                      <span className="text-[#6b7f75] uppercase tracking-[0.08em] shrink-0 w-[92px]">{s.k}</span>
                      <span className="flex-1 border-b border-dotted border-white/10 -translate-y-1" />
                      <span className={`${s.pass ? "text-[#3eff7b]" : "text-[#c8d8ce]"}`}>{s.v} {s.pass ? "✓" : ""}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (<span key={t} className="font-mono2 text-[10px] px-2 py-1 rounded border border-white/10 text-[#6b7f75] group-hover:border-[rgba(62,255,123,0.2)] group-hover:text-[#a8bab0] transition-colors">{t}</span>))}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-5 rounded-[12px] border border-white/[0.08] bg-white/[0.02] px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <FileText size={16} className="text-[#3eff7b] shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-[13px] text-[#a8bab0] flex-1">Full lab reports with schematics, calculations, sim plots and scope captures available on request — including the PSU load-step table and BJT gain sweep.</p>
          <a href="mailto:email@ccny.cuny.edu?subject=Lab%20reports%20request" className="shrink-0 inline-flex items-center gap-1 font-mono2 text-[11px] tracking-[0.08em] uppercase text-[#3eff7b] hover:underline">Request reports <ChevronRight size={13} /></a>
        </Reveal>
      </div>
    </section>
  );
}

export function PersonalProjects() {
  return (
    <div className="max-w-[1180px] mx-auto px-5 md:px-8 pb-[72px] md:pb-[96px]">
      <Reveal className="flex items-center gap-4 mb-8">
        <span className="font-mono2 text-[10px] tracking-[0.18em] uppercase text-[#6b7f75]">Personal · Shipped software</span>
        <span className="h-px flex-1 bg-white/[0.07]" />
        <span className="font-mono2 text-[10px] text-[#6b7f75] hidden md:block">LIVE TODAY · INSTALLABLE · OFFLINE</span>
      </Reveal>

      <div className="space-y-4">
        {PERSONAL.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06} className="rounded-[16px] border border-white/[0.08] bg-[#0b1210] overflow-hidden hover:border-[rgba(62,255,123,0.25)] transition-colors card-ring">
            <div className="grid lg:grid-cols-[1fr_1fr]">
              {/* left */}
              <div className="p-6 md:p-9">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 rounded-[8px] grid place-items-center font-display font-bold text-[15px] text-black" style={{ background: p.accent }}>{i + 1}</span>
                  <p className="font-mono2 text-[10px] tracking-[0.14em] uppercase text-[#a8bab0]">{p.type}</p>
                </div>
                <h3 className="font-display font-bold text-[clamp(1.5rem,3vw,2rem)] tracking-[-0.03em] text-white leading-none mb-3">{p.name}</h3>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.plats.map((x) => (<span key={x} className="font-mono2 text-[10px] tracking-[0.06em] uppercase px-2.5 py-1 rounded border border-[rgba(62,255,123,0.3)] text-[#3eff7b]">{x}</span>))}
                </div>
                <p className="text-[14px] leading-[1.7] text-[#a8bab0] mb-5 max-w-[52ch]">{p.pitch}</p>
                <div className="flex flex-wrap gap-2.5 mb-6">
                  {p.links.map((l) => (
                    <a key={l.l} href={l.h} target="_blank" rel="noopener" className={`inline-flex items-center gap-1.5 font-mono2 text-[11px] tracking-[0.08em] uppercase font-semibold rounded-[8px] px-4 py-2.5 transition-colors ${l.l.includes("Live") || l.l.includes("Expo") ? "bg-white text-black hover:bg-[#3eff7b]" : "border border-[rgba(62,255,123,0.35)] text-[#3eff7b] hover:bg-[rgba(62,255,123,0.1)]"}`}>
                      {l.l} <ArrowUpRight size={13} />
                    </a>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (<span key={s} className="font-mono2 text-[10px] px-2 py-1 rounded bg-white/[0.04] border border-white/[0.07] text-[#6b7f75]">{s}</span>))}
                </div>
              </div>
              {/* right */}
              <div className="border-t lg:border-t-0 lg:border-l border-white/[0.07] bg-black/30 p-6 md:p-9">
                <div className="flex items-center gap-4 mb-6 rounded-[12px] border border-white/[0.07] bg-white/[0.02] p-4">
                  <p className="font-display font-bold text-[42px] leading-none" style={{ color: p.accent }}>{p.metric}</p>
                  <p className="font-mono2 text-[11px] leading-snug text-[#a8bab0] uppercase tracking-[0.06em]">{p.metricLabel}</p>
                </div>
                <p className="font-mono2 text-[10px] tracking-[0.16em] uppercase text-[#6b7f75] mb-3">Technical highlights</p>
                <ul className="space-y-2.5 mb-6">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 text-[13px] leading-[1.6] text-[#c8d8ce]"><span className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: p.accent }} />{h}</li>
                  ))}
                </ul>
                <p className="font-mono2 text-[10px] tracking-[0.16em] uppercase text-[#6b7f75] mb-3">Architecture</p>
                <ul className="space-y-2.5">
                  {p.arch.map((h) => (
                    <li key={h} className="flex gap-2.5 text-[13px] leading-[1.6] text-[#6b7f75]"><span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
