"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';


const pricingTiers = {
  individuals: [
    {
      title: 'Base',
      subtitle: 'Midgardian',
      oneTimePrice: 99,
      monthlyPrice: null,
      description: 'Ideal for individuals needing a single custom animation, logo, or small website.',
      features: [
        'Simple Landing Page',
        '2-3 Revisions',
        'Email Support',
        'Basic Customization',
        'Instant Creation',
      ],
      buttonText: 'Get Started',
      color: 'orange',
      isPopular: false,
      hoverGlow: 'hover:shadow-[0_0_20px_rgba(249,115,22,0.6)]',
    },
    {
      title: 'Base+',
      subtitle: 'Asgardian',
      oneTimePrice: 499,
      monthlyPrice: null,
      description: 'Perfect for individuals seeking premium components, icons, logos, or websites. Exclusive Tampa, FL workshops for hands-on web development!',
      features: [
        'Custom App or Website',
        '3-5 Revisions',
        'Priority Email Support',
        'Advanced Customization',
        'Same Day Development',
        'Tampa Workshop Option',
      ],
      buttonText: 'Mjolnir Forge - Book Now!',
      color: 'gold',
      isPopular: true,
      hoverGlow: 'hover:shadow-[0_0_20px_rgba(255,215,0,0.6)]',
    },
  ],
  enterprises: [
    {
      title: 'Pro',
      subtitle: 'Pro',
      oneTimePrice: 999,
      monthlyPrice: 99,
      description: 'Perfect for small businesses needing a professional landing page or website.',
      features: [
        'Basic UI/UX Design',
        '1–2 Revisions',
        'Email Support',
        'Standard Customization',
        '7–14 Day Delivery',
      ],
      buttonText: 'Get Started',
      color: 'orange',
      isPopular: false,
      hoverGlow: 'hover:shadow-[0_0_20px_rgba(249,115,22,0.6)]',
    },
    {
      title: 'Elite',
      subtitle: 'Elite',
      oneTimePrice: 2499,
      monthlyPrice: 249,
      description: 'For businesses seeking a robust digital presence.',
      features: [
        'Full Web Development',
        '3–5 Revisions',
        'Priority Support',
        'Advanced Customization',
        'SEO Optimization',
        '5–10 Day Delivery',
      ],
      buttonText: 'Upgrade Now',
      color: 'silver',
      isPopular: true,
      hoverGlow: 'hover:shadow-[0_0_20px_rgba(192,192,192,0.6)]',
    },
    {
      title: 'Custom',
      subtitle: 'Custom',
      oneTimePrice: 9999,
      monthlyPrice: null,
      description: 'Powerful web dev for high-growth enterprises.',
      features: [
        'Custom Build, Databases, Projects, and More',
        'Unlimited Revisions',
        'Dedicated Dev Team',
        'Full Digital Marketing',
        'Premium Customization',
        '3–7 Day Delivery',
        '24/7 Support',
      ],
      buttonText: 'Contact Us',
      color: 'gold',
      isPopular: false,
      hoverGlow: 'hover:shadow-[0_0_20px_rgba(255,215,0,0.6)]',
    },
  ],
};

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [showBTC, setShowBTC] = useState(false);
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  

  // BTC price toggle
  useEffect(() => {
    const interval = setInterval(() => setShowBTC(prev => !prev), 3000);
    return () => clearInterval(interval);
  }, []);

  // Fetch BTC price
  useEffect(() => {
    const fetchBtcPrice = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await res.json();
        setBtcPrice(data.bitcoin.usd);
      } catch (err) {
        console.error(err);
        setBtcPrice(null);
      }
    };
    fetchBtcPrice();
    const id = setInterval(fetchBtcPrice, 60000);
    return () => clearInterval(id);
  }, []);

  const calculateBtcAmount = (usd: number, btc: number | null) =>
    btc ? (usd / btc).toFixed(6) : 'Loading...';

  const handleForgeBooking = async () => {
    const name = prompt("Your full name:");
    const email = prompt("Your email address:")?.trim();

    if (!name || !email || !email.includes('@')) {
      alert("Please enter a valid name and email.");
      return;
    }

    try {
      const res = await fetch('/api/create-forge-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) throw new Error('Checkout failed');

      const { url } = await res.json();
      window.location.href = url; // Redirect to Stripe Checkout
    } catch (err) {
      alert("Something went wrong. Try again or contact support.");
      console.error(err);
    }
  };

  return (
    <section id="pricing" className="py-20 bg-shadow text-silver">
      <h1 className="heading text-silver-100 text-4xl font-bold text-center mb-12">
        Our Services and Pricing: We Accept All Forms of{' '}
        <span className="text-gold">Gold!</span>
      </h1>
      <p className="text-center text-gray-400 mb-8">
        Choose the plan that powers your vision, whether individual or enterprise!
      </p>

      {/* Individuals Section */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-semibold text-center text-silver-100 mb-8">
          For Individuals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pricingTiers.individuals.map((tier, index) => (
            <div
              key={index}
              className={cn(
                'flex flex-col items-start p-8 rounded-3xl border border-white/10 bg-black/30 backdrop-blur-md relative overflow-hidden transition duration-300',
                tier.hoverGlow,
                'min-h-[580px]',
              )}
            >
              <p className={`text-2xl font-bold mb-1 text-${tier.color}`}>{tier.title}</p>
              <p className="text-lg text-gray-400 mb-2">{tier.subtitle}</p>
              <div className="flex items-baseline mb-2">
                <p className={`text-5xl font-bold text-${tier.color}`}>
                  ${tier.oneTimePrice}
                </p>
              </div>
              <p className="text-gray-400 text-sm mb-8">{tier.description}</p>
              <ul className="flex flex-col space-y-3 mb-6 w-full">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300 text-base">
                    <span className={`flex-shrink-0 text-${tier.color} mr-3 text-xl`}>Checkmark</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="w-full mt-auto">
                {tier.title === 'Base+' ? (
                  <button
                    onClick={handleForgeBooking}
                    className="w-full py-4 rounded-xl font-bold text-lg transition duration-300 text-black bg-yellow-500 hover:bg-yellow-400 shadow-lg shadow-yellow-500/30"
                  >
                    {tier.buttonText}
                  </button>
                ) : (
                  <Link href="/checkout" className="w-full">
                    <button
                      className={cn(
                        'w-full py-4 rounded-xl font-bold text-lg transition text-white',
                        tier.title === 'Base'
                          ? 'bg-orange-500 hover:bg-orange-400'
                          : 'bg-yellow-500 hover:bg-yellow-400'
                      )}
                    >
                      {tier.buttonText}
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enterprises Section */}
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-silver-100 mb-8">
          For Enterprises
        </h2>
        <div className="flex justify-center mb-12">
          <div className="bg-zinc-800 rounded-full p-1 flex items-center">
            <button
              onClick={() => setIsAnnual(false)}
              className={cn(
                'px-6 py-2 rounded-full transition',
                !isAnnual ? 'bg-emerald-500 text-white' : 'text-gray-400'
              )}
            >
              One-Time
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={cn(
                'px-6 py-2 rounded-full transition',
                isAnnual ? 'bg-emerald-600 text-gray-100' : 'text-gray-400'
              )}
            >
              Monthly
              <span className="ml-2 text-xs bg-gold/20 text-gold px-2 py-1 rounded-full">
                Flexible
              </span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingTiers.enterprises.map((tier, index) => {
            const displayPrice = isAnnual
              ? tier.monthlyPrice !== null ? tier.monthlyPrice : 'Custom'
              : tier.oneTimePrice;
            const billing = isAnnual && tier.monthlyPrice !== null ? '/mo' : '';
            const isCustomOneTime = tier.subtitle === 'Custom' && !isAnnual;

            return (
              <div
                key={index}
                className={cn(
                  'flex flex-col items-start p-8 rounded-3xl border border-white/10 bg-black/30 backdrop-blur-md relative overflow-hidden transition duration-300',
                  tier.hoverGlow,
                  'min-h-[580px]'
                )}
              >
                <p className={`text-2xl font-bold mb-1 text-${tier.color}`}>{tier.subtitle}</p>
                <div className="flex items-baseline mb-2">
                  {isCustomOneTime ? (
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={showBTC ? 'btc' : 'usd'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`text-5xl font-bold text-${tier.color}`}
                      >
                        {showBTC ? `${calculateBtcAmount(9999, btcPrice)} BTC` : `$${tier.oneTimePrice}`}
                      </motion.p>
                    </AnimatePresence>
                  ) : (
                    <p className={`text-5xl font-bold text-${tier.color}`}>
                      {typeof displayPrice === 'number' ? `$${displayPrice}` : displayPrice}
                    </p>
                  )}
                  {billing && <p className="text-gray-400 text-sm ml-1">{billing}</p>}
                </div>
                <p className="text-gray-400 text-sm mb-8">{tier.description}</p>
                <ul className="flex flex-col space-y-3 mb-6 w-full">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300 text-base">
                      <span className={`flex-shrink-0 text-${tier.color} mr-3 text-xl`}>Checkmark</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/checkout" className="w-full mt-auto">
                  <button
                    className={cn(
                      'w-full py-4 rounded-xl font-bold text-lg transition text-white',
                      tier.subtitle === 'Pro'
                        ? 'bg-orange-500 hover:bg-orange-400'
                        : tier.subtitle === 'Elite'
                        ? 'bg-gray-400 hover:bg-gray-300'
                        : 'bg-yellow-500 hover:bg-yellow-400'
                    )}
                  >
                    {tier.buttonText}
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


export default Pricing;