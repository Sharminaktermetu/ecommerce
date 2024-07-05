
import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};


const getSingleProductFromDB = async (productId: string) => {

  const product = await ProductModel.findById(productId);
 

  return product;
};
const updateProductFromDB = async (
  productId: string,
  updatedData: Partial<Product>
) => {
 

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
const deleteProductFromDB = async (productId: string) => {
  const result = await ProductModel.deleteOne({ _id: productId });
  return result;
};
const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};
const searchProductsFromDB = async (searchTerm: string) => {

  const regex = new RegExp(searchTerm, 'i');
  
  // Search in name and description
  const results = await ProductModel.find({
      $or: [
          { name: regex },
          { description: regex }
      ]
  });

  return results;
};










export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
  searchProductsFromDB
};
