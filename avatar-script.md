# Avatar Narration Script — "DOCA Solution Blueprints"
### Self-introduction deck for VP Product / Senior PM — narrated by an AI avatar of Barak Rozenfeld

**How to use this file**
- One script block per slide, in the exact order the deck plays (1→18).
- Written to be spoken, not read — short sentences, natural pauses (marked `//`), first person.
- Target pace ~150 wpm. Each block is roughly 40–70 seconds, so the full video lands around 15–18 minutes. Trim freely for a tighter cut (a 6–8 minute version is noted at the end).
- Drop each block straight into Synthesia (or your avatar tool of choice) as the script for the matching slide/scene.
- `//` = natural pause / beat. **Bold** = words to land with emphasis.

---

## Slide 1 — Intro
**On screen:** DOCA Solution Blueprints — title slide, Barak's photo and pitch card

> Hi, I'm Barak Rozenfeld. // I'm applying for the VP Product / Senior PM role on NVIDIA's DOCA platform, and instead of sending you a resume, I built you this.
>
> This is an eighteen-slide product strategy for turning DOCA — NVIDIA's most advanced infrastructure platform — into actual production deployments. // Not a feature list. Not a wishlist. A strategy built from first principles, the same way I'd build one on day one of this job.
>
> Here's the short version: **eighty-seven percent** of DOCA proof-of-concepts never make it to production. That's real money sitting idle — **three hundred fifty million dollars** in a single one-billion-dollar GPU cluster. // I evaluated five different ways to fix that, chose one, and built the execution plan, the risk register, and the success metrics around it.
>
> Every number you're about to see traces back to a source and a mechanism — I'll show you exactly how. // Let's get into it.

---

## Slide 2 — Agenda
**On screen:** The Agenda — 16 sections color-coded Business / Technical / Market Context

> Here's how I've organized this. // Sixteen sections, color-coded so you always know what kind of thinking you're looking at.
>
> **Green** is business — the strategy, the market, the metrics. **Blue** is technical — the architecture, how DOCA actually works. **Orange** is market context — competitors, customers, timing.
>
> We'll start with the problem and why today's solutions fall short. // Then I'll walk through what DOCA is, why the market is moving right now, and who's actually buying. // From there, I'll show you the strategic choice I made — and the four I didn't — followed by what that strategy looks like when it's actually built. // I'll close with the risks I'd watch, the metrics I'd own, and a bit about how I think and why I'm the right person for this.
>
> Nothing here is decoration. // Every section earns its place in the argument.

---

## Slide 3 — Problem & Solution
**On screen:** $1B GPU cluster at 65% utilization; the CPU-bottleneck flow diagram; ConnectX / BlueField / DOCA product cards

> Let's start with the number that started everything for me. // You just spent **one billion dollars** on a thousand H100 GPUs for AI training. // They're running at **sixty-five percent** utilization.
>
> Where did the other thirty-five percent go? // It went to the host CPU. // Every single network packet in that cluster has to pass through it — and at four hundred gigabits a second, the CPU simply can't keep up. Your most expensive hardware in the world is sitting there, idle, waiting for data.
>
> This is exactly the problem DOCA was built to solve. // ConnectX moves the data at wire speed. BlueField — NVIDIA's DPU — takes the CPU out of the path entirely. And DOCA is the software layer that makes all of that programmable, deployable, and repeatable. // Remove the CPU from the data path, and that same cluster runs at ninety percent-plus. // That's the technical story. The rest of this deck is the business story of how you actually get there.

---

## Slide 4 — The Problem Space (Why Existing Solutions Fall Short)
**On screen:** 87% POC failure / 9-month deployment / $800K cost; four partial approaches (open source, SI partners, cloud-managed NICs, NVIDIA PS)

