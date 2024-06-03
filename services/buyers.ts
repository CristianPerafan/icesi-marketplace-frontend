import BackendClient from '@/config/axios-client';
import { ProductEntity } from '@/model/product.entity';

const client = BackendClient();

export const getBuyersProducts = async () => {
  return await client.get<ProductEntity[]>('products')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}
export const getProductById = async (id: string): Promise<ProductEntity> => {
  try {    
    const response = await client.get<ProductEntity>(`products/${id}`);    
    return response.data;
  } catch (error) {    
    throw new Error("Error fetching product details");
  }
};


export const getProductsByCategory = async (category: string): Promise<ProductEntity[]> => {
  try {
    const response = await client.get<ProductEntity[]>(`products/category/${category}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products by category");
  }
};