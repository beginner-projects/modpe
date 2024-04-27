import React from 'react';
import StoreNavigation from '@/ui/store-navigation';
import ProductList from '@/ui/product/product-list';
import { CartProvider } from "@/context/CartContext";



export default function Home() {
    return (
        <div>
            <CartProvider>
                <StoreNavigation />
                <ProductList />
            </CartProvider>
        </div>
    );
}
