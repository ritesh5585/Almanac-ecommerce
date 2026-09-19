import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      index: true,
    },
    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: Record<string, any>) {
        if (
          !ret.imageUrl &&
          Array.isArray(ret.images) &&
          ret.images.length > 0
        ) {
          ret.imageUrl = ret.images[0];
        }
        if ((!ret.images || ret.images.length === 0) && ret.imageUrl) {
          ret.images = [ret.imageUrl];
        }
        return ret;
      },
    },
    toObject: {
      transform(_doc, ret: Record<string, any>) {
        if (
          !ret.imageUrl &&
          Array.isArray(ret.images) &&
          ret.images.length > 0
        ) {
          ret.imageUrl = ret.images[0];
        }
        if ((!ret.images || ret.images.length === 0) && ret.imageUrl) {
          ret.images = [ret.imageUrl];
        }
        return ret;
      },
    },
  },
);

productSchema.pre("validate", function () {
  if (!this.imageUrl && Array.isArray(this.images) && this.images.length > 0) {
    this.imageUrl = this.images[0] || "";
  } else if (this.imageUrl && (!this.images || this.images.length === 0)) {
    this.images = [this.imageUrl];
  }
});

const Item: Model<IProduct> = mongoose.model<IProduct>("Item", productSchema);

export default Item;
