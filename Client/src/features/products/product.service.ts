import api from "../../api/axios";
import type {
  Product,
  ProductListResponse,
  ProductFormData,
  ProductQueryParams,
} from "./product.types";

export const getProducts = async (
  params: ProductQueryParams = {},
): Promise<ProductListResponse> => {
  const res = await api.get("/products", { params });
  const data = res.data;
  if (Array.isArray(data)) {
    return { products: data, total: data.length, page: 1, totalPages: 1 };
  }
  if (data && Array.isArray(data.products)) {
    return {
      products: data.products,
      total: data.total ?? data.products.length,
      page: data.page ?? 1,
      totalPages: data.totalPages ?? 1,
    };
  }
  return { products: [], total: 0, page: 1, totalPages: 1 };
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await api.get(`/products/${id}`);
  const data = res.data;
  const product = data?.product || data;
  if (
    product &&
    !product.imageUrl &&
    Array.isArray(product.images) &&
    product.images.length > 0
  ) {
    product.imageUrl = product.images[0];
  }
  return product;
};

export const createProduct = async (
  data: ProductFormData,
): Promise<Product> => {
  const res = await api.post<{ product: Product }>("/products/create", data);
  return res.data.product;
};

export const updateProduct = async (
  id: string,
  data: Partial<ProductFormData>,
): Promise<Product> => {
  const res = await api.put<{ product: Product }>(
    `/products/update/${id}`,
    data,
  );
  return res.data.product;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/delete/${id}`);
};
