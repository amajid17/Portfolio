export const PROFILE = {
  name: "A. Majid",
  first: "Abdul",
  last: "Majid",
  role: "Electrical Engineering · CCNY ’27",
  tagline: "Analog circuits, embedded systems & DSP — from first schematic to working bench prototype.",
  location: "Jamaica, Queens, NYC",
  email: "email@ccny.cuny.edu",
  github: "https://github.com/amajid17",
  linkedin: "https://linkedin.com/in/yourhandle",
  availability: "Open to EE internships · Summer 2027",
  degree: "B.E. Electrical Engineering",
  school: "The City College of New York",
  grad: "Expected June 2027",
};

export type Lab = {
  id: string;
  ch: string;
  area: string;
  title: string;
  summary: string;
  detail?: string;
  tags: string[];
  specs: { k: string; v: string; pass?: boolean }[];
  featured?: boolean;
  category: "Analog" | "Power" | "Digital" | "DSP";
};

export const LABS: Lab[] = [
  {
    id: "rc",
    ch: "CH1",
    area: "Passive Filter Design",
    title: "RC Low-Pass Frequency Response",
    summary:
      "Designed and built a passive RC low-pass filter. Measured −3 dB cutoff with function generator + oscilloscope and closed the loop against LTspice AC sweep.",
    tags: ["LTspice", "Oscilloscope", "Bode Plot"],
    specs: [
      { k: "Topology", v: "1st-order RC LPF" },
      { k: "Verified", v: "fc (−3 dB) bench vs sim", pass: true },
      { k: "Method", v: "Sine sweep + cursors" },
    ],
    category: "Analog",
  },
  {
    id: "opamp",
    ch: "CH2",
    area: "Op-Amp Circuit Design",
    title: "Inverting Amplifier · Gain −10",
    summary:
      "LM741 inverting stage designed for Av = −10. Characterized output swing, slew-rate limiting and gain-bandwidth trade-off; post-processed captures in MATLAB.",
    tags: ["LM741", "MATLAB", "Gain / BW"],
    specs: [
      { k: "Gain target", v: "−10 V/V", pass: true },
      { k: "Checks", v: "Swing · SR · BW" },
      { k: "Post", v: "MATLAB analysis" },
    ],
    category: "Analog",
  },
  {
    id: "psu",
    ch: "CH3",
    area: "Linear Voltage Regulation",
    title: "0–12 V Regulated Bench Supply",
    summary:
      "Full linear supply from spec: hand-calculated Zener bias to hold breakdown under all loads, op-amp feedback divider for the full adjust range, and a TIP31 emitter-follower to deliver load current the op-amp alone couldn’t.",
    detail:
      "Verified in Multisim at light + heavy load, then characterized on the bench across load steps with ripple (scope) + DMM readings. Met every spec with margin.",
    tags: ["LM6132", "TIP31", "Multisim", "Zener Ref", "Feedback"],
    specs: [
      { k: "Output", v: "0–12 V adjustable", pass: true },
      { k: "Regulation", v: "Line + load, with margin", pass: true },
      { k: "Ripple", v: "Scope-verified / step", pass: true },
    ],
    category: "Power",
  },
  {
    id: "bjt",
    ch: "CH4",
    area: "BJT Amplifier Design",
    title: "Common-Emitter Audio Amplifier",
    summary:
      "ZXT458 common-emitter stage designed from first principles — Q-point, T-model small-signal, full bias network — for gain, Zin/Zout and max undistorted swing.",
    detail:
      "Confirmed Q-point in Multisim vs bench (deltas traced to tolerances + E12 substitutions). Swept audio band to show bypass-cap effect on gain; found clipping onset to prove swing spec.",
    tags: ["ZXT458", "T-Model", "Multisim", "Gain Sweep"],
    specs: [
      { k: "Design", v: "Q-point + T-model", pass: true },
      { k: "Swing", v: "Undistorted spec met", pass: true },
      { k: "Sweep", v: "Bypass-cap gain rise", pass: true },
    ],
    category: "Analog",
  },
  {
    id: "fpga-traffic",
    ch: "CH5",
    area: "Digital Logic & FPGA",
    title: "FPGA Traffic-Light Controller",
    summary:
      "4-way intersection FSM in VHDL — synthesized, placed and routed on Basys3. Clean state encoding, debounced inputs, fully constrained.",
    tags: ["VHDL", "Vivado", "FSM", "Basys3"],
    specs: [
      { k: "HDL", v: "VHDL FSM" },
      { k: "Board", v: "Basys3", pass: true },
      { k: "Flow", v: "Synth → P&R → bitstream", pass: true },
    ],
    category: "Digital",
  },
  {
    id: "fir-eq",
    ch: "CH6",
    area: "Digital Signal Processing",
    title: "3-Band FIR Audio Equalizer",
    summary:
      "Linear-phase FIR crossover in MATLAB applied to real captures. FFT-based before/after evaluation of magnitude response and reconstruction.",
    tags: ["MATLAB", "FIR", "FFT"],
    specs: [
      { k: "Bands", v: "3 · linear-phase" },
      { k: "Eval", v: "FFT A/B", pass: true },
      { k: "Tool", v: "MATLAB fdatool + scripts" },
    ],
    category: "DSP",
  },
  {
    id: "comb",
    ch: "CH7",
    area: "FPGA Implementation · Featured",
    title: "Comb FIR Filter on FPGA",
    summary:
      "Reverse-engineered an undisclosed comb FIR by reading the ISE schematic cold — counted cascaded registers to extract N before powering anything. Swept to Nyquist, mapped every null, proved N must be odd for a Nyquist null, modded the design and matched MATLAB freqz null-for-null.",
    tags: ["FPGA", "FIR Comb", "ISE", "MATLAB freqz", "ADC/DAC"],
    specs: [
      { k: "Delay param", v: "Extracted from schematic", pass: true },
      { k: "Nulls", v: "All mapped to Nyquist", pass: true },
      { k: "Match", v: "HW = freqz theory", pass: true },
    ],
    category: "DSP",
    featured: true,
  },
];

