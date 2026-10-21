# Backend — MAISON MOYA

This repository currently contains a complete frontend application and no live backend service.

## Status

- Frontend: implemented and working
- Backend: planned, not yet implemented
- Database: not yet selected, no production connection configured

## Planned architecture

The future backend should expose the product catalog, cart/order APIs, and admin services needed by the frontend.

Recommended stack:

- Node.js + TypeScript
- Express or Fastify
- Prisma or TypeORM (if a relational database is chosen)
- PostgreSQL or MySQL for production

## Directory structure

- src/ — application code
- routes/ — API endpoints
- controllers/ — request handling
- services/ — business logic
- middleware/ — auth, validation, CORS, logging
- config/ — environment and app config
- utils/ — helpers and shared functions
- tests/ — API and integration tests

## Example environment

See [.env.example](.env.example) for the variables that should be configured when the backend is implemented.

## Next step

When the backend is ready, add the server entrypoint and package.json, then expose a health endpoint such as `/health`.
