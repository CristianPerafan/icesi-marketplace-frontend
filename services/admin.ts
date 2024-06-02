import BackendClient from '@/config/axios-client';
import { OrderEntity } from '@/model/order.entity';
import { ProductEntity } from '@/model/product.entity';
import { CreateUserEntity, UserEntity } from '@/model/user.entity';

const client = BackendClient();

export const getAllUsers = async () => {
  return await client.get<UserEntity[]>('/user')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

export const getUserById = async (id: string): Promise<UserEntity> => {
    const response = await client.get(`/user/${id}`);
    return response.data;
};

export const addUser = async (user: CreateUserEntity) => {
  return await client.post<UserEntity>('user',  user)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export const updateUser = async (user: UserEntity) => {
  return await client.patch<UserEntity>(`user/${user.id}`, user)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export const addProduct = async (userId: string, product: ProductEntity) => {

  return await client.post<ProductEntity>('products', { ...product, sellerId: userId})
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export const getSellersProducts = async (sellerId: string) => {
  return await client.get<ProductEntity[]>(`products/user/${sellerId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export const getAllProducts = async () => {
  return await client.get<ProductEntity[]>(`/products`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export const getOrdersByBuyer = async (buyerId: string) => {
  return await client.get<OrderEntity[]>(`order/user/${buyerId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}


export const getOrderById = async (id: string) => {
  return await client.get<OrderEntity[]>(`order/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export const getOrdersBySeller = async (sellerId: string) => {
  return await client.get<OrderEntity[]>(`order/seller/${sellerId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}


export const getOrdersAll = async () => {
  return await client.get<OrderEntity[]>(`order`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export const deleteOrderItem = async (id: string) => {
  return await client.delete<OrderEntity[]>(`order/item/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export const getRatingsReceived = async (id: string) => {
  return await client.get<OrderEntity[]>(`rating/seller/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export const getRatingsGiven = async (id: string) => {
  return await client.get<OrderEntity[]>(`rating/author/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export const removeOrder = async (orderId: string) => {
  return await client.delete(`order/${orderId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export const removeRating = async (ratingId: string) => {
  return await client.delete(`rating/${ratingId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export const acceptOrder = async (orderId: string) => {
  return await client.patch(`order/accept/${orderId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}