import BackendClient from '@/config/axios-client';
import { ProductEntity } from '@/model/product.entity';

const client = BackendClient();

export const getSellersProducts = async () => {
  return await client.get<ProductEntity[]>('products/user/78b3ec0a-836c-41a4-8cd3-352db2f954a9')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}