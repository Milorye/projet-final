import type { Response } from 'express';
import { z } from 'zod';
import Product from '../models/Product.js';
import User from '../models/User.js';
import type { AuthenticatedRequest } from '../middleware/auth.js';

const cartItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(20).default(1),
  size: z.string().optional(),
  color: z.string().optional(),
});

export async function getCart(req: AuthenticatedRequest, res: Response) {
  try {
    const user = await User.findById(req.user?._id).populate('cart.items.product');

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    const items = user.cart.items.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    }));

    const subtotal = items.reduce((total, item) => {
      const product = item.product as { price?: number };
      return total + Number(product?.price ?? 0) * item.quantity;
    }, 0);

    return res.json({
      items,
      subtotal,
      total: subtotal,
      itemCount: items.reduce((count, item) => count + item.quantity, 0),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la récupération du panier.' });
  }
}

export async function addToCart(req: AuthenticatedRequest, res: Response) {
  try {
    const parsed = cartItemSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0]?.message ?? 'Panier invalide.' });
    }

    const { productId, quantity, size, color } = parsed.data;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Produit introuvable.' });
    }

    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    const existingItem = user.cart.items.find(
      (item) => item.product.toString() === productId && item.size === size && item.color === color,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.items.push({
        product: product._id,
        quantity,
        size,
        color,
      });
    }

    await user.save();
    return res.status(200).json({ message: 'Produit ajouté au panier.', cart: user.cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de l’ajout au panier.' });
  }
}

export async function removeFromCart(req: AuthenticatedRequest, res: Response) {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user?._id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    user.cart.items = user.cart.items.filter((item) => item.product.toString() !== productId);
    await user.save();
    return res.json({ message: 'Produit retiré du panier.', cart: user.cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la mise à jour du panier.' });
  }
}

export async function clearCart(req: AuthenticatedRequest, res: Response) {
  try {
    const user = await User.findById(req.user?._id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    user.cart.items = [];
    await user.save();
    return res.json({ message: 'Panier vidé.', cart: user.cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la vidange du panier.' });
  }
}
