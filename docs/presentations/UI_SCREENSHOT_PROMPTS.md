# RAGE UI Screenshot Generation Prompts

**Version**: 1.0  
**Last Updated**: November 25, 2025  
**Purpose**: Prompts for generating UI mockups with Midjourney, DALL-E 3, Stable Diffusion

---

## General Guidelines

### Style Requirements

```yaml
Design System:
  color_palette:
    primary: "#7C3AED" (purple)
    secondary: "#06B6D4" (cyan)
    accent: "#10B981" (green)
    neutral_dark: "#1E293B" (slate)
    neutral_light: "#F1F5F9" (light gray)
    background_dark: "#0F172A" (dark mode)
    background_light: "#FFFFFF" (light mode)
  
  typography:
    heading: "Inter" or "SF Pro Display"
    body: "Inter" or "SF Pro Text"
    code: "JetBrains Mono" or "Fira Code"
  
  spacing:
    base: 8px
    scale: 4, 8, 16, 24, 32, 48, 64
  
  radius:
    small: 4px (buttons)
    medium: 8px (cards)
    large: 12px (modals)
  
  shadows:
    elevation_1: "0 1px 3px rgba(0,0,0,0.12)"
    elevation_2: "0 4px 6px rgba(0,0,0,0.1)"
    elevation_3: "0 10px 20px rgba(0,0,0,0.15)"
```

### Platform-Specific Prompts

**Midjourney v6**:
```
Base prompt template:
"modern SaaS dashboard UI, [specific view], clean design, purple and cyan accent colors, glassmorphism elements, dark mode, high contrast, professional, 4K resolution, Figma design, Dribbble quality --ar 16:9 --v 6 --style raw"
```

**DALL-E 3**:
```
Base prompt template:
"Professional SaaS application interface showing [specific view]. Modern design with purple (#7C3AED) and cyan (#06B6D4) accents. Dark navy background (#0F172A). Clean typography, ample whitespace, glassmorphism cards, subtle shadows. Crisp, high-fidelity mockup as if designed in Figma."
```

**Stable Diffusion XL**:
```
Base prompt template:
"UI design, SaaS dashboard, [specific view], purple and cyan color scheme, dark theme, modern minimalist, clean interface, professional, trending on Dribbble, 8k resolution"

Negative prompt:
"cluttered, messy, outdated, gradients, neon, cartoonish, low quality, blurry"
```

---

## Screenshot 1: User Dashboard - Query Interface

### Prompt (Midjourney)

```
Modern enterprise knowledge search interface, clean SaaS dashboard UI, search bar centered at top with placeholder "Ask anything about your knowledge base...", recent queries list below with timestamps and relevance scores, quick action cards for common queries (How do I..., What is..., Who is...), glassmorphism sidebar showing data sources (Confluence, Jira, Slack logos with connection status), dark mode with purple (#7C3AED) and cyan (#06B6D4) accents, professional typography, ample whitespace, 4K resolution, Figma design quality --ar 16:9 --v 6 --style raw
```

### Prompt (DALL-E 3)

```
Professional enterprise knowledge management dashboard. Large centered search bar at top with text "Ask anything about your knowledge base..." in light gray placeholder text. Below, a grid of 6 recent query cards, each showing: query text, timestamp (e.g., "2 hours ago"), relevance score (e.g., "95% match"), and small citation icons. Left sidebar displays connected data sources: Confluence logo with green "Connected" status, Jira logo with green status, Slack logo with green status, GitHub with yellow "Syncing" status. Top-right corner shows user avatar (Alice Carter) with dropdown. Color scheme: dark navy background (#0F172A), purple accent buttons (#7C3AED), cyan highlights (#06B6D4), white text. Modern, clean design with subtle glassmorphism on cards.
```

### Expected Elements

```
┌────────────────────────────────────────────────────────┐
│  🧠 RAGE           [🔔] [⚙️] [Alice Carter ▼]         │
├────────────────────────────────────────────────────────┤
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ 🔍 Ask anything about your knowledge base...      │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  Recent Queries:                                        │
│  ┌──────────────────┬──────────────────┬─────────────┐│
│  │ How do I deploy  │ What is our API  │ Who handles  ││
│  │ to production?   │ rate limit?      │ benefits?    ││
│  │ 2 hours ago      │ Yesterday        │ Last week    ││
│  │ 📄 10 sources    │ 📄 5 sources     │ 📄 3 sources ││
│  │ 95% relevance    │ 88% relevance    │ 92% relevance││
│  └──────────────────┴──────────────────┴─────────────┘│
│                                                         │
│  Quick Actions:                                         │
│  [How do I...]  [What is...]  [Who is...]             │
│                                                         │
├────────────────────────────────────────────────────────┤
│ 📊 Sidebar:                                             │
│ Data Sources:                                           │
│ ✅ Confluence (1,250 docs)                             │
│ ✅ Jira (847 issues)                                   │
│ ✅ Slack (syncing...)                                  │
│ ✅ GitHub (320 repos)                                  │
└────────────────────────────────────────────────────────┘
```

