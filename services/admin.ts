import BackendClient from '@/config/axios-client';
import { ProductEntity } from '@/model/product.entity';
import { UserEntity } from '@/model/user.entity';

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