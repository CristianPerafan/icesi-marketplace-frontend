"use client";
import React from 'react';
import { useCart } from '@/context/cartContext';

function Cart() {
  const { cart } = useCart();

  return (
    <div>
      <h1>Cart Page</h1>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div>
          <h2>Productos en el carrito:</h2>
          <ul>
            {cart.map((product) => (
              <li key={product.id}>
                <div>
                  <p>{product.name}</p>
                  <p>Precio: ${product.price}</p>
                  {/* Agrega más detalles del producto si es necesario */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Cart;
