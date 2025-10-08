"use client";
import React from 'react';
import Navbar from '@/components/ui/Navbar';
import { FloatingNav } from '@/components/ui/FloatingNav';
import Footer from '@/components/Footer';
import { navItems } from '@/data';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-shadow text-silver-100 overflow-hidden">
      <div>
        <FloatingNav navItems={navItems} />
        <Navbar />
        <main className="flex-1 flex flex-col justify-center items-center mx-auto px-4 sm:px-2 relative z-10">
          <div className="max-w-4xl pt-24 md:pt-28">
            <h1 className="text-4xl font-bold text-center mb-12">
              Contact Mjolnir Design Studios
            </h1>
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <p className="text-lg text-gray-300 mb-6 md:mb-8 text-center">
                Realm of Asgard: 1 Golden Spires Court, Asgard<br />
                Realm of Midgard: 400 N Ashley Dr Ste 1900, Tampa, FL 33602
              </p>
              <p className="text-lg text-gray-300 mb-6 md:mb-8 text-center">
                Email: contact@mjolnirdesignstudios.com
              </p>
              <p className="text-lg text-gray-300 mb-8 text-center">
                Phone: (555) 123-4567 (Building Line)
              </p>
              <div className="w-full max-w-5xl h-64 md:h-96 mb-8 mx-auto">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3520.314665167964!2d-82.46373768476943!3d27.946807182670925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2c2b8b5e2e8f9%3A0x9c7d8f3e8f8f8f8f!2s400%20N%20Ashley%20Dr%20Ste%201900%2C%20Tampa%2C%20FL%2033602!5e0!3m2!1sen!2sus!4v1691350400!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  referrerPolicy="no-referrer-when-downgrade"
                  className="mx-auto"
                  title="Mjolnir Design Studios Tampa Location Map"
                ></iframe>
              </div>
            </div>
          </div>
          <Footer className="mt-auto" />
        </main>
      </div>
    </div>
  );
};

export default Contact;