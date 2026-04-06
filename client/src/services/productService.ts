import api from './api';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  skinType: string[];
  problems: string[];
  goal: string[];
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  products: Product[];
}

export const productService = {
  // Получить все товары
  async getAll(): Promise<ProductsResponse> {
    const response = await api.get<ProductsResponse>('/products');
    return response.data;
  },

  // Получить товар по ID
  async getById(id: number): Promise<{ product: Product }> {
    const response = await api.get<{ product: Product }>(`/products/${id}`);
    return response.data;
  },

  // Создать товар
  async create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    const response = await api.post<{ message: string; product: Product }>('/products', product);
    return response.data;
  },

  // Обновить товар
  async update(id: number, product: Partial<Product>) {
    const response = await api.put<{ message: string; product: Product }>(`/products/${id}`, product);
    return response.data;
  },

  // Удалить товар
  async delete(id: number) {
    const response = await api.delete<{ message: string }>(`/products/${id}`);
    return response.data;
  },
};