import Link from 'next/link';
import React from 'react';

const MainHome: React.FC = () => {
  return (
    <div className="home-main-container rounded-md mt-top">
      <div className="fixed isolate px-6 pt-14 md:relative">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
        </div>
        <div className="headingofsite mx-auto max-w-2xl py-32">
          <div className="text-center">
            <h1 className="text-6xl font-bold tracking-light text-white md:text-7xl">Building  <span className="text-orange-500">Real</span> World Businesses</h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">Do not trust, verify</p>
            <div className="mt-10 flex justify-center gap-x-6">
              <Link href="/business" className="rounded-md bg-indigo-600 px-11 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHome;
