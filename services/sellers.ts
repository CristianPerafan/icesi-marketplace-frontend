import BackendClient from '@/config/axios-client';
import { OrderEntity } from '@/model/order.entity';
import { ProductEntity } from '@/model/product.entity';
import { getSession } from 'next-auth/react';


const client = BackendClient();


export const getSellersProducts = async () => {
  const session = await getSession();

  if (!session) {
    return;
  }
  return await client.get<ProductEntity[]>(`products/user/${session.user.id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}


export const addProduct = async (product: ProductEntity) => {

  const session = await getSession();
  if (!session) {
    return;
  }

  return await client.post<ProductEntity>('products', { ...product, sellerId: session.user.id})
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export const getProductById = async (productId: string) => {
  return await client.get<ProductEntity>(`products/${productId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}


export const updateProduct = async (product: ProductEntity) => {
  return await client.put<ProductEntity>(`products/${product.id}`, product)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}


export const deleteProductById = async (productId: string) => {
  return await client.delete(`products/${productId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export const getSellersOrders = async () => {
  const session = await getSession();

  if (!session) {
    return;
  }
  return await client.get<OrderEntity[]>(`order/seller/${session.user.id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}
export const getOrderById = async (orderId: string) => {
  return await client.get<OrderEntity>(`order/${orderId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export const deleteOrderById = async (orderId: string) => {
  return await client.delete(`order/${orderId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}
export const aceptOrderById = async (orderId: string) => {
  return await client.delete(`order//accept/${orderId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}