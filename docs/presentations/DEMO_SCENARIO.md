# RAGE Demo Scenarios

**Version**: 1.0  
**Last Updated**: November 25, 2025  
**Purpose**: Step-by-step walkthrough scripts for live demos and product tours

---

## Demo Scenario 1: New Employee Onboarding (5 minutes)

**Persona**: Alice, New Software Engineer (Day 1)  
**Goal**: Show how RAGE accelerates onboarding from 12 weeks to 1 week  
**Audience**: HR leaders, engineering managers

### Setup

```yaml
Prerequisites:
  - RAGE instance running with test data
  - User account: alice@company.com (Engineering group)
  - Data sources connected: Confluence (DevOps space), GitHub (company-handbook repo), Slack (#engineering channel)
  
Test Data Required:
  - "Development Environment Setup" doc in Confluence
  - "Deployment Procedures" runbook in Confluence  
  - "Team Directory" page in Confluence
  - README.md in GitHub repos
  - Pinned messages in Slack #engineering
```

---

### Act 1: First Question - Development Setup (1 min)

**Narration**:
> "Alice just joined the engineering team. On her first day, she needs to set up her development environment. Instead of asking colleagues or searching through dozens of Confluence pages, she simply asks RAGE."

**Demo Steps**:

1. Open RAGE User UI (show clean, empty search interface)
   
2. Type query in search bar:
   ```
   "How do I set up my development environment?"
   ```

3. Press Enter, show loading animation (1-2 seconds)

4. **Expected Result**:
   ```
   ┌─────────────────────────────────────────────────┐
   │ ✨ Answer                                       │
   ├─────────────────────────────────────────────────┤
   │ To set up your development environment:         │
   │                                                  │
   │ 1. Install dependencies:                        │
   │    • Docker Desktop                             │
   │    • Node.js 18+                                │
   │    • Python 3.11+                               │
   │                                                  │
   │ 2. Clone repositories:                          │
   │    git clone https://github.com/company/main-app│
   │    cd main-app                                  │
   │                                                  │
   │ 3. Run setup script:                            │
   │    ./scripts/dev-setup.sh                       │
   │                                                  │
   │ 4. Verify installation:                         │
   │    make test                                    │
   │                                                  │
   │ ⏱️ Estimated time: 30 minutes                   │
   ├─────────────────────────────────────────────────┤
   │ 📄 Sources (3):                                 │
   │ • Developer Onboarding Guide (Confluence)       │
   │ • main-app README.md (GitHub)                   │
   │ • Pinned: Setup Tips (Slack #engineering)       │
   └─────────────────────────────────────────────────┘
   ```

5. **Highlight**: Click on "Developer Onboarding Guide" citation
   - Opens Confluence page in new tab
   - Show that RAGE linked directly to the source

**Key Talking Points**:
- ✅ Answer in 2 seconds (vs 30 minutes searching)
- ✅ Multiple sources combined (Confluence + GitHub + Slack)
- ✅ Step-by-step instructions with code examples
- ✅ Citations for verification

---

### Act 2: Second Question - Deployment Process (1.5 min)

**Narration**:
> "Alice has been coding for a few hours and wants to understand the deployment process before she submits her first pull request."

**Demo Steps**:

1. Show query history (previous query still visible)

2. Type new query:
   ```
   "How do I deploy to production?"
   ```

3. **Expected Result**:
   ```
   ┌─────────────────────────────────────────────────┐
   │ ✨ Answer                                       │
   ├─────────────────────────────────────────────────┤
   │ To deploy to production:                        │
   │                                                  │
   │ 1. Create a Pull Request on GitHub              │
   │ 2. Get approval from 2 team members             │
   │ 3. Merge to main branch                         │
   │ 4. CI/CD automatically deploys:                 │
   │    • Staging (auto)                             │
   │    • Production (manual approval required)      │
   │                                                  │
   │ ⚠️ Important:                                    │
   │ • Production deploys require DevOps approval    │
   │ • Deployments happen Mon-Thu only               │
   │ • Rollback procedure: /docs/rollback.md         │
   ├─────────────────────────────────────────────────┤
   │ 📄 Sources (4):                                 │
   │ • Deployment Runbook (Confluence)               │
   │ • CI/CD Configuration (.github/workflows)       │
   │ • Production Deploy Policy (Confluence)         │
   │ • Rollback Procedures (GitHub Wiki)             │
   └─────────────────────────────────────────────────┘
   ```

