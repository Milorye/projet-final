import type { Request, Response } from 'express';
import { z } from 'zod';
import Product from '../models/Product.js';

const createProductSchema = z.object({
  slug: z.string().trim().min(2),
  name: z.string().trim().min(2),
  shortDescription: z.string().trim().min(10),
  description: z.string().trim().min(20),
  price: z.coerce.number().min(0),
  compareAtPrice: z.coerce.number().min(0).optional(),
  currency: z.string().default('EUR'),
  category: z.enum(['vetements', 'sacs', 'chaussures', 'accessoires']),
  categoryLabel: z.string().trim().min(2),
  collectionSlugs: z.array(z.string()).default([]),
  images: z.array(z.object({ url: z.string().url(), alt: z.string().min(2) })).min(1),
  availableSizes: z.array(z.string()).optional(),
  availableColors: z.array(z.object({ name: z.string(), hex: z.string() })).optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().optional(),
  isNew: z.boolean().optional(),
  isBestseller: z.boolean().optional(),
  material: z.string().optional(),
  careInstructions: z.array(z.string()).optional(),
  reference: z.string().trim().min(2),
  fit: z.string().optional(),
  origin: z.string().optional(),
  inStock: z.boolean().optional(),
  stockCount: z.coerce.number().min(0).optional(),
});

export async function listProducts(req: Request, res: Response) {
  try {
    const { category, search, minPrice, maxPrice, sort = 'pertinence' } = req.query;
    const query: Record<string, unknown> = {};

    if (typeof category === 'string' && category.length > 0) {
      query.category = category;
    }

    if (typeof search === 'string' && search.trim().length > 0) {
      const term = search.trim();
      query.$or = [
        { name: { $regex: term, $options: 'i' } },
        { shortDescription: { $regex: term, $options: 'i' } },
        { description: { $regex: term, $options: 'i' } },
        { tags: { $in: [new RegExp(term, 'i')] } },
      ];
    }

    if (typeof minPrice === 'string') {
      query.price = { ...((query.price as Record<string, number>) ?? {}), $gte: Number(minPrice) };
    }

    if (typeof maxPrice === 'string') {
      query.price = { ...((query.price as Record<string, number>) ?? {}), $lte: Number(maxPrice) };
    }

    const sortOptions: Record<string, 1 | -1> = {
      pertinence: { createdAt: -1 },
      'prix-asc': { price: 1 },
      'prix-desc': { price: -1 },
      nouveautes: { createdAt: -1 },
    } as Record<string, Record<string, 1 | -1>>;

    const selectedSort = sortOptions[String(sort) ?? 'pertinence'] ?? sortOptions.pertinence;
    const [products, total] = await Promise.all([
      Product.find(query).sort(selectedSort).lean(),
      Product.countDocuments(query),
    ]);

    return res.json({ data: products, total });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la récupération des produits.' });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Produit introuvable.' });
    }

    return res.json({ data: product });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Identifiant produit invalide.' });
  }
}

export async function getProductBySlug(req: Request, res: Response) {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });

    if (!product) {
      return res.status(404).json({ message: 'Produit introuvable.' });
    }

    return res.json({ data: product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la récupération du produit.' });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const parsed = createProductSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0]?.message ?? 'Données produit invalides.' });
    }

    const product = await Product.create(parsed.data);
    return res.status(201).json({ message: 'Produit créé avec succès.', data: product });
  } catch (error) {
    console.error(error);
    return res.status(409).json({ message: 'Un produit avec ce slug ou cette référence existe déjà.' });
  }
}
