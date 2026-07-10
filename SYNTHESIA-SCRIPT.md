# DOCA Solution Blueprints — Synthesia Video Script
**Presenter:** Barak Rozenfeld  
**Format:** AI Avatar (Synthesia)  
**Language:** English  
**Target length:** 5–6 minutes  
**Pace:** ~140 words per minute, conversational and confident  

---

## HOW TO USE THIS IN SYNTHESIA

1. Create a new video → choose a professional avatar (recommend: a confident male presenter in business casual)
2. For each scene: create a new slide in Synthesia, paste the narration, and upload the matching slide screenshot as the background
3. Use a dark background overlay at ~50% opacity so the avatar is clearly visible over the slide
4. Voice style: calm, authoritative, slightly energized — like a VP presenting to a technical audience
5. Total scenes: **11** (some slides are grouped)

---

## SCENE 1 — Title Slide
**Slide:** Intro (Slide 1)  
**Duration:** ~25 seconds  
**Background:** Title slide screenshot  

> My name is Barak Rozenfeld. I'm a senior product manager with deep experience in infrastructure software, HW/SW systems, and cloud architecture. This is a strategy presentation I've built for NVIDIA's DOCA Product Group — specifically for the role of Product Strategy Lead for ConnectX and BlueField. What you're about to see is not a generic application. It's how I think about the problem, and what I'd do about it.

---

## SCENE 2 — The Hook: The $350M Problem
**Slide:** Problem & Solution (Slide 3)  
**Duration:** ~45 seconds  
**Background:** Problem/Solution slide with the flow diagrams  

> Let me start with a question. You just invested one billion dollars in one thousand H100 GPUs for AI training. They are running at sixty-five percent utilization. Where did the other thirty-five percent go?

> The answer is: the Host CPU. In a typical AI cluster, every network packet — every piece of data going to and from those GPUs — passes through the host CPU first. At four hundred gigabits per second, the CPU is overwhelmed. It's doing a job it was never designed to do at this scale.

> The result? Three hundred and fifty million dollars of idle value sitting in a cluster that should be producing AI.

> The fix is DOCA. With ConnectX and BlueField running the DOCA software stack, the CPU is removed from the data path entirely. GPU utilization goes from sixty-five percent to over ninety. That's the platform opportunity in one slide.

---

## SCENE 3 — What is DOCA
**Slide:** DOCA: The Programmability Layer (Slide 4)  
**Duration:** ~35 seconds  
**Background:** DOCA stack layer diagram  

> DOCA is not just a software development kit. It is the adoption layer — the bridge between NVIDIA's powerful hardware and actual, repeatable, production-grade deployments in the real world.

> Think of it as a five-layer stack. At the top: customer solutions — AI networking, security, storage. In the middle: the DOCA software platform, with its microservices, APIs, drivers, and orchestration tools. Underneath that: BlueField DPU, the programmable infrastructure processor. Then ConnectX SuperNIC at four hundred gigabits, with RDMA and hardware offload. And at the foundation: the AI factory data center itself.

> The product gap isn't the hardware. The hardware is exceptional. The gap is making that hardware deployable at scale, reliably, by real customers. That's what DOCA solves. And that's the job.

---

## SCENE 4 — Market & Competitive Context
**Slide:** Market Landscape (Slide 5) + Key Customers (Slide 6)  
**Duration:** ~35 seconds  
**Background:** Competitive landscape / market slide  

> The market context matters here. NVIDIA holds a strong position in the NIC and DPU space, but the competition is real — Broadcom, Intel, AMD — and the bigger threat isn't even a competing product. It's the hyperscalers building their own.

> AWS built Nitro because they couldn't easily program NVIDIA hardware for their cloud architecture. Microsoft built MAIA. Google built TPUs. Every time a hyperscaler builds custom silicon, that's a customer that no longer buys ConnectX or BlueField. DOCA is the answer to that. It makes NVIDIA hardware programmable enough that building your own stops making economic sense.

---

## SCENE 5 — Market Urgency: Why DOCA Drives Revenue
**Slide:** Why DOCA Drives NVIDIA Revenue (Slide 7)  
**Duration:** ~40 seconds  
**Background:** Market urgency / flywheel slide  

> Here's why DOCA isn't just a software product — it's a revenue engine.

> When DOCA offloads the CPU bottleneck, GPU utilization goes from sixty-five to over ninety percent. AI teams can run more experiments. More experiments produce more value. More value justifies bigger AI investments. Bigger AI investments mean NVIDIA sells larger clusters, sooner. And every new rack in that cluster includes an H100, a ConnectX SuperNIC, a BlueField DPU, and a DOCA license.

> AI demand is elastic. Better efficiency creates more demand, not less. Think of it like faster internet: it didn't reduce usage, it created an explosion of usage. That's the flywheel DOCA powers.

---

## SCENE 6 — The Strategy Decision
**Slide:** How the Strategy Was Chosen (Slide 8)  
**Duration:** ~30 seconds  
**Background:** Strategic alternatives slide  

> Before committing to a strategy, I evaluated five options: API and SDK expansion, Solution Blueprints, Cloud-Native integration, Observability and validation tooling, and Partner ecosystem development.

> I scored each against four criteria: customer impact, speed to value, revenue pull, and feasibility. The winner — by a significant margin — was Solution Blueprints. And the key insight is this: Blueprints aren't one strategy competing against the others. A good blueprint *requires* solid APIs, deploys via Kubernetes, ships with observability, and gets co-marketed with partners. Choosing Blueprints pulls all five strategies into one coherent motion.

---

