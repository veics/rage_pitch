# RAGE Documentation Index

Welcome to the comprehensive documentation for **RAGE - Retrieval-Augmented Generation Engine**.

---

## 📚 Documentation Structure

### Core Documentation

#### [Architecture Guide](ARCHITECTURE.md)
**Complete system architecture and design**
- 9-layer architecture overview
- Component interaction diagrams
- Data flow diagrams (query processing, document ingestion)
- Agent communication via MCP protocol
- Security architecture (8 layers)
- Monitoring and observability architecture
- Scalability and performance considerations

**When to read**: Understanding system design, planning integration, architectural decisions

---

#### [API Specification](API_SPECIFICATION.md)
**Complete REST API and WebSocket documentation**
- Authentication endpoints (login, refresh, user management)
- Core endpoints (health, metrics, configuration)
- Query API (search, chat, RAG)
- Admin API (ingestion, analytics, management)
- WebSocket API (real-time updates)
- OpenAPI 3.1 specification (machine-readable)
- Error handling and status codes
- Rate limiting and quotas

**When to read**: API integration, client development, testing

---

#### [Database Schema](DATABASE_SCHEMA.md)
**Complete database schemas for all three databases**
- PostgreSQL schema (users, teams, documents, queries, ACL, audit)
- Neo4j graph schema (concepts, entities, relationships, vectors)
- Valkey/Redis data structures (sessions, cache, queues, pub/sub)
- Indexes and performance optimization
- Migration strategies
- Example queries

**When to read**: Database operations, schema changes, performance tuning

---

#### [Agent System](AGENT_SYSTEM.md)
**Neural agent architecture and MCP protocol**
- MCP (Model Context Protocol) specification
- Agent base architecture
- 4 core agents:
  - Query Analyzer (intent classification, entity extraction)
  - Concept Mapper (knowledge graph mapping)
  - Document Retriever (hybrid search orchestration)
  - Answer Synthesizer (answer generation with citations)
- Agent Coordinator
- 3D visualization system (Three.js)
- Agent lifecycle and scaling

**When to read**: Understanding agents, extending functionality, debugging

---

#### [Deployment Guide](DEPLOYMENT.md)
**Production deployment with Podman/Docker**
- Prerequisites (hardware, software)
- Development deployment
  - Quick start guide
  - Environment configuration
  - Podman Compose file (all services)
- Production deployment
  - Pre-deployment checklist
  - Environment variables
  - Deployment scripts

  ## Diagram Index
  - ARCHITECTURE.md: System layers, 3D architecture view, sequence diagrams
  - AGENT_SYSTEM.md: Agent interactions (sequence), orchestration flows
  - MONITORING.md: Observability stack, latency (`xychart-beta` + fallback), cost-quality (`quadrantChart` + fallback)
  - DEVELOPMENT.md: Vertical slice flowchart
  - ROADMAP.md: Release `timeline` (beta) + flowchart fallback
  - API_SPECIFICATION.md: API lifecycle `timeline` (beta) + sequence fallback
  - presentations/TECHNICAL_DEEP_DIVE_mermaid.md: Layered overview, container topology, deployment `timeline` (beta) + fallback
  - presentations/VIDEO_PROMPTS_mermaid.md: Screen content flow (Mermaid); ASCII retained in VIDEO_PROMPTS.md

  ## Milestones Timeline (Beta + Fallback)

  Beta chart (if supported):

  ```mermaid
  %%{init: {'theme':'dark'}}%%
  timeline
      title Documentation & Project Milestones
      section Foundation
        Repo initialized             : 2025-09-10
        Contracts drafted            : 2025-09-20
      section Core
        RAG Core MVP                 : 2025-10-15
        ACL Service GA               : 2025-11-10
      section Platform
        Hybrid Search GA             : 2025-12-01
        Observability GA             : 2025-12-20
      section Growth
        Multi-tenant support         : 2026-01-15
        Enterprise rollout           : 2026-02-10
  ```

  Fallback (standard flow):

  ```mermaid
  %%{init: {'theme':'dark'}}%%
  flowchart LR
      %% Title: Documentation & Project Milestones (Fallback)
      M1[Repo initialized<br/>2025-09-10] --> M2[Contracts drafted<br/>2025-09-20] --> M3[RAG Core MVP<br/>2025-10-15] --> M4[ACL Service GA<br/>2025-11-10] --> M5[Hybrid Search GA<br/>2025-12-01] --> M6[Observability GA<br/>2025-12-20] --> M7[Multi-tenant support<br/>2026-01-15] --> M8[Enterprise rollout<br/>2026-02-10]
      linkStyle default stroke:#64b5f6,stroke-width:2px;
  ```

  > Viewer Notes
  > - Some diagrams use Mermaid beta features (`timeline`, `xychart-beta`, `quadrantChart`). When unsupported, use the labeled fallback blocks directly beneath each beta chart.
  > - Presentation files keep ASCII originals alongside Mermaid companions for maximum compatibility.
  - Zero-downtime deployment
  - Nginx configuration
