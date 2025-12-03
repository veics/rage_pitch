# Contributing to RAGE

Thank you for your interest in contributing to RAGE! This document provides guidelines and instructions for contributing to the project.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Testing Guidelines](#testing-guidelines)
6. [Documentation](#documentation)
7. [Pull Request Process](#pull-request-process)
8. [Release Process](#release-process)

---

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of:
- Age
- Body size
- Disability
- Ethnicity
- Gender identity and expression
- Level of experience
- Nationality
- Personal appearance
- Race
- Religion
- Sexual identity and orientation

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the project team at conduct@rage.ai. All complaints will be reviewed and investigated promptly and fairly.

---

## Getting Started

### Prerequisites

Before contributing, ensure you have:

```bash
# Required
- Python 3.11+
- Node.js 20+
- Podman 4.0+ or Docker 24.0+
- Git 2.30+

# Recommended
- VS Code or PyCharm
- Postman or similar API testing tool
- Neo4j Desktop (for graph visualization)
```

### Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/rage.git
cd rage

# Add upstream remote
git remote add upstream https://github.com/veics/rage.git

# Verify remotes
git remote -v
```

### Development Environment Setup

```bash
# Create Python virtual environment
python3.11 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies (development mode)
pip install -e ".[dev]"

# Install pre-commit hooks
pre-commit install

# Install frontend dependencies
cd frontend
npm install
cd ..

# Copy environment template
cp .env.example .env

# Edit .env with your local configuration
vim .env

# Start development containers
podman-compose -f docker-compose.dev.yml up -d

# Run database migrations
alembic upgrade head

# Initialize Neo4j schema
python scripts/init_neo4j.py

# Seed test data
python scripts/seed_test_data.py
```

### Verify Setup

```bash
# Run tests
pytest

# Start backend (development mode with auto-reload)
uvicorn src.api.main:app --reload --port 8000

# In another terminal, start frontend
cd frontend
npm run dev
```

Access:
- **Frontend**: http://localhost:3000
- **API Docs**: http://localhost:8000/docs
- **Neo4j Browser**: http://localhost:7474

---

## Development Workflow

### Branch Strategy

We use **Git Flow** with the following branches:

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: New features
- `bugfix/*`: Bug fixes
- `hotfix/*`: Critical production fixes
- `release/*`: Release preparation

### Creating a Feature Branch

```bash
# Update develop branch
git checkout develop
git pull upstream develop

# Create feature branch
git checkout -b feature/your-feature-name

# Make changes, commit often
git add .
git commit -m "feat: add new feature X"

# Push to your fork
git push origin feature/your-feature-name
```

### Commit Message Convention

We follow **Conventional Commits**:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

**Examples:**

```bash
# Feature
git commit -m "feat(agents): add query analyzer agent"

# Bug fix
git commit -m "fix(search): correct vector search ranking"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Breaking change
git commit -m "feat(api)!: change query response format

BREAKING CHANGE: Query responses now include confidence scores"
```

### Keeping Your Branch Updated

```bash
# Fetch upstream changes
git fetch upstream

# Rebase your branch on develop
git rebase upstream/develop

# If conflicts occur, resolve them and continue
git add <resolved-files>
git rebase --continue

# Force push to your fork (after rebase)
git push origin feature/your-feature-name --force
```

---

## Coding Standards

### Python

We follow **PEP 8** with some modifications:

```python
# Use type hints
def process_query(query: str, max_results: int = 10) -> list[dict[str, Any]]:
    """Process a user query and return results.
    
    Args:
        query: User's search query
        max_results: Maximum number of results to return
        
    Returns:
        List of search results with metadata
        
    Raises:
        ValueError: If query is empty
    """
    if not query.strip():
        raise ValueError("Query cannot be empty")
    
    # Implementation
    return results

# Use dataclasses for data structures
from dataclasses import dataclass

@dataclass
class SearchResult:
    """Represents a single search result."""
    
    document_id: str
    title: str
    content: str
    score: float
    metadata: dict[str, Any]

# Use Pydantic for API models
from pydantic import BaseModel, Field

class QueryRequest(BaseModel):
    """API request model for queries."""
    
    query: str = Field(..., min_length=1, max_length=1000)
    max_results: int = Field(10, ge=1, le=100)
    strategy: str = Field("auto", pattern="^(auto|vector|keyword|hybrid)$")
```

**Linting and Formatting:**

```bash
# Format code with Black
black src/ tests/

# Sort imports with isort
isort src/ tests/

# Type checking with mypy
mypy src/

# Linting with ruff
ruff check src/ tests/

# All checks
make lint
```

**Configuration files:**

- `pyproject.toml`: Black, isort, mypy, pytest configuration
- `.ruff.toml`: Ruff linting rules
- `.pre-commit-config.yaml`: Pre-commit hooks

### TypeScript/React

We follow **Airbnb Style Guide** with TypeScript:

```typescript
// Use TypeScript for all files
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Use functional components with hooks
import { FC, useState, useEffect } from 'react';

interface QueryInputProps {
  onSubmit: (query: string) => void;
  isLoading?: boolean;
}

export const QueryInput: FC<QueryInputProps> = ({ onSubmit, isLoading = false }) => {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={isLoading}
        placeholder="Enter your query..."
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Submit'}
      </button>
    </form>
  );
};

// Use custom hooks for logic
import { useState, useCallback } from 'react';
import { api } from '@/api/client';

interface UseQueryResult {
  query: string;
  setQuery: (q: string) => void;
  results: SearchResult[];
  isLoading: boolean;
  error: Error | null;
  submit: () => Promise<void>;
}

export const useQuery = (): UseQueryResult => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const submit = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.query({ query });
      setResults(response.results);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [query]);
  
  return { query, setQuery, results, isLoading, error, submit };
};
```

**Linting and Formatting:**

```bash
# Format code with Prettier
npm run format

# Lint with ESLint
npm run lint

# Type check
npm run type-check

# All checks
npm run check
```

### SQL

```sql
-- Use explicit column names
SELECT 
    u.id,
    u.email,
    u.created_at,
    t.name AS team_name
FROM users u
LEFT JOIN teams t ON u.team_id = t.id
WHERE u.is_active = true
ORDER BY u.created_at DESC
LIMIT 10;

-- Use CTEs for complex queries
WITH recent_queries AS (
    SELECT 
        user_id,
        COUNT(*) AS query_count
    FROM queries
    WHERE created_at > NOW() - INTERVAL '7 days'
    GROUP BY user_id
)
SELECT 
    u.email,
    COALESCE(rq.query_count, 0) AS queries_last_7_days
FROM users u
LEFT JOIN recent_queries rq ON u.id = rq.user_id
ORDER BY queries_last_7_days DESC;
```

### Cypher (Neo4j)

```cypher
// Use MERGE for upserts
MERGE (c:Concept {name: $concept_name})
ON CREATE SET 
    c.created_at = datetime(),
    c.importance = 0.5
ON MATCH SET 
    c.updated_at = datetime()
RETURN c;

// Use proper indexes
CREATE INDEX concept_name IF NOT EXISTS
FOR (c:Concept)
ON (c.name);

// Use parameters for security
MATCH (d:Document)-[:CONTAINS]->(c:Concept {name: $concept})
WHERE d.team_id = $team_id
RETURN d.title, d.url
ORDER BY d.created_at DESC
LIMIT $limit;
```

---

## Testing Guidelines

### Unit Tests

```python
# tests/unit/test_search.py
import pytest
from src.search.vector import VectorSearch

@pytest.fixture
def vector_search():
    """Fixture providing VectorSearch instance."""
    return VectorSearch(dimension=384)

def test_vector_search_initialization(vector_search):
    """Test that VectorSearch initializes correctly."""
    assert vector_search.dimension == 384
    assert vector_search.index is not None

def test_vector_search_add_documents(vector_search):
    """Test adding documents to vector index."""
    documents = [
        {"id": "doc1", "text": "test document 1"},
        {"id": "doc2", "text": "test document 2"},
    ]
    
    vector_search.add_documents(documents)
    
    assert vector_search.count() == 2

def test_vector_search_query(vector_search):
    """Test querying vector index."""
    # Add documents
    documents = [
        {"id": "doc1", "text": "Python programming"},
        {"id": "doc2", "text": "Java programming"},
    ]
    vector_search.add_documents(documents)
    
    # Query
    results = vector_search.query("Python development", k=1)
    
    assert len(results) == 1
    assert results[0]["id"] == "doc1"

@pytest.mark.parametrize("query,expected_count", [
    ("test", 2),
    ("Python", 1),
    ("nonexistent", 0),
])
def test_vector_search_various_queries(vector_search, query, expected_count):
    """Test various query scenarios."""
    documents = [
        {"id": "doc1", "text": "Python test"},
        {"id": "doc2", "text": "JavaScript test"},
    ]
    vector_search.add_documents(documents)
    
    results = vector_search.query(query, k=10)
    
    assert len(results) == expected_count
```

### Integration Tests

```python
# tests/integration/test_query_flow.py
import pytest
from httpx import AsyncClient
from src.api.main import app

@pytest.mark.asyncio
async def test_complete_query_flow():
    """Test complete query flow from API to response."""
    async with AsyncClient(app=app, base_url="http://test") as client:
        # 1. Authenticate
        auth_response = await client.post(
            "/api/v1/auth/login",
            json={"email": "test@example.com", "password": "testpass"}
        )
        assert auth_response.status_code == 200
        token = auth_response.json()["access_token"]
        
        headers = {"Authorization": f"Bearer {token}"}
        
        # 2. Upload document
        upload_response = await client.post(
            "/api/v1/documents",
            files={"file": ("test.txt", b"Test document content")},
            headers=headers
        )
        assert upload_response.status_code == 201
        doc_id = upload_response.json()["id"]
        
        # 3. Wait for processing
        await asyncio.sleep(2)
        
        # 4. Query
        query_response = await client.post(
            "/api/v1/query",
            json={"query": "test content"},
            headers=headers
        )
        assert query_response.status_code == 200
        
        results = query_response.json()
        assert len(results["documents"]) > 0
        assert any(d["id"] == doc_id for d in results["documents"])
```

### Frontend Tests

```typescript
// frontend/src/components/__tests__/QueryInput.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryInput } from '../QueryInput';

describe('QueryInput', () => {
  it('renders input field', () => {
    render(<QueryInput onSubmit={jest.fn()} />);
    expect(screen.getByPlaceholderText(/enter your query/i)).toBeInTheDocument();
  });
  
  it('calls onSubmit with query text', async () => {
    const handleSubmit = jest.fn();
    render(<QueryInput onSubmit={handleSubmit} />);
    
    const input = screen.getByPlaceholderText(/enter your query/i);
    const button = screen.getByRole('button', { name: /submit/i });
    
    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith('test query');
    });
  });
  
  it('disables input when loading', () => {
    render(<QueryInput onSubmit={jest.fn()} isLoading />);
    
    const input = screen.getByPlaceholderText(/enter your query/i);
    const button = screen.getByRole('button');
    
    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(/processing/i);
  });
});
```

### Running Tests

```bash
# Backend tests
pytest                          # All tests
pytest tests/unit              # Unit tests only
pytest tests/integration       # Integration tests only
pytest -v                      # Verbose
pytest --cov=src              # With coverage
pytest -k "test_search"       # Specific pattern

# Frontend tests
npm test                       # All tests (watch mode)
npm run test:coverage         # With coverage
npm run test:ci               # CI mode (no watch)

# End-to-end tests
npm run test:e2e              # Playwright tests
```

### Test Coverage Requirements

- **Minimum overall coverage**: 80%
- **Unit tests**: 90% coverage of business logic
- **Integration tests**: All API endpoints
- **E2E tests**: Critical user flows

---

## Documentation

### Code Documentation

```python
def process_document(
    document: Document,
    chunking_strategy: str = "sentence",
    chunk_size: int = 512,
    chunk_overlap: int = 50
) -> list[DocumentChunk]:
    """Process a document into chunks for embedding.
    
    This function takes a raw document and splits it into smaller chunks
    based on the specified strategy. Chunks are overlapped to maintain
    context continuity.
    
    Args:
        document: The document to process
        chunking_strategy: Strategy for chunking ("sentence", "paragraph", "fixed")
        chunk_size: Maximum size of each chunk in tokens
        chunk_overlap: Number of tokens to overlap between chunks
        
    Returns:
        List of document chunks with metadata
        
    Raises:
        ValueError: If chunking_strategy is invalid
        ProcessingError: If document processing fails
        
    Example:
        >>> doc = Document(id="doc1", content="Long text...")
        >>> chunks = process_document(doc, chunk_size=256)
        >>> len(chunks)
        5
    """
    # Implementation
```

### API Documentation

Use **OpenAPI/Swagger** with detailed descriptions:

```python
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter()

class QueryRequest(BaseModel):
    """Request model for query endpoint."""
    
    query: str = Field(
        ...,
        min_length=1,
        max_length=1000,
        description="User's search query",
        example="How do I configure authentication?"
    )
    strategy: str = Field(
        "auto",
        pattern="^(auto|vector|keyword|hybrid)$",
        description="Search strategy to use",
        example="hybrid"
    )
    max_results: int = Field(
        10,
        ge=1,
        le=100,
        description="Maximum number of results",
        example=10
    )

@router.post("/query", tags=["Search"])
async def query(request: QueryRequest) -> QueryResponse:
    """Execute a search query.
    
    This endpoint processes a user query using the specified search strategy
    and returns relevant documents with answers.
    
    - **query**: The search query (1-1000 characters)
    - **strategy**: Search strategy (auto/vector/keyword/hybrid)
    - **max_results**: Maximum results to return (1-100)
    
    Returns:
        QueryResponse with documents and synthesized answer
        
    Raises:
        HTTPException: 400 if query is invalid
        HTTPException: 500 if processing fails
    """
    # Implementation
```

### Architecture Documentation

Update relevant docs when making architectural changes:

- `docs/ARCHITECTURE.md`: System architecture
- `docs/API_SPECIFICATION.md`: API changes
- `docs/DATABASE_SCHEMA.md`: Schema changes
- `docs/AGENT_SYSTEM.md`: Agent changes

---

## Pull Request Process

### Before Submitting

```bash
# Ensure all tests pass
pytest
npm test

# Ensure code is formatted
black src/ tests/
npm run format

# Ensure linting passes
ruff check src/ tests/
npm run lint

# Ensure type checking passes
mypy src/
npm run type-check

# Update documentation if needed
# Update CHANGELOG.md
```

### Creating a Pull Request

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open PR on GitHub**
   - Go to https://github.com/veics/rage
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the template

3. **PR Title Format**
   ```
   feat(scope): brief description
   ```

4. **PR Description Template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Motivation
   Why this change is needed
   
   ## Changes
   - List of changes
   - Another change
   
   ## Testing
   How these changes were tested
   
   ## Screenshots (if applicable)
   
   ## Checklist
   - [ ] Tests added/updated
   - [ ] Documentation updated
   - [ ] CHANGELOG.md updated
   - [ ] All tests passing
   - [ ] Code formatted and linted
   ```

### Review Process

1. **Automated Checks**
   - Tests must pass
   - Coverage must meet threshold
   - Linting must pass
   - No merge conflicts

2. **Code Review**
   - At least 1 approval required
   - Address all comments
   - Keep discussion focused

3. **Merge**
   - Maintainer will merge when approved
   - Use "Squash and Merge" for cleaner history

---

## Release Process

### Versioning

We follow **Semantic Versioning** (SemVer):

```
MAJOR.MINOR.PATCH

1.0.0 → 1.1.0 → 1.1.1 → 2.0.0
```

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

```bash
# 1. Update version
# Update pyproject.toml
# Update package.json
# Update __version__ in src/__init__.py

# 2. Update CHANGELOG.md
# Add release notes under new version header

# 3. Create release branch
git checkout -b release/v1.2.0

# 4. Run full test suite
pytest
npm test

# 5. Build documentation
mkdocs build

# 6. Create tag
git tag -a v1.2.0 -m "Release version 1.2.0"

# 7. Push tag
git push upstream v1.2.0

# 8. Create GitHub Release
# Go to GitHub and create release from tag
# Include changelog excerpt
# Attach built artifacts

# 9. Publish to PyPI (maintainers only)
python -m build
twine upload dist/*

# 10. Publish Docker images (maintainers only)
docker buildx build --platform linux/amd64,linux/arm64 \
  -t rage/rage:v1.2.0 \
  -t rage/rage:latest \
  --push .
```

---

## Getting Help

- **Questions**: [GitHub Discussions](https://github.com/veics/rage/discussions)
- **Bugs**: [GitHub Issues](https://github.com/veics/rage/issues)
- **Security**: security@rage.ai
- **General**: hello@rage.ai

---

## Recognition

Contributors are recognized in:
- `CONTRIBUTORS.md`
- GitHub releases
- Project website

---

Thank you for contributing to RAGE! 🎉
