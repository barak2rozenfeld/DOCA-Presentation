const { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType, ShadingType } = require("docx");
const fs = require("fs");
const path = require("path");

const GREEN = "4a7c00";
const DARK = "1a1a2e";
const GRAY = "555555";
const LIGHTGRAY = "888888";
const BLUE = "1a4a8a";

const scenes = [
  {
    number: 1,
    title: "SCENE 1 — Intro",
    meta: "Slide 1 of 18  ·  Duration: ~30 seconds",
    narration: [
      "My name is Barak Rozenfeld. I am a senior product manager with deep experience in infrastructure software, hardware-software systems, and cloud architecture.",
      "What you are about to see is a product strategy I built specifically for NVIDIA's DOCA Product Group — for the role of Product Strategy Lead for ConnectX and BlueField.",
      "This is not a generic application. Every slide in this deck starts from a real problem, follows a traceable logic, and ends with a concrete recommendation. This is how I think. And this is what I would do about it."
    ]
  },
  {
    number: 2,
    title: "SCENE 2 — Agenda",
    meta: "Slide 2 of 18  ·  Duration: ~30 seconds",
    narration: [
      "Here is what we will cover. We start with the problem — why GPU utilization fails at scale, and why existing solutions only address part of it. Then we move to DOCA itself — what it is, what it does, and why it is the most significant answer in the market today.",
      "From there: the market context — who is buying, who is competing, and why urgency is real. Then the strategic choice — five paths evaluated, one chosen, and the full reasoning behind it. And we finish with execution — priorities, assumptions, metrics, and why I am the right person to lead this."
    ]
  },
  {
    number: 3,
    title: "SCENE 3 — Problem & Solution",
    meta: "Slide 3 of 18  ·  Duration: ~45 seconds",
    narration: [
      "Let me start with a question. You just invested one billion dollars in one thousand H100 GPUs for AI training. They are running at sixty-five percent utilization. Where did the other thirty-five percent go?",
      "The answer is the host CPU. In a typical AI cluster, every network packet — every piece of data going to and from those GPUs — passes through the host CPU first. At four hundred gigabits per second, the CPU is overwhelmed. It is doing a job it was never designed to do at this scale. The result? Three hundred and fifty million dollars of idle value sitting in a cluster that should be producing AI.",
      "With DOCA, ConnectX, and BlueField, the CPU is removed from the data path entirely. GPU utilization goes from sixty-five percent to over ninety. RDMA, zero-copy, hardware offload — the network runs directly to the GPU. That is the platform opportunity in one slide."
    ]
  },
  {
    number: 4,
    title: "SCENE 4 — Why Existing Solutions Fall Short",
    meta: "Slide 4 of 18  ·  Duration: ~40 seconds",
    narration: [
      "Now, this problem is not new. The industry has tried to solve it four different ways — faster NICs, software-defined networking, custom silicon, and better orchestration tools. Each of these approaches has real merit. And each has real limits.",
      "Here is what the data says: eighty-seven percent of DPU proof-of-concept deployments never reach production. The average time to first production DOCA deployment is nine months — and sixty-five percent of that time is spent writing integration code that should already exist. Custom integration cost per AI cluster exceeds eight hundred thousand dollars.",
      "The problem persists not because the market ignored it. It persists because every existing solution addresses one dimension — while leaving the root cause untouched. The root cause is integration complexity. And that is exactly what DOCA Solution Blueprints are designed to eliminate."
    ]
  },
  {
    number: 5,
    title: "SCENE 5 — Why DOCA Wins",
    meta: "Slide 5 of 18  ·  Duration: ~35 seconds",
    narration: [
      "So why is DOCA the most significant answer? Because it is the only solution that operates at the platform level — addressing all five dimensions simultaneously, and with an unfair advantage no competitor can replicate.",
      "DOCA's APIs, microservices, and Solution Blueprints collapse deployment from nine months to six weeks. Not by making engineers better — by eliminating the work that should not exist in the first place. NVIDIA holds a fifty-five percent hardware market share in AI SmartNIC and DPU. That hardware lead becomes a software moat when DOCA is the only programmable layer on top of it. No competitor has an equivalent. This is a platform advantage. And platforms compound over time."
    ]
  },
  {
    number: 6,
    title: "SCENE 6 — What is DOCA",
    meta: "Slide 6 of 18  ·  Duration: ~35 seconds",
    narration: [
      "DOCA is not just a software development kit. It is the adoption layer — the bridge between NVIDIA's powerful hardware and actual, repeatable, production-grade deployments in the real world.",
      "Think of it as a five-layer stack. At the top: customer solutions — AI networking, security, storage, cloud-native services. In the middle: the DOCA software platform, with its microservices, APIs, libraries, drivers, and orchestration tools — including Firefly, GPUNetIO, DOCA Flow, Argus, SNAP, and Telemetry. Underneath that: BlueField DPU, the programmable ARM-based infrastructure processor. Then ConnectX SuperNIC at four hundred gigabits, with RDMA and hardware offload. And at the foundation: the AI factory data center itself.",
      "The product gap is not the hardware. The hardware is exceptional. The gap is making that hardware deployable at scale, reliably, by real customers. That is what DOCA solves. And that is the job."
    ]
  },
  {
    number: 7,
    title: "SCENE 7 — Market Urgency",
    meta: "Slide 7 of 18  ·  Duration: ~40 seconds",
    narration: [
      "Here is why this matters right now — and why DOCA is not just a software product, but a revenue engine.",
      "Average GPU utilization in AI clusters without offload is sixty-five percent. That means three hundred and fifty million dollars of idle value in every billion-dollar cluster. When DOCA offloads the CPU bottleneck, utilization goes to ninety percent and above. AI teams can run more experiments. More experiments produce more value. More value justifies bigger AI investments. Bigger investments mean NVIDIA sells larger clusters, sooner.",
      "And the business effect compounds: when GPUs run at full utilization, teams get proof of ROI in approximately six months instead of twelve to eighteen. That is two to three times faster cluster expansion velocity. AI demand is elastic — like faster internet, it doesn't reduce usage, it creates an explosion of usage. That is the flywheel DOCA powers."
    ]
  },
  {
    number: 8,
    title: "SCENE 8 — Market Landscape",
    meta: "Slide 8 of 18  ·  Duration: ~35 seconds",
    narration: [
      "The competitive context. NVIDIA holds approximately fifty-five percent of the AI SmartNIC and DPU hardware market. Broadcom is the closest competitor, followed by Intel and AMD. But here is what makes this different from a normal hardware race.",
      "NVIDIA's lead is not just a hardware lead — it is a platform advantage. Hardware plus DOCA's software layer plus the ecosystem. Competitors are hardware-only. They have no equivalent programmable software layer on top.",
      "But the most important threat in this market is not from a competing product. It is from hyperscalers building their own. AWS built Nitro. Microsoft built MAIA. Google built TPUs. Every time a hyperscaler builds custom silicon, that is a customer who no longer buys ConnectX or BlueField. DOCA is the answer to that. It makes NVIDIA hardware programmable enough that building your own stops making economic sense."
    ]
  },
  {
    number: 9,
    title: "SCENE 9 — Key Customers",
    meta: "Slide 9 of 18  ·  Duration: ~35 seconds",
    narration: [
      "Who is buying today — and why. Revenue breaks down roughly as: hyperscalers at forty percent, GPU cloud providers at twenty-eight percent, enterprise at twenty percent, and telecom and edge at twelve.",
      "The hyperscaler story is particularly important. Microsoft Azure runs BlueField DPU at massive scale — millions of servers with the CPU fully freed per server. Azure Boost is built on ConnectX. DOCA is the reason Azure stays on NVIDIA hardware rather than building its own. Meta runs ConnectX-7 at four hundred gigabits across over one hundred thousand GPUs for Llama training. Oracle Cloud uses BlueField for tenant isolation and security offload across their AI infrastructure.",
      "The pattern is the same everywhere: the customers who have deployed DOCA are the customers who expand fastest. That is the attach-rate story. And it is what Blueprints are designed to replicate at scale."
    ]
  },
  {
    number: 10,
    title: "SCENE 10 — Strategic Alternatives",
    meta: "Slide 10 of 18  ·  Duration: ~35 seconds",
    narration: [
      "Before committing to a strategy, I evaluated five different paths. API and SDK expansion. Solution Blueprints. Cloud-native Kubernetes integration. Observability and validation tooling. And partner ecosystem development.",
      "I scored each against four criteria: customer impact, speed to value, revenue pull-through, and feasibility within a one-year window. The winner — by a significant margin — was Solution Blueprints.",
      "But here is the insight that changed how I think about this choice: Blueprints are not just one strategy competing against the other four. A well-executed Blueprint requires solid APIs to build on, deploys via Kubernetes, ships with observability built in, and gets co-marketed with system integrator partners. Choosing Blueprints does not reject the other four paths — it pulls all five into one single, coherent product motion."
    ]
  },
  {
    number: 11,
    title: "SCENE 11 — Chosen Strategy: DOCA Solution Blueprints",
    meta: "Slide 11 of 18  ·  Duration: ~45 seconds",
    narration: [
      "The strategy is DOCA Solution Blueprints. And the principle behind it is this: customers do not adopt platforms. They adopt solutions to painful problems. The platform follows. The platform earns its place by proving itself in production.",
      "A Blueprint is a complete, production-ready package for a specific use case. Not documentation. Not a reference guide. A tested, repeatable path to production. It includes a reference architecture, a working reference application, a deployment guide, a validation checklist, performance benchmarks, observability hooks, an ROI and TCO model, and a ninety-day pilot playbook.",
      "The adoption flow is: identify customer pain, define the use case, deliver the Blueprint, customer runs POC, customer reaches production, account expands. Every step shortened means faster revenue, faster expansion, and more design wins.",
      "The five priority use cases I would focus on first: AI cluster networking offload, secure multi-tenant DPU infrastructure, storage acceleration, cloud-native DPU-as-a-Service, and observability and validation tooling for rollout at scale."
    ]
  },
  {
    number: 12,
    title: "SCENE 12 — Example Blueprint",
    meta: "Slide 12 of 18  ·  Duration: ~40 seconds",
    narration: [
      "Let me make this concrete with Blueprint number one: AI Cluster Networking Offload.",
      "This slide exists to prove the strategy is executable — not just directionally correct. A Blueprint is not a concept. It is a tested, repeatable production path.",
      "The pain: as GPU clusters scale, host CPU cycles spent on networking, telemetry, and policy enforcement grow proportionally. At four hundred gigabits per second, the CPU becomes the bottleneck in the most expensive infrastructure in the world.",
      "The solution: ConnectX SuperNIC plus BlueField DPU, running DOCA Flow, GPUNetIO, Telemetry, and Firefly. The delivered package includes a reference architecture, a working application, a deployment guide, and a validation checklist.",
      "The measured outcomes: GPU utilization from sixty-five to ninety-two percent. Host CPU I/O load drops from ninety-four percent to twenty. Time to deploy: from weeks to one day. One validated Blueprint becomes the repeatable template for every AI networking deployment that follows. Validate once. Replicate at scale."
    ]
  },
  {
    number: 13,
    title: "SCENE 13 — Product Strategy Alignment",
    meta: "Slide 13 of 18  ·  Duration: ~40 seconds",
    narration: [
      "Blueprints do not exist in isolation. They sit on top of three product tracks that must all advance in parallel — and that is what this slide is about.",
      "Track one: hardware. ConnectX-8 and next-generation BlueField must ship on schedule, because every Blueprint timeline is anchored to available, proven hardware. If hardware slips, every Blueprint slips with it.",
      "Track two: software. DOCA APIs and Kubernetes-native deployment are the foundation Blueprints are built on. Unstable APIs mean Blueprints break in production. The software platform must be stable before Blueprints can scale.",
      "Track three: ecosystem. No Blueprint reaches enterprise scale without system integrators and cloud partners co-delivering it. Certification programs, co-marketing, and partner tooling are not optional — they are the distribution layer.",
      "These three tracks are not sequential. They run in parallel. And aligning them is the actual product leadership challenge this role requires."
    ]
  },
  {
    number: 14,
    title: "SCENE 14 — Foundational Assumptions",
    meta: "Slide 14 of 18  ·  Duration: ~35 seconds",
    narration: [
      "Everything on the last three slides is built on beliefs I have not yet proven in this specific role. And naming them explicitly — along with how I would de-risk each one fast — is what separates a plan from a hope.",
      "Assumption one: the eighty-seven percent POC-to-production failure rate is driven by integration complexity, not by budget or internal politics. If I am wrong about the root cause, Blueprints solve the wrong problem. The test: structured interviews with five customers who failed. Cost: three weeks.",
      "Assumption two: system integrators will co-invest in Blueprint certification if NVIDIA provides the tooling, the co-marketing, and the first reference customer. If they will not, the ecosystem track stalls. The test: a ninety-day pilot with two anchor partners.",
      "These are not excuses. They are the first experiments I would run on day thirty."
    ]
  },
  {
    number: 15,
    title: "SCENE 15 — Execution Discipline",
    meta: "Slide 15 of 18  ·  Duration: ~35 seconds",
    narration: [
      "Good strategy without execution is just storytelling. So here is Year One — in priority order.",
      "Must have: Blueprint number one — AI Cluster Networking Offload — reaching general availability. A complete DOCA deployment guide and validation checklist. A ninety-day POC-to-production program. And a developer portal with a Blueprint catalog.",
      "Should have: Blueprint number two, storage offload. A DOCA Telemetry and observability dashboard. A partner system integrator certification program. And a full performance benchmarking suite.",
      "The primary risk is partner dependency — if system integrators do not co-invest, Blueprint distribution stalls. Mitigation: start with two anchor partners under direct NVIDIA sponsorship, build the co-marketing model from those reference cases, and expand from there.",
      "This is a sequenced, testable, accountable plan. Not a wish list."
    ]
  },
  {
    number: 16,
    title: "SCENE 16 — Success Metrics",
    meta: "Slide 16 of 18  ·  Duration: ~35 seconds",
    narration: [
      "A good strategy is only as strong as its measurement framework. Every number in this slide traces back to data already in this deck — baseline, target, delta, and why.",
      "My north star metric is simple: how many active Blueprints are running in production? Everything else flows from that.",
      "Technical KPIs: GPU utilization baseline sixty-five percent, target ninety percent or above. Host CPU I/O load from ninety-four percent down to under twenty. Latency improvements measured against the same baseline.",
      "Operational KPIs: time to first deployment from nine months to six weeks. Pilot-to-production conversion rate — current estimated at thirteen percent, target fifty percent or above.",
      "Business KPIs: ConnectX and BlueField attach rates per cluster. Design wins per quarter. Account expansion velocity from existing customers.",
      "These are hypotheses to validate with customers and field teams — not predetermined targets. Strong strategy starts with measurable questions."
    ]
  },
  {
    number: 17,
    title: "SCENE 17 — PM Manifesto",
    meta: "Slide 17 of 18  ·  Duration: ~30 seconds",
    narration: [
      "One more thing worth naming before we close. I don't start with features. I start with a question: what is the most expensive unsolved problem this customer has right now? Everything else — strategy, roadmap, metrics — follows from the honest answer to that question.",
      "This entire deck — eighteen interactive slides with animations, data visualizations, and a live architecture — was built in one day using Cursor AI as the production tool. The research is mine. The strategy is mine. The framework, the choice of Blueprints, and every argument you have seen — that is the actual intellectual work. AI handled the production layer.",
      "This is what a modern product manager should look like: high-quality artifacts, built fast, without cutting corners on thinking."
    ]
  },
  {
    number: 18,
    title: "SCENE 18 — Why Barak Rozenfeld",
    meta: "Slide 18 of 18  ·  Duration: ~45 seconds",
    narration: [
      "So why me for this role?",
      "Three reasons that map directly to what NVIDIA needs right now.",
      "First: I am a technical and product bridge. I have led system-level software and complex hardware-software products through their full lifecycle — architecture, requirements, roadmap, delivery, and adoption. I understand the stack DOCA runs on. I am the PM engineers trust to own the technology, and executives trust to own the strategy. Fifteen years at that intersection.",
      "Second: adoption-driven execution is my core motion. I operate exactly at the point where technically impressive becomes running in production at scale. Closing the POC-to-production gap — reducing it from nine months to six weeks, from thirteen percent conversion to fifty — is not just something I think about. It is what I do.",
      "Third: I lead cross-functional teams. Engineering, architecture, program management — in complex, international organizations. I translate customer needs into precise requirements that real teams can actually build. Not requirements that sound good in a slide — requirements that ship.",
      "My strongest contribution is the bridge between deep infrastructure technology, product execution, and repeatable customer value. I do not just understand DOCA's potential. I know how to build the strategy that makes it land.",
      "Thank you. I look forward to the conversation."
    ]
  }
];