---

## Screenshot 2: Query Results with Citations

### Prompt (Midjourney)

```
Enterprise knowledge base search results page, top section shows AI-generated answer card with rich text formatting and inline code snippets, below shows "Sources" section with 5 document cards (each card has favicon/logo, title, excerpt, relevance score badge, timestamp), right sidebar displays "Related Queries" and "Ask Follow-up", dark mode UI with purple and cyan accents, glassmorphism effects on cards, professional SaaS design, clean typography, 4K Figma quality --ar 16:9 --v 6 --style raw
```

### Prompt (DALL-E 3)

```
Enterprise search results interface for knowledge management system. Top card shows AI-generated answer with heading "How to deploy to production", formatted text with numbered steps (1. Run tests, 2. Create release branch, 3. Deploy via CI/CD, 4. Monitor in Grafana), inline code examples in monospace font with syntax highlighting. Below, "Sources (5)" section displays 5 horizontal cards: 1st card shows Confluence logo, title "Deployment Runbook", excerpt preview, "95% match" green badge; 2nd card shows GitHub logo, "CI/CD Setup Guide", excerpt, "88% match" badge; 3rd-5th cards similar style. Right sidebar shows "Related Queries" list (3 items: "How to rollback?", "What is our SLA?", "Who approves deploys?") and prominent "Ask Follow-up" button in purple. Dark mode with navy background, purple and cyan accents, clean professional design.
```

### Expected Elements

