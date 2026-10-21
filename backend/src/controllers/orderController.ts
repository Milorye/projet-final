import type { Request, Response } from 'express';
import { z } from 'zod';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import type { AuthenticatedRequest } from '../middleware/auth.js';

const shippingAddressSchema = z.object({
  fullName: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  addressLine1: z.string().trim().min(2),
  city: z.string().trim().min(2),
  postalCode: z.string().trim().min(2),
  country: z.string().trim().min(2),
});

const orderItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.coerce.number().int().min(1).default(1),
  size: z.string().optional(),
  color: z.string().optional(),
});

const createOrderSchema = z.object({
  shippingAddress: shippingAddressSchema,
  items: z.array(orderItemSchema).min(1).optional(),
});

export async function placeOrder(req: AuthenticatedRequest, res: Response) {
  try {
    const parsed = createOrderSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0]?.message ?? 'Commande invalide.' });
    }

    const { shippingAddress, items } = parsed.data;
    const user = await User.findById(req.user?._id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    const sourceItems = items && items.length > 0 ? items : user.cart.items.map((item) => ({
      productId: item.product.toString(),
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    }));

    if (sourceItems.length === 0) {
      return res.status(400).json({ message: 'Le panier est vide.' });
    }

    const populatedProducts = await Promise.all(
      sourceItems.map((item) => Product.findById(item.productId)),
    );

    const invalidProduct = populatedProducts.findIndex((product) => product === null);
    if (invalidProduct >= 0) {
      return res.status(404).json({ message: 'Un produit du panier est introuvable.' });
    }

    const orderItems = sourceItems.map((item, index) => {
      const product = populatedProducts[index]!;
      return {
        product: product._id,
        name: product.name,
        image: product.images[0]?.url,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        unitPrice: product.price,
      };
    });

    const subtotal = orderItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const shippingFee = subtotal > 0 ? 20 : 0;
    const totalAmount = subtotal + shippingFee;

    const order = await Order.create({
      user: user._id,
      items: orderItems,
      shippingAddress,
      subtotal,
      shippingFee,
      totalAmount,
      paymentStatus: 'paid',
      orderStatus: 'pending',
    });

    user.cart.items = [];
    await user.save();

    return res.status(201).json({ message: 'Commande créée avec succès.', data: order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la création de la commande.' });
  }
}

export async function listMyOrders(req: AuthenticatedRequest, res: Response) {
  try {
    const orders = await Order.find({ user: req.user?._id }).sort({ createdAt: -1 });
    return res.json({ data: orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la récupération des commandes.' });
  }
}

export async function listAllOrders(_req: Request, res: Response) {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    return res.json({ data: orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la récupération des commandes administrateur.' });
  }
}
