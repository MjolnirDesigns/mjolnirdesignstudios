"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';

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
        'Custom Website',
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
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [isCalendlyReady, setIsCalendlyReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowBTC((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchBtcPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', {
          headers: {
            'x-cg-api-key': 'CG-1wyd7WAwt5nLjxUd3qhyrzQt',
          },
        });
        const data = await response.json();
        setBtcPrice(data.bitcoin.usd);
      } catch (error) {
        console.error('Error fetching BTC price:', error);
        setBtcPrice(null);
      }
    };

    fetchBtcPrice();
    const interval = setInterval(fetchBtcPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkCalendly = () => {
      if (window.Calendly) {
        console.log('Calendly loaded successfully!');
        setIsCalendlyReady(true);
      } else {
        console.log('Calendly not loaded yet, checking again...');
      }
    };
    checkCalendly();
    const interval = setInterval(checkCalendly, 200);
    const timeout = setTimeout(() => {
      if (!isCalendlyReady) console.error('Calendly failed to load after 10s');
      clearInterval(interval);
    }, 10000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []); // Empty dependency array

  const calculateBtcAmount = (usdPrice: number, btcPrice: number | null) => {
    if (!btcPrice) return 'Loading...';
    return (usdPrice / btcPrice).toFixed(6);
  };

  return (
    <>
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
      <section id="pricing" className="py-20 bg-shadow text-silver">
        <style>{`
          @keyframes electric-pulse {
            0% { box-shadow: 0 0 5px rgba(0, 191, 255, 0.3); }
            50% { box-shadow: 0 0 15px rgba(0, 191, 255, 0.6); }
            100% { box-shadow: 0 0 5px rgba(0, 191, 255, 0.3); }
          }
          .electric-border { animation: electric-pulse 2s ease-in-out infinite; }
        `}</style>
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
                      <span className={`flex-shrink-0 text-${tier.color} mr-3 text-xl`}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="w-full mt-auto">
                  {tier.title === 'Base+' ? (
                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className={cn(
                        'w-full py-3 rounded-xl font-bold text-lg transition duration-300 text-white bg-yellow-500 hover:bg-yellow-400',
                      )}
                    >
                      {tier.buttonText}
                    </button>
                  ) : (
                    <Link href="/checkout" className="w-full">
                      <button
                        className={cn(
                          'w-full py-3 rounded-xl font-bold text-lg transition duration-300 text-white',
                          tier.title === 'Base'
                            ? 'bg-orange-500 hover:bg-orange-400'
                            : 'bg-yellow-500 hover:bg-yellow-400',
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

        {/* Booking Modal */}
        {isBookingOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 overflow-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-shadow rounded-lg p-8 max-w-md w-full mx-4 relative"
            >
              <button
                onClick={() => setIsBookingOpen(false)}
                className="absolute top-2 right-2 text-silver-100 text-2xl font-bold leading-none hover:text-gray-300 transition-colors"
                aria-label="Close"
              >
                ×
              </button>
              <h3 className="text-2xl font-bold text-silver-100 mb-4 text-center">
                Mjolnir Forge (Asgardian)
              </h3>
              <p className="text-gray-300 text-center mb-6">
                Book your Mjolnir Forge Workshop. Select a date/time and complete payment to secure your spot!
              </p>
              <button
                onClick={() => {
                  if (isCalendlyReady) {
                    window.Calendly.initPopupWidget({
                      url: "https://calendly.com/mjolnirdesignstudios/mjolnir-forge",
                      prefill: { email: "contact@mjolnirdesignstudios.com" },
                    });
                  } else {
                    console.error('Calendly not loaded yet. Please try again or refresh the page.');
                  }
                }}
                disabled={!isCalendlyReady}
                className={cn(
                  'w-full mt-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors',
                  !isCalendlyReady && 'opacity-50 cursor-not-allowed'
                )}
              >
                Book Now
              </button>
            </motion.div>
          </div>
        )}

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
                  !isAnnual ? 'bg-emerald-500 text-white' : 'text-gray-400',
                )}
              >
                One-Time
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={cn(
                  'px-6 py-2 rounded-full transition',
                  isAnnual ? 'bg-emerald-600 text-iron' : 'text-gray-400',
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
              let displayPrice;
              if (isAnnual) {
                displayPrice = tier.monthlyPrice !== null ? tier.monthlyPrice : 'Custom';
              } else {
                displayPrice = tier.oneTimePrice;
              }
              const billing = isAnnual && tier.monthlyPrice !== null ? '/mo' : '';
              const isCustomOneTime = tier.subtitle === 'Custom' && !isAnnual;

              return (
                <div
                  key={index}
                  className={cn(
                    'flex flex-col items-start p-8 rounded-3xl border border-white/10 bg-black/30 backdrop-blur-md relative overflow-hidden transition duration-300',
                    tier.hoverGlow,
                    'min-h-[580px]',
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
                        <span className={`flex-shrink-0 text-${tier.color} mr-3 text-xl`}>✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/checkout" className="w-full mt-auto">
                    <button
                      className={cn(
                        'w-full py-3 rounded-xl font-bold text-lg transition duration-300 text-white',
                        tier.subtitle === 'Pro'
                          ? 'bg-orange-500 hover:bg-orange-400'
                          : tier.subtitle === 'Elite'
                          ? 'bg-gray-400 hover:bg-gray-300'
                          : 'bg-yellow-500 hover:bg-yellow-400',
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
    </>
  );
};

export default Pricing;