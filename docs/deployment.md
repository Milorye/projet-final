# Deployment guide

## Frontend deployment

The frontend is a standard Next.js application and can be deployed independently to Vercel or any compatible Node.js host.

### Typical commands

```bash
cd frontend
npm install
npm run build
npm run start
```

### Required environment variable

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Backend deployment

Backend implementation is not yet present. When added, it should be deployed separately from the frontend and configured with its own environment file.

### Suggested production settings

- PORT=4000
- NODE_ENV=production
- CORS_ORIGIN=https://example.com
- DATABASE_URL=postgresql://... 

## Database

No database is currently configured. The recommended approach is PostgreSQL with Prisma or TypeORM. Keep configuration values in environment variables and do not commit secrets.

## Local development

- Frontend: http://localhost:3000
- Backend (future): http://localhost:4000
