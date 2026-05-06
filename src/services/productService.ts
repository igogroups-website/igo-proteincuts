/**
 * Product Service
 * Uses the local productStore (localStorage) as the source of truth.
 * All admin changes persist via productStore and are broadcast to the UI instantly.
 */
import { Product } from '../types/product';
import { loadProducts, upsertProduct, removeProduct } from './productStore';

export const getProducts = async (): Promise<Product[]> => {
  return loadProducts();
};

export const updateProduct = async (product: Partial<Product> & { id: number }) => {
  try {
    upsertProduct(product);
    return { success: true };
  } catch (err) {
    console.error('Update Product Error:', err);
    return { success: false, error: err };
  }
};

export const deleteProduct = async (id: number) => {
  try {
    removeProduct(id);
    return { success: true };
  } catch (err) {
    console.error('Delete Product Error:', err);
    return { success: false, error: err };
  }
};
