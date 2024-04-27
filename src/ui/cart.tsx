'use client'

import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function Cart({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState(true);
  const { cartItems, removeProductFromCart, updateProductQuantity, subtotal } = useCart(); // Added subtotal

  const handleRemove = (productId: number) => {
    removeProductFromCart(productId);
  };

  const handleIncreaseQuantity = (productId: number) => {
    // Find the product in the cart
    const product = cartItems.find(item => item.id === productId);
  
    if (product) {
      // Increment the quantity, but ensure it doesn't exceed a certain limit (e.g., 10)
      const newQuantity = product.quantity + 1;
      const maxQuantity = 1000000000000; // Change this value as needed
      const updatedQuantity = Math.min(newQuantity, maxQuantity);
      updateProductQuantity(productId, updatedQuantity);
    }
  };

  const handleDecreaseQuantity = (productId: number) => {
    // Find the product in the cart
    const product = cartItems.find(item => item.id === productId);
  
    if (product) {
      // Decrease the quantity by 1, but ensure it doesn't go below zero
      const newQuantity = product.quantity - 1;
      const updatedQuantity = Math.max(newQuantity, 0);
      
      if (updatedQuantity === 0) {
        // If the updated quantity is zero, remove the product from the cart
        handleRemove(productId);
      } else {
        // Update the product quantity
        updateProductQuantity(productId, updatedQuantity);
      }
    }
  };

  useEffect(() => {
    setOpen(true); // Ensure the cart dialog is always open when this component mounts
  }, []);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => onClose()}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => onClose()}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        {cartItems.length === 0 ? (
                          <p className="text-center text-gray-500">Cart is empty</p>
                        ) : (
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {cartItems.map(product => (
                                <li key={product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <Image
                                      src={product.imageSrc}
                                      alt={product.imageAlt}
                                      className="object-cover object-center"
                                      width={100}
                                      height={100}
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={product.href}>{product.name}</a>
                                        </h3>
                                        <p className="ml-4">{product.price}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center">
                                        <button
                                          onClick={() => handleDecreaseQuantity(product.id)}
                                          type="button"
                                          className="text-indigo-600 hover:text-indigo-500 text-4xl"
                                        >
                                          -
                                        </button>
                                        <span className="mx-2 text-2xl">{product.quantity}</span>
                                        <button
                                          onClick={() => handleIncreaseQuantity(product.id)}
                                          type="button"
                                          className="text-indigo-600 hover:text-indigo-500 text-4xl"
                                        >
                                          +
                                        </button>
                                      </div>

                                      <div>
                                        <button
                                          onClick={() => handleRemove(product.id)}
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p><span className="text-gray-400 font-light text-sm">MRB </span> {subtotal.toFixed(0)}</p> {/* Display dynamically calculated subtotal */}
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes included in price.</p>
                      <div className="mt-6 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                        
                          Pay in Crypto
                        
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
