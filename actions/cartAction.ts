import { ProductEntity } from '@/model/product.entity';

export function agregarAlCarrito(producto: ProductEntity) {
  return {
    type: 'ADD',
    item: producto
};
};

export function eliminarDelCarrito(producto: ProductEntity) {
  return {
    type: 'REMOVE',
    item: producto
};
}
