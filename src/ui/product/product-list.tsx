'use client'

// product-list.tsx

import { useState } from 'react';
import Image from 'next/image';
import CartIcon from '../../../public/cart.svg';
import { useCart } from '@/context/CartContext';
import { Product, products } from '@/lib/products';


export default function ProductList() {
  const { addProductToCart, updateProductQuantity } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product: Product) => {
    const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
  
    if (existingProductIndex !== -1) {
      // If the product already exists in the cart, update its quantity
      updateProductQuantity(product.id, cartItems[existingProductIndex].quantity + 1);
    } else {
      // If the product doesn't exist in the cart, add it
      addProductToCart(product);
    }
  
    // Reset selected product after adding to cart
    setSelectedProduct(null);
  };

  // Retrieve cart items from the context
  const { cartItems } = useCart();

  return (
    <div className="bg-white">
      {selectedProduct ? (
        // Product view component
        <div>{/* Render product details */}</div>
      ) : (
        // Product list component
        <div className="mx-auto max-w-2xl px-4 py-16 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <Image
                    onClick={() => handleClick(product)}
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                    height={100}
                    width={100}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="mt-4 text-sm text-gray-700 font-semibold">{product.name}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">{product.price} <span className="text-gray-500 font-light">MRB</span></p>
                  </div>
                  {/* Add to cart button */}
                  <button onClick={() => handleAddToCart(product)}>
                    <Image src={CartIcon} alt="Cart" width={40} height={40} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
