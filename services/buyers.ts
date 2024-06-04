import BackendClient from '@/config/axios-client';
import { OrderEntity } from '@/model/order.entity';
import { ProductEntity } from '@/model/product.entity';
import { getSession } from 'next-auth/react';

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

export const createOrder = async (productId: string, amount: number, sellerId: string)  => {
  const session = await getSession();
    if (!session) {
      return;
    }
  try {
    const order ={
      sellerId:sellerId,
      buyerId:session.user.id,
      items:[{
        productId: productId, quantity: amount,
      }],
    }
    const response = await client.post(`order`,order);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products by category");
  }
};