export const SKILLS = [
  {
    label: "Design & Simulation",
    icon: "drafting",
    items: [
      { n: "LTspice", l: 5 },
      { n: "MATLAB", l: 5 },
      { n: "Multisim", l: 4 },
      { n: "Simulink", l: 3 },
      { n: "KiCad", l: 4 },
      { n: "AutoCAD", l: 3 },
    ],
  },
  {
    label: "Bench & Hardware",
    icon: "osc",
    items: [
      { n: "Oscilloscope", l: 5 },
      { n: "Function Gen", l: 5 },
      { n: "Soldering / Rework", l: 4 },
      { n: "DMM + PSU", l: 5 },
      { n: "Arduino", l: 4 },
      { n: "Raspberry Pi", l: 3 },
    ],
  },
  {
    label: "Firmware & HDL",
    icon: "cpu",
    items: [
      { n: "C / C++", l: 4 },
      { n: "Python", l: 5 },
      { n: "VHDL", l: 4 },
      { n: "Vivado / ISE", l: 4 },
      { n: "Assembly", l: 3 },
    ],
  },
  {
    label: "Software (shipped)",
    icon: "app",
    items: [
      { n: "TypeScript", l: 5 },
      { n: "React Native / Expo", l: 5 },
      { n: "PWA / Service Workers", l: 5 },
      { n: "HTML / CSS", l: 5 },
    ],
  },
];

export const PERSONAL = [
  {
    type: "Mobile · Offline-first",
    name: "Quran Reader",
    plats: ["iOS", "Android", "Expo"],
    pitch:
      "Distraction-free Arabic reader — proper Tajweed coloring, RTL layout, all 114 surahs bundled at install. No account, no network, no clutter.",
    links: [
      { l: "GitHub", h: "https://github.com/amajid17/Quran-reader" },
      { l: "Expo", h: "https://expo.dev/@amajid17/quran-reader" },
    ],
    stack: ["React Native 0.81", "Expo SDK 54", "TypeScript", "React Nav v7", "quran-json"],
    highlights: [
      "Tajweed rendered inline via rn-tajweed-verse — per-rule colors, zero overlays",
      "3 bundled Arabic typefaces (Scheherazade New, Noto Naskh, Literata) via I18nManager RTL",
    ],
    arch: [
      "Boot checksum validates all 114 surahs — loud in dev, silent in prod",
      "Error boundary + AsyncStorage persistence keeps bookmarks safe through crashes",
    ],
    metric: "114",
    metricLabel: "surahs offline day-one",
    accent: "#3eff7b",
  },
  {
    type: "PWA · Installable",
    name: "Work Tracker",
    plats: ["PWA", "Single file", "Zero-dep"],
    pitch:
      "Shift + paycheck tracker that lives on your home screen. One HTML file, no framework, no build — exports a multi-sheet XLS entirely in-browser.",
    links: [
      { l: "GitHub", h: "https://github.com/amajid17/work-tracker.git" },
      { l: "Live Demo", h: "https://scheduletracker19.netlify.app/" },
    ],
    stack: ["Vanilla JS", "Service Worker", "localStorage", "Blob API"],
    highlights: [
      "One-tap clock in/out + live timer; midnight-crossing + confirm-on-commit",
      "In-browser XLS via Blob — weekly subtotals, hours vs hours-paid, no server",
    ],
    arch: [
      "Network-first SW + skipWaiting — deploys land without waiting for tab close",
      "Versioned seed merge (date + clock-in dedupe) survives redeploys",
    ],
    metric: "1",
    metricLabel: "HTML file · runs anywhere",
    accent: "#7df9ff",
  },
  {
    type: "PWA · Installable",
    name: "Money Tracker",
    plats: ["PWA", "Multi-wallet", "Zero-dep"],
    pitch:
      "Multi-wallet finance app — categorized transactions, recurring automation, canvas donut breakdown. No backend, no build, installs on iOS + Android.",
    links: [
      { l: "GitHub", h: "https://github.com/amajid17/money-tracker.git" },
      { l: "Live Demo", h: "https://money-tracker19.netlify.app/" },
    ],
    stack: ["Vanilla JS", "Canvas API", "Service Worker", "localStorage"],
    highlights: [
      "Canvas donut, no chart lib — deterministic hash colors, zero persisted palette",
      "Recurring engine batch-processes overdue entries on launch — accurate after weeks offline",
    ],
    arch: [
      "Auto-migrates legacy single-wallet schema — data promoted, no user action",
      "CSP-hardened, theme resolved pre-paint (no flash), dark/light/auto",
    ],
    metric: "0",
    metricLabel: "dependencies · backend · tracking",
    accent: "#c4b5fd",
  },
];

export const NAV = [
  { id: "about", n: "01 · About" },
  { id: "skills", n: "02 · Skills" },
  { id: "projects", n: "03 · Projects" },
  { id: "senior-design", n: "04 · Capstone" },
  { id: "contact", n: "05 · Contact" },
];
