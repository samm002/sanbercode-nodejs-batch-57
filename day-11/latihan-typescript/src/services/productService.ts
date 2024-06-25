import { Product } from "../models/product";

export const addProduct = (products: Product[], newProduct: Product): Product[] => {
  return [...products, newProduct];
};

export const removeProduct = (products: Product[], productId: number): Product[] => {
  return products.filter(product => product.id !== productId);
};

export const updateProduct = (products: Product[], updatedProduct: Product): Product[] => {
  return products.map(product =>
    product.id === updatedProduct.id ? updatedProduct : product
  );
};

export const getProducts = (products: Product[]): Product[] => {
  return products;
};