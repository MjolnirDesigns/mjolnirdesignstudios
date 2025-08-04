"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const pricingTiers = [
  {
    title: 'Midgard',
    subtitle: 'Base',
    price: 99,
    description: 'Unlock offers base plan for personal use',
    features: [
      'Basic UI/UX Design',
      '1 Revision',
      'Email Support',
      'Entry-level customization',
      'Standard delivery time',
    ],
    buttonText: 'Get Started',
    color: 'orange',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(249,115,22,0.6)]',
    isPopular: false,
  },
  {
    title: 'Asgard',
    subtitle: 'Premium',
    price: 299,
    description: 'For most businesses who want next level design',
    features: [
      'Full Web Development',
      '3 Revisions',
      'Priority Support',
      'Advanced customization',
      'Faster delivery',
      'Dedicated project manager',
    ],
    buttonText: 'Upgrade',
    color: 'silver',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(192,192,192,0.6)]',
    isPopular: true,
  },
  {
    title: 'Valhalla',
    subtitle: 'Elite',
    price: 999,
    description: 'Unlock the most powerful calendar in the galaxy',
    features: [
      'Custom Projects',
      'Unlimited Revisions',
      'Dedicated Team',
      'All Payment Methods',
      'Premium customization',
      'Expedited delivery',
      '24/7 support',
    ],
    buttonText: 'Contact Us',
    color: 'gold',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(255,215,0,0.6)]',
    isPopular: false,
  },
];

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-20 bg-shadow text-silver">
      <style>{`
        @keyframes electric-pulse {
          0% {
            box-shadow: 0 0 5px rgba(0, 191, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 15px rgba(0, 191, 255, 0.6);
          }
          100% {
            box-shadow: 0 0 5px rgba(0, 191, 255, 0.3);
          }
        }
        .electric-border {
          animation: electric-pulse 2s ease-in-out infinite;
        }
        .hover-glow-premium {
          transition: box-shadow 0.3s ease-in-out;
        }
        .hover-glow-premium:hover {
          box-shadow: 0 0 30px rgba(192, 192, 192, 0.8), 0 0 5px rgba(0, 191, 255, 0.6); /* Enhanced hover glow */
        }
      `}</style>
      <h1 className="heading text-silver-100 text-4xl font-bold text-center mb-12">
        Our Services and Pricing: We Accept All Forms of{' '}
        <span className="text-gold">Gold!</span>
      </h1>
      <p className="text-center text-gray-400 mb-8">
        Choose the plan that is right for you!
      </p>
      <div className="flex justify-center mb-12">
        <div className="bg-zinc-800 rounded-full p-1 flex items-center">
          <button
            onClick={() => setIsAnnual(false)}
            className={cn(
              'px-6 py-2 rounded-full transition',
              !isAnnual ? 'bg-gold text-iron' : 'text-gray-400',
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={cn(
              'px-6 py-2 rounded-full transition',
              isAnnual ? 'bg-orange-500 text-white' : 'text-gray-400',
            )}
          >
            Annually
            <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
              SAVE 20%
            </span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {pricingTiers.map((tier, index) => {
          const monthlyPrice = tier.price;
          const displayPrice = isAnnual ? Math.round(monthlyPrice * 0.8) : monthlyPrice;
          const billing = isAnnual ? '/mo billed annually' : '/mo';

          return (
            <div
              key={index}
              className={cn(
                'flex flex-col items-start p-8 rounded-3xl border border-white/10 bg-black/30 backdrop-blur-md relative overflow-hidden transition duration-300',
                tier.hoverGlow,
                index === 1 ? 'z-10 electric-border hover-glow-premium' : '', // Combine pulse and hover glow
                'min-h-[550px]',
              )}
            >
              <p className={`text-2xl font-bold mb-1 text-${tier.color}`}>{tier.subtitle}</p>
              <div className="flex items-baseline mb-2">
                <p className={`text-5xl font-bold text-${tier.color}`}>${displayPrice}</p>
                <p className="text-gray-400 text-sm ml-1">{billing}</p>
              </div>
              <p className="text-gray-400 text-sm mb-8">{tier.description}</p>
              <ul className="flex flex-col space-y-3 mb-auto w-full">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300 text-base">
                    <span className={`flex-shrink-0 text-${tier.color} mr-3 text-xl`}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="#payment" className="w-full mt-auto">
                <button
                  className={cn(
                    'w-full py-3 rounded-xl font-bold text-lg transition duration-300 hover:opacity-90 text-white',
                    tier.subtitle === 'Base'
                      ? 'bg-orange-500'
                      : tier.subtitle === 'Premium'
                      ? 'bg-gray-400'
                      : 'bg-yellow-500',
                  )}
                  onClick={() => {
                    if (tier.subtitle === 'Premium' || tier.subtitle === 'Elite') {
                      alert('Redirect to Stripe checkout');
                    } else {
                      // Basic: Link to form or email
                    }
                  }}
                >
                  {tier.buttonText}
                </button>
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Pricing;