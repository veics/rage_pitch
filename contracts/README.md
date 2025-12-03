# RAGE API Contracts

This directory contains OpenAPI 3.0 specifications for all RAGE services, following a **contract-first development** approach.

## Contract-First Development Workflow

```
1. Team writes contract together (this directory)
   ↓
2. Generate mock server: npx prism mock contracts/{service}.yaml
   ↓
3. Frontend develops against mock (works immediately)
   ↓
4. Backend implements to pass contract tests
   ↓
5. Swap mock for real service (no UI changes needed)
```

**Result:** ✅ Everything works, no integration surprises

## Available Contracts

### Core Services
- **rag-core.yaml** - RAG query engine, document ingestion, user authentication
- **acl-service.yaml** - Permission validation, role management, audit logs
- **search-engine.yaml** - Hybrid search (vector + semantic + BM25)
- **training-orchestrator.yaml** - Fine-tuning jobs, model registry, dataset management

### Integration Services
- **confluence-ingestor.yaml** - Confluence workspace ingestion with ACL extraction
- **jira-agent.yaml** - Jira query, issue tracking, report generation
- **slack-bot.yaml** - Slack bot API for knowledge queries

### UI Services
- **admin-ui.yaml** - Admin interface API endpoints
- **user-ui.yaml** - User interface API endpoints

### Infrastructure
- **identity-mapping.yaml** - External to internal identity resolution
- **module-discovery.yaml** - Dynamic module loading and registry

## Quick Start

### 1. Install Prism (Mock Server)

```bash
npm install -g @stoplight/prism-cli
```

### 2. Start Mock Server for Development

```bash
# Mock RAG Core API
prism mock contracts/rag-core.yaml --port 8003

# Mock ACL Service
prism mock contracts/acl-service.yaml --port 8001

# Mock Search Engine
prism mock contracts/search-engine.yaml --port 8008
```

### 3. Frontend Development Against Mocks

Your frontend can now develop against these mock APIs. They return example responses defined in the OpenAPI specs.

```typescript
// Frontend code works immediately
const response = await fetch('http://localhost:8003/api/v1/query', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: "What is RAGE?",
    user_id: "test-user"
  })
});
```

### 4. Backend Implementation

Backend implements the contract. Run contract tests to verify compliance:

```bash
# Install Dredd for contract testing
npm install -g dredd

# Test backend against contract
dredd contracts/rag-core.yaml http://localhost:8003
```

### 5. Swap Mock for Real Service

Once backend passes contract tests, update frontend environment config:

```bash
# Development (mocks)
API_BASE_URL=http://localhost:8003

# Production (real service)
API_BASE_URL=http://rag-core:8003
```

**No frontend code changes required!**

## Contract Validation

### Validate OpenAPI Specs

```bash
# Install validator
npm install -g @apidevtools/swagger-cli

# Validate all contracts
swagger-cli validate contracts/*.yaml
```

### Generate Client SDKs

```bash
# Install OpenAPI Generator
npm install -g @openapitools/openapi-generator-cli

# Generate TypeScript client
openapi-generator-cli generate \
  -i contracts/rag-core.yaml \
  -g typescript-axios \
  -o frontend/src/generated/rag-core-client

# Generate Python client
openapi-generator-cli generate \
  -i contracts/rag-core.yaml \
  -g python \
  -o backend/generated/rag-core-client
```

## Contract Testing in CI/CD

Add to `.github/workflows/contract-tests.yml`:

```yaml
name: Contract Tests

on: [push, pull_request]

jobs:
  contract-validation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install -g @apidevtools/swagger-cli
      - run: swagger-cli validate contracts/*.yaml

  backend-compliance:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15-alpine
      redis:
        image: redis:7-alpine
    steps:
      - uses: actions/checkout@v3
      - name: Start backend services
        run: docker-compose up -d
      - name: Run contract tests
        run: |
          npm install -g dredd
          dredd contracts/rag-core.yaml http://localhost:8003
          dredd contracts/acl-service.yaml http://localhost:8001
```

## Versioning

Contracts follow semantic versioning in the `info.version` field:

- **Major:** Breaking changes to API (e.g., removed endpoints, changed response structure)
- **Minor:** New features, backward-compatible additions
- **Patch:** Documentation updates, example improvements

When making breaking changes:
1. Update major version in contract
2. Support previous version for 6 months (versioned endpoints like `/api/v1/`, `/api/v2/`)
3. Deprecation warnings in responses
4. Migration guide in contract description

## Best Practices

### 1. Rich Examples
Every schema should include realistic examples:

```yaml
components:
  schemas:
    Document:
      type: object
      properties:
        id:
          type: string
          example: "doc_2j3k4l5m6n7o8p9q"
        title:
          type: string
          example: "RAGE Architecture Overview"
```

### 2. Detailed Error Responses

```yaml
responses:
  NotFound:
    description: Resource not found
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Error'
        examples:
          document_not_found:
            value:
              error: "document_not_found"
              message: "Document with ID 'doc_123' does not exist"
              request_id: "req_abc123"
```

### 3. Reusable Components

Extract common schemas to `components/schemas`:

```yaml
components:
  schemas:
    Error:
      # Shared error schema
    PaginationParams:
      # Shared pagination
    ACLPayload:
      # Shared ACL structure
```

### 4. Security Schemes

Define authentication clearly:

```yaml
components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

security:
  - BearerAuth: []
```

## Documentation Generation

### Generate HTML Docs

```bash
# Install Redoc CLI
npm install -g redoc-cli

# Generate static HTML
redoc-cli bundle contracts/rag-core.yaml -o docs/api/rag-core.html

# Serve interactive docs
npx @redocly/cli preview-docs contracts/rag-core.yaml
```

### Generate Markdown Docs

```bash
# Install widdershins
npm install -g widdershins

# Generate markdown
widdershins contracts/rag-core.yaml -o docs/api/rag-core.md
```

## Contract Change Process

1. **Propose Change:** Open PR with updated contract
2. **Review:** Team reviews API design (not implementation)
3. **Generate Mocks:** Update mock server with new contract
4. **Frontend Adapts:** Frontend updates against mocks
5. **Backend Implements:** Backend implements to pass contract tests
6. **Merge:** Both frontend and backend PRs merge when contract tests pass

This ensures frontend and backend never block each other.

## Resources

- **OpenAPI Specification:** https://swagger.io/specification/
- **Prism Mock Server:** https://stoplight.io/open-source/prism
- **Dredd Contract Testing:** https://dredd.org/
- **Redoc Documentation:** https://redocly.com/redoc/

## Support

For contract-related questions:
- Open an issue with `[contract]` prefix
- Discuss in #api-contracts Slack channel
- Review [DEVELOPMENT.md](../docs/DEVELOPMENT.md) for contribution guidelines
