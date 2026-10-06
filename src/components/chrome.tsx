import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ArrowUp, FileDown, Copy, Check } from "lucide-react";
import { NAV, PROFILE } from "../data";

/* ---------- scroll reveal ---------- */
export function Reveal({ children, delay = 0, y = 22, className = "" }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- section heading ---------- */
export function SectionHeading({ num, title, blurb, right }: { num: string; title: string; blurb?: string; right?: React.ReactNode }) {
  return (
    <div className="mb-10 md:mb-14">
      <Reveal>
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono2 text-[11px] tracking-[0.18em] text-[#3eff7b] border border-[rgba(62,255,123,0.3)] rounded-full px-3 py-1 bg-[rgba(62,255,123,0.07)]">{num}</span>
          <span className="h-px flex-1 bg-gradient-to-r from-[rgba(62,255,123,0.3)] to-transparent" />
          {right}
        </div>
        <h2 className="font-display text-[clamp(1.9rem,4vw,2.9rem)] font-700 font-bold tracking-[-0.03em] leading-[1.05] text-[#e9f1ec]">{title}</h2>
        {blurb && <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-[#a8bab0]">{blurb}</p>}
      </Reveal>
    </div>
  );
}

/* ---------- navbar ---------- */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
      // spy
      const ids = ["about", "skills", "projects", "senior-design", "contact"];
      let cur = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-[#3eff7b] focus:text-black focus:px-4 focus:py-2 focus:rounded focus:font-mono focus:text-xs">
        Skip to content
      </a>
      <header className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${scrolled ? "bg-[rgba(6,10,9,0.86)] backdrop-blur-xl border-b border-[rgba(62,255,123,0.12)]" : "bg-transparent border-b border-transparent"}`}>
        <nav className="max-w-[1180px] mx-auto px-5 md:px-8 h-[64px] flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 group">
            <span className="w-8 h-8 rounded-[8px] bg-[#0b1210] border border-[rgba(62,255,123,0.25)] grid place-items-center font-display font-bold text-[#3eff7b] text-sm group-hover:bg-[#3eff7b] group-hover:text-black transition-colors">M</span>
            <span className="font-mono2 text-[12px] tracking-[0.08em] text-[#e9f1ec]">
              a.majid<span className="text-[#6b7f75]"> / </span><span className="text-[#3eff7b]">ee</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 ml-2 text-[10px] font-mono2 tracking-[0.12em] uppercase text-[#a8bab0] border border-white/10 rounded-full px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3eff7b] animate-pulse" /> CCNY ’27
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-7">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className={`font-mono2 text-[11px] tracking-[0.14em] uppercase transition-colors ${active === n.id ? "text-[#3eff7b]" : "text-[#a8bab0] hover:text-white"}`}>
                  {n.n}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="inline-flex items-center gap-1.5 bg-[#3eff7b] text-black font-mono2 text-[11px] tracking-[0.1em] uppercase font-semibold px-4 py-2.5 rounded-[6px] hover:bg-white transition-colors">
                Hire me <ArrowUpRight size={13} strokeWidth={2.5} />
              </a>
            </li>
          </ul>

          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open} className="lg:hidden w-10 h-10 grid place-items-center rounded-md border border-white/10 text-[#a8bab0]">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
        <div className="h-[2px] bg-white/5">
          <div className="h-full bg-gradient-to-r from-[#17c964] to-[#3eff7b] transition-[width] duration-150" style={{ width: `${progress}%` }} />
        </div>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden overflow-hidden bg-[rgba(6,10,9,0.98)] border-b border-[rgba(62,255,123,0.12)] backdrop-blur-xl">
              <ul className="px-6 py-4 flex flex-col">
                {NAV.map((n) => (
                  <li key={n.id}>
                    <a onClick={() => setOpen(false)} href={`#${n.id}`} className="block py-3.5 font-mono2 text-[12px] tracking-[0.12em] uppercase text-[#a8bab0] border-b border-white/[0.06] last:border-0">
                      {n.n}
                    </a>
                  </li>
                ))}
                <li className="py-3">
                  <a onClick={() => setOpen(false)} href="mailto:email@ccny.cuny.edu" className="flex items-center justify-center gap-2 bg-[#3eff7b] text-black font-mono2 text-[12px] uppercase font-semibold rounded-md py-3">
                    <FileDown size={14} /> Download Résumé
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

/* ---------- footer ---------- */
export function Footer() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch {}
  };
  return (
    <footer className="border-t border-[rgba(62,255,123,0.12)] bg-[#070d0b]">
      <div className="max-w-[1180px] mx-auto px-5 md:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <p className="font-display font-bold text-lg tracking-tight">a.majid<span className="text-[#3eff7b]">.</span>ee</p>
            <p className="font-mono2 text-[11px] text-[#6b7f75] tracking-[0.08em] mt-1">BUILT ON THE BENCH · MEASURED, NOT SIMULATED ONLY</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={copy} className="inline-flex items-center gap-2 font-mono2 text-[11px] tracking-[0.08em] border border-white/10 rounded-md px-3.5 py-2.5 text-[#a8bab0] hover:text-[#3eff7b] hover:border-[rgba(62,255,123,0.4)] transition-colors">
              {copied ? <Check size={13} className="text-[#3eff7b]" /> : <Copy size={13} />} {copied ? "Copied!" : PROFILE.email}
            </button>
            <a href="#top" className="inline-flex items-center gap-2 font-mono2 text-[11px] tracking-[0.08em] bg-white/[0.06] border border-white/10 rounded-md px-3.5 py-2.5 text-white hover:bg-[#3eff7b] hover:text-black hover:border-[#3eff7b] transition-colors">
              <ArrowUp size={13} /> Top
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-3 pt-6 border-t border-white/[0.06]">
          <p className="font-mono2 text-[11px] text-[#6b7f75]">© 2026 {PROFILE.first} {PROFILE.last} · Jamaica, NY · CCNY Electrical Engineering</p>
          <p className="font-mono2 text-[11px] text-[#6b7f75]">Space Grotesk · Inter · JetBrains Mono · Last updated Oct 2026</p>
        </div>
      </div>
    </footer>
  );
}