4. **Highlight**: Show "Related Queries" sidebar:
   ```
   Related Queries:
   • How do I rollback a deployment?
   • What is our SLA for production?
   • Who approves production deploys?
   ```

5. Click "How do I rollback a deployment?" (optional, if time permits)

**Key Talking Points**:
- ✅ Policy awareness (DevOps approval, Mon-Thu only)
- ✅ Safety information (rollback procedure)
- ✅ Related queries suggest next questions
- ✅ Proactive learning (Alice now knows the process)

---

### Act 3: Third Question - Finding People (1 min)

**Narration**:
> "Alice needs help with benefits enrollment. She doesn't know who to ask, so she asks RAGE."

**Demo Steps**:

1. Type query:
   ```
   "Who do I contact about benefits enrollment?"
   ```

2. **Expected Result**:
   ```
   ┌─────────────────────────────────────────────────┐
   │ ✨ Answer                                       │
   ├─────────────────────────────────────────────────┤
   │ For benefits enrollment, contact:               │
   │                                                  │
   │ 👤 Sarah Johnson - HR Benefits Manager         │
   │    📧 sarah.johnson@company.com                 │
   │    💬 Slack: @sarah.johnson                     │
   │    📅 Office hours: Mon-Fri 9am-5pm PST         │
   │                                                  │
   │ Benefits Enrollment Portal:                     │
   │ https://benefits.company.com                    │
   │                                                  │
   │ Deadline: Enroll within 30 days of start date   │
   ├─────────────────────────────────────────────────┤
   │ 📄 Sources (2):                                 │
   │ • HR Team Directory (Confluence)                │
   │ • New Employee Handbook (Confluence)            │
   └─────────────────────────────────────────────────┘
   ```

**Key Talking Points**:
- ✅ Instant access to people information
- ✅ Multiple contact methods (email, Slack)
- ✅ Actionable deadline information
- ✅ No need to interrupt colleagues

---

### Act 4: Show ACL Enforcement (1.5 min)

**Narration**:
> "Now let's see what happens when someone outside engineering asks a technical question."

**Demo Steps**:

1. Logout from Alice's account

2. Login as Bob (bob@company.com, Sales team member)

3. Ask the same question:
   ```
   "How do I deploy to production?"
   ```

4. **Expected Result**:
   ```
   ┌─────────────────────────────────────────────────┐
   │ ⚠️ Limited Results                              │
   ├─────────────────────────────────────────────────┤
   │ I couldn't find detailed deployment procedures  │
   │ in the documents you have access to.            │
   │                                                  │
   │ For engineering questions, please contact:      │
   │ • #engineering channel on Slack                 │
   │ • DevOps team: devops@company.com               │
   ├─────────────────────────────────────────────────┤
   │ 📄 Sources (0):                                 │
   │ No accessible documents found for this query.   │
   └─────────────────────────────────────────────────┘
   ```

5. **Highlight**: Open Admin UI in another tab
   - Navigate to Audit Log
   - Show Bob's query logged
   - Show "0 documents accessible" in log entry

6. **Optional**: Grant Bob access to "Engineering" group
   - Re-run query as Bob
   - Now sees full answer (same as Alice)

**Key Talking Points**:
- ✅ ACL enforcement at query time
- ✅ Bob doesn't know what he's missing (security)
- ✅ Helpful fallback message (not just "Access Denied")
- ✅ Complete audit trail for compliance

