import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const urlRegex = /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|avif)(\?.*)?$/i;

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    images: {
      type: [String],
      required: true,
      validate: [
        {
          validator: (arr: string[]) => arr.length > 0,
          message: "At least one image URL is required",
        },
        {
          validator: (arr: string[]) => arr.every((url) => urlRegex.test(url)),
          message: "One or more image URLs are invalid",
        },
      ],
    },
  },
  { timestamps: true },
);

const Item: Model<IProduct> = mongoose.model<IProduct>("Item", productSchema);

export default Item;
