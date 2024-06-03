import { ProductEntity } from '@/model/product.entity';

export const agregarAlCarrito = (producto: ProductEntity) => ({
  type: 'AGREGAR_AL_CARRITO',
  payload: producto,
});

export const eliminarDelCarrito = (producto: ProductEntity) => ({
  type: 'ELIMINAR_DEL_CARRITO',
  payload: producto,
});
