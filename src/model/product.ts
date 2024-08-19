import mongoose, { Document, Schema } from "mongoose";

interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
