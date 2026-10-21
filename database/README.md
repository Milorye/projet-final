# Database

No database is currently configured or connected in this repository.

## Planned setup

Use a production-ready relational database such as PostgreSQL and choose either Prisma or TypeORM.

## Structure

- migrations/ — adds versioned SQL or ORM migration files
- seeds/ — data seeding scripts for dev or staging

## Important

Never commit production credentials or secret values. Keep all connection variables in environment files such as `.env` or `.env.example`.
