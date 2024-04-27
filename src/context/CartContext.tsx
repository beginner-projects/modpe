'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { Product } from '@/lib/products'; // Assuming Product type is imported from somewhere


interface CartContextType {
  totalCartItem: number;
  setTotalCartItem: Dispatch<SetStateAction<number>>;
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: number) => void;
  resetCart: () => void;
  cartItems: Product[];
  updateProductQuantity: (productId: number, quantity: number) => void;
  subtotal: number;
}

const CartContext = createContext<CartContextType>({
  totalCartItem: 0,
  setTotalCartItem: () => {},
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  resetCart: () => {},
  cartItems: [],
  updateProductQuantity: () => {},
  subtotal: 0,
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [totalCartItem, setTotalCartItem] = useState<number>(0);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    const storedCount = localStorage.getItem('cartCount');
    
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
    if (storedCount) {
      setTotalCartItem(parseInt(storedCount, 10));
    }
  }, []); // This effect runs only once, when the component mounts
  
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartCount', totalCartItem.toString());
    calculateSubtotal(cartItems);
  }, [cartItems, totalCartItem]);

  const addProductToCart = (product: Product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);
  
    if (existingProduct) {
      const updatedCartItems = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems(prevItems => [...prevItems, { ...product, quantity: 1 }]);
      setTotalCartItem(prevCount => prevCount + 1);
    }
  };

  const removeProductFromCart = (productId: number) => {
    const removedItem = cartItems.find(item => item.id === productId);

    if (removedItem) {
      const updatedCartItems = cartItems.filter(item => item.id !== productId);
      setCartItems(updatedCartItems);
      setTotalCartItem(prevCount => Math.max(prevCount - removedItem.quantity, 0));
    }
  };

  const updateProductQuantity = (productId: number, quantity: number) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedCartItems);
    const updatedTotal = updatedCartItems.reduce((acc, item) => acc + item.quantity, 0);
    setTotalCartItem(updatedTotal);
  };

  const calculateSubtotal = (items: Product[]) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setSubtotal(total);
  };

  const resetCart = () => {
    setCartItems([]);
    setTotalCartItem(0);
    localStorage.removeItem('cartCount');
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider value={{ totalCartItem, setTotalCartItem, addProductToCart, removeProductFromCart, resetCart, cartItems, updateProductQuantity, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => useContext(CartContext);