## SCENE 7 — The Chosen Strategy: DOCA Solution Blueprints
**Slide:** DOCA Solution Blueprints — Chosen Strategy (Slide 9)  
**Duration:** ~40 seconds  
**Background:** Chosen strategy / adoption flow slide  

> The strategy is DOCA Solution Blueprints. And the principle behind it is simple: customers do not adopt platforms. They adopt solutions to painful problems.

> A Blueprint is a complete, production-ready package for a specific use case. It includes a reference architecture, a reference application, a deployment guide, a validation checklist, performance benchmarks, observability hooks, an ROI model, and a pilot playbook.

> The adoption flow is: identify customer pain → define the use case → deliver the Blueprint → customer runs POC → reaches production → account expands. Shorten every step in that path, and you multiply NVIDIA's growth.

> The five priority use cases I'd focus on first: AI cluster networking offload, secure multi-tenant DPU infrastructure, storage acceleration, cloud-native DPU-as-a-Service, and observability and validation tooling for rollout at scale.

---

## SCENE 8 — Example Blueprint: AI Cluster Networking Offload
**Slide:** Blueprint: AI Cluster Networking Offload (Slide 11)  
**Duration:** ~35 seconds  
**Background:** Blueprint example slide  

> Let me make this concrete with Blueprint number one: AI Cluster Networking Offload.

> The pain: as GPU clusters scale, the host CPU cycles spent on networking and telemetry grow proportionally. The CPU becomes the bottleneck in the most expensive infrastructure in the world.

> The solution: ConnectX SuperNIC plus BlueField DPU, running DOCA Flow, GPUNetIO, Telemetry, and Firefly. The delivered package is a reference architecture, a working application, a deployment guide, and a validation checklist.

> The measured outcomes: GPU utilization from sixty-five to ninety-two percent. Host CPU load from I/O drops from ninety-four percent to twenty. Time to deploy: from weeks to one day. One validated Blueprint becomes the template for every AI networking deployment that follows. Validate once. Replicate at scale.

---

## SCENE 9 — ROI & Metrics
**Slide:** ROI & Success Metrics (Slide 12)  
**Duration:** ~30 seconds  
**Background:** ROI / KPIs slide  

> A good strategy is only as strong as its measurement framework.

> My north star metric is simple: how many active Blueprints are running in production? Everything else flows from that. Technical KPIs track CPU offload percentage, latency, and GPU utilization. Operational KPIs track time to first deployment and pilot-to-production conversion rate. Business KPIs track ConnectX and BlueField attach rates, design wins, and account expansion velocity.

> And importantly: these numbers are hypotheses to validate with customers and field teams — not assumed targets. Strong strategy starts with measurable questions, not predetermined answers.

---

## SCENE 10 — How This Was Built
**Slide:** How I Built This (Slide 13)  
**Duration:** ~25 seconds  
**Background:** Method / How I built this slide  

> One more thing worth noting: this entire presentation — fourteen interactive slides with animations, data visualizations, and a live demo — was built in one day using Cursor AI as the production tool.

> The research is mine. The strategy is mine. The framework, the choice of blueprints, and every argument you've seen — that's the actual work. AI handled the production layer. This is what a modern product manager should look like: high-quality artifacts, built fast, without cutting corners on thinking.

---

## SCENE 11 — Why Barak Rozenfeld
**Slide:** Why Barak Rozenfeld (Slide 14)  
**Duration:** ~40 seconds  
**Background:** Why Barak slide  

> So why me for this role?

> Three reasons that map directly to what NVIDIA needs. First: I'm a technical and product bridge. I've led system-level software and complex hardware-software products through their full lifecycle — architecture, requirements, roadmap, delivery, and adoption. I understand the stack DOCA runs on.

> Second: adoption-driven execution is my core motion. I operate exactly at the point where "technically impressive" becomes "running in production at scale." Closing the POC-to-production gap is what I do.

> Third: I lead cross-functional teams. Engineering, architecture, program management — in complex, international organizations. I translate customer needs into precise requirements that teams can actually build.

> My strongest contribution is the bridge between deep infrastructure technology, product execution, and repeatable customer value. I don't just understand DOCA's potential. I know how to build the strategy that makes it land.

> Thank you. I look forward to the conversation.

---

## PRODUCTION NOTES

| Scene | Slide File to Screenshot | Approx Duration |
|-------|--------------------------|-----------------|
| 1 | Intro / Title | 0:00 – 0:25 |
| 2 | Problem & Solution | 0:25 – 1:10 |
| 3 | What is DOCA | 1:10 – 1:45 |
| 4 | Market Landscape | 1:45 – 2:20 |
| 5 | Market Urgency | 2:20 – 3:00 |
| 6 | Strategic Alternatives | 3:00 – 3:30 |
| 7 | Chosen Strategy | 3:30 – 4:10 |
| 8 | Example Blueprint | 4:10 – 4:45 |
| 9 | ROI & KPIs | 4:45 – 5:15 |
| 10 | How I Built This | 5:15 – 5:40 |
| 11 | Why Barak Rozenfeld | 5:40 – 6:20 |

**Total estimated runtime: ~6 minutes 20 seconds**

---

## TIPS FOR RECORDING IN SYNTHESIA

- **Avatar placement:** bottom-right corner, circular crop — keeps the slide content visible
- **Background:** use each slide screenshot at full width; lower opacity to ~85% if avatar text is hard to read
- **Voice:** choose a male voice, "confident" or "professional" tone, neutral accent
- **Pauses:** add a 0.5 second pause (use `...` or a line break in Synthesia) between paragraphs
- **Slide timing:** Synthesia auto-splits by scene; set each scene duration to match the target above
- **Music:** optional subtle background music at very low volume (Synthesia has built-in options)