function sceneHeader(scene) {
  return new Paragraph({
    children: [
      new TextRun({ text: scene.title, bold: true, size: 30, color: "1a4a8a" })
    ],
    spacing: { before: 500, after: 60 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 8, color: "76b900" }
    }
  });
}

function sceneMeta(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 18, color: LIGHTGRAY, italics: true })],
    spacing: { before: 40, after: 120 }
  });
}

function narrationLabel() {
  return new Paragraph({
    children: [new TextRun({ text: "NARRATION TEXT:", bold: true, size: 19, color: "4a7c00" })],
    spacing: { before: 0, after: 80 }
  });
}

function narrationPara(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 23, color: "111111" })],
    spacing: { before: 100, after: 100 },
    indent: { left: 440, right: 100 }
  });
}

function separator() {
  return new Paragraph({
    children: [new TextRun({ text: "" })],
    spacing: { before: 0, after: 0 }
  });
}

const children = [];

// ── TITLE PAGE ──
children.push(
  new Paragraph({
    children: [new TextRun({ text: "DOCA Solution Blueprints", bold: true, size: 60, color: "1a4a8a" })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 300, after: 120 }
  }),
  new Paragraph({
    children: [new TextRun({ text: "Synthesia Video Script", size: 40, color: "4a7c00", bold: true })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 80 }
  }),
  new Paragraph({
    children: [new TextRun({ text: "Presenter: Barak Rozenfeld", size: 22, color: GRAY })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 30 }
  }),
  new Paragraph({
    children: [new TextRun({ text: "Format: AI Avatar (Synthesia)  ·  Language: English  ·  18 scenes  ·  ~11 minutes total", size: 20, color: LIGHTGRAY })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 500 }
  })
);

