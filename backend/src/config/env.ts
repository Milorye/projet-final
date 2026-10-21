import dotenv from 'dotenv';

dotenv.config();

const LOCAL_MONGO_URI = 'mongodb://127.0.0.1:27017/maison_moya';

function readEnv(source: NodeJS.ProcessEnv, name: string, fallback: string): string {
  const value = source[name]?.trim();
  if (!value) {
    return fallback;
  }

  return value;
}

export function resolveEnv(source: NodeJS.ProcessEnv = process.env) {
  const nodeEnv = readEnv(source, 'NODE_ENV', 'development');
  const mongoValue = source.MONGODB_URI?.trim();

  if (nodeEnv === 'production' && !mongoValue) {
    throw new Error(
      'MONGODB_URI is required in production. Set your MongoDB Atlas connection string in the Render environment variables.',
    );
  }

  const mongoUri = mongoValue ?? LOCAL_MONGO_URI;

  return {
    nodeEnv,
    port: Number(readEnv(source, 'PORT', '4000')),
    mongoUri,
    jwtSecret: readEnv(source, 'JWT_SECRET', 'maison-moya-dev-secret-change-me'),
    jwtExpiresIn: readEnv(source, 'JWT_EXPIRES_IN', '15m'),
    jwtRefreshSecret: readEnv(source, 'JWT_REFRESH_SECRET', 'maison-moya-refresh-dev-secret-change-me'),
    jwtRefreshExpiresIn: readEnv(source, 'JWT_REFRESH_EXPIRES_IN', '7d'),
    frontendUrl: readEnv(source, 'FRONTEND_URL', 'http://localhost:3000'),
    corsOrigin: readEnv(source, 'CORS_ORIGIN', 'http://localhost:3000'),
    adminEmail: readEnv(source, 'ADMIN_EMAIL', 'admin@maisonmoya.com'),
    adminPassword: readEnv(source, 'ADMIN_PASSWORD', 'Admin123!'),
    defaultCurrency: readEnv(source, 'DEFAULT_CURRENCY', 'EUR'),
  } as const;
}

export const env = resolveEnv();