> So if the technology solves the problem, why do **eighty-seven percent** of DOCA proof-of-concepts still fail before they reach production? // Why does it take an average of **nine months** to get one live — and cost upward of **eight hundred thousand dollars** in custom integration?
>
> I looked at four approaches the market already tries. // Open-source frameworks like DPDK give you raw performance, but every team ends up writing the same two hundred thousand lines of boilerplate. // Systems integrators can deliver a working deployment, but at that price, and the knowledge stays with them, not the customer. // Cloud-managed NICs — AWS Nitro, Azure MAIA — are elegant, but every H100 running on them is a DOCA deployment NVIDIA doesn't own, and they don't work on-prem at all. // Even NVIDIA's own Professional Services team does gold-standard work — but it can't scale past NVIDIA's own headcount.
>
> Four real solutions. // Four real gaps. // What's missing across all of them is the same thing: a scalable, NVIDIA-owned software platform. // That's the opening.

---

## Slide 5 — Why DOCA Wins (Why DOCA Is the Most Significant Answer)
**On screen:** 6× deployment speed, 55% hardware market share, $600B CapEx wave; DOCA vs. alternatives comparison table

> Here's why I believe DOCA — done right — is the most significant answer on the table, not just *a* good one.
>
> First, speed. DOCA's APIs and Solution Blueprints can collapse that nine-month deployment down to about **six weeks** — a **six-times** improvement — not by making engineers work harder, but by eliminating the sixty-five percent of that time that's pure boilerplate.
>
> Second, NVIDIA already owns **fifty-five percent** of the AI DPU market. // Without DOCA, that's fifty-five percent of hardware sitting on racks, waiting for someone to write integration code. With DOCA, it becomes a living, programmable ecosystem.
>
> Third, and this is the one that matters to a CFO: the **six-hundred-billion-dollar** AI infrastructure wave through 2028 is currently captured as one-time hardware revenue. // DOCA is the mechanism that turns that into recurring software and platform revenue.
>
> And here's the unfair advantage: no competitor can replicate this, because NVIDIA owns the hardware, the firmware, *and* the software stack, end to end. // This is the CUDA playbook, applied to infrastructure.

---

## Slide 6 — What is DOCA
**On screen:** Five-layer stack — Customer Solutions, DOCA, BlueField DPU, ConnectX SuperNIC, Infrastructure

> Let me make sure we're aligned on what DOCA actually *is*, because this matters for how I'd manage it.
>
> It's not just an SDK. // Picture five layers. At the bottom, the AI factory infrastructure itself. Above that, ConnectX — the SuperNIC moving data at four hundred gigabits a second. Above that, BlueField — the DPU, with its own programmable ARM cores. // And sitting right on top of the hardware is DOCA: the APIs, the microservices, the drivers — things like DOCA Flow, GPUNetIO, Telemetry — that make all of that hardware power *usable*. On top of DOCA sit the actual customer solutions: AI networking, security, storage, cloud-native services.
>
> The product insight I want you to take away: // DOCA is the **adoption layer**. It's the bridge between "this hardware is extraordinary" and "this is running in someone's production environment." // That gap — between capability and adoption — is the product opportunity. It's exactly the kind of gap I've spent my career closing.

---

## Slide 7 — Market Urgency
**On screen:** 65% util / $350M idle / 2-3× faster expansion; sales flywheel; custom-ASIC threats (AWS Nitro, Azure MAIA, Google TPU)

> Why does this matter *right now*, and not in some future roadmap cycle?
>
> Every point of GPU utilization NVIDIA recovers is worth about **ten million dollars** per billion-dollar cluster. // And when a customer proves their GPUs deliver strong ROI, they come back for the *next* cluster two to three times faster. That's the flywheel: DOCA offloads the bottleneck, teams run more experiments, the organization invests more in AI, and NVIDIA sells bigger clusters, sooner.
>
> But there's urgency on the other side too. // AWS built Nitro, Microsoft built Azure MAIA, Google built its TPU — all in part because NVIDIA hardware wasn't easy enough to program for their needs. // Every hyperscaler that builds its own silicon is a customer that stops buying ConnectX and BlueField.
>
> DOCA is the moat that prevents that. // The real question isn't just "how do we sell more GPUs" — it's "how do we stay the platform the industry builds on."

---

## Slide 8 — Market Landscape
**On screen:** Competitive donut chart — NVIDIA 55%, Broadcom 22%, Intel/Marvell 15%, AMD 5%; customer segments and ecosystem

