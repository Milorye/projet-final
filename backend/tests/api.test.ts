import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import User from '../src/models/User.js';
import Product from '../src/models/Product.js';

vi.mock('../src/models/User.js', () => ({
  default: {
    findOne: vi.fn(),
    create: vi.fn(),
    findById: vi.fn(),
  },
}));

vi.mock('../src/models/Product.js', () => ({
  default: {
    find: vi.fn(),
    countDocuments: vi.fn(),
    findById: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn(),
  },
}));

describe('MAISON MOYA backend API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns the health status', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
  });

  it('registers a new user and returns a token', async () => {
    vi.mocked(User.findOne).mockResolvedValue(null);
    vi.mocked(User.create).mockResolvedValue({
      _id: 'user_1',
      name: 'Alice Dupont',
      email: 'alice@example.com',
      role: 'customer',
    } as any);

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
    vi.mocked(Product.find).mockReturnValue({
      sort: vi.fn().mockReturnValue({
        lean: vi.fn().mockResolvedValue([
          {
            _id: 'product_1',
            name: 'Produit de test',
            price: 320,
            category: 'vetements',
          },
        ]),
      }),
    } as any);
    vi.mocked(Product.countDocuments).mockResolvedValue(1);

    const response = await request(app).get('/api/products');

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(1);
    expect(response.body.data[0].name).toBe('Produit de test');
  });
});