---

### Summary & ROI (30 seconds)

**Narration**:
> "In just 5 minutes, Alice learned how to set up her environment, deploy code, and find HR resources. Traditionally, this would take hours of searching and interrupting colleagues. Multiply this across 50 new hires per year, and you save 2,500 hours of productivity."

**Show ROI Calculation** (slide or calculator):
```
Traditional Onboarding:
  • 12 weeks to full productivity
  • 10 hours/week asking questions
  • 50 new hires/year
  • Cost: $150K/year in lost productivity

With RAGE:
  • 7 weeks to full productivity (42% faster)
  • 2 hours/week asking questions (80% reduction)
  • Same 50 new hires/year
  • Savings: $90K/year + happier employees
```

---

## Demo Scenario 2: DevOps Incident Response (3 minutes)

**Persona**: Charlie, Senior DevOps Engineer (on-call)  
**Goal**: Show RAGE as critical ops knowledge base during incident  
**Audience**: Engineering leaders, SRE teams

### Setup

```yaml
Prerequisites:
  - RAGE instance with DevOps data
  - User: charlie@company.com (DevOps group)
  - Data sources: Confluence (runbooks), Jira (past incidents), Slack (#incidents channel)
  
Test Data Required:
  - "Database Connection Pool Exhaustion" runbook
  - Jira tickets for past incidents (INC-1234, INC-5678)
  - Slack incident post-mortems
```

---

### Act 1: Incident Alert (30 seconds)

**Narration**:
> "It's 2 AM. Charlie gets paged: 'Database connection pool exhausted - 503 errors spiking.' He needs answers fast."

**Demo Steps**:

1. Show alert notification (mockup or screenshot):
   ```
   🚨 PagerDuty Alert
   Database connection pool exhausted
   503 errors: 500/min (normal: 5/min)
   Triggered: 2:03 AM
   [Acknowledge] [View in RAGE]
   ```

2. Click "View in RAGE" → opens pre-filled query:
   ```
   "database connection pool exhausted 503 errors"
   ```

---

### Act 2: Runbook Retrieval (1 min)

**Demo Steps**:

1. Query executes automatically (from PagerDuty integration)

2. **Expected Result**:
   ```
   ┌─────────────────────────────────────────────────┐
   │ ✨ Answer                                       │
   ├─────────────────────────────────────────────────┤
   │ Database Connection Pool Exhaustion - Runbook:  │
   │                                                  │
   │ 🔴 Immediate Actions (< 5 min):                 │
   │ 1. Increase pool size:                          │
   │    kubectl set env deployment/api \             │
   │      DATABASE_POOL_SIZE=50                      │
   │                                                  │
   │ 2. Restart stuck connections:                   │
   │    psql -c "SELECT pg_terminate_backend(pid)    │
   │      FROM pg_stat_activity WHERE state='idle    │
   │      in transaction';"                          │
   │                                                  │
   │ 🟡 Follow-up Actions (< 30 min):                │
   │ 3. Check for slow queries: See dashboard        │
   │ 4. Review connection leak: Check app logs       │
   │                                                  │
   │ 📊 Past Incidents:                              │
   │ • INC-5678 (2 weeks ago): Connection leak in    │
   │   user-service v2.3.1 - patch released          │
   │ • INC-1234 (3 months ago): DDoS attack -        │
   │   rate limiting added                           │
   ├─────────────────────────────────────────────────┤
   │ 📄 Sources (5):                                 │
   │ • Database Runbook (Confluence) - 95% match     │
   │ • INC-5678 Post-Mortem (Jira)                   │
   │ • INC-1234 Resolution (Slack #incidents)        │
   └─────────────────────────────────────────────────┘
   ```

3. **Highlight**: Click citation for "INC-5678 Post-Mortem"
   - Shows Jira ticket with root cause analysis
   - Charlie learns about patch in user-service