> Let's ground this in the actual market. // NVIDIA holds **fifty-five percent** of the AI DPU and SmartNIC market. Broadcom's at twenty-two, Intel and Marvell at fifteen, AMD around five.
>
> Here's what most competitive slides miss: // Broadcom and Intel together are thirty-seven percent of the market with **no software story**. Neither has a DOCA equivalent. // That's the structural gap that makes NVIDIA's hardware lead defensible — but only as long as DOCA keeps making that hardware meaningfully easier to use than the alternatives. The moment DOCA becomes commodity, that lead erodes. I'd treat that as a live risk, not a settled fact.
>
> On the customer side, hyperscalers, GPU clouds, enterprises, and telco/edge each need this for a different reason — scale, speed, time-to-value, or latency guarantees. // And DOCA has to integrate cleanly with Kubernetes, storage systems, security tooling, and observability stacks customers already run. // This window to own the open DPU software category is open right now. It won't stay open indefinitely.

---

## Slide 9 — Key Customers
**On screen:** Customer revenue mix donut; Azure, Meta, Google, CoreWeave, Lambda/Together AI, Oracle Cloud

> Who's actually buying, and why should you care? // Hyperscalers are forty percent of this revenue — Azure alone has offloaded millions of servers onto BlueField. Meta trained Llama 2 and Llama 3 on a ConnectX-7 fabric carrying over a hundred thousand GPUs.
>
> GPU cloud is the fastest-growing segment at twenty-eight percent. // CoreWeave went public at a twenty-three-billion-dollar valuation and grew ten-times in two years — and their entire business runs on ConnectX. When DOCA raises their GPU utilization, they sell more capacity, and NVIDIA sells more H100s. Their growth *is* NVIDIA's growth.
>
> Enterprise is twenty percent — Oracle Cloud's bare-metal differentiation is literally built on BlueField, and it's becoming the reference architecture other enterprise clouds copy.
>
> The pattern across every one of these accounts is the same: // they all need ConnectX for speed and BlueField for programmability. DOCA is the layer that decides how fast they deploy — and how fast NVIDIA sells the next cluster.

---

## Slide 10 — Strategic Alternatives
**On screen:** Four eliminated options (API expansion, cloud-native integration, observability, partner ecosystem); Solution Blueprints as the chosen path

> Now the part I actually get evaluated on: the decision itself. // I looked at five ways to attack this problem, and I want to walk you through the four I *didn't* choose, because the reasoning matters as much as the answer.
>
> Expanding the APIs solves developer ergonomics — but customers with great API access still fail their POCs, because the bottleneck is integration, not the SDK. // Deeper cloud-native integration is the right long-term direction, but it's a two-to-three-year build, and it can't help anyone failing a POC today. // Better observability tells you exactly where you're stuck — but knowing where you're stuck doesn't unstick you. // And leaning on partners depends entirely on their execution, with no leverage over quality.
>
> What I chose instead: **Solution Blueprints** — a complete, validated, production path for one specific use case at a time. // And here's the forcing function I designed in on purpose: a great Blueprint *requires* solid APIs, ships cloud-native by default, and needs observability built in. // Choosing Blueprints doesn't eliminate the other four options — it makes all of them mandatory, pulled into one roadmap instead of four competing initiatives.

---

## Slide 11 — Chosen Strategy
**On screen:** Adoption flow (Pain → Use Case → Blueprint → POC → Production → Expansion); Blueprint contents; 5 priority use cases

> So what does "Blueprints" actually mean as a product? // A Blueprint is a package: a reference architecture, a working reference application, a deployment guide, a validation checklist, performance benchmarks, observability hooks, an ROI model, and a pilot playbook — everything a team needs to go from painful problem to production deployment, in one motion.
>
> I prioritized five use cases: AI cluster networking offload, secure multi-tenant DPU infrastructure, storage acceleration, DPU-as-a-service for cloud-native teams, and observability for rollout itself.
>
> The core principle driving all of it: // customers don't adopt platforms. They adopt solutions to painful problems. // My job as the PM here is to shorten the path from "interesting technology" to "production value" — and make that path measurable, not just technically impressive.

