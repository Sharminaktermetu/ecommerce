import mongoose from "mongoose";
import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};
const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ id });
  return result;
};
const updateProductFromDB = async (
  productId: string,
  updatedData: Partial<Product>
) => {
  // Check if the productId is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid product ID");
  }

  // Find and update the product
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productId,
    updatedData,
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    throw new Error("Product not found");
  }

  return updatedProduct;
};
const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.deleteOne({ id });
  return result;
};
export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB
};
