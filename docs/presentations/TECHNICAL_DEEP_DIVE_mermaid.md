# TECHNICAL_DEEP_DIVE (Mermaid version)

Mermaid equivalents for ASCII diagrams in `TECHNICAL_DEEP_DIVE.md`. Original ASCII retained; this file provides parallel diagrams for slide decks.

## 1.1 High-Level Overview (Mermaid)

```mermaid
flowchart TB
    subgraph L7[Layer 7: Presentation]
        UI[React Admin/User UI]
    end
    subgraph L6[Layer 6: Gateway]
        Traefik[Traefik\nAuth + Rate Limiting]
    end
    subgraph L5[Layer 5: Application]
        RAG[RAG Core]
        ACL[ACL Service]
    end
    subgraph L4[Layer 4: Orchestration]
        Agents[Agents]
        MCP[MCP Protocol]
    end
    subgraph L3[Layer 3: Business Logic]
        Search[Search]
        Ingest[Ingestion]
    end
    subgraph L2[Layer 2: Data]
        PG[(PostgreSQL)]
        Neo[(Neo4j)]
        Qdrant[(Qdrant)]
        Valkey[(Valkey)]
    end
    subgraph L1[Layer 1: LLM Providers]
        Ollama[Ollama]
        OpenAI[OpenAI]
        Anthropic[Anthropic]
    end
    subgraph L0[Layer 0: Monitoring]
        Netdata[Netdata]
        Prom[Prometheus]
        Graf[Grafana]
    end

    UI --> Traefik --> RAG --> Search --> PG
    RAG --> ACL
    RAG --> Agents
    Agents --> MCP
    Search --> Neo
    Search --> Qdrant
    Search --> Valkey
    RAG --> Ollama
    RAG --> OpenAI
    RAG --> Anthropic
    Netdata --> Prom --> Graf

    classDef layer fill:#f7f7f7,stroke:#999,stroke-width:1px;
    class L7,L6,L5,L4,L3,L2,L1,L0 layer;
```

## 1.3 Container Topology (Mermaid)

```mermaid
flowchart TB
    subgraph Core Services
        Traefik[traefik-gateway]
        RagAPI[rag-core-api]
        ACLSvc[acl-service]
        SearchSvc[search-engine]
    end
    subgraph Integrations
        Confluence[confluence-ingestor]
        Jira[jira-agent]
        Slack[slack-bot]
    end
    subgraph Data Layer
        PGPrimary[postgres-primary]
        PGReplica[postgres-replica]
        Neo[neo4j]
        Qdrant[qdrant]
        Valkey[valkey]
    end
    subgraph LLM Layer
        Ollama[ollama]
        LLMRouter[llm-router]
    end
    subgraph Frontend
        AdminUI[admin-ui]
        UserUI[user-ui]
    end
    subgraph Monitoring
        NetdataParent[netdata-parent]
        NetdataChildren[netdata-child-1,2,3]
        Prom[prometheus]
        Graf[grafana]
        Loki[loki]
        Jaeger[jaeger]
    end
    subgraph Workers
        Celery1[celery-worker-1]
        Celery2[celery-worker-2]
        Celery3[celery-worker-3]
        CeleryBeat[celery-beat]
    end

    Traefik --> RagAPI --> ACLSvc --> SearchSvc
    RagAPI --> AdminUI
    RagAPI --> UserUI
    SearchSvc --> PGPrimary
    SearchSvc --> PGReplica
    SearchSvc --> Neo
    SearchSvc --> Qdrant
    RagAPI --> Valkey
    LLMRouter --> Ollama

    NetdataParent --> NetdataChildren
    NetdataParent --> Prom --> Graf
    Loki --> Graf
    Jaeger --> Graf
```

## Deployment Timeline (Beta + Fallback)

Beta chart (if supported):

```mermaid
timeline
        title Release v1.2.3 Timeline
        section Preparation
            Tests pass           : 2025-11-01
            Freeze branches      : 2025-11-02
        section Deployment
            Rollout staging      : 2025-11-03
            Canary production    : 2025-11-04
            Full production      : 2025-11-05
        section Post-Deploy
            Monitor dashboards   : 2025-11-06
            Incident drill       : 2025-11-07
```

> Viewer Notes
> - Presentation includes a Mermaid `timeline` (beta) for deployment, with a `sequenceDiagram` fallback.
> - If your slide renderer does not support beta charts, present the fallback sequence.

Fallback (standard sequence):

```mermaid
sequenceDiagram
        participant Dev as Developer
        participant CI as CI/CD
        participant Stg as Staging
        participant Prod as Production

        Dev->>CI: Run tests
        CI-->>Dev: Tests pass
        Dev->>CI: Freeze branches
        CI->>Stg: Rollout staging
        Stg-->>CI: OK
        CI->>Prod: Canary production
        Prod-->>CI: Health OK
        CI->>Prod: Full production
        Dev->>Grafana: Monitor dashboards
        Dev->>Team: Incident drill
```
