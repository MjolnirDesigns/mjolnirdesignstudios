"use client";
import React from 'react';
import Navbar from '@/components/ui/Navbar';
import { FloatingNav } from '@/components/ui/FloatingNav';
import Footer from '@/components/Footer';
import { navItems } from '@/data';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-shadow text-silver-100 overflow-hidden">
      <div>
        <FloatingNav navItems={navItems} />
        <Navbar />
        <main className="flex-1 flex flex-col justify-center items-center mx-auto px-4 sm:px-2 relative z-10">
          <div className="max-w-4xl pt-24 md:pt-28">
            <h1 className="text-4xl font-bold text-center mb-12">
              Cookie Policy
            </h1>
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <p className="text-lg text-gray-300 text-center">
                Coming soon: Information about our use of cookies.
              </p>
            </div>
          </div>
          <Footer className="mt-auto" />
        </main>
      </div>
    </div>
  );
};

export default CookiePolicy;