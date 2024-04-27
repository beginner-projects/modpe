// lib/products.ts

export interface Product {
  id: number;
  name: string;
  href: string;
  color: string;
  price: number;
  quantity: number;
  imageSrc: string;
  imageAlt: string;
  }
  
  export const products: Product[] = [
    {
      id: 1,
      name: 'Earthen Bottle',
      href: '#',
      color: 'Salmon',
      price: 35,
      quantity: 1,
      imageSrc: '/bottle.png',
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
      id: 2,
      name: 'Nomad Tumbler',
      href: '#',
      color: 'Salmon',
      price: 90,
      quantity: 1,
      imageSrc: '/bottle.png',
      imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
      id: 3,
      name: 'Focus Paper Refill',
      href: '#',
      color: 'Salmon',
      price: 100,
      quantity: 1,
      imageSrc: '/bottle.png',
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
      id: 4,
      name: 'Machined Mechanical Pencil',
      href: '#',
      color: 'Salmon',
      price: 150,
      quantity: 1,
      imageSrc: '/bottle.png',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    {
      id: 5,
      name: 'Throwback Hip Bag',
      href: '#',
      color: 'Salmon',
      price: 90,
      quantity: 1,
      imageSrc: '/bottle.png',
      imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    // Add more products as needed
  ];
  