---

## Slide 12 — Example Blueprint
**On screen:** Blueprint #1 — AI Cluster Networking Offload; spec table; before/after metrics

> I didn't want to leave this abstract, so here's Blueprint number one, spec'd out the way I'd actually ship it: **AI Cluster Networking Offload**.
>
> Target customer: AI platform teams and hyperscaler infrastructure engineers. // Hardware: ConnectX SuperNIC plus BlueField DPU. // It uses DOCA Flow, GPUNetIO, Telemetry, and Firefly. // Success is defined precisely: GPU utilization above ninety percent, host CPU I/O load under twenty-five percent, and a new cluster live within one day of setup.
>
> The expected impact: GPU utilization moves from **sixty-five to over ninety percent**. Host CPU load from networking drops from around ninety percent down to under twenty. // And once this Blueprint exists, replicating it across a new cluster drops from two-to-three weeks down to **under a day**.
>
> This is the piece that proves the strategy is executable, not just directionally correct. // Validate it once, and it becomes the template for every AI-networking deployment across the fifty-five thousand-plus BlueField DPUs already out there.

---

## Slide 13 — Product Strategy Alignment
**On screen:** ConnectX / BlueField / DOCA parallel tracks; execution Gantt roadmap Q3 2026 → 2027+

> A strategy only works if the pieces around it move at the same time, so here's how I'd sequence the actual execution. // ConnectX, BlueField, and DOCA aren't three separate roadmaps — they're four *parallel* tracks: hardware, software, the Blueprint itself, and go-to-market.
>
> Hardware has to ship on schedule, or every Blueprint timeline slides with it. // Blueprints are built directly on top of DOCA's APIs — if those APIs are unstable, the Blueprint breaks in production, not in the lab. // The Blueprint track is the customer-facing front door — but it can't be validated until hardware and software are stable. // And a Blueprint sitting in a catalog that nobody deploys solves nothing — that's what the go-to-market track, developer portal, and partner certification are for.
>
> I mapped this out quarter by quarter, from right now through 2027 and beyond, with clear ownership and milestones at every stage — because a plan that isn't sequenced is just a wish list with better formatting.

---

## Slide 14 — Foundational Assumptions
**On screen:** Five ranked assumptions with confidence levels and de-risking actions

> Everything I've shown you so far is built on beliefs I haven't proven yet. // I think naming them honestly — and telling you exactly how I'd test each one fast — is what separates a real plan from a hopeful one.
>
> The two that carry the most weight: // First, that the eighty-seven percent POC failure rate is really driven by integration complexity, and not budget or internal politics — if I'm wrong about that, Blueprints solve the wrong problem. I'd run ten failed-POC post-mortems to check. // Second, that sixty-five percent of that nine-month cycle really is reusable boilerplate, not bespoke work — that's the number the entire "nine months to six weeks" claim rests on. I'd validate it with one design-partner pilot before scaling the claim any further.
>
> I also flagged the assumption that customers will accept deeper platform dependency as friction drops, that there's an eighteen-to-twenty-four-month window before this space commoditizes, and that field teams will actually promote Blueprints rather than protect their own integration revenue.
>
> If assumption one or two breaks, I don't throw out the strategy — I re-scope which use case ships first, using whatever the post-mortems actually show.

---

## Slide 15 — Execution Discipline (Priorities & Risk)
**On screen:** MoSCoW Year-1 priorities; risk matrix with before/after mitigation

> Two questions every executive asks me at this point: what are we doing first, and what can go wrong.
>
> For year one, using MoSCoW: // **Must-have** is Blueprint number one in general availability, the deployment guide, a ninety-day POC-to-production program, and a developer portal. // **Should-have** is Blueprint number two for storage, an observability dashboard, and partner certification. // Things like a no-code Blueprint builder or vertical-specific Blueprints — I explicitly said **won't-have** in year one. Saying no on purpose is part of the plan.
>
> On risk: my top concern is adoption stalling because the last mile of integration still fails — I mitigate that with a customer success program and a Blueprint pre-flight checklist that catches most integration failures before they happen. // My second: a hyperscaler builds this in-house instead of adopting DOCA — I mitigate that by owning the open standard early, through certification and partner ecosystem lock-in, before they have a reason to build their own.
>
> Every risk on this slide has a documented mitigation, and I show exactly how it moves the risk down the matrix — not just that it "should help."