// ── HOW TO USE ──
children.push(
  new Paragraph({
    children: [new TextRun({ text: "HOW TO USE IN SYNTHESIA", bold: true, size: 24, color: "1a4a8a" })],
    spacing: { before: 200, after: 100 }
  }),
  new Paragraph({ children: [new TextRun({ text: "1.  Create a new video → choose a professional avatar (confident male, business casual)", size: 21 })], spacing: { before: 50, after: 40 } }),
  new Paragraph({ children: [new TextRun({ text: "2.  For each scene: create one slide in Synthesia, paste the narration, upload the slide screenshot as background", size: 21 })], spacing: { before: 0, after: 40 } }),
  new Paragraph({ children: [new TextRun({ text: "3.  Dark background overlay at ~50% opacity so the avatar is clearly visible", size: 21 })], spacing: { before: 0, after: 40 } }),
  new Paragraph({ children: [new TextRun({ text: "4.  Voice style: calm, authoritative, slightly energized — like a VP presenting to a technical audience", size: 21 })], spacing: { before: 0, after: 40 } }),
  new Paragraph({ children: [new TextRun({ text: "5.  Add a 0.5 second pause (line break) between paragraphs within the same scene", size: 21 })], spacing: { before: 0, after: 40 } }),
  new Paragraph({ children: [new TextRun({ text: "6.  Total: 18 scenes — one scene per slide", size: 21 })], spacing: { before: 0, after: 400 } })
);

