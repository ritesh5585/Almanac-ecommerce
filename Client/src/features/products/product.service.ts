import api from "../../api/axios";
import type { Product, ProductListResponse, ProductFormData, ProductQueryParams } from "./product.types";


export const getProduct = async (): Promise<Product> => {
  const res = await api.get<Product>(`/products`);
  return res.data;
};

export const createProduct = async (data: ProductFormData): Promise<Product> => {
  const res = await api.post<Product>("/products", data);
  return res.data;
};

export const updateProduct = async (id: string, data: ProductFormData): Promise<Product> => {
  const res = await api.put<Product>(`/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};
