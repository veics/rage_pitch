# RAGE Quick Reference

**One-page cheat sheet for RAGE - Retrieval-Augmented Generation Engine**

---

## 🚀 Quick Start

```bash
# Clone and start
git clone https://github.com/veics/rage.git && cd rage
cp .env.example .env
podman-compose up -d

# Access
# Frontend: http://localhost:3000
# API:      http://localhost:8000/docs
```

---

## 🏗️ Architecture Overview

```
Frontend (Mantine UI) → Nginx → FastAPI → Agents (MCP) → Databases
                                              ↓
                                   [PostgreSQL | Neo4j | Valkey]
                                              ↓
                                         LLM Providers
```

---

## 📊 Tech Stack

| Layer          | Technology                                 |
| -------------- | ------------------------------------------ |
| **Frontend**   | React + Mantine UI + TypeScript + Three.js |
| **Backend**    | FastAPI + Python 3.11                      |
| **Databases**  | PostgreSQL 16, Neo4j 5.15, Valkey 7        |
| **Containers** | Podman (primary), Docker (fallback)        |
| **LLMs**       | Ollama, OpenAI, Anthropic, Groq, etc.      |
| **Monitoring** | Netdata, Prometheus, Grafana, Jaeger, Loki |

---

## 🤖 Neural Agents

```
Query → Analyzer → Concept Mapper → Retriever → Synthesizer → Answer
         (MCP)         (MCP)           (MCP)        (MCP)
```

### 4 Core Agents

1. **Query Analyzer**: Intent classification, entity extraction
2. **Concept Mapper**: Knowledge graph mapping
3. **Document Retriever**: Hybrid search (vector + keyword + graph)
4. **Answer Synthesizer**: Answer generation with citations

---

## 🌐 Distributed Network (Layer 10) ⭐ NEW

```
P2P Mesh (libp2p) + Multi-CDN + Federation
         ↓              ↓            ↓
   Peer Discovery   Edge Cache   Cross-Org Query
```

### Quick Deploy: P2P Network

```bash
# Generate peer identity
podman run rage/network-agent --generate-identity > peer-id.json

# Configure P2P
export RAGE_NETWORK_ENABLED=true
export RAGE_PEER_ID=$(jq -r '.peer_id' peer-id.json)
export RAGE_BOOTSTRAP_PEERS=/ip4/bootstrap.rage.io/tcp/4001/p2p/12D3...

# Deploy distributed
podman-compose -f compose.distributed.yaml up -d

# Check peers
curl localhost:8000/api/v1/network/peers
```

### Network Endpoints

```bash
# P2P Network
GET  /api/v1/network/peers          # List connected peers
POST /api/v1/network/connect        # Connect to peer
GET  /api/v1/network/stats/bandwidth # Bandwidth metrics

# Federation
POST /api/v1/federation/query       # Cross-org query
GET  /api/v1/federation/trust        # List trust relationships
POST /api/v1/federation/trust        # Create trust

# CDN
GET  /api/v1/cdn/providers          # List CDN providers
POST /api/v1/cdn/cache/purge        # Invalidate cache
GET  /api/v1/cdn/analytics          # CDN performance

# Replication
GET  /api/v1/replication/status     # Replication status
POST /api/v1/replication/replicate  # Trigger replication
```

### Deployment Topologies

| Topology | Use Case | Complexity |
|----------|----------|------------|
| **Single-Org Multi-Region** | Global enterprise | Medium |
| **Hub-and-Spoke** | HQ + regional offices | Low |
| **Federated Multi-Org** | Partner ecosystem | High |

**Full Guide**: [DISTRIBUTED_DEPLOYMENT.md](./docs/DISTRIBUTED_DEPLOYMENT.md)

---

## 🔍 Search Strategies

| Strategy    | Description              | When to Use        |
| ----------- | ------------------------ | ------------------ |
| **Vector**  | Semantic similarity      | Conceptual queries |
| **Keyword** | BM25 full-text           | Exact terms        |
| **Graph**   | Concept relationships    | Discovery          |
| **Hybrid**  | All three combined (RRF) | Default (best)     |

---

## 🗄️ Databases

### PostgreSQL

- Users, teams, documents, queries
- ACL, audit logs, metadata

### Neo4j

- Concepts, entities, relationships
- Vector search (embeddings)
- Graph algorithms

### Valkey (Redis)

- Sessions, cache
- Pub/Sub, task queues

---

## 📡 API Endpoints

### Authentication

```bash
POST /api/v1/auth/login          # Login
POST /api/v1/auth/refresh        # Refresh token
GET  /api/v1/auth/me             # Current user
```

### Query

```bash
POST /api/v1/query               # Execute query
GET  /api/v1/query/{id}          # Query status
POST /api/v1/chat                # Chat conversation
```

### Documents

```bash
POST /api/v1/documents           # Upload document
GET  /api/v1/documents           # List documents
GET  /api/v1/documents/{id}      # Get document
DELETE /api/v1/documents/{id}    # Delete document
```

### Admin

