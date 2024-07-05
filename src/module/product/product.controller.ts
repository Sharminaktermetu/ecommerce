import { ProductServices } from "./product.service";
import { Request, Response } from "express";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    const result = await ProductServices.createProductIntoDB(productData);
    res.status(200).json({
      success: true,
      message: "Product is created successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const updatedData = req.body;

  try {
    const updatedProduct = await ProductServices.updateProductFromDB(
      productId,
      updatedData
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(400).json({
      success: false,
    });
  }
};
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.deleteProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const searchProducts = async (req: Request, res: Response) => {
  try {
      const { searchTerm } = req.query;
console.log({searchTerm});
      if (!searchTerm || typeof searchTerm !== 'string') {
          return res.status(400).json({
              success: false,
              message: 'searchTerm query parameter is required and must be a string',
          });
      }

      const results = await ProductServices.searchProductsFromDB(searchTerm);

      res.status(200).json({
          success: true,
          message: "Products fetched successfully!",
          data: results,
      });
  } catch (err) {
      console.error('Error searching for products:', err);
      res.status(500).json({
          success: false,
          message: 'Internal server error',
          error: err,
      });
  }
};
export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
  searchProducts
};
