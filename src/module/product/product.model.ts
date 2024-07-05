import { Schema, model } from "mongoose";
import { Inventory, Product, Variant } from "./product.interface";


const inventorySchema =new Schema<Inventory>({

    quantity: {
        type: Number,
        required: true,
      },
      inStock: {
        type: Boolean,
        required: true,
      },
},{ _id: false })

const variantsSchema =new Schema<Variant>({
    
        type: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
     
},{ _id: false })
const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: [String],
  variants: [{
    type:variantsSchema,
   
}],
  inventory: {
    type:inventorySchema,
   
  },
});

export const ProductModel = model<Product>("product", productSchema);