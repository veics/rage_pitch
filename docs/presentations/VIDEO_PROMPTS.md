# RAGE Video Production Prompts

**Version**: 1.0  
**Last Updated**: November 25, 2025  
**Purpose**: Scene-by-scene prompts for AI video generation (Runway, Synthesia, D-ID, HeyGen)

---

## Video 1: Product Demo (90 seconds)

**Target Audience**: General business audience, investors  
**Platform**: Runway ML Gen-3, Synthesia  
**Format**: 1920x1080, 30fps

### Scene 1: Hook (0:00-0:10)

**Voiceover**:
> "Your team wastes 2.5 hours every day searching for information. What if you could get instant answers from your entire knowledge base?"

**Visual Prompt for AI**:
```
Camera angle: Over-shoulder shot of frustrated office worker
Scene: Modern office, natural daylight
Action: Person typing in multiple search bars (Confluence, Slack, Google Drive)
Emotion: Frustration, confusion
Duration: 5 seconds

Transition: Quick cut montage showing:
- Clock ticking rapidly
- Browser tabs multiplying
- Person shaking head
Duration: 5 seconds
```

**Synthesia Avatar Settings**:
- Avatar: Professional female, business casual
- Emotion: Empathetic, understanding
- Background: Modern office blur

---

### Scene 2: Introduce RAGE (0:10-0:25)

**Voiceover**:
> "Meet RAGE - your AI-powered knowledge assistant. Ask questions in plain English, get instant answers from Confluence, Jira, Slack, and more."

**Visual Prompt**:
```
Animation: RAGE logo materializing
Scene: Clean white background with subtle gradients
Action: Logo pulses with energy, then UI elements fly in
Elements appearing:
  - Search bar (center)
  - Document icons (Confluence, Jira, Slack logos)
  - Connection lines forming neural network
Duration: 15 seconds
```

**Motion Graphics** (After Effects style):
- Logo: 3D depth, soft shadows
- UI: Glass morphism effect
- Connections: Animated bezier curves with particles

---

### Scene 3: Live Query Demo (0:25-0:50)

**Voiceover**:
> "Watch how Alice, a new engineer, finds critical deployment information in seconds, not hours."

**Visual Prompt - Part A** (0:25-0:35):
```
Camera: Screen recording style
Scene: RAGE user interface
Action sequence:
  1. Cursor hovers over search bar
  2. Types: "How do I deploy to production?"
  3. Loading animation (1 second)
  4. Results appear with smooth fade-in
Duration: 10 seconds
```

**Screen Content** (design with Figma, export as video):
```
┌────────────────────────────────────────────┐
│  🧠 RAGE                    [Alice Carter] │
├────────────────────────────────────────────┤
│                                             │
│  How do I deploy to production?             │
│  [Search]                                   │
│                                             │
│  ✨ Answer:                                 │
│  To deploy to production, follow these      │
│  steps:                                     │
│                                             │
│  1. Run tests: `make test`                  │
│  2. Create release branch: `git checkout -b│
│     release/v1.2.3`                         │
│  3. Deploy via CI/CD: Push to main branch   │
│  4. Monitor in Grafana dashboard            │
│                                             │
│  📄 Sources:                                │
│  • Deployment Runbook (Confluence)          │
│  • CI/CD Setup Guide (GitHub Wiki)          │
│  • Production Checklist (Jira)             │
└────────────────────────────────────────────┘
```

**Visual Prompt - Part B** (0:35-0:50):
```
Camera: Split screen
Left: RAGE interface (above)
Right: Alice's face (Synthesia avatar)
Action: Alice reads result, nods, smiles
Emotion: Relief, confidence
Background: Home office setup
Duration: 15 seconds
```

---

### Scene 4: Security Highlight (0:50-1:05)

**Voiceover**:
> "RAGE respects your permissions. You only see what you're authorized to access, with complete audit trails for compliance."

**Visual Prompt**:
```
Animation style: 3D isometric security visualization
Scene: Dark background with accent lighting
Elements:
  1. Documents floating in space (0:50-0:53)
  2. User icon approaches documents (0:53-0:56)
  3. Green checkmarks on allowed docs (0:56-0:59)
  4. Red X on restricted docs (blur effect) (0:59-1:02)
  5. Audit trail scrolling (transaction log) (1:02-1:05)
Duration: 15 seconds
```