```
┌────────────────────────────────────────────────────────────────┐
│  ← Back to Search        [👤 Alice Carter]  [⚙️ Settings]     │
├────────────────────────────────────────────────────────────────┤
│  Query: "How do I deploy to production?"                       │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ ✨ Answer                                   [👍] [👎] [⚑] │ │
│  │                                                            │ │
│  │ To deploy to production:                                  │ │
│  │                                                            │ │
│  │ 1. Run tests: `make test`                                 │ │
│  │ 2. Create release branch: `git checkout -b release/v1.2.3`│ │
│  │ 3. Deploy via CI/CD: Push to main, auto-deploys           │ │
│  │ 4. Monitor: Check Grafana dashboard for errors            │ │
│  │                                                            │ │
│  │ ⚠️ Note: Requires approval from DevOps team               │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  📄 Sources (5):                                               │
│  ┌────────────────────────────────────────┐                   │
│  │ [C] Deployment Runbook                  │ 95% Match ✅      │
│  │ Updated 2 days ago • Confluence         │                   │
│  │ "Follow these steps to safely deploy..." │                  │
│  └────────────────────────────────────────┘                   │
│  ┌────────────────────────────────────────┐                   │
│  │ [G] CI/CD Setup Guide                   │ 88% Match ✅      │
│  │ Updated last week • GitHub Wiki         │                   │
│  └────────────────────────────────────────┘                   │
│  ... (3 more sources)                                          │
│                                                                 │
│  Sidebar (right):                                              │
│  ┌──────────────────────────┐                                 │
│  │ Related Queries:          │                                 │
│  │ • How to rollback?        │                                 │
│  │ • What is our SLA?        │                                 │
│  │ • Who approves deploys?   │                                 │
│  │                           │                                 │
│  │ [Ask Follow-up Question]  │                                 │
│  └──────────────────────────┘                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## Screenshot 3: Admin Dashboard - Analytics Overview

### Prompt (Midjourney)

```
Enterprise SaaS admin dashboard analytics view, top row shows 4 metric cards (Total Queries, Active Users, Cache Hit Rate, Avg Latency) with large numbers and trend arrows, middle section displays 3 charts side-by-side: line graph for query volume over time, donut chart for query types breakdown, bar chart for top queried topics, bottom section shows live activity feed with user avatars and recent queries scrolling, dark mode with purple/cyan accent colors, glassmorphism cards with subtle shadows, professional data visualization, 4K quality --ar 16:9 --v 6 --style raw
```

### Prompt (DALL-E 3)

```
Professional enterprise admin analytics dashboard. Top row has 4 metric cards: "12,847 Total Queries" with +15% green up arrow, "342 Active Users" with +8% arrow, "45% Cache Hit Rate" with -3% red down arrow, "2.1s Avg Latency" with green checkmark. Each card has subtle gradient background and icon. Middle section shows three charts: left is line graph "Queries Over Time" (7 days) with smooth purple gradient line showing upward trend, center is donut chart "Query Types" showing distribution (35% How-to, 30% What-is, 20% Who-is, 15% Other) in purple/cyan segments, right is horizontal bar chart "Top Topics" (Deployment, API Docs, Benefits, Onboarding, Security) with cyan bars. Bottom section shows "Live Activity" feed with 5 rows, each row has: small circular user avatar, username, query preview text, timestamp, colored status badge. Dark navy background (#0F172A), cards with glassmorphism effect, purple (#7C3AED) and cyan (#06B6D4) accents, clean professional design.
```

### Expected Elements

```
┌────────────────────────────────────────────────────────────────┐
│  🧠 RAGE Admin              [Alice Carter - Admin] [⚙️]       │
├────────────────────────────────────────────────────────────────┤
│  Metrics (Last 7 Days):                                         │
│  ┌──────────┬──────────┬──────────────┬─────────────┐          │
│  │ 12,847   │  342     │  45%         │  2.1s       │          │
│  │ Queries  │  Users   │  Cache Hit   │  Avg Latency│          │
│  │ ▲ +15%   │  ▲ +8%   │  ▼ -3%       │  ✅ Healthy │          │
│  └──────────┴──────────┴──────────────┴─────────────┘          │
│                                                                 │
│  ┌──────────────────┬──────────────────┬────────────────────┐  │
│  │ Queries Over Time│ Query Types      │ Top Topics         │  │
│  │                  │                  │                    │  │
│  │   [Line Chart]   │  [Donut Chart]   │  [Bar Chart]       │  │
│  │                  │  35% How-to      │  Deployment ████   │  │
│  │   Trend: ↗       │  30% What-is     │  API Docs   ███    │  │
│  │                  │  20% Who-is      │  Benefits   ██     │  │
│  │                  │  15% Other       │  Onboarding █      │  │
│  └──────────────────┴──────────────────┴────────────────────┘  │
│                                                                 │
│  Live Activity:                                                 │
│  ┌──────────────────────────────────────────────────┐          │
│  │ 👤 Alice: "How do I deploy to prod?" • Just now  │          │
│  │ 👤 Bob: "What is our API rate limit?" • 1m ago   │          │
│  │ 👤 Carol: "Who handles benefits?" • 2m ago       │          │
│  │ 👤 Dave: "How to access VPN?" • 5m ago           │          │
│  └──────────────────────────────────────────────────┘          │
└────────────────────────────────────────────────────────────────┘
```

---

## Screenshot 4: Agent Neural Network 3D Visualization

### Prompt (Midjourney)

```
3D neural network visualization of AI agents, isometric view, multiple interconnected nodes representing different specialized agents (DevOps Agent, HR Agent, Code Agent, etc.), nodes are glowing spheres with icons inside, connections shown as animated particle streams flowing between nodes, central hub labeled "Router Agent" with strongest connections, depth perception with foreground nodes larger than background, dark space background with subtle grid, purple and cyan glowing particles, futuristic sci-fi aesthetic, high quality 3D render --ar 16:9 --v 6 --style raw
```

### Prompt (DALL-E 3)

```
Futuristic 3D neural network visualization showing AI agent orchestration system. Isometric perspective view. Center shows large glowing purple sphere labeled "Router Agent" with circuit pattern inside. Around it, 8 smaller spheres in a circular formation: "DevOps Agent" (orange icon: server), "HR Agent" (green icon: people), "Code Agent" (blue icon: code brackets), "Sales Agent" (cyan icon: graph), "Support Agent" (yellow icon: headset), "Confluence Expert" (purple icon: C), "Jira Expert" (blue icon: J), "Slack Bot" (multicolor icon: #). Each sphere connected to Router with glowing particle streams (purple/cyan gradient). Particles flow bidirectionally showing data exchange. Background: dark space (#0F172A) with subtle 3D grid floor, depth of field effect with foreground agents in sharp focus and background slightly blurred. Nodes have glassmorphism effect with inner glow. Professional, high-tech aesthetic.
```

### Expected Layout

```
        DevOps Agent
           🔷
            ↑
            |
HR Agent ← 🔷 → Router Agent → 🔷 Code Agent
            ↓
        Support Agent
        
Legend:
🔷 = Agent node (glowing sphere)
→ = Data flow (particle stream)
Colors: Purple (router), Various (specialized agents)
```

---

## Screenshot 5: ACL Permissions Management UI

### Prompt (Midjourney)

```
Enterprise access control list management interface, left panel shows organizational hierarchy tree (departments, teams, users) with expand/collapse icons, center panel displays permissions matrix table with checkboxes for Read/Write/Admin permissions across different document sources, right panel shows audit log with timestamped permission changes, user avatars next to actions, dark mode with purple accent colors, professional admin interface, clean typography, glassmorphism cards --ar 16:9 --v 6 --style raw
```

### Prompt (DALL-E 3)

```
Professional enterprise permissions management dashboard. Left sidebar (30% width) shows organizational tree: "Engineering" department expanded showing "Backend Team" (5 users), "Frontend Team" (4 users), "DevOps" (3 users), each with collapse/expand arrows. Center panel (50% width) displays permissions matrix table: columns are "Confluence", "Jira", "GitHub", "Slack"; rows are users/groups; cells contain toggle switches for "Read", "Write", "Admin" permissions, some green (enabled), some gray (disabled). Right panel (20% width) shows "Audit Trail" with 5 recent events: "Alice granted Write to Confluence • 2m ago", "Bob removed from DevOps group • 1h ago", each with user avatar and timestamp. Top toolbar has search bar "Search users or groups..." and "Add User" button in purple. Dark navy background, cards with subtle shadows, purple and cyan accents, professional enterprise design.
```

### Expected Elements

```
┌─────────────────────────────────────────────────────────────┐
│  🔐 Access Control          [Search users...] [+ Add User] │
├─────────────────────────────────────────────────────────────┤
│ Org Tree    │  Permissions Matrix      │  Audit Trail      │
│             │                          │                    │
│ ▼ Engineering  │ Source  Read Write Admin │ Recent Changes: │
│   ▼ Backend    │                          │                │
│     Alice      │ Conf.   ✅   ✅    ❌   │ 👤 Alice: +Write│
│     Bob        │ Jira    ✅   ❌    ❌   │    to Confluence │
│     Carol      │ GitHub  ✅   ✅    ❌   │    2m ago        │
│   ▼ Frontend   │ Slack   ✅   ❌    ❌   │                 │
│     Dave       │                          │ 👤 Bob: Removed │
│     Eve        │ [Matrix continues...]    │    from DevOps  │
│   ▶ DevOps     │                          │    1h ago       │
│                │                          │                 │
│ ▶ Sales        │                          │ 👤 Carol: +Admin│
│ ▶ HR           │                          │    to Jira      │
│                │                          │    Yesterday    │
└─────────────────────────────────────────────────────────────┘
```

---

## Screenshot 6: Data Source Configuration

### Prompt (Midjourney)

```
Enterprise data source integration configuration page, grid of integration cards (Confluence, Jira, Slack, GitHub, Google Drive, SharePoint) each showing connection status, document count, last sync time, configure button, bottom section shows sync schedule settings with calendar picker and frequency dropdown, sync progress bar for active syncs, dark mode SaaS interface with purple/cyan accents, professional design, 4K quality --ar 16:9 --v 6 --style raw
```

### Prompt (DALL-E 3)

```
Professional data integration management dashboard. Top section has grid of 6 large integration cards (2 rows × 3 columns): Confluence card shows orange C logo, "Connected" green badge, "1,250 documents", "Last sync: 2 hours ago", "Configure" button; Jira card shows blue J logo, "Connected", "847 issues", similar layout; Slack card shows colorful # logo, "Syncing..." yellow badge, progress bar at 67%; GitHub, Google Drive, SharePoint cards follow same pattern. Bottom section shows "Sync Schedule" panel with weekly calendar view (Mon-Sun) with checkmarks on Mon/Wed/Fri, dropdown for "Frequency: Every 4 hours", large "Sync Now" purple button, and real-time activity log showing "Syncing Confluence space: Engineering Docs..." with animated progress bar. Dark navy background, each card has glassmorphism effect with subtle gradient, purple primary buttons, status badges in semantic colors (green/yellow/red).
```

---

## Screenshot 7: Query Analytics Deep-Dive

### Prompt (Midjourney)

```
Enterprise query analytics dashboard, top shows funnel visualization (queries received → ACL filtered → answered → satisfaction rating), middle section displays heatmap calendar showing query volume by day/hour, bottom shows table of top 20 queries with columns for query text, frequency, avg latency, success rate, user satisfaction score, dark mode with data visualization in purple/cyan gradient, professional analytics interface --ar 16:9 --v 6 --style raw
```

### Prompt (DALL-E 3)

```
Advanced analytics dashboard for query performance. Top section shows conversion funnel chart: "10,000 Queries Received" → "8,500 After ACL Filter" (85%) → "8,100 Answered" (95%) → "6,500 Satisfied Users" (80%), bars decrease in width with percentage labels, gradient from cyan to purple. Middle section displays GitHub-style contribution heatmap: 7×24 grid (days × hours) with cells colored by query volume (light purple = low, dark purple = high), legend shows "0-10, 11-50, 51-100, 100+" queries. Bottom section shows data table with 10 rows: columns are "Query Text" (e.g., "How to deploy to production?"), "Count" (147), "Avg Latency" (2.3s), "Success Rate" (98%), "Satisfaction" (4.5★). Each row alternates light/dark background for readability. Dark navy background, purple/cyan color scheme, professional data visualization design.
```

---

## Screenshot 8: Monitoring Dashboard (Grafana Style)

### Prompt (Midjourney)

```
Real-time monitoring dashboard similar to Grafana, top row shows 6 single-stat panels with large numbers (QPS, latency p95, error rate, cache hit rate, active users, LLM cost per hour), middle section shows 2 time-series graphs side-by-side (request rate and latency percentiles over 6 hours), bottom section shows logs panel with color-coded log levels, dark theme with orange/red/green status colors, professional devops interface --ar 16:9 --v 6 --style raw
```

### Prompt (DALL-E 3)

```
Professional DevOps monitoring dashboard in Grafana style. Top row has 6 metric panels in horizontal layout: "150 QPS" (queries per second) in large white text with green sparkline below, "2.1s p95 Latency" with yellow sparkline, "0.2% Error Rate" with green "✓ Healthy" status, "45% Cache Hit" with orange trend arrow, "342 Active Users" with blue user icon, "$0.08/hr LLM Cost" with green dollar icon. Middle section shows 2 time-series graphs: left graph titled "Request Rate (6h)" shows smooth line chart with purple line trending upward from 100 to 150 QPS, X-axis shows times (12:00, 14:00, 16:00, 18:00), Y-axis shows 0-200 QPS; right graph "Latency Percentiles" shows 3 colored lines (p50 green, p95 yellow, p99 red) over same time range. Bottom panel shows "Recent Logs" with monospace font: 5 log entries color-coded by level (INFO=white, WARN=yellow, ERROR=red), each with timestamp, level badge, and message. Dark background (#1E1E1E like Grafana), panels with subtle borders, professional monitoring aesthetic.
```

---

## Post-Processing Guidelines

### For All Screenshots

```yaml
Tools:
  - Figma: Refine layout, adjust spacing, add real text
  - Photoshop: Color correction, sharpen, add glow effects
  - Sketch: Component refinement, export assets

Enhancements:
  1. Add realistic data (don't use "Lorem ipsum")
  2. Consistent brand colors across all screens
  3. Subtle animations (export as video for demos)
  4. Add cursor for demo screenshots
  5. Include realistic timestamps (not all "2h ago")
  6. Vary user avatars (diversity)
  7. Proofread all text content

Quality Checks:
  ✅ Readable at 1920x1080 (demo size)
  ✅ Readable when scaled to 1280x720 (slide deck)
  ✅ Color contrast meets WCAG AA (4.5:1 ratio)
  ✅ No Lorem Ipsum placeholders
  ✅ Consistent spacing (8px grid)
  ✅ Brand colors accurate
  ✅ Typography hierarchy clear
```

---

### Export Formats

```yaml
For Presentations:
  - PNG: 1920x1080, 72 DPI, sRGB color space
  - Include padding: 40px on all sides
  
For Website:
  - WebP: 1920x1080, optimized for web
  - Progressive loading
  - 2x retina version (3840x2160)
  
For Print:
  - PDF: Vector format
  - 300 DPI
  - CMYK color space
  
For Social Media:
  - Twitter: 1200x675 (16:9)
  - LinkedIn: 1200x627
  - Square: 1080x1080 (center crop)
```

---

**Document Version**: 1.0  
**Last Updated**: November 25, 2025  
**AI Tools**: Midjourney v6, DALL-E 3, Stable Diffusion XL  
**Design Tools**: Figma, Photoshop, Sketch
