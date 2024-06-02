import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductEntity } from '@/model/product.entity';

type CartContextType = {
  cart: ProductEntity[];
  addToCart: (product: ProductEntity) => void;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<ProductEntity[]>([]);

  // Cargar el carrito desde el almacenamiento local al iniciar la aplicación
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Guardar el carrito en el almacenamiento local cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductEntity) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartContext;