**Color Scheme**:
- Allowed: Green (#10B981) with glow
- Restricted: Red (#EF4444) with blur
- Background: Dark blue (#1E293B)
- Highlights: Cyan accent (#06B6D4)

---

### Scene 5: Call to Action (1:05-1:30)

**Voiceover**:
> "RAGE works with your existing tools, deploys in minutes, and scales with your team. Ready to transform how your team finds knowledge? Visit rage.ai to get started."

**Visual Prompt - Part A** (1:05-1:15):
```
Animation: Integration showcase
Scene: Conveyor belt metaphor
Action: Logos scroll across screen:
  - Confluence → RAGE
  - Jira → RAGE
  - Slack → RAGE
  - GitHub → RAGE
  - Google Drive → RAGE
Each logo connects with animated line
Duration: 10 seconds
```

**Visual Prompt - Part B** (1:15-1:25):
```
Camera: Zoom out reveal
Scene: RAGE deployed across multiple screens
Action: 
  - Desktop (admin dashboard)
  - Laptop (user query)
  - Tablet (analytics)
  - Phone (Slack bot)
All screens synchronized, showing same query
Duration: 10 seconds
```

**Visual Prompt - Part C** (1:25-1:30):
```
Camera: Center frame
Scene: Clean white background
Elements:
  - RAGE logo (large, centered)
  - Website URL: rage.ai
  - CTA button: "Start Free Trial"
Duration: 5 seconds
```

---

## Video 2: Technical Architecture Explainer (2 minutes)

**Target Audience**: Engineering teams, technical decision-makers  
**Platform**: Manim (Python animation library) or D-ID  
**Format**: 1920x1080, 60fps

### Scene 1: The Problem - Data Silos (0:00-0:20)

**Voiceover**:
> "Enterprise data lives in isolated silos. Each system has its own search, its own permissions, its own API. Engineers waste hours context-switching between tools."

**Visual Prompt**:
```
Animation: Islands emerging from ocean
Scene: Dark water background
Action:
  - 5 islands rise from water (each labeled: Confluence, Jira, Slack, Drive, GitHub)
  - Islands rotate independently
  - Person (stick figure) jumps between islands
  - Frustration emoji appears
Duration: 20 seconds
```

**Manim Code Snippet** (for developers):
```python
class DataSilos(Scene):
    def construct(self):
        # Create islands
        islands = VGroup(*[
            Circle(radius=1, fill_color=BLUE, fill_opacity=0.5)
            .add(Text(name).scale(0.5))
            for name in ["Confluence", "Jira", "Slack", "Drive", "GitHub"]
        ]).arrange(RIGHT, buff=1)
        
        # Animate emergence
        self.play(LaggedStart(*[GrowFromCenter(i) for i in islands]))
        self.wait(1)
```

---

### Scene 2: RAGE Architecture - The Bridge (0:20-0:45)

**Voiceover**:
> "RAGE unifies these silos with a hybrid search architecture. Vector embeddings for semantic understanding, graph database for relationships, and keyword search for precision."

**Visual Prompt**:
```
Animation: Bridge building
Scene: Same islands from Scene 1
Action:
  - Central platform appears (RAGE logo)
  - Bridges extend from RAGE to each island
  - Data flows across bridges (particle effect)
  - All islands now connected
Duration: 25 seconds
```

**Particle Flow** (style reference):
- Particles: Small glowing orbs
- Color: Gradient from island color to RAGE purple
- Speed: 2 seconds island → RAGE
- Quantity: 50-100 particles per island

---

### Scene 3: Hybrid Search Explained (0:45-1:10)

**Voiceover**:
> "When you query RAGE, three search engines work in parallel. Vector search finds semantic matches, graph search discovers relationships, and keyword search ensures precision. Results are merged and re-ranked for maximum relevance."

**Visual Prompt**:
```
Animation: Parallel pipeline
Scene: 3 lanes showing concurrent processing
Action sequence:
  1. Query enters (text: "deployment to production") (0:45-0:48)
  2. Splits into 3 lanes (0:48-0:50)
  
  Lane 1 - Vector Search (0:50-0:55):
    - Embedding visualization (text → numbers)
    - Similarity matching (distance calculation)
    - Results: 10 documents
  
  Lane 2 - Graph Search (0:50-0:55):
    - Knowledge graph traversal animation
    - Nodes lighting up as traversed
    - Results: 8 documents
  
  Lane 3 - Keyword Search (0:50-0:55):
    - Text matching (highlighting keywords)
    - BM25 scoring visualization
    - Results: 12 documents
  
  3. Lanes merge (0:55-1:00)
  4. Re-ranking (documents shuffle, scores update) (1:00-1:05)
  5. Top 10 results emerge (1:05-1:10)
Duration: 25 seconds
```

---

### Scene 4: ACL Enforcement Layer (1:10-1:35)

**Voiceover**:
> "Security isn't an afterthought. Every document is checked against your permissions before you see it. Batch ACL checks ensure this happens in milliseconds, not seconds."

**Visual Prompt**:
```
Animation: Security checkpoint
Scene: Documents flowing on conveyor belt
Action:
  1. 20 documents approach checkpoint (1:10-1:15)
  2. User badge appears (Alice, Engineering group) (1:15-1:18)
  3. ACL Service scans each document (1:18-1:25):
     - Green checkmark: 12 documents (pass through)
     - Red X: 8 documents (blocked, fade out)
  4. Allowed documents continue to user (1:25-1:30)
  5. Audit log records activity (1:30-1:35)
Duration: 25 seconds
```

**Visual Style**:
- Conveyor belt: Metallic, industrial
- Documents: Floating cards with icons
- Checkpoint: Glowing blue scanner beam
- Audit log: Matrix-style scrolling text

---

### Scene 5: Deployment & Scale (1:35-2:00)

**Voiceover**:
> "Deploy RAGE in minutes with Podman or Kubernetes. Start with a single server, scale to thousands of users. All with built-in monitoring, alerting, and observability."

**Visual Prompt**:
```
Animation: Scale visualization
Scene: Server racks appearing
Action:
  1. Single server materializes (1:35-1:40)
  2. RAGE containers boot (progress bars) (1:40-1:45)
  3. Metrics dashboard appears above server (1:45-1:50)
  4. User count increases (1 → 10 → 100 → 1000) (1:50-1:55)
  5. Server multiplies (1 → 3 → 10 servers) (1:55-2:00)
Duration: 25 seconds
```

**End Frame**:
```
┌────────────────────────────────────────────┐
│                                             │
│           🧠 RAGE                           │
│                                             │
│   Hybrid Search • ACL-Native • Self-Hosted │
│                                             │
│           github.com/rage/rage              │
│                                             │
└────────────────────────────────────────────┘
```

---

## Video 3: Customer Success Story (60 seconds)

**Target Audience**: Decision-makers, potential customers  
**Platform**: Synthesia (AI avatar), stock footage  
**Format**: 1920x1080, 30fps

### Scene 1: Customer Introduction (0:00-0:15)

**Voiceover** (Synthesia avatar):
> "Meet TechCo, a 200-person software company. Before RAGE, their engineers spent hours every week searching for deployment procedures, API documentation, and troubleshooting guides."

**Visual**:
```
Stock footage: Modern office (Pexels/Unsplash)
Text overlay:
  - TechCo
  - 200 employees
  - Series B SaaS company
Duration: 5 seconds

Cut to: Frustrated engineer at desk (stock footage)
Text overlay:
  - Time wasted searching: 2.5 hours/day
  - Cost: $150K/year in lost productivity
Duration: 10 seconds
```

---

### Scene 2: Implementation (0:15-0:30)

**Voiceover**:
> "TechCo deployed RAGE in one afternoon. They connected Confluence, GitHub, and Jira, and immediately had a searchable knowledge base with full ACL enforcement."

**Visual**:
```
Animation: Timeline
0:15 - Logo sequence: RAGE + Confluence + GitHub + Jira
0:20 - Progress bar: "Deploying RAGE..." (fast animation)
0:25 - Checkmark: "Deployed in 4 hours"
0:30 - Transition
```

---

### Scene 3: Results (0:30-0:50)

**Voiceover**:
> "The results were immediate. Engineers found answers 10x faster. New hires became productive in 7 weeks instead of 12. And TechCo saved $120,000 per year."

**Visual**:
```
Infographic animation:

Metric 1 (0:30-0:35):
  Search time: 2.5 hours → 15 minutes
  (Clock icon shrinking)

Metric 2 (0:35-0:40):
  Onboarding: 12 weeks → 7 weeks
  (Calendar pages flipping)

Metric 3 (0:40-0:45):
  Savings: $120,000/year
  (Dollar signs stacking)

Metric 4 (0:45-0:50):
  Employee satisfaction: +35%
  (Star rating increasing 3★ → 5★)
```

---

### Scene 4: Testimonial (0:50-1:00)

**Voiceover** (Synthesia avatar, different from narrator):
> "RAGE transformed how our team works. It's like having a senior engineer available 24/7."
> — Sarah Chen, VP Engineering, TechCo

**Visual**:
```
Synthesia Avatar:
  - Professional Asian female
  - Business casual attire
  - Modern office background
  - Confident, enthusiastic emotion
Duration: 10 seconds

End frame:
  - RAGE logo
  - "Start your free trial: rage.ai"
```

---

## Production Notes

### AI Video Generation Tools

**Runway Gen-3 Alpha**:
```yaml
Best for: 
  - Short clips (5-10 seconds)
  - Realistic motion
  - Camera movements

Prompts:
  - Be specific about camera angle
  - Specify lighting (natural, studio, dramatic)
  - Include emotion keywords
  - Request smooth motion ("slow pan", "gentle zoom")

Settings:
  - Resolution: 1920x1080
  - Frame rate: 24 fps (cinematic) or 30 fps (standard)
  - Duration: 5-10 seconds per generation
  - Extend: Chain multiple generations for longer clips
```

**Synthesia**:
```yaml
Best for:
  - Professional voiceovers with avatar
  - Consistent branding
  - Multi-language support

Avatar selection:
  - Professional tier: 100+ avatars
  - Custom avatar: Upload photo ($1K setup)
  - Emotion control: Happy, serious, enthusiastic

Script tips:
  - Mark pauses with [pause 1s]
  - Emphasize words with *italics*
  - Natural speech patterns (avoid wall of text)
```

**D-ID**:
```yaml
Best for:
  - Realistic talking heads
  - Custom faces from photos
  - Quick turnaround

Settings:
  - Voice: AWS Polly, Azure TTS, or upload audio
  - Expression: Neutral, happy, serious
  - Background: Solid color, image, or video
```

---

## Video 4: Distributed Network Architecture (120 seconds)

**Target Audience**: Technical decision-makers, CTOs, infrastructure teams  
**Platform**: Google Veo (Nano Banana), Runway Gen-3  
**Format**: 1920x1080, 30fps  
**Purpose**: Showcase RAGE's distributed capabilities and global network infrastructure

### Scene 1: Problem - Data Silos Across Organizations (0:00-0:20)

**Voiceover**:
> "Enterprise knowledge is trapped in silos. Your team in New York can't access documentation from your London office. Partners can't search your knowledge base. Remote sites have high-latency access. This costs millions in lost productivity."

**Visual Prompt for Google Veo**:
```
Camera: Aerial drone shot, slowly descending
Scene: Split-screen showing three office buildings in different cities (NYC, London, Tokyo)
Elements:
  - Left: Modern office tower, New York skyline, daytime
  - Center: Glass building, London fog, evening
  - Right: Tech campus, Tokyo neon lights, night
  
Visual metaphor: Each building has a glowing "data bubble" around it, isolated
Animation: Data particles (glowing dots) bouncing inside each bubble, unable to escape
Color palette: Cool blues and grays for isolation feeling

Transition: Zoom into network cables underground, showing disconnection
Duration: 10 seconds

Camera movement: Slow push-in to center building
Mood: Professional but highlighting fragmentation
Lighting: Natural office lighting with slight blue tint for tech feel
```

**UI Mockup Overlay** (appears at 0:10):
```
Position: Lower third
Content: Mockup of RAGE admin dashboard showing:
  - "Network Status: DISCONNECTED" in red
  - Map with 3 isolated dots (no connections)
  - Latency: >300ms
  - Sync Status: "Manual only"
  
Design specs:
  - Dashboard background: Dark theme (#1a1a2e)
  - Accent color: Red (#e74c3c) for disconnected state
  - Font: Inter, 14px for labels, 24px for metrics
  - Icons: Feather icon set
```

---

### Scene 2: Solution - RAGE Distributed Network (0:20-0:50)

**Voiceover**:
> "RAGE transforms your knowledge infrastructure. One unified network connecting all your instances. Peer-to-peer replication with libp2p. Multi-CDN delivery through Cloudflare, Fastly, and AWS CloudFront. Secure federation with explicit trust controls. Your data, everywhere it needs to be."

**Visual Prompt for Google Veo**:
```
Camera: God's eye view rotating slowly around a 3D network
Scene: Animated global map with glowing connection lines

Phase 1 (0:20-0:30): Network formation
  - Same three buildings from Scene 1
  - Bright green/cyan connections form between them (P2P mesh)
  - Data particles now flowing freely along connection lines
  - Connection lines pulse with data flow

Phase 2 (0:30-0:40): CDN layer appears
  - Glowing hexagonal overlay appears (representing CDN nodes)
  - Hexagons at strategic points: Americas, Europe, Asia
  - Color: Orange/yellow glow for CDN nodes
  - Data routing through nearest CDN first, then P2P

Phase 3 (0:40-0:50): Federation
  - New building appears (Partner organization)
  - Dashed line connects to main network (federated trust)
  - Security shield icon appears at connection point
  - ACL validation visual: lock icon checking, then opening

Color palette:
  - P2P connections: Cyan (#00bcd4)
  - CDN nodes: Orange (#ff9800)
  - Federation links: Purple (#9c27b0)
  - Data flow: White particles with trail
  
Camera movement: Slow 360° rotation over 30 seconds
Lighting: Dark space background with glowing elements (sci-fi aesthetic)
Music cue: Sync with connection formations (rising synth)
```

**UI Mockup Overlay** (0:25-0:50, corner placement):
```
Position: Top-right corner, transparent background
Content: Live-updating RAGE network dashboard

Metrics display:
┌─────────────────────────────┐
│ 🌐 Network Status           │
│ Status: ● CONNECTED         │
│ Peers: 12 active            │
│                             │
│ ⚡ Performance              │
│ P2P Latency: 15ms avg       │
│ CDN Hit Rate: 94%           │
│                             │
│ 🔄 Replication              │
│ Sync Status: ✓ In sync     │
│ Lag: <1 second              │
│                             │
│ 🤝 Federation               │
│ Trusted Orgs: 3             │
│ Active Queries: 42          │
└─────────────────────────────┘

Design specs:
  - Size: 320x400px
  - Background: rgba(26, 26, 46, 0.95) with blur
  - Border: 1px solid rgba(0, 188, 212, 0.3)
  - Font: JetBrains Mono for metrics
  - Status indicators: Green (#4caf50) for healthy
  - Animated counters incrementing
  - Subtle glow effect on active elements
```

---

### Scene 3: Technical Deep Dive - P2P Synchronization (0:50-1:20)

**Voiceover**:
> "Here's how it works. When a document is uploaded in New York, it's automatically chunked and hashed. The P2P network uses libp2p's Kademlia DHT to find optimal replica nodes. Content-addressed storage ensures integrity. Chunks replicate to London and Tokyo within seconds. The CDN caches frequently accessed content at the edge. Users get sub-100ms response times globally."

**Visual Prompt for Google Veo**:
```
Camera: Close-up technical animation, slow zoom out
Scene: Detailed view of data flow through RAGE architecture

Sequence breakdown:

00:50-00:55 - Document Upload
  - Hand placing document into upload interface
  - Document dissolves into flowing binary code
  - Code streams into server icon

00:55-01:00 - Chunking Process
  - Binary code splits into 3 colored chunks
  - Each chunk gets a unique hash label (hexadecimal)
  - Chunks: Blue, Green, Orange (for visual distinction)
  - Animation: Split animation with particle effects

01:00-01:05 - DHT Routing
  - Chunks enter Kademlia DHT visualization
  - DHT shown as hexagonal routing table
  - Chunks "hop" through routing nodes
  - Trail effect showing path taken

01:05-01:10 - P2P Replication
  - Split screen: 3 server racks (representing NY, London, Tokyo)
  - Chunks replicating simultaneously to all 3
  - Progress bars: 0% → 100% in 2 seconds
  - Check marks appear when complete

01:10-01:15 - CDN Caching
  - Frequently accessed chunks highlighted
  - Orange glow moves to CDN edge nodes
  - World map overlay showing CDN POP locations
  - Cloudflare, Fastly, AWS logos appear at respective regions

01:15-01:20 - User Retrieval
  - User icon appears in Asia
  - Request path visualization:
    1. Check local CDN (Tokyo CloudFront) - HIT
    2. Data delivered in <100ms
  - Speedometer showing: 47ms response time

Visual style:
  - Background: Dark (#0a0a1e) with subtle grid pattern
  - Connection lines: Neon cyan with glow
  - Data chunks: Solid colors with soft shadows
  - Text labels: Clean, sans-serif, white
  - Timing indicators: Yellow for emphasis

Camera: Start tight on chunks, slowly zoom out to reveal full network
Lighting: High contrast, rim lighting on 3D objects
Effects: Light trails, particle systems, bloom on glows
```

**UI Mockup - Full Screen Technical Overlay** (1:00-1:20):
```
Position: Full screen overlay with transparency
Content: Technical monitoring dashboard

Layout:
┌────────────────────────────────────────────────────────────┐
│  Replication Monitor - Live View                           │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Document: customer_refund_policy.pdf                      │
│  Chunks: 3 total                                            │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ Chunk 1: bafk2bzaceavc...                             │ │
│  │ Size: 1.2 MB                                          │ │
│  │ Replicas: [NY ✓] [London ✓] [Tokyo ✓]                │ │
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%                            │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ Chunk 2: bafk2bzacebdf...                             │ │
│  │ Size: 1.1 MB                                          │ │
│  │ Replicas: [NY ✓] [London ✓] [Tokyo ⋯ 87%]            │ │
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░ 87%                             │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ Chunk 3: bafk2bzacegh...                              │ │
│  │ Size: 0.9 MB                                          │ │
│  │ Replicas: [NY ✓] [London ✓] [Tokyo ✓]                │ │
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%                            │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  P2P Network Status:                                       │
│  • Bandwidth: ↑ 12.5 Mbps  ↓ 8.3 Mbps                     │
│  • Latency: NY↔London 78ms | NY↔Tokyo 124ms               │
│  • DHT Peers: 47 online                                    │
│                                                             │
│  CDN Status:                                                │
│  • Cloudflare (Americas): ● Active - 96% hit rate         │
│  • Fastly (Europe): ● Active - 94% hit rate               │
│  • CloudFront (Asia): ● Active - 91% hit rate             │
│                                                             │
└────────────────────────────────────────────────────────────┘

Design specs:
  - Background: rgba(10, 10, 30, 0.92)
  - Border: 2px solid cyan
  - Font: JetBrains Mono, 12px
  - Progress bars: Gradient cyan to blue
  - Check marks: Green (#4caf50)
  - Loading spinners: Animated dots
  - Real-time updates: Smooth number transitions
  - Glow effects on active elements
```

---

### Scene 4: Security & Trust - Federated ACL (1:20-1:50)

**Voiceover**:
> "Security is built-in at every layer. Explicit trust lists control which organizations can connect. Every document carries its ACL across the network. Federated queries validate permissions in real-time. End-to-end encryption with Noise protocol. Your CTO sleeps better knowing data stays secure, even across organizational boundaries."

**Visual Prompt for Google Veo**:
```
Camera: Cinematic close-ups with shallow depth of field
Scene: Security visualization with holographic UI elements

Sequence:

01:20-01:25 - Trust Registry
  - Floating holographic list of trusted organizations
  - Each org has a certificate badge (green checkmark)
  - One org highlighted, expanding to show details:
    * Organization name
    * Certificate fingerprint
    * Capabilities: [✓ Query] [✓ Replicate]
    * Trust established date

01:25-01:32 - Federated Query with ACL Check
  - Split screen: Organization A (left) and Organization B (right)
  - User from Org A sends query
  - Query packet visualized as glowing envelope
  - Envelope travels across network
  - At Org B boundary: Security checkpoint appears
  - ACL engine visualized as shield scanning envelope
  - Shield layers:
    1. Trust verification (blue glow)
    2. User mapping (green glow)
    3. Document ACL check (purple glow)
  - Access GRANTED animation: Shield opens, green checkmark

01:32-01:40 - Encryption Visualization
  - Data stream flowing between nodes
  - Noise protocol visualization:
    * Plain data enters encryption layer (left)
    * Encryption process (glowing cipher rotating)
    * Encrypted stream exits (right) - looks like matrix code
  - TLS 1.3 handshake shown below
  - Padlock icon locks securely

01:40-01:50 - Compliance Dashboard
  - Audit log scrolling (redacted for visual)
  - Compliance badges appearing:
    * GDPR Compliant ✓
    * SOC 2 Ready ✓
    * HIPAA Ready ✓
  - World map showing data residency (color-coded by region)

Visual style:
  - Background: Deep blue gradient (#0a0f2c to #1a1f3c)
  - Security elements: Green glow for allowed, red for denied
  - Encryption: Matrix-style cascading code
  - Badges: Metallic with shine effect
  
Camera: Slow push-ins on key elements, rack focus between foreground/background
Lighting: Dramatic with rim lighting, blue/purple/green color scheme
```

**UI Mockup - Security Dashboard** (1:25-1:45, floating in 3D space):
```
Position: Center, with 3D perspective tilt
Content: Federation security dashboard

┌──────────────────────────────────────────────────────┐
│  🛡️ Federation Security Center                       │
├──────────────────────────────────────────────────────┤
│                                                       │
│  TRUSTED ORGANIZATIONS                                │
│  ┌────────────────────────────────────────────────┐  │
│  │ Beta Industries                                │  │
│  │ Certificate: SHA256:a3f2e9... ✓ Valid         │  │
│  │ Capabilities: [Query] [Replicate]             │  │
│  │ Last Connection: 2 minutes ago                 │  │
│  │ ────────────────────────────────────────────   │  │
│  │ Status: ● ACTIVE                              │  │
│  └────────────────────────────────────────────────┘  │
│                                                       │
│  ACTIVE FEDERATED QUERIES (Last 5 min)                │
│  • user@partner.com → "customer refunds" ✓ ALLOWED  │
│  • alice@vendor.com → "API documentation" ✓ ALLOWED  │
│  • bob@contractor.com → "financial report" ✗ DENIED  │
│                                                       │
│  ACL ENFORCEMENT                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │ Total Checks: 1,247 today                     │  │
│  │ Allowed: 1,189 (95.3%)                        │  │
│  │ Denied: 58 (4.7%)                             │  │
│  │                                                │  │
│  │ Denial Reasons:                                │  │
│  │   • Untrusted organization: 12                 │  │
│  │   • Document not federated: 31                 │  │
│  │   • User not mapped: 15                        │  │
│  └────────────────────────────────────────────────┘  │
│                                                       │
│  ENCRYPTION STATUS                                    │
│  • P2P: Noise Protocol XX ✓ Active                  │
│  • API: TLS 1.3 ✓ Active                            │
│  • Data at Rest: AES-256 ✓ Encrypted               │
│                                                       │
│  COMPLIANCE POSTURE                                   │
│  [✓] GDPR Compliant    [✓] SOC 2 Ready              │
│  [✓] HIPAA Ready       [✓] Audit Logs Enabled       │
│                                                       │
└──────────────────────────────────────────────────────┘

Design specs:
  - 3D tilt: Rotate 5° on Y-axis for depth
  - Background: Gradient dark blue with scan lines
  - Border: Glowing cyan with subtle animation
  - Font: Inter for UI, JetBrains Mono for codes
  - Status indicators: Animated pulsing dots
  - Check marks: Animated slide-in from left
  - Real-time updates: Smooth transitions
  - Drop shadow: 0 20px 60px rgba(0,0,0,0.5)
```

---

### Scene 5: Call to Action - Enterprise Scale (1:50-2:00)

**Voiceover**:
> "RAGE. Built for the enterprise. Ready to scale. Deploy globally, secure by default. Start with one instance, grow to a global network. Request a demo at rage dot network."

**Visual Prompt for Google Veo**:
```
Camera: Wide establishing shot, crane up
Scene: Montage of RAGE deployments

Rapid cuts (2 seconds each):
  1. Server room with blinking RAGE nodes
  2. World map with connections lighting up sequentially
  3. Happy employees using RAGE UI (clean, modern interface)
  4. CTO smiling while reviewing dashboard
  5. Final shot: RAGE logo materializing from network connections

Transition: Each cut uses quick fade with white flash

Final frame (1:58-2:00):
  - RAGE logo (centered, large)
  - Text below: "rage.network"
  - Text below: "Request a demo"
  - Background: Subtle animated network connections

Color grading: Bright, optimistic, high contrast
Mood: Confident, professional, exciting
Lighting: Clean, well-lit (inverse of dark/moody earlier scenes)
```

**Text Overlays** (1:58-2:00):
```
Position: Center screen
Animation: Fade in + scale from 90% to 100%

Main text:
  RAGE
  Font: Montserrat Bold, 72px
  Color: White with cyan glow
  
Tagline:
  Enterprise Knowledge Network
  Font: Inter Regular, 24px
  Color: rgba(255,255,255,0.8)

CTA:
  rage.network | Request Demo
  Font: Inter Medium, 18px
  Color: Cyan (#00bcd4)
  Animation: Pulse glow effect
```

---

### Production Notes for Google Veo (Nano Banana)

**Prompt Engineering Tips**:
1. Start each scene with "Camera angle:" to control perspective
2. Specify "Duration: X seconds" for precise timing
3. Use "Animation:" prefix for moving elements
4. Include "Color palette:" for consistent look
5. Add "Mood:" and "Lighting:" for atmospheric control
6. Reference "Visual style:" for overall aesthetic direction

**Nano Banana-Specific Settings**:
```json
{
  "model": "veo-2",
  "resolution": "1080p",
  "fps": 30,
  "aspect_ratio": "16:9",
  "camera_control": "enabled",
  "motion_intensity": "medium",
  "style": {
    "preset": "tech_corporate",
    "color_grading": "vibrant",
    "contrast": "high"
  },
  "elements": {
    "ui_overlays": "enabled",
    "text_rendering": "high_quality",
    "particle_systems": "enabled"
  }
}
```

**Post-Production Workflow**:
1. Generate each scene separately in Veo
2. Import to DaVinci Resolve or Premiere Pro
3. Add UI mockups as PNG overlays with alpha channel
4. Color match between AI-generated and UI elements
5. Add motion graphics for UI animations (After Effects)
6. Sync with voiceover track
7. Add sound effects:
   - Data flow: Subtle whoosh sounds
   - Connections forming: Light digital clicks
   - Security checkpoints: Lock sound
   - Success indicators: Soft chime
8. Background music: Minimal techno, 120 BPM
9. Final mix: -12dB voice, -20dB music, -24dB SFX

---

### Editing Workflow

```
1. Generate individual scenes (Runway, Synthesia)
2. Import to editing software (Premiere Pro, Final Cut, DaVinci Resolve)
3. Add transitions (fade, dissolve, cut)
4. Add background music (Epidemic Sound, Artlist)
5. Color grading (consistent look across scenes)
6. Add text overlays (lower thirds, titles)
7. Mix audio (voiceover + music balance: -12dB voice, -24dB music)
8. Export: H.264, 1920x1080, 30fps, ~10Mbps bitrate
```

---

### Music Recommendations

**Product Demo Video**:
- Style: Upbeat, modern, tech-inspired
- Mood: Optimistic, energetic
- Instruments: Electronic, synth, light percussion
- BPM: 120-130
- Royalty-free sources: Artlist "Tech" category

**Technical Video**:
- Style: Minimal, ambient
- Mood: Focused, professional
- Instruments: Piano, strings, subtle synth
- BPM: 90-100

**Customer Story**:
- Style: Inspirational, emotional
- Mood: Uplifting, hopeful
- Instruments: Acoustic guitar, piano, strings
- BPM: 85-95

---

**Document Version**: 1.0  
**Last Updated**: November 25, 2025  
**Next Review**: After first video production
