import { ProductServices } from "./product.service";
import { Request, Response } from "express";

import joiValidation from "./product.validation";
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const { error } = joiValidation.validate(productData);

    const result = await ProductServices.createProductIntoDB(productData);
    if (error) {
      res.status(500).json({
        success: false,
        message: "something went wrong",
        error
      });
    }
    res.status(200).json({
      success: true,
      message: "Product is created successfully",
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

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    if (searchTerm && typeof searchTerm === "string") {
      // Search for products if searchTerm is provided
      const results = await ProductServices.searchProductsFromDB(searchTerm);
      res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: results,
      });
    } else {
      // Fetch all products if no searchTerm is provided
      const allProducts = await ProductServices.getAllProductsFromDB();
      res.status(200).json({
        success: true,
        message: "All products fetched successfully!",
        data: allProducts,
      });
    }
  } catch (err) {
    console.error("Error fetching or searching for products:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
  getAllProducts,
};