---

## Slide 16 — DOCA Success Metrics
**On screen:** Four metric cards (GPU util, time-to-production, POC success rate, DOCA adoption); North Star metric

> Here's how I'd know if any of this actually worked — and every number here traces back to something already on this deck.
>
> GPU utilization: sixty-five percent baseline to over ninety percent target. // Time to production: nine months down to about six weeks. // POC success rate: thirteen percent today, to sixty-five percent-plus — I deliberately left room for the roughly thirty-five percent of POCs that fail for reasons no product can fix, like budget cuts or org changes. // And DOCA production adoption across the BlueField installed base: about twenty percent today, targeting sixty percent-plus by year two.
>
> That adoption number is my **North Star**, and here's why: it's the only metric that requires every other metric to already be true. Faster deployment, fewer POC failures, better GPU utilization — all of them have to be working simultaneously for this number to move. // It's not a leading indicator. It's the scoreboard.

---

## Slide 17 — My PM Manifesto (How I Built This)
**On screen:** PM mental loop — Start with Pain → Map Technical Reality → Find the Forcing Function → Trace the Numbers

> I want to take a step back and show you *how* I think, not just what I concluded.
>
> My process has four steps, and it repeats. // I start with pain — the customer's economic reality, in dollars, before I touch a single product surface. In this deck, that's the sixty-five percent utilization number turning into three hundred fifty million idle dollars. That one number shaped every slide that followed. // Then I map technical reality with engineering — not to confirm my ideas, but to stress-test them. // Then I look for the forcing function: the one decision that makes every other decision easier. Blueprints didn't add a feature — they made APIs, cloud-native deployment, and partners all *necessary*, pulled into a single roadmap. // And finally, I trace every number back to a mechanism I control. If I can't trace it, it's not a metric — it's a wish.
>
> I'll be transparent: I used AI tools — Cursor, Claude, ChatGPT, and this Synthesia avatar you're watching right now — to build and narrate this faster. // A PM who uses AI to produce better work, faster, isn't cutting corners. // That's the job, done well, in 2026.

---

## Slide 18 — Why Barak Rozenfeld
**On screen:** Closing pitch; 3 fit pillars; direct job-description match; technical & soft skills

> So, why me. // I'm the PM engineers trust to own the technology, and executives trust to own the strategy. Fifteen years living at that intersection — networking, DPUs, AI infrastructure platforms — and this deck is what that looks like in practice.
>
> Three things I bring: // I've led complex hardware-and-software products through their *full* lifecycle — architecture, requirements, roadmap, delivery, adoption. // I operate exactly where "technically impressive" turns into "running in production at scale" — closing that POC-to-production gap is my core motion, and you just watched me do it for DOCA in real time. // And I've led cross-functional R&D teams across engineering, architecture, and program management inside complex international organizations.
>
> Match that against the job description, point for point: leading product strategy across the full hardware-software lifecycle, deep technical networking background, driving cross-functional teams, forging Tier-1 customer partnerships, translating technical insight into roadmap. // Every one of those, I've done.
>
> Here's my honest pitch: you need a PM who can talk to silicon engineers in the morning and hyperscaler CTOs in the afternoon — and ship product between those two calls. // I've been that person my entire career. // The only question left is whether we do it at NVIDIA.

---

## Optional: Short-form cut (6–8 minutes)
If you need a trimmed version for a first-touch outreach video, use only these six blocks in order:
**Slide 1 (Intro) → Slide 3 (Problem & Solution) → Slide 5 (Why DOCA Wins) → Slide 11 (Chosen Strategy) → Slide 16 (Success Metrics) → Slide 18 (Why Barak Rozenfeld).**
That sequence alone tells the full story: problem → why this solution → what you'd build → how you'd measure it → why you're the one to do it.