```bash
POST /api/v1/admin/ingest        # Trigger ingestion
GET  /api/v1/admin/metrics       # System metrics
GET  /api/v1/admin/health        # Health check
```

---

## 🔐 Environment Variables

### Required

```bash
# Security
JWT_SECRET=your-secret-key

# PostgreSQL
POSTGRES_PASSWORD=change-me

# Neo4j
NEO4J_PASSWORD=change-me

# Redis
REDIS_PASSWORD=change-me

# LLM Provider
LLM_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
```

### Optional

```bash
# OpenAI
OPENAI_API_KEY=sk-...

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Groq
GROQ_API_KEY=...
```

---

## 🐳 Container Commands

### Podman (Primary)

```bash
podman-compose up -d             # Start all services
podman-compose ps                # List services
podman-compose logs -f api       # Follow logs
podman-compose exec api bash     # Execute command
podman-compose down              # Stop all services
```

### Docker (Fallback)

```bash
docker-compose up -d
docker-compose ps
docker-compose logs -f api
docker-compose exec api bash
docker-compose down
```

---

## 📦 Services

| Service    | Port       | Description     |
| ---------- | ---------- | --------------- |
| Frontend   | 3000       | React UI        |
| API        | 8000       | FastAPI backend |
| PostgreSQL | 5432       | Metadata DB     |
| Neo4j      | 7474, 7687 | Graph DB        |
| Valkey     | 6379       | Cache/Redis     |
| MinIO      | 9000, 9001 | S3 storage      |
| Ollama     | 11434      | Local LLM       |
| Nginx      | 80, 443    | Reverse proxy   |
| Netdata    | 19999      | Monitoring      |
| Prometheus | 9090       | Metrics         |
| Grafana    | 3001       | Dashboards      |

---

## 🧪 Testing

```bash
# Backend
pytest                          # All tests
pytest tests/unit               # Unit tests
pytest tests/integration        # Integration tests
pytest --cov=src                # With coverage

# Frontend
npm test                       # All tests
npm run test:coverage          # With coverage
npm run test:e2e               # E2E tests
```

---

## 🔧 Development

```bash
# Backend
pip install -e ".[dev]"         # Install dev dependencies
uvicorn src.api.main:app --reload  # Run API (auto-reload)
alembic upgrade head            # Run migrations
alembic revision --autogenerate # Create migration

# Frontend
npm install                     # Install dependencies
npm run dev                     # Run dev server
npm run build                   # Build for production
npm run lint                    # Lint code

# Formatting
black src/ tests/               # Format Python
ruff check src/ tests/          # Lint Python
npm run format                  # Format TypeScript
```

---

## 📊 Monitoring

### Access Points

- **Netdata**: http://localhost:19999
- **Grafana**: http://localhost:3001 (admin/admin)
- **Prometheus**: http://localhost:9090
- **Jaeger**: http://localhost:16686

### Key Metrics

- Query latency (p95)
- Search accuracy
- Token usage
- Error rates
- Resource utilization

---

## 🔍 Common Tasks

### Upload Document

```bash
curl -X POST http://localhost:8000/api/v1/documents \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@document.pdf"
```

### Execute Query

```bash
curl -X POST http://localhost:8000/api/v1/query \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "What is RAGE?", "strategy": "hybrid"}'
```

### Check Health

```bash
curl http://localhost:8000/api/v1/health
```

### View Logs

```bash
podman-compose logs -f api      # API logs
podman-compose logs -f agents   # Agent logs
podman-compose logs -f postgres # Database logs
```

---

## 🐛 Troubleshooting

### Service won't start

```bash
podman-compose ps              # Check status
podman-compose logs service    # View logs
podman-compose restart service # Restart service
```

### Database connection issues

```bash
# Check PostgreSQL
podman-compose exec postgres psql -U rage_user -d rage

# Check Neo4j
# Open http://localhost:7474

# Check Valkey
podman-compose exec valkey valkey-cli ping
```

### Reset everything

```bash
podman-compose down -v         # Stop and remove volumes
rm -rf data/                   # Remove data (WARNING!)
podman-compose up -d           # Start fresh
```

---

## 📚 Documentation

| Document                              | Description       |
| ------------------------------------- | ----------------- |
| [README](../README.md)                | Project overview  |
| [Architecture](docs/ARCHITECTURE.md)  | System design     |
| [API Spec](docs/API_SPECIFICATION.md) | API reference     |
| [Database](docs/DATABASE_SCHEMA.md)   | Database schemas  |
| [Agents](docs/AGENT_SYSTEM.md)        | Agent system      |
| [Deployment](docs/DEPLOYMENT.md)      | Deployment guide  |
| [Contributing](CONTRIBUTING.md)       | How to contribute |

---

## 🆘 Getting Help

- **Documentation**: `docs/README.md`
- **Issues**: https://github.com/veics/rage/issues
- **Discussions**: https://github.com/veics/rage/discussions
- **Email**: hello@rage.ai

---

## 📄 License

MIT License - see [LICENSE](LICENSE)

---

**RAGE v0.1.0** | Last Updated: 2025-01-XX
