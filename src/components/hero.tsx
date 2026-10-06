import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin, GraduationCap, Mail, Activity, Cpu, Zap } from "lucide-react";
import { PROFILE } from "../data";

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
  );
}
function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v2..." /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
  );
}

/* Live scope canvas — draws comb N=13 magnitude-ish trace with sweep */
function ScopeCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const freqRef = useRef(0.35);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let t = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      t += 0.015;
      const W = canvas.getBoundingClientRect().width;
      const H = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, W, H);

      // grid
      ctx.strokeStyle = "rgba(62,255,123,0.08)";
      ctx.lineWidth = 1;
      const stepX = W / 12;
      for (let x = 0; x <= W; x += stepX) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y <= H; y += H / 4) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      // zero line
      ctx.strokeStyle = "rgba(62,255,123,0.25)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(0, H - 14); ctx.lineTo(W, H - 14); ctx.stroke();
      ctx.setLineDash([]);

      // comb magnitude |H| = |1 - z^-N| shape, N=13, animated sweep dot
      const N = 13;
      ctx.beginPath();
      const pts = 220;
      for (let i = 0; i <= pts; i++) {
        const f = i / pts; // 0..1 (0..fs/2 -> actually 0..fs, show 2 lobes sets)
        const mag = Math.abs(Math.sin(Math.PI * N * f)); // normalized 0..1
        const x = (i / pts) * W;
        const breathe = 1 + 0.02 * Math.sin(t * 2 + f * 8);
        const y = H - 14 - mag * (H - 28) * breathe;
        if (i === 0) ctx.moveTo(x, y);
        else {
          // smooth curve via line (dense enough)
          ctx.lineTo(x, y);
        }
      }
      // glow stroke
      ctx.save();
      ctx.shadowColor = "rgba(62,255,123,0.8)";
      ctx.shadowBlur = 12;
      ctx.strokeStyle = "#3eff7b";
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.restore();

      // fill under
      ctx.lineTo(W, H - 14);
      ctx.lineTo(0, H - 14);
      ctx.closePath();
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "rgba(62,255,123,0.18)");
      g.addColorStop(1, "rgba(62,255,123,0)");
      ctx.fillStyle = g;
      ctx.fill();

      // sweep head
      const fx = ((freqRef.current + t * 0.04) % 1) * W;
      const f = ((freqRef.current + t * 0.04) % 1);
      const mag = Math.abs(Math.sin(Math.PI * N * f));
      const fy = H - 14 - mag * (H - 28);
      ctx.beginPath();
      ctx.arc(fx, fy, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#e9f1ec";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(fx, fy, 8, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(62,255,123,0.5)";
      ctx.stroke();
      // vertical cursor
      ctx.strokeStyle = "rgba(233,241,236,0.15)";
      ctx.beginPath(); ctx.moveTo(fx, 0); ctx.lineTo(fx, H); ctx.stroke();

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} className="w-full h-[132px] md:h-[150px] block" aria-hidden="true" />;
}