// ── SCENES ──
for (const scene of scenes) {
  children.push(sceneHeader(scene));
  children.push(sceneMeta(scene.meta));
  children.push(narrationLabel());
  for (const para of scene.narration) {
    children.push(narrationPara(para));
  }
  children.push(separator());
}

// ── PRODUCTION TABLE ──
children.push(
  new Paragraph({
    children: [new TextRun({ text: "PRODUCTION TABLE", bold: true, size: 28, color: "1a4a8a" })],
    spacing: { before: 500, after: 200 }
  })
);

const tableData = [
  ["#", "Slide ID", "Title", "Time"],
  ["1", "s0", "Intro", "0:00 – 0:30"],
  ["2", "s_agenda", "Agenda", "0:30 – 1:00"],
  ["3", "s1", "Problem & Solution", "1:00 – 1:45"],
  ["4", "s_pain", "Why Existing Solutions Fall Short", "1:45 – 2:25"],
  ["5", "s_assump", "Why DOCA Wins", "2:25 – 3:00"],
  ["6", "s2", "What is DOCA", "3:00 – 3:35"],
  ["7", "s_urgency", "Market Urgency", "3:35 – 4:15"],
  ["8", "s_market", "Market Landscape", "4:15 – 4:50"],
  ["9", "s_customers", "Key Customers", "4:50 – 5:25"],
  ["10", "s_alternatives", "Strategic Alternatives", "5:25 – 6:00"],
  ["11", "s_chosen", "Chosen Strategy", "6:00 – 6:45"],
  ["12", "s_blueprint", "Example Blueprint", "6:45 – 7:25"],
  ["13", "s_strategy_align", "Product Strategy Alignment", "7:25 – 8:05"],
  ["14", "s_beliefs", "Foundational Assumptions", "8:05 – 8:40"],
  ["15", "s_exec", "Execution Discipline", "8:40 – 9:15"],
  ["16", "s_roi", "Success Metrics", "9:15 – 9:50"],
  ["17", "s_method", "PM Manifesto", "9:50 – 10:20"],
  ["18", "s_why", "Why Barak Rozenfeld", "10:20 – 11:05"],
];

