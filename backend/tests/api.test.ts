import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';

let app: any;
let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongoServer.getUri();
  process.env.JWT_SECRET = 'test-secret';
  process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';

  const appModule = await import('../src/app.js');
  app = appModule.default;

  const { connectDatabase } = await import('../src/config/db.js');
  await connectDatabase();
});

beforeEach(async () => {
  const { default: User } = await import('../src/models/User.js');
  const { default: Product } = await import('../src/models/Product.js');
  await User.deleteMany({});
  await Product.deleteMany({});
});

afterAll(async () => {
  const { disconnectDatabase } = await import('../src/config/db.js');
  await disconnectDatabase();
  await mongoServer.stop();
});

describe('MAISON MOYA backend API', () => {
  it('returns the health status', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
  });

  it('registers a new user and returns a token', async () => {
    const response = await request(app).post('/api/auth/register').send({
      name: 'Alice Dupont',
      email: 'alice@example.com',
      password: 'Password123!',
    });

    expect(response.status).toBe(201);
    expect(response.body.user.email).toBe('alice@example.com');
    expect(response.body.token).toBeTruthy();
  });

  it('lists products and returns the catalog', async () => {
    const { default: Product } = await import('../src/models/Product.js');
    await Product.create({
      slug: 'test-product',
      name: 'Produit de test',
      shortDescription: 'Description courte de test',
      description: 'Description complète de test du produit.',
      price: 320,
      category: 'vetements',
      categoryLabel: 'Vêtements',
      collectionSlugs: ['intemporels'],
      images: [{ url: 'https://example.com/image.jpg', alt: 'Produit de test' }],
      tags: ['test'],
      reference: 'TEST-001',
    });

    const response = await request(app).get('/api/products');

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(1);
    expect(response.body.data[0].name).toBe('Produit de test');
  });
});