- Container configuration
  - Dockerfiles (backend, frontend)
  - Health checks
  - Resource limits
- Monitoring setup
  - Netdata configuration
  - Prometheus alerts
  - Grafana dashboards
- Backup and recovery
- Troubleshooting

**When to read**: Setting up development environment, deploying to production

---

### Business Documentation

#### [Project Presentation](PRESENTATION.md)
**Investor pitch and project promotion**
- Executive summary
- Problem statement and solution
- Market opportunity ($134B TAM)
- Competitive analysis
- Use cases with ROI calculations
- Business model (open core)
- Revenue projections
- Go-to-market strategy
- Funding requirements ($2M seed)
- Team requirements
- Milestones and roadmap
- Risk analysis

**When to read**: Seeking funding, promoting project, stakeholder presentations

---

### Getting Started

#### [README](../README.md)
**Project overview and quick start**
- What is RAGE?
- Key features
- Architecture overview
- Quick start guide
- Technology stack
- Use cases
- Roadmap

**When to read**: First introduction to RAGE, quick reference

---

#### [Contributing Guide](../CONTRIBUTING.md)
**How to contribute to RAGE**
- Code of conduct
- Development environment setup
- Development workflow
- Coding standards (Python, TypeScript, SQL, Cypher)
- Testing guidelines
- Documentation standards
- Pull request process
- Release process

**When to read**: Planning to contribute, submitting PRs

---

#### [Changelog](../CHANGELOG.md)
**Version history and release notes**
- Current version
- Upcoming releases
- Change categories
- Migration guides

**When to read**: Tracking changes, understanding version differences

---

## 🎯 Documentation by Role

### For Users

1. [README](../README.md) - Start here
2. User Guide (coming soon)
3. [API Specification](API_SPECIFICATION.md) - API integration
4. Tutorials (coming soon)

### For Developers

1. [README](../README.md) - Project overview
2. [Contributing Guide](../CONTRIBUTING.md) - Development setup
3. [Architecture Guide](ARCHITECTURE.md) - System design
4. [Database Schema](DATABASE_SCHEMA.md) - Data models
5. [Agent System](AGENT_SYSTEM.md) - Agent development
6. [API Specification](API_SPECIFICATION.md) - API reference

### For DevOps/SREs

1. [Deployment Guide](DEPLOYMENT.md) - Production deployment
2. [Architecture Guide](ARCHITECTURE.md) - System architecture
3. Monitoring Guide (see Deployment Guide)
4. Troubleshooting (see Deployment Guide)
5. [Database Schema](DATABASE_SCHEMA.md) - Database operations

### For Product Managers

1. [README](../README.md) - Product overview
2. [Presentation](PRESENTATION.md) - Business case
3. Roadmap (see README.md)
4. Use Cases (see Presentation)

### For Executives/Investors

1. [Presentation](PRESENTATION.md) - Complete investor pitch
2. [README](../README.md) - Technical overview
3. [Architecture Guide](ARCHITECTURE.md) - Technical foundation

---

## 🔍 Documentation by Task

### Setting Up Development Environment
1. [README](../README.md) - Quick start
2. [Contributing Guide](../CONTRIBUTING.md) - Detailed setup
3. [Deployment Guide](DEPLOYMENT.md) - Development deployment

### Deploying to Production
1. [Deployment Guide](DEPLOYMENT.md) - Complete deployment guide
2. [Architecture Guide](ARCHITECTURE.md) - Architecture understanding
3. [Database Schema](DATABASE_SCHEMA.md) - Database setup

### Integrating with API
1. [API Specification](API_SPECIFICATION.md) - Complete API reference
2. [Architecture Guide](ARCHITECTURE.md) - Understanding architecture
3. Examples (coming soon)

### Understanding Agents
1. [Agent System](AGENT_SYSTEM.md) - Complete agent documentation
2. [Architecture Guide](ARCHITECTURE.md) - Agent architecture
3. Agent Development Guide (coming soon)