const colWidths = [8, 20, 47, 25]; // percentages
const table = new Table({
  rows: tableData.map((row, i) =>
    new TableRow({
      children: row.map((cell, ci) =>
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ text: cell, bold: i === 0, size: 19, color: i === 0 ? "ffffff" : "111111" })]
          })],
          width: { size: colWidths[ci], type: WidthType.PERCENTAGE },
          shading: i === 0 ? { type: ShadingType.SOLID, color: "1a4a8a", fill: "1a4a8a" } : (i % 2 === 0 ? { type: ShadingType.SOLID, color: "f2f2f2", fill: "f2f2f2" } : undefined)
        })
      )
    })
  ),
  width: { size: 100, type: WidthType.PERCENTAGE }
});

children.push(table);
children.push(
  new Paragraph({
    children: [new TextRun({ text: "Total estimated runtime: ~11 minutes", bold: true, size: 22, italics: true, color: "1a4a8a" })],
    spacing: { before: 200, after: 400 }
  })
);

// ── TIPS ──
children.push(
  new Paragraph({
    children: [new TextRun({ text: "TIPS FOR RECORDING IN SYNTHESIA", bold: true, size: 24, color: "1a4a8a" })],
    spacing: { before: 200, after: 120 }
  }),
  new Paragraph({ children: [new TextRun({ text: "Avatar: bottom-right corner, circular crop — keeps slide content visible", size: 21 })], spacing: { before: 60, after: 40 } }),
  new Paragraph({ children: [new TextRun({ text: "Background: full-width slide screenshot; lower opacity to ~85% if avatar text is hard to read", size: 21 })], spacing: { before: 0, after: 40 } }),
  new Paragraph({ children: [new TextRun({ text: "Voice: male voice, \"confident\" or \"professional\" tone, neutral accent", size: 21 })], spacing: { before: 0, after: 40 } }),
  new Paragraph({ children: [new TextRun({ text: "Pauses: add a 0.5 second pause (use line break in Synthesia) between paragraphs", size: 21 })], spacing: { before: 0, after: 40 } }),
  new Paragraph({ children: [new TextRun({ text: "Timing: set each scene duration to match the production table above", size: 21 })], spacing: { before: 0, after: 40 } }),
  new Paragraph({ children: [new TextRun({ text: "Music: optional subtle background music at very low volume (Synthesia has built-in options)", size: 21 })], spacing: { before: 0, after: 200 } })
);

const doc = new Document({
  sections: [{ children }]
});

Packer.toBuffer(doc).then(buffer => {
  const outPath = path.join(__dirname, "..", "SYNTHESIA-SCRIPT-v2.docx");
  fs.writeFileSync(outPath, buffer);
  console.log("Done: " + outPath);
});
