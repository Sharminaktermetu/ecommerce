export type Variant= {
    type: string;
    value: string;
  }
  
  export type Inventory ={
    quantity: number;
    inStock: boolean;
  }
export type Product={
    name: string;
    description: string;
    price: number;
    category: string;
    tags: string[]; // Array of strings
    variants: Variant[]; // Array of Variant objects
    inventory: Inventory;
    }