# RAGE Monitoring & Observability

**Version**: 2.0  
**Last Updated**: December 3, 2025  
**Status**: Production-Ready

---

## Table of Contents

1. [Observability Overview](#observability-overview)
2. [Netdata Integration](#netdata-integration)
3. [Metrics Collection](#metrics-collection)
4. [Live Dashboards](#live-dashboards)
5. [Query Analytics](#query-analytics)
6. [Hybrid Search Observability](#hybrid-search-observability)
7. [Alert Configuration](#alert-configuration)
8. [Performance Monitoring](#performance-monitoring)
9. [Distributed Network Monitoring (Layer 10)](#distributed-network-monitoring-layer-10)

---

## Observability Overview

RAGE implements **comprehensive observability** across all layers using a modern monitoring stack:

### Monitoring Stack

```mermaid
%%{init: {'theme':'dark', 'flowchart': {'nodeSpacing': 30, 'rankSpacing': 40, 'curve': 'basis'}, 'themeVariables': {'labelBackground':'rgba(38, 50, 56, 0.1)'}}}%%
graph TB
    subgraph "Application Layer"
        APP1[RAG Core]
        APP2[ACL Service]
        APP3[Search Engine]
        APP4[Agents]
    end
    
    subgraph "Metrics Collection"
        NET[🔵 Netdata<br/>Per-container agents]
        PROM[📊 Prometheus<br/>Time-series DB]
    end
    
    subgraph "Logs"
        LOKI[📝 Loki<br/>Log aggregation]
        PROMTAIL[Promtail<br/>Log shipper]
    end
    
    subgraph "Traces"
        JAEGER[🔍 Jaeger<br/>Distributed tracing]
    end
    
    subgraph "Visualization"
        GRAF[📈 Grafana<br/>Dashboards]
        ADMIN[💻 Admin UI<br/>Live metrics]
    end
    
    subgraph "Alerting"
        ALERT[🚨 AlertManager<br/>Notifications]
        SLACK[💬 Slack]
        EMAIL[📧 Email]
    end
    
    APP1 --> NET
    APP2 --> NET
    APP3 --> NET
    APP4 --> NET
    
    APP1 --> PROMTAIL
    APP2 --> PROMTAIL
    APP3 --> PROMTAIL
    APP4 --> PROMTAIL
    
    APP1 -.-> JAEGER
    APP2 -.-> JAEGER
    APP3 -.-> JAEGER
    APP4 -.-> JAEGER
    
    NET --> PROM
    PROM --> GRAF
    PROM --> ADMIN
    PROM --> ALERT
    
    PROMTAIL --> LOKI
    LOKI --> GRAF
    
    JAEGER --> GRAF
    
    ALERT --> SLACK
    ALERT --> EMAIL
    
    classDef net fill:#00bfa5,stroke:#00695c,stroke-width:2px
    classDef prom fill:#e6522c,stroke:#a63b1e,stroke-width:2px
    classDef loki fill:#f5a623,stroke:#c77800,stroke-width:2px
    classDef jaeger fill:#60d0e4,stroke:#2c97a3,stroke-width:2px
    classDef graf fill:#f46800,stroke:#b84300,stroke-width:2px
    classDef admin fill:#1976d2,stroke:#0d47a1,stroke-width:2px
    classDef alert fill:#ff5722,stroke:#bf360c,stroke-width:2px

    class NET net
    class PROM prom
    class LOKI loki
    class JAEGER jaeger
    class GRAF graf
    class ADMIN admin
    class ALERT alert
    
    linkStyle default stroke:#64b5f6,stroke-width:2px;
    
    classDef boxStyle fill:none,stroke:#64b5f6,stroke-width:2px,stroke-dasharray:5 5;
    class "Application Layer","Metrics Collection","Logs","Traces","Alerting" boxStyle;
```

### Three Pillars of Observability

```yaml
1. Metrics (Quantitative):
   - System metrics: CPU, memory, disk, network
   - Application metrics: Request rate, latency, errors
   - Business metrics: Queries/day, cache hit rate, cost
   
2. Logs (Qualitative):
   - Structured JSON logs
   - Correlation IDs for tracing
   - Log levels: DEBUG, INFO, WARNING, ERROR, CRITICAL
   
3. Traces (Distributed):
   - Request flow across services
   - Latency breakdown per component
   - Dependency mapping
```

---

## Netdata Integration

> Viewer Notes
> - Some diagrams in this document use Mermaid beta charts (`xychart-beta`, `quadrantChart`). If your renderer does not support beta features, view the labeled fallback blocks directly beneath each beta chart.
> - Standard Mermaid diagrams (flowchart, sequence) should render in most Markdown viewers.

### Architecture: Parent-Child Deployment

```mermaid
%%{init: {'theme':'dark', 'flowchart': {'nodeSpacing': 30, 'rankSpacing': 40, 'curve': 'basis'}, 'themeVariables': {'labelBackground':'rgba(38, 50, 56, 0.1)'}}}%%
graph TB
    subgraph "Netdata Parent"
        NP[Netdata Parent<br/>Aggregates all metrics<br/>Port: 19999]
        NPD[(Metrics DB<br/>30 days retention)]
    end
    
    subgraph "Container Nodes"
        subgraph "Node 1"
            NC1[Netdata Child 1]
            C1[RAG Core]
            C2[ACL Service]
            C3[PostgreSQL]
        end
        
        subgraph "Node 2"
            NC2[Netdata Child 2]
            C4[Search Engine]
            C5[Neo4j]
            C6[Qdrant]
        end
        
        subgraph "Node 3"
            NC3[Netdata Child 3]
            C7[Agents]
            C8[LLM Providers]
            C9[Celery Workers]
        end
    end
    
    C1 --> NC1
    C2 --> NC1
    C3 --> NC1
    
    C4 --> NC2
    C5 --> NC2
    C6 --> NC2
    
    C7 --> NC3
    C8 --> NC3
    C9 --> NC3
    
    NC1 --> NP
    NC2 --> NP
    NC3 --> NP
    
    NP --> NPD
    
    NP --> PROM[Prometheus<br/>Scrapes /api/v1/allmetrics]
    
    style NP fill:#00695c,stroke:#4db6ac,stroke-width:3px
    style NC1 fill:#00838f,stroke:#4dd0e1,stroke-width:2px
    style NC2 fill:#00838f,stroke:#4dd0e1,stroke-width:2px
    style NC3 fill:#00838f,stroke:#4dd0e1,stroke-width:2px
    style PROM fill:#bf360c,stroke:#ff8a65,stroke-width:2px
    
    linkStyle default stroke:#64b5f6,stroke-width:2px;
    
    classDef boxStyle fill:none,stroke:#64b5f6,stroke-width:2px,stroke-dasharray:5 5;
    class "Netdata Parent","Container Nodes" boxStyle;
```

### Netdata Configuration

#### Parent Node Config

```yaml
# /monitoring/netdata/parent.conf
[global]
    hostname = rage-netdata-parent
    bind to = *
    default port = 19999
    update every = 1
    memory mode = dbengine
    page cache size = 128
    dbengine multihost disk space = 10240  # 10GB

[web]
    enable = yes
    bind to = *
    allow connections from = *
    allow management from = localhost

[plugins]
    enable = yes
    python.d = yes
    go.d = yes
    apps = yes
    cgroups = yes

[streaming]
    enabled = yes
    allow from = *
    default history = 3600
    default memory mode = dbengine
```

#### Child Node Config

```yaml
# /monitoring/netdata/child.conf
[global]
    hostname = rage-node-1
    update every = 1
    memory mode = ram
    history = 3600

[streaming]
    enabled = yes
    destination = netdata-parent:19999
    api key = YOUR_SECRET_API_KEY
    timeout seconds = 60
    default port = 19999
    send charts matching = *
    buffer size bytes = 1048576
    reconnect delay seconds = 5
    initial clock resync iterations = 60
```

### Per-Container Metrics

Each RAGE container reports custom metrics to Netdata:

```python
# backend/rag_core/metrics.py
from prometheus_client import Counter, Histogram, Gauge, CollectorRegistry
import time

# Create metrics registry
registry = CollectorRegistry()

# Request metrics
request_count = Counter(
    'rag_query_requests_total',
    'Total RAG query requests',
    ['method', 'endpoint', 'status'],
    registry=registry
)

request_latency = Histogram(
    'rag_query_latency_seconds',
    'RAG query latency distribution',
    ['method', 'endpoint'],
    buckets=[0.1, 0.5, 1.0, 2.0, 5.0, 10.0],
    registry=registry
)

# Business metrics
active_queries = Gauge(
    'rag_active_queries',
    'Number of currently processing queries',
    registry=registry
)

cache_hit_rate = Gauge(
    'rag_cache_hit_rate',
    'Query cache hit rate (0-1)',
    registry=registry
)

acl_filter_ratio = Gauge(
    'rag_acl_filter_ratio',
    'Ratio of documents filtered by ACL (0-1)',
    registry=registry
)

# LLM metrics
llm_tokens_used = Counter(
    'rag_llm_tokens_total',
    'Total LLM tokens consumed',
    ['provider', 'model'],
    registry=registry
)

llm_cost = Counter(
    'rag_llm_cost_usd',
    'Total LLM cost in USD',
    ['provider', 'model'],
    registry=registry
)

# Middleware to track metrics
async def metrics_middleware(request, call_next):
    method = request.method
    endpoint = request.url.path
    
    active_queries.inc()
    start_time = time.time()
    
    try:
        response = await call_next(request)
        status = response.status_code
        
        request_count.labels(method=method, endpoint=endpoint, status=status).inc()
        latency = time.time() - start_time
        request_latency.labels(method=method, endpoint=endpoint).observe(latency)
        
        return response
    finally:
        active_queries.dec()
```

### Netdata Custom Metrics Plugin

```python
# /monitoring/netdata/plugins/rage_metrics.py
#!/usr/bin/env python3
"""
Netdata custom plugin for RAGE metrics.
"""
import json
import requests
from bases.FrameworkServices.UrlService import UrlService

ORDER = [
    'queries_per_second',
    'cache_hit_rate',
    'acl_filter_ratio',
    'llm_cost',
]

CHARTS = {
    'queries_per_second': {
        'options': [None, 'RAG Queries', 'queries/s', 'rag', 'rag.queries', 'line'],
        'lines': [
            ['queries', 'queries', 'incremental'],
        ]
    },
    'cache_hit_rate': {
        'options': [None, 'Cache Hit Rate', 'percentage', 'rag', 'rag.cache', 'area'],
        'lines': [
            ['cache_hits', 'hit rate', 'absolute', 1, 100],
        ]
    },
    'acl_filter_ratio': {
        'options': [None, 'ACL Filtering', 'percentage', 'rag', 'rag.acl', 'area'],
        'lines': [
            ['acl_filtered', 'filtered', 'absolute', 1, 100],
        ]
    },
    'llm_cost': {
        'options': [None, 'LLM Cost', 'USD/hour', 'rag', 'rag.cost', 'line'],
        'lines': [
            ['llm_cost', 'cost', 'incremental', 1, 100],
        ]
    },
}

class Service(UrlService):
    def __init__(self, configuration=None, name=None):
        UrlService.__init__(self, configuration=configuration, name=name)
        self.order = ORDER
        self.definitions = CHARTS
        self.url = self.configuration.get('url', 'http://localhost:8000/metrics')

    def _get_data(self):
        try:
            response = requests.get(self.url, timeout=5)
            metrics = response.json()
            
            return {
                'queries': metrics.get('rag_query_requests_total', 0),
                'cache_hits': metrics.get('rag_cache_hit_rate', 0) * 100,
                'acl_filtered': metrics.get('rag_acl_filter_ratio', 0) * 100,
                'llm_cost': metrics.get('rag_llm_cost_usd', 0),
            }
        except Exception as e:
            self.error(f'Failed to fetch metrics: {e}')
            return None
```

---

## Metrics Collection

### System Metrics (Automatic)

Netdata automatically collects:

```yaml
System Metrics:
  CPU:
    - Usage per core
    - System vs user time
    - Context switches
    - Interrupts
  
  Memory:
    - RAM usage
    - Swap usage
    - Cache/buffers
    - Memory pressure
  
  Disk:
    - I/O operations
    - Read/write throughput
    - Disk latency
    - Disk space usage
  
  Network:
    - Bandwidth usage
    - Packets sent/received
    - Errors and drops
    - Connection states
```

### Application Metrics (Custom)

```python
# backend/rag_core/api/query.py
@router.post("/api/v1/query")
async def rag_query(request: QueryRequest, current_user = Depends(get_current_user)):
    """Execute RAG query with full metrics tracking."""
    
    start_time = time.time()
    query_id = str(uuid.uuid4())
    
    # Track active queries
    active_queries.inc()
    
    try:
        # 1. Search documents
        search_start = time.time()
        search_results = await search_engine.hybrid_search(
            query=request.query,
            top_k=50
        )
        search_latency = time.time() - search_start
        
        # Record search latency
        search_latency_hist.observe(search_latency)
        
        # 2. ACL filtering
        acl_start = time.time()
        allowed_docs = await acl_service.filter_documents(
            user_id=current_user.id,
            documents=search_results
        )
        acl_latency = time.time() - acl_start
        
        # Record ACL metrics
        acl_latency_hist.observe(acl_latency)
        acl_filter_ratio.set(1 - len(allowed_docs) / len(search_results))
        
        # 3. Generate answer
        llm_start = time.time()
        answer = await llm_provider.generate_answer(
            query=request.query,
            context=allowed_docs[:10]
        )
        llm_latency = time.time() - llm_start
        
        # Record LLM metrics
        llm_latency_hist.observe(llm_latency)
        llm_tokens_used.labels(
            provider=answer.provider,
            model=answer.model
        ).inc(answer.tokens_used)
        llm_cost.labels(
            provider=answer.provider,
            model=answer.model
        ).inc(answer.cost_usd)
        
        # Total latency
        total_latency = time.time() - start_time
        request_latency.labels(
            method='POST',
            endpoint='/api/v1/query'
        ).observe(total_latency)
        
        # Success count
        request_count.labels(
            method='POST',
            endpoint='/api/v1/query',
            status=200
        ).inc()
        
        return {
            'query_id': query_id,
            'answer': answer.text,
            'citations': allowed_docs[:10],
            'metadata': {
                'search_latency_ms': search_latency * 1000,
                'acl_latency_ms': acl_latency * 1000,
                'llm_latency_ms': llm_latency * 1000,
                'total_latency_ms': total_latency * 1000,
                'documents_searched': len(search_results),
                'documents_allowed': len(allowed_docs),
                'tokens_used': answer.tokens_used,
                'cost_usd': answer.cost_usd,
            }
        }
        
    except Exception as e:
        # Error count
        request_count.labels(
            method='POST',
            endpoint='/api/v1/query',
            status=500
        ).inc()
        raise
    finally:
        active_queries.dec()
```

---

## Live Dashboards

### Admin UI Integration

The Admin UI embeds live metrics from Netdata and Grafana:

```typescript
// frontend/admin/src/pages/Monitoring/LiveMetrics.tsx
import { useEffect, useState } from 'react';
import { Card, Grid, Text, Progress, Badge } from '@mantine/core';

interface SystemMetrics {
  cpu_usage: number;
  memory_usage: number;
  disk_usage: number;
  network_rx_mbps: number;
  network_tx_mbps: number;
  active_queries: number;
  cache_hit_rate: number;
  llm_cost_per_hour: number;
}

export function LiveMetrics() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);

  useEffect(() => {
    // WebSocket connection to metrics stream
    const ws = new WebSocket('ws://localhost:8000/ws/metrics');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMetrics(data);
    };

    return () => ws.close();
  }, []);

  if (!metrics) return <Text>Loading metrics...</Text>;

  return (
    <Grid>
      <Grid.Col span={3}>
        <Card>
          <Text size="sm" color="dimmed">CPU Usage</Text>
          <Text size="xl" weight={700}>{metrics.cpu_usage.toFixed(1)}%</Text>
          <Progress
            value={metrics.cpu_usage}
            color={metrics.cpu_usage > 80 ? 'red' : 'blue'}
          />
        </Card>
      </Grid.Col>

      <Grid.Col span={3}>
        <Card>
          <Text size="sm" color="dimmed">Memory Usage</Text>
          <Text size="xl" weight={700}>{metrics.memory_usage.toFixed(1)}%</Text>
          <Progress
            value={metrics.memory_usage}
            color={metrics.memory_usage > 90 ? 'red' : 'green'}
          />
        </Card>
      </Grid.Col>

      <Grid.Col span={3}>
        <Card>
          <Text size="sm" color="dimmed">Active Queries</Text>
          <Text size="xl" weight={700}>{metrics.active_queries}</Text>
          <Badge color={metrics.active_queries > 100 ? 'red' : 'green'}>
            {metrics.active_queries > 100 ? 'High Load' : 'Normal'}
          </Badge>
        </Card>
      </Grid.Col>

      <Grid.Col span={3}>
        <Card>
          <Text size="sm" color="dimmed">Cache Hit Rate</Text>
          <Text size="xl" weight={700}>{(metrics.cache_hit_rate * 100).toFixed(1)}%</Text>
          <Badge color={metrics.cache_hit_rate > 0.6 ? 'green' : 'yellow'}>
            {metrics.cache_hit_rate > 0.6 ? 'Excellent' : 'Could Improve'}
          </Badge>
        </Card>
      </Grid.Col>
    </Grid>
  );
}
```

### Grafana Dashboards

Pre-built dashboards for RAGE:

```json
{
  "dashboard": {
    "title": "RAGE Platform Overview",
    "panels": [
      {
        "title": "Query Rate",
        "targets": [
          {
            "expr": "rate(rag_query_requests_total[5m])",
            "legendFormat": "{{endpoint}}"
          }
        ],
        "type": "graph"
      },
      {
        "title": "Latency Percentiles",
        "targets": [
          {
            "expr": "histogram_quantile(0.50, rag_query_latency_seconds)",
            "legendFormat": "p50"
          },
          {
            "expr": "histogram_quantile(0.95, rag_query_latency_seconds)",
            "legendFormat": "p95"
          },
          {
            "expr": "histogram_quantile(0.99, rag_query_latency_seconds)",
            "legendFormat": "p99"
          }
        ],
        "type": "graph"
      },
      {
        "title": "LLM Cost (Last 24h)",
        "targets": [
          {
            "expr": "sum(increase(rag_llm_cost_usd[24h])) by (provider, model)"
          }
        ],
        "type": "piechart"
      },
      {
        "title": "ACL Filter Effectiveness",
        "targets": [
          {
            "expr": "rag_acl_filter_ratio",
            "legendFormat": "Filter Ratio"
          }
        ],
        "type": "gauge"
      }
    ]
  }
}
```

---

## Query Analytics

### Query History Dashboard

```typescript
// frontend/admin/src/pages/Analytics/QueryAnalytics.tsx
import { useQuery } from '@tanstack/react-query';
import { BarChart, LineChart, PieChart } from '@mantine/charts';

interface QueryAnalytics {
  total_queries: number;
  unique_users: number;
  avg_latency_ms: number;
  cache_hit_rate: number;
  top_queries: Array<{
    query: string;
    count: number;
    avg_latency_ms: number;
  }>;
  queries_over_time: Array<{
    timestamp: string;
    count: number;
  }>;
  query_types: {
    simple: number;
    complex: number;
    code_search: number;
    other: number;
  };
}

export function QueryAnalytics() {
  const { data } = useQuery<QueryAnalytics>({
    queryKey: ['queryAnalytics'],
    queryFn: () => fetch('/api/v1/analytics/queries').then(r => r.json()),
    refetchInterval: 60000, // Refresh every minute
  });

  return (
    <Stack>
      <SimpleGrid cols={4}>
        <Card>
          <Text size="sm" color="dimmed">Total Queries (24h)</Text>
          <Text size="xl" weight={700}>{data?.total_queries}</Text>
        </Card>
        <Card>
          <Text size="sm" color="dimmed">Unique Users</Text>
          <Text size="xl" weight={700}>{data?.unique_users}</Text>
        </Card>
        <Card>
          <Text size="sm" color="dimmed">Avg Latency</Text>
          <Text size="xl" weight={700}>{data?.avg_latency_ms}ms</Text>
        </Card>
        <Card>
          <Text size="sm" color="dimmed">Cache Hit Rate</Text>
          <Text size="xl" weight={700}>{(data?.cache_hit_rate * 100).toFixed(1)}%</Text>
        </Card>
      </SimpleGrid>

      <Card>
        <Title order={3}>Queries Over Time</Title>
        <LineChart
          data={data?.queries_over_time}
          dataKey="timestamp"
          series={[{ name: 'count', color: 'blue' }]}
        />
      </Card>

      <Card>
        <Title order={3}>Top Queries</Title>
        <Table>
          <thead>
            <tr>
              <th>Query</th>
              <th>Count</th>
              <th>Avg Latency</th>
            </tr>
          </thead>
          <tbody>
            {data?.top_queries.map((q, i) => (
              <tr key={i}>
                <td>{q.query}</td>
                <td>{q.count}</td>
                <td>{q.avg_latency_ms}ms</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Stack>
  );
}
```

---

## Hybrid Search Observability

### Search Strategy Comparison

```python
# backend/search_engine/metrics.py
from prometheus_client import Histogram

search_latency_by_strategy = Histogram(
    'search_latency_by_strategy_seconds',
    'Search latency by strategy',
    ['strategy'],  # vector, semantic, bm25, hybrid
    buckets=[0.01, 0.05, 0.1, 0.5, 1.0, 2.0, 5.0]
)

search_relevance_by_strategy = Histogram(
    'search_relevance_by_strategy',
    'Search relevance scores by strategy',
    ['strategy'],
    buckets=[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
)

# Track each search strategy
async def hybrid_search(query: str, top_k: int = 10):
    results = {}
    
    # Vector search
    start = time.time()
    vector_results = await qdrant_search(query, top_k)
    search_latency_by_strategy.labels(strategy='vector').observe(time.time() - start)
    for r in vector_results:
        search_relevance_by_strategy.labels(strategy='vector').observe(r.score)
    results['vector'] = vector_results
    
    # Semantic search
    start = time.time()
    semantic_results = await neo4j_search(query, top_k)
    search_latency_by_strategy.labels(strategy='semantic').observe(time.time() - start)
    for r in semantic_results:
        search_relevance_by_strategy.labels(strategy='semantic').observe(r.score)
    results['semantic'] = semantic_results
    
    # BM25 search
    start = time.time()
    bm25_results = await postgres_search(query, top_k)
    search_latency_by_strategy.labels(strategy='bm25').observe(time.time() - start)
    for r in bm25_results:
        search_relevance_by_strategy.labels(strategy='bm25').observe(r.score)
    results['bm25'] = bm25_results
    
    # Combine and re-rank
    combined = combine_results(results, weights={'vector': 0.6, 'semantic': 0.3, 'bm25': 0.1})
    
    return combined
```

### Search Performance Dashboard

Beta chart (if supported): Latency Distribution

```mermaid
%%{init: {'theme':'dark', 'flowchart': {'nodeSpacing': 30, 'rankSpacing': 40, 'curve': 'basis'}, 'themeVariables': {'labelBackground':'rgba(38, 50, 56, 0.1)'}}}%%
xychart-beta
  title "Latency Distribution (ms)"
  x-axis 0, 200, 400, 600, 800
  series "Vector" 120,250
  series "Semantic" 280,600
  series "BM25" 50,100
  series "Hybrid" 300,650
```

> Viewer Notes
> - This is a Mermaid `xychart-beta` (beta feature). If your viewer does not support beta charts, use the fallback flowchart below.

Fallback: Standard Mermaid

```mermaid
%%{init: {'theme':'dark', 'flowchart': {'nodeSpacing': 30, 'rankSpacing': 40, 'curve': 'basis'}}}%%
flowchart TB
  %% Title: Search Performance Comparison (Fallback)
  subgraph "Search Performance Comparison"
    direction TB
    subgraph Metrics[Strategy Performance (Last 24h)]
      direction TB
      V[Vector\nAvg: 120ms\np95: 250ms\nRel: 0.85]
      S[Semantic\nAvg: 280ms\np95: 600ms\nRel: 0.82]
      B[BM25\nAvg: 50ms\np95: 100ms\nRel: 0.70]
      H[Hybrid\nAvg: 300ms\np95: 650ms\nRel: 0.92]
    end
    subgraph Dist[Latency Distribution]
      direction TB
      scale[Scale\n0ms   200ms   400ms   600ms   800ms]
      barV[Vector ████████████████░░░░░░]
      barS[Semantic ██████████████████████░░]
      barB[BM25 ████░░░░░░░░░░░░░░░░░░]
      barH[Hybrid ███████████████████████░░]
      scale --> barV
      scale --> barS
      scale --> barB
      scale --> barH
    end
    subgraph Trade[Cost vs Quality Trade-off]
      direction TB
      Quality((Quality ↑))
      VectorQ[Vector ●]
      SemanticQ[Semantic ●]
      BM25Q[BM25 ●]
      HybridQ[Hybrid ●]
      Cost((Cost →))
      Quality --> VectorQ --> SemanticQ --> BM25Q --> HybridQ --> Cost
    end
  end

  classDef panel fill:#f7f7f7,stroke:#999,stroke-width:1px;
  class Metrics,Dist,Trade panel;
  
  linkStyle default stroke:#64b5f6,stroke-width:2px;
```

Beta chart (if supported): Cost vs Quality

```mermaid
%%{init: {'theme':'dark', 'flowchart': {'nodeSpacing': 30, 'rankSpacing': 40, 'curve': 'basis'}}}%%
quadrantChart
  title Cost vs Quality
  x-axis Low Cost → High Cost
  y-axis Low Quality → High Quality
  quadrant-1 "High Quality / Low Cost"
  quadrant-2 "High Quality / High Cost"
  quadrant-3 "Low Quality / Low Cost"
  quadrant-4 "Low Quality / High Cost"
  Vector: 0.3, 0.6
  Semantic: 0.6, 0.8
  BM25: 0.2, 0.4
  Hybrid: 0.5, 0.9
```

> Viewer Notes
> - This is a Mermaid `quadrantChart` (beta feature). If your viewer does not support beta charts, refer to the "Cost vs Quality Trade-off" section in the fallback flowchart above.

---

## Alert Configuration

### Alert Rules (Prometheus)

```yaml
# /monitoring/prometheus/alerts.yml
groups:
  - name: rag_alerts
    interval: 30s
    rules:
      - alert: HighQueryLatency
        expr: histogram_quantile(0.95, rag_query_latency_seconds) > 5
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High query latency detected"
          description: "p95 query latency is {{ $value }}s (threshold: 5s)"

      - alert: LowCacheHitRate
        expr: rag_cache_hit_rate < 0.3
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Cache hit rate is low"
          description: "Cache hit rate is {{ $value | humanizePercentage }} (threshold: 30%)"

      - alert: HighACLFilterRate
        expr: rag_acl_filter_ratio > 0.7
        for: 5m
        labels:
          severity: info
        annotations:
          summary: "High ACL filter rate"
          description: "{{ $value | humanizePercentage }} of documents are being filtered by ACL"

      - alert: HighLLMCost
        expr: rate(rag_llm_cost_usd[1h]) > 10
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "LLM costs are high"
          description: "LLM costs are ${{ $value }}/hour (threshold: $10/hour)"

      - alert: ServiceDown
        expr: up{job="rag-core"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "RAG Core service is down"
          description: "RAG Core service has been down for 1 minute"

      - alert: HighErrorRate
        expr: rate(rag_query_requests_total{status="500"}[5m]) > 0.05
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value | humanizePercentage }} (threshold: 5%)"
```

### Alert Manager Configuration

```yaml
# /monitoring/alertmanager/config.yml
global:
  resolve_timeout: 5m

route:
  group_by: ['alertname', 'cluster']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 12h
  receiver: 'default'
  routes:
    - match:
        severity: critical
      receiver: 'critical-alerts'
    - match:
        severity: warning
      receiver: 'warning-alerts'

receivers:
  - name: 'default'
    slack_configs:
      - api_url: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK'
        channel: '#rage-alerts'
        title: 'RAGE Alert'
        text: '{{ range .Alerts }}{{ .Annotations.summary }}\n{{ end }}'

  - name: 'critical-alerts'
    slack_configs:
      - api_url: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK'
        channel: '#rage-critical'
        title: '🚨 CRITICAL: RAGE Alert'
        text: '{{ range .Alerts }}{{ .Annotations.description }}\n{{ end }}'
    email_configs:
      - to: 'oncall@company.com'
        from: 'alerts@rage.company.com'
        smarthost: 'smtp.gmail.com:587'
        auth_username: 'alerts@rage.company.com'
        auth_password: 'YOUR_PASSWORD'

  - name: 'warning-alerts'
    slack_configs:
      - api_url: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK'
        channel: '#rage-alerts'
        title: '⚠️ WARNING: RAGE Alert'
```

---

## Performance Monitoring

### SLO/SLI Tracking

```yaml
Service Level Objectives:
  Availability:
    Target: 99.9% uptime
    Measurement: up{job="rag-core"} == 1
    Alert: < 99.9% over 30 days
  
  Latency:
    Target: p95 < 3 seconds
    Measurement: histogram_quantile(0.95, rag_query_latency_seconds)
    Alert: > 3 seconds for 5 minutes
  
  Error Rate:
    Target: < 1% errors
    Measurement: rate(rag_query_requests_total{status="500"}[5m])
    Alert: > 1% for 2 minutes
  
  Cache Hit Rate:
    Target: > 40%
    Measurement: rag_cache_hit_rate
    Alert: < 40% for 10 minutes
```

### Performance Budgets

```yaml
Cost Budget:
  LLM Costs:
    Daily: $100
    Monthly: $2,500
    Alert: > $150/day for 3 days
  
  Infrastructure:
    Daily: $50
    Monthly: $1,500
    Alert: > $75/day

Latency Budget:
  Query Processing:
    p50: 1 second
    p95: 3 seconds
    p99: 5 seconds
  
  Search Engines:
    Vector (Qdrant): < 200ms
    Semantic (Neo4j): < 500ms
    BM25 (PostgreSQL): < 100ms

Resource Budget:
  CPU: < 70% average
  Memory: < 80% average
  Disk: < 85% usage
```

---

## 9. Distributed Network Monitoring (Layer 10)

**Status**: Design Phase (v0.2.0)  
**Documentation**: See `/docs/NETWORK_LAYER.md`, `/docs/DISTRIBUTED_DEPLOYMENT.md`

### 9.1 Network Metrics

**Prometheus Metrics Definitions**:

```yaml
# P2P Network Metrics
- metric: rage_network_peers_total
  type: gauge
  help: Total number of connected P2P peers
  labels: [status, region, node_role]

- metric: rage_network_peer_connections
  type: counter
  help: Total P2P peer connections established
  labels: [peer_id, region]

- metric: rage_network_peer_disconnections
  type: counter
  help: Total P2P peer disconnections
  labels: [peer_id, reason, region]

- metric: rage_network_bandwidth_bytes_total
  type: counter
  help: Total network bandwidth in bytes
  labels: [direction, peer_id, region]

- metric: rage_network_latency_seconds
  type: histogram
  help: P2P network latency distribution
  buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1.0]
  labels: [peer_id, region]

# Federation Metrics
- metric: rage_federation_queries_total
  type: counter
  help: Total federated queries executed
  labels: [remote_org_id, status, result]

- metric: rage_federation_query_duration_seconds
  type: histogram
  help: Federated query duration distribution
  buckets: [0.1, 0.5, 1.0, 2.0, 5.0, 10.0]
  labels: [remote_org_id]

- metric: rage_federation_trusts_total
  type: gauge
  help: Total number of federation trust relationships
  labels: [status]

- metric: rage_federation_acl_denials_total
  type: counter
  help: Total federated ACL denials
  labels: [remote_org_id, denial_reason]

# Replication Metrics
- metric: rage_replication_chunks_total
  type: gauge
  help: Total chunks being replicated
  labels: [status]

- metric: rage_replication_factor_current
  type: gauge
  help: Current replication factor for chunks
  labels: [document_id, chunk_id]

- metric: rage_replication_lag_seconds
  type: gauge
  help: Replication lag in seconds
  labels: [peer_id, region]

- metric: rage_replication_bytes_total
  type: counter
  help: Total bytes replicated
  labels: [peer_id, region]

# CDN Metrics
- metric: rage_cdn_requests_total
  type: counter
  help: Total CDN requests
  labels: [provider, region, cache_status]

- metric: rage_cdn_cache_hit_ratio
  type: gauge
  help: CDN cache hit ratio (0-1)
  labels: [provider, region]

- metric: rage_cdn_bandwidth_saved_bytes
  type: counter
  help: Total bandwidth saved by CDN caching
  labels: [provider]

- metric: rage_cdn_invalidations_total
  type: counter
  help: Total CDN cache invalidations
  labels: [provider, invalidation_type]

- metric: rage_cdn_latency_seconds
  type: histogram
  help: CDN response latency
  buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1.0]
  labels: [provider, region]
```

### 9.2 Grafana Dashboard: P2P Network Overview

```json
{
  "dashboard": {
    "title": "RAGE P2P Network",
    "uid": "rage-p2p-network",
    "tags": ["rage", "network", "p2p"],
    "timezone": "UTC",
    "panels": [
      {
        "id": 1,
        "title": "P2P Mesh Network Graph",
        "type": "nodeGraph",
        "gridPos": { "x": 0, "y": 0, "w": 24, "h": 12 },
        "targets": [
          {
            "expr": "rage_network_peers_total{status='online'}",
            "legendFormat": "{{region}}: {{node_name}}",
            "refId": "A"
          }
        ],
        "options": {
          "edges": {
            "mainStatUnit": "Bps",
            "secondaryStatUnit": "ms"
          },
          "nodes": {
            "mainStatUnit": "peers",
            "arcs": [
              {
                "field": "status",
                "color": "green"
              }
            ]
          }
        },
        "fieldConfig": {
          "defaults": {
            "custom": {
              "nodeSize": "proportional",
              "edgeWidth": "proportional"
            }
          }
        }
      },
      {
        "id": 2,
        "title": "Connected Peers by Region",
        "type": "piechart",
        "gridPos": { "x": 0, "y": 12, "w": 8, "h": 8 },
        "targets": [
          {
            "expr": "sum by (region) (rage_network_peers_total{status='online'})",
            "legendFormat": "{{region}}",
            "refId": "A"
          }
        ],
        "options": {
          "legend": {
            "displayMode": "table",
            "placement": "right",
            "values": ["value", "percent"]
          },
          "pieType": "donut",
          "tooltip": {
            "mode": "single"
          }
        }
      },
      {
        "id": 3,
        "title": "Network Bandwidth (Sent/Received)",
        "type": "timeseries",
        "gridPos": { "x": 8, "y": 12, "w": 16, "h": 8 },
        "targets": [
          {
            "expr": "rate(rage_network_bandwidth_bytes_total{direction='sent'}[5m])",
            "legendFormat": "Sent - {{peer_id}}",
            "refId": "A"
          },
          {
            "expr": "rate(rage_network_bandwidth_bytes_total{direction='received'}[5m])",
            "legendFormat": "Received - {{peer_id}}",
            "refId": "B"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "unit": "Bps",
            "custom": {
              "drawStyle": "line",
              "lineInterpolation": "smooth",
              "fillOpacity": 10
            }
          }
        }
      },
      {
        "id": 4,
        "title": "Peer Connection/Disconnection Rate",
        "type": "timeseries",
        "gridPos": { "x": 0, "y": 20, "w": 12, "h": 6 },
        "targets": [
          {
            "expr": "rate(rage_network_peer_connections[1m])",
            "legendFormat": "Connections - {{region}}",
            "refId": "A"
          },
          {
            "expr": "rate(rage_network_peer_disconnections[1m])",
            "legendFormat": "Disconnections - {{reason}}",
            "refId": "B"
          }
        ],
        "options": {
          "legend": {
            "displayMode": "table",
            "placement": "bottom"
          }
        }
      },
      {
        "id": 5,
        "title": "P2P Latency Distribution",
        "type": "heatmap",
        "gridPos": { "x": 12, "y": 20, "w": 12, "h": 6 },
        "targets": [
          {
            "expr": "rate(rage_network_latency_seconds_bucket[5m])",
            "legendFormat": "{{le}}",
            "format": "heatmap",
            "refId": "A"
          }
        ],
        "options": {
          "calculate": true,
          "calculation": {
            "xBuckets": {
              "mode": "size",
              "value": "1min"
            }
          },
          "color": {
            "mode": "scheme",
            "scheme": "Spectral"
          },
          "legend": {
            "show": true
          }
        }
      }
    ]
  }
}
```

### 9.3 Grafana Dashboard: CDN Performance

```json
{
  "dashboard": {
    "title": "RAGE CDN Performance",
    "uid": "rage-cdn-perf",
    "tags": ["rage", "cdn", "performance"],
    "panels": [
      {
        "id": 1,
        "title": "CDN Cache Hit Rate by Provider",
        "type": "timeseries",
        "gridPos": { "x": 0, "y": 0, "w": 24, "h": 8 },
        "targets": [
          {
            "expr": "rage_cdn_cache_hit_ratio",
            "legendFormat": "{{provider}} - {{region}}",
            "refId": "A"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "unit": "percentunit",
            "min": 0,
            "max": 1,
            "custom": {
              "drawStyle": "line",
              "lineWidth": 2,
              "fillOpacity": 20,
              "gradientMode": "hue"
            },
            "thresholds": {
              "mode": "absolute",
              "steps": [
                { "value": 0, "color": "red" },
                { "value": 0.7, "color": "yellow" },
                { "value": 0.85, "color": "green" }
              ]
            }
          }
        },
        "options": {
          "legend": {
            "displayMode": "table",
            "placement": "right",
            "calcs": ["mean", "lastNotNull"]
          }
        }
      },
      {
        "id": 2,
        "title": "CDN Request Volume",
        "type": "stat",
        "gridPos": { "x": 0, "y": 8, "w": 6, "h": 4 },
        "targets": [
          {
            "expr": "sum(rate(rage_cdn_requests_total[5m]))",
            "refId": "A"
          }
        ],
        "options": {
          "graphMode": "area",
          "colorMode": "value",
          "orientation": "auto",
          "textMode": "value_and_name",
          "reduceOptions": {
            "values": false,
            "calcs": ["lastNotNull"]
          }
        },
        "fieldConfig": {
          "defaults": {
            "unit": "reqps"
          }
        }
      },
      {
        "id": 3,
        "title": "Bandwidth Saved (GB)",
        "type": "stat",
        "gridPos": { "x": 6, "y": 8, "w": 6, "h": 4 },
        "targets": [
          {
            "expr": "sum(rage_cdn_bandwidth_saved_bytes) / 1024 / 1024 / 1024",
            "refId": "A"
          }
        ],
        "options": {
          "graphMode": "area",
          "colorMode": "value"
        },
        "fieldConfig": {
          "defaults": {
            "unit": "decgbytes"
          }
        }
      },
      {
        "id": 4,
        "title": "CDN Latency by Provider",
        "type": "bargauge",
        "gridPos": { "x": 12, "y": 8, "w": 12, "h": 8 },
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(rage_cdn_latency_seconds_bucket[5m]))",
            "legendFormat": "{{provider}}",
            "refId": "A"
          }
        ],
        "options": {
          "orientation": "horizontal",
          "displayMode": "gradient",
          "showUnfilled": true
        },
        "fieldConfig": {
          "defaults": {
            "unit": "s",
            "thresholds": {
              "mode": "absolute",
              "steps": [
                { "value": 0, "color": "green" },
                { "value": 0.1, "color": "yellow" },
                { "value": 0.5, "color": "red" }
              ]
            }
          }
        }
      }
    ]
  }
}
```

### 9.4 Grafana Dashboard: Replication Status

```json
{
  "dashboard": {
    "title": "RAGE Content Replication",
    "uid": "rage-replication",
    "tags": ["rage", "replication", "p2p"],
    "panels": [
      {
        "id": 1,
        "title": "Replication Lag Heatmap",
        "type": "heatmap",
        "gridPos": { "x": 0, "y": 0, "w": 24, "h": 10 },
        "targets": [
          {
            "expr": "rage_replication_lag_seconds",
            "legendFormat": "{{peer_id}}",
            "format": "heatmap",
            "refId": "A"
          }
        ],
        "options": {
          "calculate": true,
          "color": {
            "mode": "scheme",
            "scheme": "RdYlGn",
            "reverse": true
          },
          "yAxis": {
            "unit": "s",
            "decimals": 0
          }
        }
      },
      {
        "id": 2,
        "title": "Replication Status Distribution",
        "type": "piechart",
        "gridPos": { "x": 0, "y": 10, "w": 8, "h": 8 },
        "targets": [
          {
            "expr": "sum by (status) (rage_replication_chunks_total)",
            "legendFormat": "{{status}}",
            "refId": "A"
          }
        ],
        "options": {
          "pieType": "donut",
          "legend": {
            "displayMode": "table",
            "values": ["value", "percent"]
          }
        }
      },
      {
        "id": 3,
        "title": "Replication Factor Compliance",
        "type": "gauge",
        "gridPos": { "x": 8, "y": 10, "w": 8, "h": 8 },
        "targets": [
          {
            "expr": "sum(rage_replication_chunks_total{status='complete'}) / sum(rage_replication_chunks_total)",
            "refId": "A"
          }
        ],
        "options": {
          "orientation": "auto",
          "showThresholdLabels": true,
          "showThresholdMarkers": true
        },
        "fieldConfig": {
          "defaults": {
            "unit": "percentunit",
            "min": 0,
            "max": 1,
            "thresholds": {
              "mode": "absolute",
              "steps": [
                { "value": 0, "color": "red" },
                { "value": 0.8, "color": "yellow" },
                { "value": 0.95, "color": "green" }
              ]
            }
          }
        }
      },
      {
        "id": 4,
        "title": "Replication Throughput",
        "type": "timeseries",
        "gridPos": { "x": 16, "y": 10, "w": 8, "h": 8 },
        "targets": [
          {
            "expr": "rate(rage_replication_bytes_total[5m])",
            "legendFormat": "{{region}}",
            "refId": "A"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "unit": "Bps",
            "custom": {
              "drawStyle": "line",
              "lineInterpolation": "smooth",
              "fillOpacity": 15
            }
          }
        }
      }
    ]
  }
}
```

### 9.5 Grafana Dashboard: Federation Activity

```json
{
  "dashboard": {
    "title": "RAGE Federation Activity",
    "uid": "rage-federation",
    "tags": ["rage", "federation", "security"],
    "panels": [
      {
        "id": 1,
        "title": "Federated Query Volume",
        "type": "timeseries",
        "gridPos": { "x": 0, "y": 0, "w": 18, "h": 8 },
        "targets": [
          {
            "expr": "sum by (remote_org_id, status) (rate(rage_federation_queries_total[5m]))",
            "legendFormat": "{{remote_org_id}} - {{status}}",
            "refId": "A"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "unit": "qps",
            "custom": {
              "drawStyle": "bars",
              "lineInterpolation": "linear",
              "barAlignment": 0,
              "fillOpacity": 80,
              "gradientMode": "none",
              "stacking": {
                "mode": "normal"
              }
            }
          },
          "overrides": [
            {
              "matcher": { "id": "byName", "options": "success" },
              "properties": [{ "id": "color", "value": { "mode": "fixed", "fixedColor": "green" } }]
            },
            {
              "matcher": { "id": "byName", "options": "denied" },
              "properties": [{ "id": "color", "value": { "mode": "fixed", "fixedColor": "red" } }]
            }
          ]
        }
      },
      {
        "id": 2,
        "title": "Active Trust Relationships",
        "type": "stat",
        "gridPos": { "x": 18, "y": 0, "w": 6, "h": 4 },
        "targets": [
          {
            "expr": "rage_federation_trusts_total{status='active'}",
            "refId": "A"
          }
        ],
        "options": {
          "graphMode": "none",
          "colorMode": "value",
          "textMode": "value_and_name"
        }
      },
      {
        "id": 3,
        "title": "ACL Denial Rate",
        "type": "stat",
        "gridPos": { "x": 18, "y": 4, "w": 6, "h": 4 },
        "targets": [
          {
            "expr": "sum(rate(rage_federation_acl_denials_total[5m]))",
            "refId": "A"
          }
        ],
        "options": {
          "graphMode": "area",
          "colorMode": "value"
        },
        "fieldConfig": {
          "defaults": {
            "unit": "ops",
            "thresholds": {
              "mode": "absolute",
              "steps": [
                { "value": 0, "color": "green" },
                { "value": 1, "color": "yellow" },
                { "value": 10, "color": "red" }
              ]
            }
          }
        }
      },
      {
        "id": 4,
        "title": "Federation Query Latency",
        "type": "timeseries",
        "gridPos": { "x": 0, "y": 8, "w": 12, "h": 6 },
        "targets": [
          {
            "expr": "histogram_quantile(0.95, sum by (le, remote_org_id) (rate(rage_federation_query_duration_seconds_bucket[5m])))",
            "legendFormat": "{{remote_org_id}} (p95)",
            "refId": "A"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "unit": "s"
          }
        }
      },
      {
        "id": 5,
        "title": "ACL Denial Reasons",
        "type": "piechart",
        "gridPos": { "x": 12, "y": 8, "w": 12, "h": 6 },
        "targets": [
          {
            "expr": "sum by (denial_reason) (rage_federation_acl_denials_total)",
            "legendFormat": "{{denial_reason}}",
            "refId": "A"
          }
        ],
        "options": {
          "pieType": "donut",
          "legend": {
            "displayMode": "table",
            "placement": "right"
          }
        }
      }
    ]
  }
}
```

### 9.6 Alert Rules for Distributed Network

```yaml
# alertmanager-rules.yaml

groups:
  - name: rage_network_alerts
    interval: 30s
    rules:
      - alert: PeerDisconnectionRateHigh
        expr: rate(rage_network_peer_disconnections[5m]) > 10
        for: 2m
        labels:
          severity: warning
          component: network
        annotations:
          summary: "High peer disconnection rate detected"
          description: "{{ $value }} peers disconnecting per second in region {{ $labels.region }}"

      - alert: NetworkPartition
        expr: rage_network_peers_total{status="online"} < 3
        for: 5m
        labels:
          severity: critical
          component: network
        annotations:
          summary: "Network partition detected - too few peers"
          description: "Only {{ $value }} peers online, minimum 3 required for quorum"

      - alert: ReplicationLagHigh
        expr: rage_replication_lag_seconds > 300
        for: 10m
        labels:
          severity: warning
          component: replication
        annotations:
          summary: "Replication lag exceeds 5 minutes"
          description: "Peer {{ $labels.peer_id }} in {{ $labels.region }} has {{ $value }}s lag"

      - alert: CDNCacheHitRateLow
        expr: rage_cdn_cache_hit_ratio < 0.7
        for: 15m
        labels:
          severity: warning
          component: cdn
        annotations:
          summary: "CDN cache hit rate below 70%"
          description: "{{ $labels.provider }} in {{ $labels.region }} hit rate: {{ $value }}"

      - alert: FederationACLDenialsHigh
        expr: rate(rage_federation_acl_denials_total[5m]) > 5
        for: 5m
        labels:
          severity: warning
          component: federation
        annotations:
          summary: "High rate of federated ACL denials"
          description: "{{ $value }} denials/sec from {{ $labels.remote_org_id }}, reason: {{ $labels.denial_reason }}"

      - alert: TrustRelationshipExpiringSoon
        expr: (rage_federation_trust_certificate_valid_until - time()) < 604800
        labels:
          severity: warning
          component: federation
        annotations:
          summary: "Federation certificate expiring in < 7 days"
          description: "Trust relationship with {{ $labels.remote_org_id }} certificate expires soon"
```

### 9.7 Metrics Exporters Configuration

```yaml
# config/prometheus.yml

global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  # Existing scrapers...
  
  # Network Agent
  - job_name: 'rage-network-agent'
    static_configs:
      - targets: ['network-agent:9100']
    metric_relabel_configs:
      - source_labels: [__name__]
        regex: 'rage_network_.*'
        action: keep

  # Federation Service
  - job_name: 'rage-federation'
    static_configs:
      - targets: ['federation-service:9101']
    metric_relabel_configs:
      - source_labels: [__name__]
        regex: 'rage_federation_.*'
        action: keep

  # CDN Manager
  - job_name: 'rage-cdn'
    static_configs:
      - targets: ['cdn-manager:9102']
    metric_relabel_configs:
      - source_labels: [__name__]
        regex: 'rage_cdn_.*'
        action: keep

  # Replication Tracker
  - job_name: 'rage-replication'
    static_configs:
      - targets: ['replication-tracker:9103']
    metric_relabel_configs:
      - source_labels: [__name__]
        regex: 'rage_replication_.*'
        action: keep
```

---

**Document Version**: 2.0  
**Last Updated**: December 3, 2025  
**Maintained By**: RAGE Platform Team

**Next Steps**:
1. Deploy monitoring stack: [DEPLOYMENT.md](./DEPLOYMENT.md)
2. Configure alerts for your team
3. Create custom Grafana dashboards
4. Set up cost tracking and budgets
5. **NEW**: Configure P2P network monitoring and CDN analytics

