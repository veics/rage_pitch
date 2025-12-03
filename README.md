# RAGE - Retrieval-Augmented Generation Engine

![RAGE Logo](docs/assets/rage-logo.png)

**Enterprise-grade, self-hosted RAG platform with Neural Agent Architecture**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![Node 20+](https://img.shields.io/badge/node-20+-green.svg)](https://nodejs.org/)

---

## 🎯 Overview

RAGE is a production-ready Retrieval-Augmented Generation system that combines:

- **🤖 Neural Agent Architecture**: Autonomous AI agents coordinating via MCP protocol
- **🧠 Knowledge Graph**: Neo4j-powered semantic understanding with concept mapping
- **🔍 Hybrid Search**: Vector (semantic) + Keyword (BM25) + Graph traversal
- **💬 Multi-LLM Support**: Ollama, llama.cpp, OpenAI, Anthropic, Groq, and more
- **🌐 Distributed P2P Network**: libp2p mesh networking with hybrid multi-CDN (Layer 10)
- **🔗 Knowledge Federation**: Cross-organization queries with certificate-based trust
- **📊 Real-time Monitoring**: Netdata agents in every container
- **🔒 Complete Privacy**: 100% self-hosted, your data never leaves your infrastructure

---

## ✨ Key Features

### Multi-Source Intelligence

- Ingest from PDFs, DOCX, Markdown, HTML, plain text
- Web scraping (URLs, sitemaps)
- Database connectors (PostgreSQL, MySQL, MongoDB)
- API integration (REST, GraphQL)
- Real-time synchronization

### Advanced Retrieval

- **Semantic Search**: Dense vector embeddings
- **Keyword Search**: BM25 ranking
- **Graph Traversal**: Concept relationship navigation
- **Hybrid Fusion**: Reciprocal Rank Fusion (RRF)
- **Contextual Re-ranking**: LLM-based relevance scoring

### Neural Agent System

- **Concept Mapper**: Extracts and maps concepts to knowledge graph
- **Document Retriever**: Multi-strategy search orchestration
- **Answer Synthesizer**: Coherent answer generation with citations
- **Query Analyzer**: Intent classification and expansion
- **Document Processor**: Intelligent parsing and chunking

### Knowledge Graph

- Automatic concept extraction
- Entity recognition (people, organizations, technologies)
- Relationship mapping
- Community detection
- PageRank importance scoring
- 3D visualization

### Distributed Network (Layer 10) ⭐ NEW

- **P2P Mesh Networking**: libp2p-powered peer discovery and content routing
- **Hybrid Multi-CDN**: Cloudflare + Fastly + AWS CloudFront + self-hosted Varnish
- **Content Replication**: Geographic diversity with configurable replication factor
- **Knowledge Federation**: Cross-organization queries with explicit trust lists
- **Edge Computing**: Content-addressed storage with CRDT synchronization
- **Zero-Trust Security**: Certificate-based authentication, ACL enforcement at every layer

**Documentation**: [NETWORK_LAYER.md](./docs/NETWORK_LAYER.md), [FEDERATION_GUIDE.md](./docs/FEDERATION_GUIDE.md), [DISTRIBUTED_DEPLOYMENT.md](./docs/DISTRIBUTED_DEPLOYMENT.md)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         RAGE Architecture                           │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│ Frontend Layer                                                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐      │
│  │  User UI   │  │  Admin UI  │  │   Mobile   │  │  Slack Bot │      │
│  │  (Mantine) │  │  (Mantine) │  │  (Future)  │  │  (Future)  │      │
│  └──────┬─────┘  └──────┬─────┘  └──────┬─────┘  └──────┬─────┘      │
│         └───────────────┴───────────────┴───────────────┘            │
└──────────────────────────────────┬───────────────────────────────────┘
                                   │
┌──────────────────────────────────▼───────────────────────────────────┐
│ API Gateway (Nginx/Traefik)                                          │
│  • Rate limiting                                                     │
│  • Load balancing                                                    │
│  • SSL termination                                                   │
│  • Request routing                                                   │
└──────────────────────────────────┬───────────────────────────────────┘
                                   │
┌──────────────────────────────────▼───────────────────────────────────┐
│ Application Layer (FastAPI)                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                │
│  │   Core API   │  │  Query API   │  │  Admin API   │                │
│  │              │  │              │  │              │                │
│  │ • Auth       │  │ • Search     │  │ • Config     │                │
│  │ • Users      │  │ • Chat       │  │ • Ingestion  │                │
│  │ • Health     │  │ • RAG        │  │ • Analytics  │                │
│  └──────────────┘  └──────────────┘  └──────────────┘                │
└──────────────────────────────────┬───────────────────────────────────┘
                                   │
┌──────────────────────────────────▼───────────────────────────────────┐
│ Agent Orchestration Layer (MCP Protocol)                             │
│  ┌───────────────────────────────────────────────────────────────┐   │
│  │                    Query Orchestrator                         │   │
│  │  • Task assignment                                            │   │
│  │  • Progress tracking                                          │   │
│  │  • Result aggregation                                         │   │
│  │  • Error handling                                             │   │
│  └───────────────────────────────────────────────────────────────┘   │
│         │              │              │              │               │
│         ▼              ▼              ▼              ▼               │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐          │
│  │ Concept   │  │ Document  │  │  Answer   │  │   Query   │          │
│  │  Mapper   │  │ Retriever │  │Synthesizer│  │ Analyzer  │          │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘          │
└──────────────────────────────────┬───────────────────────────────────┘
                                   │
┌──────────────────────────────────▼───────────────────────────────────┐
│ Data Layer                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                │
│  │ PostgreSQL   │  │    Neo4j     │  │    Valkey    │                │
│  │              │  │              │  │   (Redis)    │                │
│  │ • Users      │  │ • Concepts   │  │              │                │
│  │ • Documents  │  │ • Entities   │  │ • Sessions   │                │
│  │ • Queries    │  │ • Relations  │  │ • Cache      │                │
│  │ • Metadata   │  │ • Vectors    │  │ • Pub/Sub    │                │
│  └──────────────┘  └──────────────┘  └──────────────┘                │
└──────────────────────────────────────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼───────────────────────────────────┐
│ LLM Provider Layer (Pluggable)                                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Ollama  │  │llama.cpp │  │  OpenAI  │  │Anthropic │              │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │   Groq   │  │  Bedrock │  │  Custom  │  │  Future  │              │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘              │
└──────────────────────────────────────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼───────────────────────────────────┐
│ Monitoring Layer (Netdata + Prometheus + Grafana)                    │
│  • Per-container Netdata agents                                      │
│  • Prometheus metrics aggregation                                    │
│  • Grafana dashboards                                                │
│  • Jaeger distributed tracing                                        │
│  • Loki log aggregation                                              │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- **Container Runtime**: Podman 4.0+ (primary) or Docker 24.0+ (fallback)
- **Python**: 3.11+
- **Node.js**: 20+
- **Hardware**: 16GB RAM minimum, 32GB recommended
- **Storage**: 100GB+ SSD
- **OS**: Linux (preferred), macOS, Windows with WSL2

### Installation

```bash
# Clone repository
git clone https://github.com/veics/rage.git
cd rage

# Copy environment template
cp .env.example .env

# Edit configuration
vim .env

# Start with Podman (primary)
podman-compose up -d

# Or with Docker (fallback)
docker-compose up -d

# Verify services
podman-compose ps

# Access applications
# Frontend: http://localhost:3000
# API Docs: http://localhost:8000/docs
# Neo4j Browser: http://localhost:7474
# Grafana: http://localhost:3001
```

### First Query

```bash
# Via API
curl -X POST http://localhost:8000/api/v1/query \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is RAGE?",
    "strategy": "auto"
  }'

# Via Web UI
# Open http://localhost:3000 and start chatting!
```

---

## 📁 Project Structure

```
rage/
├── docs/                           # Documentation
│   ├── architecture/               # Architecture diagrams
│   ├── api/                        # API documentation
│   ├── agents/                     # Agent specifications
│   └── guides/                     # User/admin guides
│
├── src/                            # Source code
│   ├── api/                        # FastAPI application
│   │   ├── routers/                # API route handlers
│   │   ├── middleware/             # Custom middleware
│   │   └── websockets/             # WebSocket handlers
│   │
│   ├── agents/                     # Neural agents
│   │   ├── base.py                 # Base agent class
│   │   ├── concept_mapper.py       # Concept extraction
│   │   ├── document_retriever.py   # Search orchestration
│   │   ├── answer_synthesizer.py   # Answer generation
│   │   └── query_analyzer.py       # Query understanding
│   │
│   ├── orchestrator/               # Agent coordination
│   │   └── query_orchestrator.py   # Main orchestrator
│   │
│   ├── mcp/                        # Model Context Protocol
│   │   └── protocol.py             # MCP implementation
│   │
│   ├── llm/                        # LLM integration
│   │   ├── router.py               # Multi-provider routing
│   │   └── providers/              # Provider implementations
│   │       ├── ollama.py
│   │       ├── llamacpp.py
│   │       ├── openai.py
│   │       ├── anthropic.py
│   │       └── groq.py
│   │
│   ├── database/                   # Database clients
│   │   ├── postgres.py             # PostgreSQL
│   │   ├── neo4j.py                # Neo4j
│   │   └── redis.py                # Valkey/Redis
│   │
│   ├── ingestion/                  # Document ingestion
│   │   ├── pipeline.py             # Main pipeline
│   │   ├── parsers/                # Document parsers
│   │   └── chunking/               # Text chunking
│   │
│   ├── embeddings/                 # Embedding generation
│   │   └── generator.py
│   │
│   ├── search/                     # Search engines
│   │   ├── vector.py               # Vector search
│   │   ├── keyword.py              # BM25 search
│   │   ├── graph.py                # Graph search
│   │   └── hybrid.py               # Hybrid fusion
│   │
│   ├── models/                     # Data models
│   │   ├── user.py
│   │   ├── document.py
│   │   └── query.py
│   │
│   └── config/                     # Configuration
│       └── settings.py
│
├── frontend/                       # React frontend
│   ├── src/
│   │   ├── components/             # UI components
│   │   │   ├── chat/               # Chat interface
│   │   │   ├── graph/              # 3D graph viz
│   │   │   ├── admin/              # Admin panels
│   │   │   └── common/             # Shared components
│   │   │
│   │   ├── pages/                  # Page components
│   │   ├── hooks/                  # Custom hooks
│   │   ├── store/                  # State management
│   │   ├── api/                    # API clients
│   │   └── utils/                  # Utilities
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── monitoring/                     # Monitoring configuration
│   ├── netdata/                    # Netdata configs
│   ├── prometheus/                 # Prometheus rules
│   ├── grafana/                    # Grafana dashboards
│   └── jaeger/                     # Tracing config
│
├── deployment/                     # Deployment files
│   ├── podman/                     # Podman configs
│   │   └── podman-compose.yml
│   ├── docker/                     # Docker configs
│   │   └── docker-compose.yml
│   └── kubernetes/                 # K8s manifests (future)
│
├── scripts/                        # Utility scripts
│   ├── setup.sh                    # Initial setup
│   ├── migrate.sh                  # Database migrations
│   ├── backup.sh                   # Backup script
│   └── restore.sh                  # Restore script
│
├── tests/                          # Test suites
│   ├── unit/                       # Unit tests
│   ├── integration/                # Integration tests
│   └── e2e/                        # End-to-end tests
│
├── resources_not_in_git/           # Local resources (git-ignored)
│   ├── data/                       # Test data
│   ├── models/                     # Downloaded models
│   └── backups/                    # Local backups
│
├── .env.example                    # Environment template
├── .gitignore                      # Git ignore rules
├── pyproject.toml                  # Python dependencies
├── package.json                    # Node dependencies
├── Makefile                        # Development commands
├── LICENSE                         # MIT License
└── README.md                       # This file
```

---

## 🛠️ Technology Stack

### Backend

- **Runtime**: Python 3.11+
- **Framework**: FastAPI
- **ORM**: SQLAlchemy 2.0
- **Graph DB**: Neo4j Python Driver
- **Cache**: redis-py (Valkey/Redis)
- **Task Queue**: Celery
- **LLM**: Custom multi-provider router

### Frontend

- **Framework**: React 18
- **Language**: TypeScript 5
- **Build**: Vite 5
- **UI Library**: Mantine UI (primary), Shadcn/UI (optional)
- **State**: Zustand
- **Styling**: Tailwind CSS
- **3D Viz**: Three.js + D3.js

### Infrastructure

- **Container**: Podman 4+ (primary), Docker 24+ (fallback)
- **Database**: PostgreSQL 16
- **Graph DB**: Neo4j 5.15
- **Cache**: Valkey 7 / Redis 7
- **Reverse Proxy**: Nginx / Traefik
- **Monitoring**: Netdata (per-container agents)
- **Metrics**: Prometheus + Grafana
- **Tracing**: Jaeger
- **Logs**: Loki

### LLM Providers

- **Local**: Ollama, llama.cpp
- **Cloud**: OpenAI, Anthropic, Groq
- **Enterprise**: Azure OpenAI, AWS Bedrock
- **Custom**: Extensible provider system

---

## 📖 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Architecture Guide](docs/ARCHITECTURE.md)** - System design and components
- **[API Reference](docs/API.md)** - Complete API documentation
- **[Agent System](docs/AGENTS.md)** - Neural agent specifications
- **[Database Schema](docs/DATABASE.md)** - Data models and relationships
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Production deployment
- **[Configuration](docs/CONFIGURATION.md)** - All configuration options
- **[Monitoring](docs/MONITORING.md)** - Observability setup
- **[User Guide](docs/USER_GUIDE.md)** - End-user documentation
- **[Admin Guide](docs/ADMIN_GUIDE.md)** - Administration manual
- **[Development](docs/DEVELOPMENT.md)** - Contributing guidelines

---

## 🎯 Roadmap

### Phase 1: Foundation ✅

- [x] Core architecture design
- [x] Database schemas
- [x] Project structure
- [x] Development environment

### Phase 2: Core RAG (Current)

- [ ] Document ingestion pipeline
- [ ] Vector search implementation
- [ ] Basic query endpoint
- [ ] LLM integration
- [ ] Simple UI

### Phase 3: Neural Agents

- [ ] MCP protocol implementation
- [ ] Agent base architecture
- [ ] Concept Mapper agent
- [ ] Document Retriever agent
- [ ] Answer Synthesizer agent
- [ ] Query Orchestrator

### Phase 4: Knowledge Graph

- [ ] Neo4j schema design
- [ ] Concept extraction
- [ ] Relationship mapping
- [ ] Graph-based search
- [ ] Community detection

### Phase 5: Advanced Features

- [ ] Multi-turn conversations
- [ ] Query expansion
- [ ] Answer validation
- [ ] Citation management
- [ ] Feedback loops

### Phase 6: Production

- [ ] Performance optimization
- [ ] Security hardening
- [ ] Monitoring setup
- [ ] Documentation completion
- [ ] User acceptance testing

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Setup

```bash
# Install Python dependencies
pip install -e ".[dev]"

# Install frontend dependencies
cd frontend && npm install

# Run tests
make test

# Run linting
make lint

# Start development servers
make dev
```

---

## 📊 Monitoring

RAGE includes comprehensive monitoring with Netdata agents in every container:

- **Real-time Metrics**: CPU, memory, disk, network per container
- **Application Metrics**: Query latency, throughput, error rates
- **LLM Metrics**: Token usage, costs, provider health
- **Custom Dashboards**: Pre-configured Grafana dashboards
- **Alerting**: Prometheus alerts for critical issues

Access monitoring:

- **Netdata**: http://localhost:19999
- **Grafana**: http://localhost:3001
- **Prometheus**: http://localhost:9090
- **Jaeger**: http://localhost:16686

---

## 🔒 Security

- **Authentication**: JWT-based with refresh tokens
- **Authorization**: Role-based access control (RBAC)
- **Data Encryption**: TLS in transit, encryption at rest
- **API Security**: Rate limiting, input validation
- **Container Security**: Non-root users, security scanning
- **Audit Logging**: Complete audit trail

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Neo4j for the amazing graph database
- Ollama team for local LLM inference
- FastAPI for the excellent framework
- Mantine UI for beautiful components
- Netdata for real-time monitoring

---

## 📞 Support

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/veics/rage/issues)
- **Discussions**: [GitHub Discussions](https://github.com/veics/rage/discussions)

---

**Built with ❤️ for the open-source community**
