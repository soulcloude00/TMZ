# PLANNING.md

## Project Overview

This project is a full-stack web application for a mobile shop, using a modular architecture and strict separation of concerns.

## Tech Stack

- **Frontend:** React (TypeScript), Tailwind CSS
- **Backend:** FastAPI (Python 3.11+), Prisma (SQLModel/SQLAlchemy)
- **Testing:** Vitest/Jest (frontend), Pytest (backend)
- **Other:** Prettier, ESLint, Black, Ruff

## Folder Structure

- `src/components/` – UI components
- `src/hooks/` – Custom React hooks
- `src/lib/` – Utilities and context
- `src/pages/` – Page-level components and API routes
- `server/` – Backend FastAPI server
- `prisma/` – Database schema and migrations

## Architecture Diagram

```mermaid
graph TD
  A[Frontend (React/TS)]
  B[Backend (FastAPI)]
  C[Database (Prisma/SQLModel)]
  D[UI Components]
  E[Hooks]
  F[Lib/Utils]
  G[Pages/API]
  H[Server Entry]
  I[Prisma Schema]

  A --> D
  A --> E
  A --> F
  A --> G
  G --> B
  B --> H
  B --> C
  C --> I
```

## Naming Conventions & Domain Boundaries

- Use PascalCase for components, camelCase for functions/variables.
- Keep UI, logic, and data layers separate.
- All API contracts defined in `src/pages/api/`.

---