### Contributing Code
1. [Contributing Guide](../CONTRIBUTING.md) - Development workflow
2. [Architecture Guide](ARCHITECTURE.md) - System design
3. [Database Schema](DATABASE_SCHEMA.md) - Data models
4. [Changelog](../CHANGELOG.md) - Version tracking

### Troubleshooting Issues
1. [Deployment Guide](DEPLOYMENT.md) - Troubleshooting section
2. Troubleshooting Guide (coming soon)
3. [Architecture Guide](ARCHITECTURE.md) - Understanding components
4. GitHub Issues - Community support

---

## 📖 Documentation Formats

### Markdown Files
All documentation is written in GitHub-flavored Markdown for:
- Easy version control
- Cross-platform compatibility
- Simple editing
- Clear formatting

### Diagrams
- **ASCII Art**: Text-based diagrams in Markdown
- **Mermaid**: Future integration for complex diagrams
- **Draw.io**: Source files in `diagrams/` directory

### Code Examples
- Inline code blocks
- Syntax highlighting
- Complete working examples

### API Documentation
- OpenAPI 3.1 specification (YAML)
- Swagger UI integration
- ReDoc integration

---

## 🔄 Documentation Updates

### Versioning
Documentation is versioned with the codebase. Each release includes:
- Updated documentation
- Migration guides (if needed)
- Changelog updates

### Contributing to Docs
See [Contributing Guide](../CONTRIBUTING.md) for:
- Documentation standards
- Writing style
- Review process

### Reporting Issues
Found an error or missing information?
- Open a GitHub Issue
- Tag as `documentation`
- Provide details

---

## 🌐 Additional Resources

### Online Resources
- **Website**: https://rage.ai (coming soon)
- **Documentation Site**: https://docs.rage.ai (coming soon)
- **API Playground**: https://api.rage.ai/docs (coming soon)

### Community
- **GitHub Discussions**: Questions and discussions
- **Discord**: Real-time chat (coming soon)
- **Twitter**: Updates and announcements (coming soon)

### Support
- **Community Support**: GitHub Discussions (free)
- **Enterprise Support**: Contact sales@rage.ai

---

## 📋 Documentation Checklist

When reading documentation for the first time:

- [ ] Read [README](../README.md) for overview
- [ ] Understand [Architecture](ARCHITECTURE.md)
- [ ] Review [API Specification](API_SPECIFICATION.md)
- [ ] Study [Database Schema](DATABASE_SCHEMA.md)
- [ ] Explore [Agent System](AGENT_SYSTEM.md)
- [ ] Follow [Deployment Guide](DEPLOYMENT.md) for setup
- [ ] Review [Contributing Guide](../CONTRIBUTING.md) if contributing

---

## 🎓 Learning Path

### Beginner (New to RAGE)
1. [README](../README.md) - 15 min
2. [Architecture Guide](ARCHITECTURE.md) - Overview section - 10 min
3. [Deployment Guide](DEPLOYMENT.md) - Quick start - 30 min
4. Try it out! - 30 min

**Total**: ~90 minutes to get started

### Intermediate (Ready to Develop)
1. [Contributing Guide](../CONTRIBUTING.md) - 30 min
2. [Architecture Guide](ARCHITECTURE.md) - Complete - 60 min
3. [Database Schema](DATABASE_SCHEMA.md) - 45 min
4. [Agent System](AGENT_SYSTEM.md) - 45 min
5. [API Specification](API_SPECIFICATION.md) - 60 min

**Total**: ~4 hours to understand system

### Advanced (Production Deployment)
1. [Deployment Guide](DEPLOYMENT.md) - Complete - 90 min
2. [Architecture Guide](ARCHITECTURE.md) - Security & Monitoring - 45 min
3. [Database Schema](DATABASE_SCHEMA.md) - Performance tuning - 30 min
4. Production deployment - 2-4 hours

**Total**: ~5-7 hours for production deployment

---

## 📞 Getting Help

### Documentation Questions
- Check this index first
- Search specific documentation files
- Check GitHub Discussions

### Technical Support
- GitHub Issues for bugs
- GitHub Discussions for questions
- Enterprise support: support@rage.ai

### Contributing
- See [Contributing Guide](../CONTRIBUTING.md)
- Open PRs for documentation improvements
- Join community discussions

---

**Last Updated**: 2025-01-XX  
**Documentation Version**: 0.1.0  
**RAGE Version**: 0.1.0

---

*This documentation is continuously updated. Check the [Changelog](../CHANGELOG.md) for recent changes.*
