import mongoose, { type Document, type HydratedDocument, type Model, Schema } from 'mongoose';

export type ProductCategory = 'vetements' | 'sacs' | 'chaussures' | 'accessoires';

export interface IProduct extends Document {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  category: ProductCategory;
  categoryLabel: string;
  collectionSlugs: string[];
  images: { url: string; alt: string }[];
  availableSizes?: string[];
  availableColors?: { name: string; hex: string }[];
  tags: string[];
  featured?: boolean;
  isBestseller?: boolean;
  material?: string;
  careInstructions?: string[];
  reference: string;
  fit?: string;
  origin?: string;
  inStock?: boolean;
  stockCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    currency: { type: String, default: 'EUR' },
    category: {
      type: String,
      enum: ['vetements', 'sacs', 'chaussures', 'accessoires'],
      required: true,
    },
    categoryLabel: { type: String, required: true },
    collectionSlugs: [{ type: String }],
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, required: true },
      },
    ],
    availableSizes: [{ type: String }],
    availableColors: [
      {
        name: { type: String, required: true },
        hex: { type: String, required: true },
      },
    ],
    tags: [{ type: String }],
    featured: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    material: { type: String },
    careInstructions: [{ type: String }],
    reference: { type: String, required: true, unique: true },
    fit: { type: String },
    origin: { type: String },
    inStock: { type: Boolean, default: true },
    stockCount: { type: Number, default: 10 },
  },
  { timestamps: true },
);

export type ProductDocument = HydratedDocument<IProduct>;
const Product: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);

export default Product;
