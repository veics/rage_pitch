# RAGE Distributed Deployment Guide

**Version:** 0.2.0  
**Status:** Design Phase  
**Last Updated:** December 3, 2025

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Deployment Topologies](#deployment-topologies)
4. [P2P Node Setup](#p2p-node-setup)
5. [CDN Configuration](#cdn-configuration)
6. [Edge Node Deployment](#edge-node-deployment)
7. [Network Bootstrap](#network-bootstrap)
8. [Certificate Management](#certificate-management)
9. [Configuration Management](#configuration-management)
10. [Monitoring Distributed Systems](#monitoring-distributed-systems)
11. [Troubleshooting](#troubleshooting)

---

## Overview

This guide covers deploying RAGE in distributed mode with:

- **P2P networking** via libp2p
- **Multi-CDN** support (Cloudflare, Fastly, AWS CloudFront, self-hosted)
- **Edge nodes** for local caching and low-latency access
- **Federation** between organizations

### Deployment Models

| Model | Use Case | Nodes | CDN | Federation |
|-------|----------|-------|-----|------------|
| **Single Instance** | Small teams (<100 users) | 1 | Optional | No |
| **Multi-Region** | Large org, global users | 3-5 | Recommended | No |
| **Federated** | Multiple organizations | 2+ | Recommended | Yes |
| **Edge Network** | Enterprise with remote offices | Hub + N edges | Required | Optional |

---

## Prerequisites

### System Requirements

**Per Node:**
- **CPU**: 8+ cores (16+ recommended for production)
- **RAM**: 32 GB minimum (64 GB recommended)
- **Disk**: 500 GB SSD (NVMe recommended)
- **Network**: 1 Gbps+ bandwidth, low latency (<50ms between nodes)

**Operating System:**
- Ubuntu 22.04 LTS (recommended)
- RHEL 8/9
- Debian 11+

### Software Dependencies

```bash
# Podman (rootless containers)
sudo apt-get install podman podman-compose

# Network tools
sudo apt-get install wireguard iptables-persistent

# Certificate management
sudo apt-get install openssl certbot

# Monitoring
sudo apt-get install netdata prometheus grafana
```

### Firewall Rules

```bash
# P2P ports (libp2p)
sudo ufw allow 4001/tcp  # P2P TCP
sudo ufw allow 4001/udp  # P2P QUIC

# HTTP/HTTPS (API + CDN)
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Monitoring
sudo ufw allow 9090/tcp  # Prometheus
sudo ufw allow 3000/tcp  # Grafana
sudo ufw allow 19999/tcp # Netdata

# Enable firewall
sudo ufw enable
```

---

## Deployment Topologies

### 1. Single Organization - Multi-Region

**Scenario**: ACME Corp with offices in US West, US East, and EU

```mermaid
%%{init: {'theme':'dark', 'flowchart': {'nodeSpacing': 30, 'rankSpacing': 40, 'curve': 'basis'}, 'themeVariables': {'labelBackground':'rgba(38, 50, 56, 0.1)'}}}%%
graph TB
    subgraph "US West (Primary)"
        USW1[RAGE Node<br/>us-west-1]
        USW_DB[(PostgreSQL<br/>Primary)]
        USW_NEO[(Neo4j)]
    end
    
    subgraph "US East (Replica)"
        USE1[RAGE Node<br/>us-east-1]
        USE_DB[(PostgreSQL<br/>Read Replica)]
        USE_NEO[(Neo4j)]
    end
    
    subgraph "EU (Replica)"
        EU1[RAGE Node<br/>eu-central-1]
        EU_DB[(PostgreSQL<br/>Read Replica)]
        EU_NEO[(Neo4j)]
    end
    
    subgraph "CDN Layer"
        CF[Cloudflare<br/>Global]
    end
    
    USW1 <-->|P2P Full Mesh| USE1
    USW1 <-->|P2P Full Mesh| EU1
    USE1 <-->|P2P Full Mesh| EU1
    
    USW_DB -->|Streaming Replication| USE_DB
    USW_DB -->|Streaming Replication| EU_DB
    
    USW1 --> CF
    USE1 --> CF
    EU1 --> CF
```

**Configuration:**

```yaml
# config/network.yaml (all nodes)
network:
  organization_id: "org_acme_corp"
  deployment_mode: "multi_region"
  
  trust:
    model: "explicit"
    same_org_auto_trust: true
  
  replication:
    mode: "full"  # Replicate everything
    factor: 3     # All nodes have all data
```

---

### 2. Hub-and-Spoke (Enterprise)

**Scenario**: Enterprise with central datacenter + remote offices

```mermaid
%%{init: {'theme':'dark', 'flowchart': {'nodeSpacing': 30, 'rankSpacing': 40, 'curve': 'basis'}, 'themeVariables': {'labelBackground':'rgba(38, 50, 56, 0.1)'}}}%%
graph TB
    subgraph "Central Datacenter"
        HUB[RAGE Hub<br/>Primary Node]
        HUB_DB[(PostgreSQL)]
        HUB_NEO[(Neo4j)]
        HUB_VAL[(Valkey)]
    end
    
    subgraph "Office NYC"
        NYC[Edge Node<br/>NYC]
        NYC_CACHE[(Local Cache)]
    end
    
    subgraph "Office London"
        LON[Edge Node<br/>London]
        LON_CACHE[(Local Cache)]
    end
    
    subgraph "Office Tokyo"
        TKY[Edge Node<br/>Tokyo]
        TKY_CACHE[(Local Cache)]
    end
    
    subgraph "Remote Site"
        REMOTE[Edge Node<br/>Remote]
        REMOTE_CACHE[(Local Cache)]
    end
    
    HUB <-->|Full Sync| NYC
    HUB <-->|Full Sync| LON
    HUB <-->|Full Sync| TKY
    HUB <-->|Selective Sync| REMOTE
    
    NYC -.->|Read-Only P2P| LON
    LON -.->|Read-Only P2P| TKY
```

**Hub Configuration:**

```yaml
# config/network.yaml (hub)
network:
  node_role: "hub"
  
  replication:
    mode: "push"  # Push to edge nodes
    edge_nodes:
      - node_id: "edge_nyc"
        url: "https://rage-nyc.acme.com"
        policy: "full"
      
      - node_id: "edge_london"
        url: "https://rage-lon.acme.com"
        policy: "full"
      
      - node_id: "edge_tokyo"
        url: "https://rage-tky.acme.com"
        policy: "full"
      
      - node_id: "edge_remote"
        url: "https://rage-remote.acme.com"
        policy: "selective"  # Only critical data
        filters:
          tags: ["critical", "global"]
```

**Edge Configuration:**

```yaml
# config/network.yaml (edge)
network:
  node_role: "edge"
  
  hub:
    url: "https://rage-hub.acme.com"
    sync_interval: 300  # 5 minutes
  
  cache:
    enabled: true
    max_size_gb: 100
    eviction_policy: "lru"
```

---

### 3. Federated Multi-Organization

**Scenario**: Partner ecosystem (ACME, Beta Industries, Gamma LLC)

```mermaid
%%{init: {'theme':'dark', 'flowchart': {'nodeSpacing': 30, 'rankSpacing': 40, 'curve': 'basis'}, 'themeVariables': {'labelBackground':'rgba(38, 50, 56, 0.1)'}}}%%
graph TB
    subgraph "ACME Corp"
        A1[RAGE Node A]
    end
    
    subgraph "Beta Industries"
        B1[RAGE Node B]
    end
    
    subgraph "Gamma LLC"
        C1[RAGE Node C]
    end
    
    A1 <-.->|Federated Queries| B1
    B1 <-.->|Federated Queries| C1
    
    style A1 fill:#4CAF50
    style B1 fill:#2196F3
    style C1 fill:#FF9800
```

**Configuration:**

```yaml
# config/network.yaml (ACME)
network:
  organization_id: "org_acme_corp"
  
  federation:
    enabled: true
    
    trust:
      model: "explicit"
      
      trusted_organizations:
        - org_id: "org_beta_industries"
          url: "https://rage.beta.com"
          certificate_fingerprint: "SHA256:abc..."
          capabilities: ["query"]
```

---

## P2P Node Setup

### Step 1: Generate P2P Identity

```bash
# Generate libp2p keypair
cd /opt/rage
./bin/rage-network keygen --output /etc/rage/peer_key.pem

# Extract peer ID
./bin/rage-network peerid --key /etc/rage/peer_key.pem
# Output: 12D3KooWA8EXV3KjBxEU5EnsPfneLx84vMWAtTBQBeyooN3hYKTQ
```

### Step 2: Configure libp2p

```yaml
# config/network.yaml
network:
  libp2p:
    # Identity
    peer_key: "/etc/rage/peer_key.pem"
    
    # Listen addresses
    listen_addresses:
      - "/ip4/0.0.0.0/tcp/4001"
      - "/ip6/::/tcp/4001"
      - "/ip4/0.0.0.0/udp/4001/quic-v1"
    
    # Public address (for NAT)
    announce_addresses:
      - "/ip4/203.0.113.10/tcp/4001"
      - "/dns4/rage-node1.acme.com/tcp/4001"
    
    # Bootstrap peers
    bootstrap_peers:
      - "/ip4/10.0.1.5/tcp/4001/p2p/12D3KooWB9..."
      - "/dns4/rage-node2.acme.com/tcp/4001/p2p/12D3KooWC8..."
    
    # DHT
    dht:
      enabled: true
      mode: "server"
      bootstrap_interval: 300
    
    # mDNS (local network discovery)
    mdns:
      enabled: true
      interval: 60
    
    # Gossipsub
    gossipsub:
      enabled: true
      topics:
        - "rage.global"
        - "rage.org.acme_corp"
        - "rage.acl.updates"
      
      # Mesh parameters
      d: 6         # Desired peers in mesh
      d_low: 4     # Low watermark
      d_high: 12   # High watermark
```

### Step 3: Start P2P Service

```bash
# Using Podman
podman run -d \
  --name rage-p2p \
  --network host \
  -v /etc/rage:/etc/rage:ro \
  -v /var/lib/rage:/var/lib/rage \
  rage/network:latest
```

### Step 4: Verify P2P Connectivity

```bash
# Check connected peers
curl http://localhost:8080/api/v1/network/peers
```

```json
{
  "peers": [
    {
      "peer_id": "12D3KooWB9...",
      "addresses": ["/ip4/10.0.1.5/tcp/4001"],
      "connected_at": "2025-12-03T10:00:00Z",
      "latency_ms": 15,
      "protocols": ["rage/sync/1.0.0", "rage/query/1.0.0"]
    }
  ],
  "total": 1
}
```

---

## CDN Configuration

### Multi-CDN Setup

RAGE supports **hybrid CDN** with multiple providers:

1. **Cloudflare** (Americas)
2. **Fastly** (Europe)
3. **AWS CloudFront** (Asia)
4. **Self-Hosted Varnish** (Private/VPN)

### Cloudflare Setup

```bash
# Install Cloudflare CLI
brew install cloudflare/cloudflare/cf

# Configure zone
export CLOUDFLARE_ZONE_ID="abc123..."
export CLOUDFLARE_API_TOKEN="your_token_here"
```

```yaml
# config/cdn.yaml
cdn:
  enabled: true
  
  providers:
    - name: "cloudflare"
      type: "commercial"
      
      config:
        zone_id: "${CLOUDFLARE_ZONE_ID}"
        api_token: "${CLOUDFLARE_API_TOKEN}"
        
        # Cache settings
        purge_on_update: true
        respect_headers: true
        
        # Page rules
        rules:
          - pattern: "/chunks/*"
            cache_level: "cache_everything"
            edge_cache_ttl: 86400
          
          - pattern: "/embeddings/*"
            cache_level: "cache_everything"
            edge_cache_ttl: 604800  # 7 days
      
      routing:
        regions: ["americas"]
        priority: 1
        
        # Geo-routing
        geo_rules:
          - country_codes: ["US", "CA", "MX", "BR"]
            enabled: true
```

### Fastly Setup

```yaml
# config/cdn.yaml (continued)
    - name: "fastly"
      type: "commercial"
      
      config:
        service_id: "${FASTLY_SERVICE_ID}"
        api_key: "${FASTLY_API_KEY}"
        
        # VCL configuration
        vcl_snippets:
          - name: "rage_caching"
            type: "recv"
            content: |
              if (req.url ~ "^/chunks/") {
                set req.backend = F_rage_origin;
                return(lookup);
              }
      
      routing:
        regions: ["europe"]
        priority: 1
```

### AWS CloudFront Setup

```yaml
# config/cdn.yaml (continued)
    - name: "cloudfront"
      type: "commercial"
      
      config:
        distribution_id: "${AWS_CLOUDFRONT_DISTRIBUTION_ID}"
        access_key_id: "${AWS_ACCESS_KEY_ID}"
        secret_access_key: "${AWS_SECRET_ACCESS_KEY}"
        region: "us-east-1"
        
        # Lambda@Edge functions
        lambda_associations:
          - event_type: "viewer-request"
            lambda_arn: "arn:aws:lambda:us-east-1:123:function:rage-auth"
      
      routing:
        regions: ["asia", "oceania"]
        priority: 2
```

### Self-Hosted Varnish CDN

```yaml
# config/cdn.yaml (continued)
    - name: "varnish-edge"
      type: "self-hosted"
      
      config:
        endpoints:
          - url: "https://cdn-edge-1.acme.com"
            region: "us-west"
            capacity_gbps: 10
          
          - url: "https://cdn-edge-2.acme.com"
            region: "us-east"
            capacity_gbps: 10
          
          - url: "https://cdn-edge-3.acme.com"
            region: "eu-central"
            capacity_gbps: 5
        
        auth:
          type: "hmac"
          secret: "${VARNISH_SECRET}"
      
      routing:
        regions: ["private"]
        priority: 0  # Highest priority for internal traffic
        
        # Only serve to corporate IPs
        ip_whitelist:
          - "10.0.0.0/8"
          - "172.16.0.0/12"
```

### Varnish Configuration

```vcl
# /etc/varnish/default.vcl
vcl 4.1;

backend rage_origin {
    .host = "rage-node1.acme.com";
    .port = "443";
    .probe = {
        .url = "/health";
        .timeout = 5s;
        .interval = 10s;
        .window = 5;
        .threshold = 3;
    }
}

sub vcl_recv {
    # Only cache GET/HEAD
    if (req.method != "GET" && req.method != "HEAD") {
        return (pass);
    }
    
    # Cache chunks aggressively
    if (req.url ~ "^/chunks/") {
        return (hash);
    }
    
    # Cache embeddings (immutable)
    if (req.url ~ "^/embeddings/") {
        return (hash);
    }
    
    # Don't cache API calls
    if (req.url ~ "^/api/") {
        return (pass);
    }
}

sub vcl_backend_response {
    # Chunk caching
    if (bereq.url ~ "^/chunks/") {
        set beresp.ttl = 24h;
        set beresp.grace = 1h;
    }
    
    # Embedding caching (immutable)
    if (bereq.url ~ "^/embeddings/") {
        set beresp.ttl = 7d;
    }
}

sub vcl_deliver {
    # Add cache status header
    if (obj.hits > 0) {
        set resp.http.X-Cache = "HIT";
    } else {
        set resp.http.X-Cache = "MISS";
    }
    set resp.http.X-Cache-Hits = obj.hits;
}
```

---

## Edge Node Deployment

### Edge Node Architecture

```mermaid
%%{init: {'theme':'dark', 'flowchart': {'nodeSpacing': 30, 'rankSpacing': 40, 'curve': 'basis'}, 'themeVariables': {'labelBackground':'rgba(38, 50, 56, 0.1)'}}}%%
graph TB
    subgraph "Edge Node"
        NGINX[Nginx<br/>Reverse Proxy]
        CACHE[Local Cache<br/>Valkey]
        SYNC[Sync Service]
        QUERY[Query Service]
    end
    
    subgraph "Hub (Datacenter)"
        HUB[RAGE Hub]
    end
    
    USERS[Remote Office Users] --> NGINX
    NGINX --> CACHE
    CACHE -->|MISS| QUERY
    QUERY -->|P2P| SYNC
    SYNC <-->|Periodic Sync| HUB
```

### Edge Node Installation

```bash
# Download edge node package
wget https://releases.rage.network/edge/v0.2.0/rage-edge-linux-amd64.tar.gz
tar -xzf rage-edge-linux-amd64.tar.gz
cd rage-edge

# Configure
cp config/edge.example.yaml config/edge.yaml
nano config/edge.yaml
```

```yaml
# config/edge.yaml
edge:
  node_id: "edge_nyc_office"
  region: "us-east"
  
  # Hub connection
  hub:
    url: "https://rage-hub.acme.com"
    certificate: "/etc/rage/hub_ca.crt"
    sync_interval: 300  # 5 minutes
    
    # Authentication
    auth:
      client_cert: "/etc/rage/edge_cert.pem"
      client_key: "/etc/rage/edge_key.pem"
  
  # Local cache
  cache:
    enabled: true
    type: "valkey"
    
    connection:
      host: "localhost"
      port: 6379
    
    # Cache size limits
    max_memory_gb: 50
    eviction_policy: "allkeys-lru"
    
    # Prefetching
    prefetch:
      enabled: true
      popular_chunks: true
      related_concepts: true
  
  # Sync policies
  sync:
    mode: "selective"
    
    # What to sync
    filters:
      - tags: ["critical", "global", "nyc_office"]
      - source_types: ["confluence", "sharepoint"]
      - updated_since: "7d"  # Last 7 days
    
    # Bandwidth limits
    bandwidth:
      max_upload_mbps: 50
      max_download_mbps: 100
      
      # Throttle during business hours
      schedule:
        - days: ["mon", "tue", "wed", "thu", "fri"]
          hours: "09:00-18:00"
          max_mbps: 20
```

### Deploy Edge Node

```bash
# Install as systemd service
sudo ./install-edge.sh

# Start service
sudo systemctl start rage-edge
sudo systemctl enable rage-edge

# Check status
sudo systemctl status rage-edge
```

---

## Network Bootstrap

### Discovery Server Setup

```bash
# Deploy discovery server (central coordinator)
podman run -d \
  --name rage-discovery \
  -p 8081:8080 \
  -v /etc/rage/discovery:/etc/rage:ro \
  rage/discovery:latest
```

```yaml
# config/discovery.yaml
discovery:
  server:
    listen_address: "0.0.0.0:8080"
    
    # Database for peer registry
    database:
      url: "postgresql://discovery:password@localhost/rage_discovery"
    
    # Authentication
    auth:
      require_certificates: true
      ca_cert: "/etc/rage/ca.crt"
    
    # Bootstrap peers (seed nodes)
    bootstrap_peers:
      - peer_id: "12D3KooWA8..."
        addresses: ["/ip4/10.0.1.5/tcp/4001"]
        organization: "org_acme_corp"
        region: "us-west"
      
      - peer_id: "12D3KooWB9..."
        addresses: ["/ip4/10.0.2.10/tcp/4001"]
        organization: "org_acme_corp"
        region: "us-east"
```

### First Node Bootstrap

```bash
# Node 1 (seed node - no bootstrap peers)
export RAGE_BOOTSTRAP_MODE="seed"
export RAGE_DISCOVERY_URL="https://discovery.rage.network"
./bin/rage-network start
```

### Subsequent Nodes

```bash
# Node 2+ (bootstrap from discovery)
export RAGE_BOOTSTRAP_MODE="client"
export RAGE_DISCOVERY_URL="https://discovery.rage.network"
./bin/rage-network start
```

---

## Certificate Management

### Organization CA

```bash
# Generate organization CA (ONE TIME)
openssl req -x509 -newkey rsa:4096 \
  -keyout /etc/rage/certs/ca_key.pem \
  -out /etc/rage/certs/ca_cert.pem \
  -days 3650 \
  -nodes \
  -subj "/C=US/ST=California/O=ACME Corp/CN=RAGE CA"

# Protect CA key
chmod 400 /etc/rage/certs/ca_key.pem
```

### Node Certificates

```bash
# Generate node certificate
NODE_ID="rage-node-1"
NODE_FQDN="rage-node1.acme.com"

# Create CSR
openssl req -newkey rsa:4096 \
  -keyout /etc/rage/certs/${NODE_ID}_key.pem \
  -out /etc/rage/certs/${NODE_ID}_csr.pem \
  -nodes \
  -subj "/C=US/ST=California/O=ACME Corp/CN=${NODE_FQDN}"

# Sign with CA
openssl x509 -req \
  -in /etc/rage/certs/${NODE_ID}_csr.pem \
  -CA /etc/rage/certs/ca_cert.pem \
  -CAkey /etc/rage/certs/ca_key.pem \
  -CAcreateserial \
  -out /etc/rage/certs/${NODE_ID}_cert.pem \
  -days 365 \
  -extfile <(echo "subjectAltName=DNS:${NODE_FQDN},DNS:*.acme.com")

# Verify
openssl verify -CAfile /etc/rage/certs/ca_cert.pem \
  /etc/rage/certs/${NODE_ID}_cert.pem
```

### Certificate Rotation

```bash
# Automated renewal (cron job)
cat > /etc/cron.weekly/rage-cert-renewal.sh << 'EOF'
#!/bin/bash
set -e

CERT_PATH="/etc/rage/certs/rage-node-1_cert.pem"
DAYS_UNTIL_EXPIRY=$(openssl x509 -enddate -noout -in $CERT_PATH | \
  cut -d= -f2 | xargs -I {} date -d {} +%s | \
  xargs -I {} expr \( {} - $(date +%s) \) / 86400)

if [ $DAYS_UNTIL_EXPIRY -lt 30 ]; then
  echo "Certificate expires in $DAYS_UNTIL_EXPIRY days. Renewing..."
  
  # Generate new certificate
  /opt/rage/bin/renew-cert.sh
  
  # Restart RAGE services
  systemctl restart rage-network
fi
EOF

chmod +x /etc/cron.weekly/rage-cert-renewal.sh
```

---

## Configuration Management

### Ansible Playbook

```yaml
# playbooks/deploy-rage-node.yml
---
- name: Deploy RAGE Network Node
  hosts: rage_nodes
  become: yes
  
  vars:
    rage_version: "0.2.0"
    org_id: "org_acme_corp"
    
  tasks:
    - name: Install dependencies
      apt:
        name:
          - podman
          - podman-compose
          - openssl
          - netdata
        state: present
        update_cache: yes
    
    - name: Create RAGE directories
      file:
        path: "{{ item }}"
        state: directory
        mode: '0755'
      loop:
        - /opt/rage
        - /etc/rage
        - /etc/rage/certs
        - /var/lib/rage
        - /var/log/rage
    
    - name: Copy certificates
      copy:
        src: "files/certs/{{ inventory_hostname }}_cert.pem"
        dest: "/etc/rage/certs/node_cert.pem"
        mode: '0644'
    
    - name: Copy certificate key
      copy:
        src: "files/certs/{{ inventory_hostname }}_key.pem"
        dest: "/etc/rage/certs/node_key.pem"
        mode: '0400'
    
    - name: Template network configuration
      template:
        src: templates/network.yaml.j2
        dest: /etc/rage/network.yaml
        mode: '0644'
    
    - name: Pull RAGE containers
      containers.podman.podman_image:
        name: "rage/network:{{ rage_version }}"
        state: present
    
    - name: Start RAGE network service
      containers.podman.podman_container:
        name: rage-network
        image: "rage/network:{{ rage_version }}"
        state: started
        restart_policy: always
        network: host
        volumes:
          - /etc/rage:/etc/rage:ro
          - /var/lib/rage:/var/lib/rage
          - /var/log/rage:/var/log/rage
```

### Terraform (Multi-Cloud)

```hcl
# main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# RAGE Node EC2 instances
resource "aws_instance" "rage_node" {
  count = 3
  
  ami           = "ami-0c55b159cbfafe1f0"  # Ubuntu 22.04
  instance_type = "m5.2xlarge"
  
  subnet_id              = aws_subnet.private[count.index].id
  vpc_security_group_ids = [aws_security_group.rage_node.id]
  
  user_data = templatefile("${path.module}/scripts/init-rage-node.sh", {
    node_id     = "rage-node-${count.index + 1}"
    org_id      = var.organization_id
    region      = var.aws_regions[count.index]
    discovery_url = var.discovery_server_url
  })
  
  root_block_device {
    volume_size = 500
    volume_type = "gp3"
    iops        = 3000
  }
  
  tags = {
    Name         = "rage-node-${count.index + 1}"
    Organization = var.organization_id
    Role         = "rage-network"
  }
}

# Security group
resource "aws_security_group" "rage_node" {
  name_prefix = "rage-node-"
  vpc_id      = aws_vpc.main.id
  
  # P2P
  ingress {
    from_port   = 4001
    to_port     = 4001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  # HTTPS
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
```

---

## Monitoring Distributed Systems

### Metrics Collection

```yaml
# config/monitoring.yaml
monitoring:
  exporters:
    - name: "network_exporter"
      type: "prometheus"
      port: 9100
      
      metrics:
        - rage_network_peers_total
        - rage_network_bytes_sent_total
        - rage_network_latency_seconds
        - rage_cdn_cache_hit_ratio
        - rage_replication_lag_seconds
    
    - name: "netdata"
      enabled: true
      
      # Parent-child streaming
      parent:
        enabled: true
        destination: "netdata-parent.acme.com:19999"
        api_key: "${NETDATA_API_KEY}"
```

### Grafana Dashboards

**Network Topology Dashboard:**

```json
{
  "dashboard": {
    "title": "RAGE Network Topology",
    "panels": [
      {
        "title": "P2P Mesh",
        "type": "nodeGraph",
        "targets": [
          {
            "expr": "rage_network_peers_total"
          }
        ]
      },
      {
        "title": "Data Flow (Sankey)",
        "type": "sankey",
        "targets": [
          {
            "expr": "rate(rage_network_bytes_sent_total[5m])"
          }
        ]
      }
    ]
  }
}
```

### Alerting

```yaml
# config/alerts.yaml
groups:
  - name: rage_network
    interval: 30s
    rules:
      - alert: NodeDisconnected
        expr: rage_network_peers_total < 1
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "RAGE node {{ $labels.instance }} has no peers"
      
      - alert: HighP2PLatency
        expr: rage_network_latency_seconds > 1.0
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High P2P latency to {{ $labels.peer_id }}"
      
      - alert: ReplicationLag
        expr: rage_replication_lag_seconds > 300
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Replication lag > 5 minutes"
```

---

## Troubleshooting

### P2P Connectivity Issues

```bash
# Check if P2P port is open
nc -zv rage-node2.acme.com 4001

# Check NAT traversal
./bin/rage-network nat-check

# Manual peer connection
./bin/rage-network connect /ip4/10.0.1.5/tcp/4001/p2p/12D3KooWB9...

# Check DHT routing table
curl http://localhost:8080/api/v1/network/dht/routing-table
```

### CDN Troubleshooting

```bash
# Test CDN cache
curl -I https://cdn.acme.com/chunks/bafk123
# Look for: X-Cache: HIT

# Purge CDN cache
curl -X POST http://localhost:8080/api/v1/cdn/purge \
  -H "Content-Type: application/json" \
  -d '{"keys": ["/chunks/bafk123"]}'

# Check CDN health
./bin/rage-network cdn status
```

### Replication Issues

```bash
# Check replication status
curl http://localhost:8080/api/v1/network/replication/status

# Force sync
curl -X POST http://localhost:8080/api/v1/network/sync/trigger

# View sync logs
tail -f /var/log/rage/sync.log
```

### Certificate Issues

```bash
# Verify certificate chain
openssl verify -CAfile /etc/rage/certs/ca_cert.pem \
  /etc/rage/certs/node_cert.pem

# Check certificate expiration
openssl x509 -enddate -noout -in /etc/rage/certs/node_cert.pem

# Test mutual TLS
openssl s_client -connect rage-node2.acme.com:443 \
  -CAfile /etc/rage/certs/ca_cert.pem \
  -cert /etc/rage/certs/node_cert.pem \
  -key /etc/rage/certs/node_key.pem
```

---

## Next Steps

1. **Network Architecture**: See `/docs/NETWORK_LAYER.md`
2. **Federation Setup**: See `/docs/FEDERATION_GUIDE.md`
3. **API Reference**: See `/contracts/network-layer.yaml`
4. **Security**: See `/docs/SECURITY_ACL.md`

---

## Support

- **Documentation**: https://docs.rage.network
- **GitHub**: https://github.com/rage/rage
- **Slack**: https://rage-community.slack.com
