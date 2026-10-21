import { describe, expect, it } from 'vitest';
import { resolveEnv } from './env.js';

describe('resolveEnv', () => {
  it('throws in production when MONGODB_URI is missing', () => {
    expect(() => resolveEnv({ NODE_ENV: 'production' })).toThrow(/MONGODB_URI/i);
  });

  it('uses the local development fallback when MONGODB_URI is absent in development', () => {
    const env = resolveEnv({ NODE_ENV: 'development' });

    expect(env.mongoUri).toBe('mongodb://127.0.0.1:27017/maison_moya');
  });
});