export function Hero() {
  const [role, setRole] = useState(0);
  const roles = ["Analog circuits", "Embedded firmware", "DSP on FPGA", "Offline-first software"];
  useEffect(() => {
    const id = setInterval(() => setRole((r) => (r + 1) % roles.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden bg-blueprint pt-[64px]">
      {/* soft glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(62,255,123,0.14),transparent)] pointer-events-none" />
      <div className="absolute top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(62,255,123,0.07),transparent)] pointer-events-none" />

      <div className="relative max-w-[1180px] mx-auto px-5 md:px-8 pt-12 md:pt-20 pb-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
        {/* LEFT */}
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2.5 border border-[rgba(62,255,123,0.3)] bg-[rgba(62,255,123,0.07)] rounded-full pl-2 pr-4 py-1.5 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#3eff7b] text-black font-mono2 text-[10px] font-semibold tracking-[0.1em] uppercase rounded-full px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" /> Available
            </span>
            <span className="font-mono2 text-[11px] tracking-[0.06em] text-[#c8d8ce]">{PROFILE.availability}</span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }} className="font-mono2 text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-[#3eff7b] mb-4">
            Electrical Engineering Portfolio
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.14 }} className="font-display font-bold tracking-[-0.05em] leading-[0.92] text-[clamp(3.4rem,9vw,6.8rem)] text-balance">
            {PROFILE.first}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#c8d8ce] to-[#6b7f75]">{PROFILE.last}</span>
            <span className="text-[#3eff7b]">.</span>
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22 }} className="mt-5 flex items-center gap-2 text-[15px] md:text-[17px] text-[#a8bab0]">
            <span className="text-[#6b7f75]">I build</span>
            <span className="relative inline-flex h-[1.6em] overflow-hidden font-medium text-white min-w-[210px]">
              {roles.map((r, i) => (
                <span key={r} className={`absolute left-0 top-0 transition-all duration-500 ${i === role ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>{r}.</span>
              ))}
            </span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.28 }} className="mt-4 max-w-[52ch] text-[15px] leading-[1.75] text-[#a8bab0]">
            Fourth-year EE at <span className="text-white font-medium">CCNY</span> focused on analog + embedded. I take designs from hand calc → simulation → bench, and I ship software people actually use — offline-first, no backend.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.34 }} className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="group inline-flex items-center gap-2 bg-[#3eff7b] text-black font-mono2 text-[12px] font-semibold tracking-[0.08em] uppercase px-6 py-3.5 rounded-[8px] hover:bg-white transition-colors">
              See the work <ArrowDown size={15} className="group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2 border border-[rgba(62,255,123,0.35)] text-[#3eff7b] font-mono2 text-[12px] tracking-[0.08em] uppercase px-6 py-3.5 rounded-[8px] hover:bg-[rgba(62,255,123,0.1)] hover:border-[#3eff7b] transition-colors">
              Get in touch <ArrowUpRight size={15} />
            </a>
            <a href="#senior-design" className="inline-flex items-center gap-2 text-[#a8bab0] hover:text-white font-mono2 text-[12px] tracking-[0.08em] uppercase px-2 py-3.5 transition-colors">
              <Activity size={14} className="text-[#3eff7b]" /> SafeSense ’26–27
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.45 }} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-[#6b7f75]">
            <span className="inline-flex items-center gap-1.5"><GraduationCap size={15} className="text-[#3eff7b]" /> B.E. EE · CCNY · ’27</span>
            <span className="inline-flex items-center gap-1.5"><MapPin size={14} className="text-[#3eff7b]" /> {PROFILE.location}</span>
            <span className="inline-flex items-center gap-3 ml-1">
              <a href={PROFILE.github} target="_blank" rel="noopener" aria-label="GitHub" className="w-8 h-8 grid place-items-center rounded-md border border-white/10 text-[#a8bab0] hover:text-[#3eff7b] hover:border-[rgba(62,255,123,0.4)] transition-colors"><GithubIcon size={15} /></a>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className="w-8 h-8 grid place-items-center rounded-md border border-white/10 text-[#a8bab0] hover:text-[#3eff7b] hover:border-[rgba(62,255,123,0.4)] transition-colors"><LinkedinIcon size={15} /></a>
              <a href={`mailto:${PROFILE.email}`} aria-label="Email" className="w-8 h-8 grid place-items-center rounded-md border border-white/10 text-[#a8bab0] hover:text-[#3eff7b] hover:border-[rgba(62,255,123,0.4)] transition-colors"><Mail size={15} /></a>
            </span>
          </motion.div>
        </div>

        {/* RIGHT — portrait + scope card */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="relative">
          <div className="relative rounded-[16px] overflow-hidden border border-[rgba(62,255,123,0.18)] bg-[#0b1210] card-ring">
            <div className="grid grid-cols-[1fr_128px]">
              <div className="p-5 md:p-6">
                <p className="font-mono2 text-[10px] tracking-[0.18em] uppercase text-[#6b7f75] mb-1">EE425 · Lab 7 · Comb FIR N=13</p>
                <p className="font-display font-semibold text-[17px] tracking-tight text-white leading-tight">Hardware matches theory,<br />null-for-null.</p>
                <div className="mt-4 flex gap-2">
                  <span className="font-mono2 text-[10px] px-2 py-1 rounded border border-[rgba(62,255,123,0.3)] text-[#3eff7b] bg-[rgba(62,255,123,0.08)]">13 NULLS MAPPED</span>
                  <span className="font-mono2 text-[10px] px-2 py-1 rounded border border-white/10 text-[#a8bab0]">freqz ✓</span>
                </div>
              </div>
              <div className="relative">
                <img src="/images/portrait.jpg" alt="Portrait of Abdullah Majid" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b1210] via-transparent to-transparent" />
              </div>
            </div>
            <div className="border-t border-[rgba(62,255,123,0.12)] bg-[rgba(0,0,0,0.35)] px-4 pt-2 pb-3">
              <div className="flex items-center justify-between mb-1 px-1">
                <span className="font-mono2 text-[10px] tracking-[0.14em] text-[#6b7f75]">CH1 · |H(e<sup>jω</sup>)| LIVE SWEEP</span>
                <span className="font-mono2 text-[10px] text-[#3eff7b] flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#3eff7b] animate-pulse" /> MEASURING</span>
              </div>
              <ScopeCanvas />
            </div>
          </div>

          {/* floating chips */}
          <div className="absolute -left-3 md:-left-6 top-8 flex items-center gap-2 bg-[#0b1210]/95 backdrop-blur border border-white/10 rounded-full pl-2 pr-3 py-1.5 shadow-xl animate-[float_7s_ease-in-out_infinite]">
            <span className="w-7 h-7 grid place-items-center rounded-full bg-[rgba(62,255,123,0.12)] text-[#3eff7b]"><Zap size={14} /></span>
            <span className="font-mono2 text-[10px] tracking-[0.08em] text-white">0–12 V PSU · IN SPEC</span>
          </div>
          <div className="absolute -right-2 md:-right-4 bottom-24 flex items-center gap-2 bg-[#0b1210]/95 backdrop-blur border border-white/10 rounded-full pl-2 pr-3 py-1.5 shadow-xl animate-[float_7s_ease-in-out_infinite] [animation-delay:1.2s]">
            <span className="w-7 h-7 grid place-items-center rounded-full bg-[rgba(62,255,123,0.12)] text-[#3eff7b]"><Cpu size={14} /></span>
            <span className="font-mono2 text-[10px] tracking-[0.08em] text-white">BASYS3 · BITSTREAM OK</span>
          </div>

          {/* stats */}
          <div className="mt-4 grid grid-cols-3 gap-px bg-[rgba(62,255,123,0.12)] border border-[rgba(62,255,123,0.12)] rounded-[12px] overflow-hidden">
            {[
              ["7", "bench-verified builds"],
              ["3", "apps shipped & live"],
              ["13", "filter nulls proven"],
            ].map(([v, l]) => (
              <div key={l} className="bg-[#0b1210] px-4 py-4 text-center">
                <p className="font-display font-bold text-[22px] text-white leading-none">{v}</p>
                <p className="font-mono2 text-[10px] tracking-[0.08em] uppercase text-[#6b7f75] mt-1.5">{l}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* trust bar */}
      <div className="relative border-y border-[rgba(62,255,123,0.12)] bg-[rgba(0,0,0,0.3)]">
        <div className="max-w-[1180px] mx-auto px-5 md:px-8 py-3.5 flex items-center gap-6 overflow-hidden">
          <span className="font-mono2 text-[10px] tracking-[0.18em] uppercase text-[#6b7f75] shrink-0 hidden sm:block">Bench-tested with</span>
          <div className="flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex gap-8 w-max animate-[marquee_28s_linear_infinite]">
              {[...["LTspice","MATLAB","Multisim","Vivado","ISE Suite","KiCad","Basys3","LM741","TIP31","ZXT458","ESP32","Expo"], ...["LTspice","MATLAB","Multisim","Vivado","ISE Suite","KiCad","Basys3","LM741","TIP31","ZXT458","ESP32","Expo"]].map((t, i) => (
                <span key={i} className="font-mono2 text-[11px] tracking-[0.12em] uppercase text-[#a8bab0] whitespace-nowrap flex items-center gap-8">
                  {t} <span className="text-[#3eff7b]/40">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
