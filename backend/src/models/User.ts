import bcrypt from 'bcryptjs';
import mongoose, { type Document, type HydratedDocument, type Model, Schema } from 'mongoose';

export type UserRole = 'customer' | 'admin';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
  cart: {
    items: {
      product: mongoose.Types.ObjectId;
      quantity: number;
      size?: string;
      color?: string;
    }[];
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const cartItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1, min: 1 },
    size: { type: String },
    color: { type: String },
  },
  { _id: true },
);

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    phone: { type: String },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    cart: {
      items: [cartItemSchema],
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

userSchema.methods.comparePassword = async function comparePassword(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export type UserDocument = HydratedDocument<IUser>;
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