**Key Talking Points**:
- ✅ Instant runbook access (no searching)
- ✅ Historical context (past incidents)
- ✅ Prioritized actions (immediate vs follow-up)
- ✅ Code snippets ready to copy-paste

---

### Act 3: Follow-up Query (1 min)

**Narration**:
> "Charlie runs the immediate actions. 503 errors drop. Now he investigates root cause."

**Demo Steps**:

1. Type follow-up query:
   ```
   "check for connection leaks in user-service"
   ```

2. **Expected Result**:
   ```
   ┌─────────────────────────────────────────────────┐
   │ ✨ Answer                                       │
   ├─────────────────────────────────────────────────┤
   │ To check for connection leaks in user-service:  │
   │                                                  │
   │ 1. Check current version:                       │
   │    kubectl get deployment user-service -o       │
   │      jsonpath='{.spec.template.spec.containers  │
   │      [0].image}'                                │
   │                                                  │
   │ 2. Known issue: v2.3.1 has connection leak      │
   │    • Bug: Connections not closed in error paths│
   │    • Fix: Upgrade to v2.3.2+                    │
   │                                                  │
   │ 3. Verify with connection count:                │
   │    SELECT count(*) FROM pg_stat_activity        │
   │      WHERE application_name='user-service';     │
   │                                                  │
   │ 4. If using v2.3.1, upgrade:                    │
   │    kubectl set image deployment/user-service \  │
   │      user-service=company/user-service:v2.3.2   │
   ├─────────────────────────────────────────────────┤
   │ 📄 Sources (3):                                 │
   │ • INC-5678 Root Cause (Jira)                    │
   │ • user-service v2.3.2 Release Notes (GitHub)    │
   │ • Database Connection Debugging (Confluence)    │
   └─────────────────────────────────────────────────┘
   ```

**Key Talking Points**:
- ✅ Root cause identified from past incidents
- ✅ Clear remediation steps
- ✅ Verification commands included
- ✅ Charlie resolves incident in 10 minutes (vs 2+ hours)

---

### Summary & ROI (30 seconds)

**Narration**:
> "Charlie resolved a critical incident in 10 minutes using RAGE. Without it, he would have spent 2 hours searching Confluence, reading old Jira tickets, and asking the team in Slack. RAGE reduced Mean Time to Resolution (MTTR) by 90%."

**Show Metrics**:
```
Incident Response Improvement:
  • Traditional MTTR: 2 hours
  • RAGE-assisted MTTR: 10 minutes
  • Reduction: 90%
  • Incidents/month: 15
  • Time saved: 27.5 hours/month
  • Cost savings: $8,250/month ($99K/year)
```

---

## Demo Scenario 3: Multi-Agent Orchestration (4 minutes)

**Persona**: Dana, Product Manager  
**Goal**: Show specialized agents working together  
**Audience**: Technical audience, AI enthusiasts

### Setup

```yaml
Prerequisites:
  - RAGE with multiple agents configured
  - Agents: Router, DevOps Agent, Jira Agent, Confluence Expert
  - Admin UI with agent visualization enabled
```

---

### Act 1: Complex Query Requiring Multiple Agents (1 min)

**Narration**:
> "Dana is planning the next sprint. She asks a complex question that requires knowledge from multiple sources."

**Demo Steps**:

1. Open RAGE with Admin UI side-by-side (split screen)
   - Left: User query interface
   - Right: Agent orchestration visualization (3D neural network)

2. Type query:
   ```
   "What were the top issues from last sprint and what is our deployment process?"
   ```

3. **Highlight**: Watch agents activate on visualization
   - Router Agent lights up (purple)
   - Delegates to Jira Agent (blue) + DevOps Agent (orange)
   - Both agents execute in parallel

---

### Act 2: Agent Execution Visualization (1.5 min)

**Demo Steps**:

1. Show Jira Agent processing:
   ```
   Jira Agent:
     ├─ Searching: project=PRODUCT AND sprint="Sprint 42"
     ├─ Found: 23 issues
     ├─ ACL Filter: User can access 20 issues
     ├─ Top issues by priority:
     │   1. PRODUCT-456: API rate limit too low
     │   2. PRODUCT-789: Deployment takes 45 minutes
     │   3. PRODUCT-123: Mobile app crashes on iOS 17
     └─ Complete (850ms)
   ```

2. Show DevOps Agent processing (parallel):
   ```
   DevOps Agent:
     ├─ Searching: tag:deployment, tag:production
     ├─ Found: 12 documents
     ├─ Top result: "Deployment Runbook" (95% relevance)
     └─ Complete (620ms)
   ```

3. Show Router Agent merging results:
   ```
   Router Agent:
     ├─ Received: Jira Agent (20 issues) + DevOps Agent (12 docs)
     ├─ Merging context...
     ├─ Generating unified answer with Claude 3.5 Sonnet
     └─ Complete (1,200ms)
   
   Total latency: 2.1 seconds
   ```

---

### Act 3: Final Answer (1 min)

**Demo Steps**:

1. **Expected Result**:
   ```
   ┌─────────────────────────────────────────────────────────┐
   │ ✨ Answer (from 2 agents)                               │
   ├─────────────────────────────────────────────────────────┤
   │ Last Sprint (Sprint 42) - Top Issues:                   │
   │                                                          │
   │ 🔴 Critical:                                            │
   │ • PRODUCT-456: API rate limit too low (500 req/min)     │
   │   → Customer complaints, revenue impact                 │
   │                                                          │
   │ 🟡 High Priority:                                       │
   │ • PRODUCT-789: Deployment takes 45 minutes              │
   │   → Blocking releases, team frustration                 │
   │ • PRODUCT-123: Mobile app crashes on iOS 17             │
   │   → Affects 30% of users                                │
   │                                                          │
   │ Deployment Process (current):                           │
   │ 1. PR approval (2 reviewers)                            │
   │ 2. Merge to main → auto-deploy to staging              │
   │ 3. Manual approval → deploy to production               │
   │ 4. Average time: 45 minutes (identified as issue above) │
   │                                                          │
   │ 💡 Recommendation:                                      │
   │ Address PRODUCT-789 first - deployment speed affects    │
   │ all other issues. See "CI/CD Optimization Guide"        │
   ├─────────────────────────────────────────────────────────┤
   │ 📄 Sources (8):                                         │
   │ Jira Agent:                                             │
   │ • PRODUCT-456, PRODUCT-789, PRODUCT-123 (Jira)          │
   │ • Sprint 42 Retrospective (Confluence)                  │
   │                                                          │
   │ DevOps Agent:                                           │
   │ • Deployment Runbook (Confluence)                       │
   │ • CI/CD Configuration (.github/workflows)               │
   │ • Production Deploy Metrics (Grafana)                   │
   └─────────────────────────────────────────────────────────┘
   ```

2. **Highlight**: Hover over "from 2 agents" badge
   - Tooltip shows: "Jira Agent + DevOps Agent collaborated"
   - Click to see detailed execution trace

**Key Talking Points**:
- ✅ Multiple specialized agents worked together
- ✅ Parallel execution (850ms + 620ms = 850ms total, not 1,470ms)
- ✅ Context merged intelligently
- ✅ Actionable recommendations (not just data)

---

### Summary & Technical Deep-Dive (30 seconds)

**Narration**:
> "This query used MCP protocol for agent communication. Specialized agents handle their domains, then collaborate. This is more accurate than a single general-purpose agent, and scales to 100+ agents."

**Show Technical Diagram** (optional):
```
Query → Router Agent
          ├─→ Jira Agent (parallel)
          └─→ DevOps Agent (parallel)
       ← Results merged
       → LLM (Claude 3.5 Sonnet)
       ← Final answer
```

---

