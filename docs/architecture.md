# Architecture overview

## Current state

The project currently contains a complete Next.js frontend application without a live backend or a configured database.

## Frontend

The frontend is a TypeScript + Tailwind Next.js application with the App Router. It includes:

- landing pages
- boutique catalog
- product details
- cart and favorites state
- local search and filtering logic
- responsive design and editorial branding

## Backend

The repository is prepared for a separate backend service in the `backend/` folder. This is intentionally left as a planned implementation because no backend code exists yet.

## Recommended future split

- Frontend: user-facing storefront and static content rendering
- Backend: product APIs, auth, checkout, admin endpoints, and data persistence
- Database: PostgreSQL or MySQL managed by Prisma or TypeORM
- Docs: architecture, deployment and API contract notes live under `docs/`

## Notes

The frontend should continue to work locally using local product data until the backend is implemented. Once the API is live, the frontend should read the base URL from `NEXT_PUBLIC_API_URL`.