## Demo Scenario 4: Admin Analytics Dashboard (2 minutes)

**Persona**: Admin/Operations  
**Goal**: Show monitoring, analytics, and system health  
**Audience**: IT leaders, operations teams

### Act 1: Live Metrics Dashboard (1 min)

**Demo Steps**:

1. Open Admin UI → Analytics Dashboard

2. **Show Key Metrics** (live data):
   ```
   ┌──────────────────────────────────────────────┐
   │ Last 24 Hours:                               │
   │                                               │
   │ 12,847 Total Queries        ▲ +15%          │
   │    342 Active Users          ▲ +8%           │
   │    45% Cache Hit Rate        ▼ -3%           │
   │   2.1s Avg Latency           ✅ Healthy      │
   └──────────────────────────────────────────────┘
   ```

3. **Show Query Volume Chart** (line graph):
   - 7-day trend showing growth
   - Peak hours highlighted (9am-11am, 2pm-4pm)

4. **Show Top Queries** (table):
   ```
   Top 10 Queries (Last 7 Days):
   1. "How do I deploy to production?" - 147 times
   2. "What is our API rate limit?" - 98 times
   3. "Who handles benefits?" - 87 times
   4. "How to access VPN?" - 76 times
   5. ...
   ```

**Key Talking Points**:
- ✅ Real-time visibility into usage
- ✅ Identify knowledge gaps (top queries = FAQ candidates)
- ✅ Performance monitoring (latency, cache hit rate)

---

### Act 2: ACL Audit Trail (1 min)

**Demo Steps**:

1. Navigate to Audit Log

2. **Show Recent Events**:
   ```
   Audit Log (Last Hour):
   
   [2:15 PM] alice@company.com
     Query: "deployment procedures"
     Documents searched: 25
     Documents allowed: 18
     Documents denied: 7 (insufficient permissions)
     ACL groups: [engineering, employees]
     
   [2:12 PM] bob@company.com
     Query: "salary bands"
     Documents searched: 5
     Documents allowed: 0 (not in HR group)
     Documents denied: 5
     ACL groups: [sales, employees]
     
   [2:10 PM] admin@company.com
     Action: Granted alice@company.com "devops" group
     Reason: "Promoted to Senior Engineer"
   ```

3. **Filter by user**: Show all Bob's queries
   - Highlight denied access events
   - Show no sensitive data leaked

**Key Talking Points**:
- ✅ Complete audit trail for compliance
- ✅ GDPR-ready (can export all user data)
- ✅ Security transparency (who accessed what)

---

## Post-Demo Q&A Prep

### Common Questions & Answers

**Q: How long does setup take?**
```
A: 5 minutes for single-server deployment:
   1. Download deploy-rage.sh
   2. Run: ./deploy-rage.sh
   3. Connect data sources (Confluence, Jira, etc.)
   4. Start querying

   For production: 1-2 hours with HA configuration.
```

**Q: What if RAGE gets an answer wrong?**
```
A: Users can provide feedback (👍/👎). We track:
   • Accuracy rate (currently 87% positive feedback)
   • Failed queries logged for analysis
   • Continuous learning from feedback
   • Admin can manually curate answers
```

**Q: Does it work offline?**
```
A: Yes, with local LLMs (Ollama):
   • Internet required only for: Confluence/Jira sync
   • Local models: Llama 3.2, Mistral 7B, etc.
   • Slightly lower accuracy than GPT-4, but private
```

**Q: How much does it cost to run?**
```
A: Cost breakdown (500 users, 10K queries/day):
   • Infrastructure: $500/month (self-hosted cloud)
   • LLM API costs: $200/month (with caching)
   • Total: $700/month = $1.40/user/month
   
   vs. ChatGPT Enterprise: $60/user/month ($30K/month)
   Savings: 97%
```

---

**Document Version**: 1.0  
**Last Updated**: November 25, 2025  
**Next Review**: After first customer demo
