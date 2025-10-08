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
        'Custom Website',
        '3-5 Revisions',
        'Priority Email Support',
        'Advanced Customization',
        'Same Day Development',
        'Tampa Workshop Option',
      ],
      buttonText: 'Upgrade',
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
  const [formData, setFormData] = useState({ name: '', email: '', workshop: false, slot: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNearTampa, setIsNearTampa] = useState(false);
  const [geoChecked, setGeoChecked] = useState(false);
  const [btcPrice, setBtcPrice] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowBTC((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Fetch real-time Bitcoin price from CoinGecko API
  useEffect(() => {
    const fetchBtcPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', {
          headers: {
            'x-cg-api-key': 'CG-1wyd7WAwt5nLjxUd3qhyrzQt', // Replace with your CoinGecko API key
          },
        });
        const data = await response.json();
        setBtcPrice(data.bitcoin.usd);
      } catch (error) {
        console.error('Error fetching BTC price:', error);
        setBtcPrice(null); // Fallback to null if API fails
      }
    };

    fetchBtcPrice();
    const interval = setInterval(fetchBtcPrice, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const calculateBtcAmount = (usdPrice: number, btcPrice: number | null) => {
    if (!btcPrice) return 'Loading...';
    return (usdPrice / btcPrice).toFixed(6); // 6 decimal places for BTC precision
  };

  useEffect(() => {
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const deg2rad = (deg: number) => {
        return deg * (Math.PI / 180);
      };
      const R = 3958.8; // Radius of Earth in miles
      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    if (isBookingOpen) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;
            const tampaLat = 27.9478;
            const tampaLon = -82.4586;
            const distance = calculateDistance(tampaLat, tampaLon, userLat, userLon);
            setIsNearTampa(distance <= 30);
            setGeoChecked(true);
          },
          () => {
            setGeoChecked(true); // Proceed without workshop option if denied
          }
        );
      } else {
        setGeoChecked(true); // Proceed if geolocation not supported
      }
    }
  }, [isBookingOpen]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/book-workshop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Booking request sent! Check your email for confirmation.');
        setIsBookingOpen(false);
        setFormData({ name: '', email: '', workshop: false, slot: '' });
      } else {
        alert('Error submitting booking. Please try again.');
      }
    } catch {
      alert('Error submitting booking. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-shadow rounded-lg p-8 max-w-md w-full mx-4"
          >
            <h3 className="text-2xl font-bold text-silver-100 mb-4 text-center">
              Upgrade to Base+ (Asgardian)
            </h3>
            <p className="text-gray-300 text-center mb-6">
              Enter your details to proceed. If you&apos;re near Tampa, FL, you&apos;ll have the option for a hands-on Mjolnir Workshop.
            </p>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-silver-100 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 rounded-md bg-gray-800 text-white border border-white/10"
                  required
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-silver-100 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 rounded-md bg-gray-800 text-white border border-white/10"
                  required
                  placeholder="Enter your email"
                />
              </div>
              {geoChecked && isNearTampa && (
                <div>
                  <label className="flex items-center text-silver-100">
                    <input
                      type="checkbox"
                      checked={formData.workshop}
                      onChange={(e) => setFormData({ ...formData, workshop: e.target.checked })}
                      className="mr-2"
                    />
                    Add Mjolnir Workshop (Tampa, FL only)
                  </label>
                  {formData.workshop && (
                    <select
                      value={formData.slot}
                      onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                      className="w-full p-2 rounded-md bg-gray-800 text-white border border-white/10 mt-2"
                      required
                      aria-label="Choose a workshop time"
                    >
                      <option value="">Choose a time</option>
                      <option value="Wednesday 9:30am–11:30am EST">Wednesday 9:30am–11:30am EST</option>
                      <option value="Wednesday 1:30pm–3:00pm EST">Wednesday 1:30pm–3:00pm EST</option>
                      <option value="Friday 9:30am–11:30am EST">Friday 9:30am–11:30am EST</option>
                      <option value="Friday 1:30pm–3:00pm EST">Friday 1:30pm–3:00pm EST (Live Web-Based)</option>
                    </select>
                  )}
                </div>
              )}
              {!geoChecked && (
                <p className="text-gray-300 text-center">Checking your location...</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting || !geoChecked}
                className={cn(
                  'w-full py-3 rounded-xl font-bold text-lg text-white bg-emerald-500 hover:bg-emerald-600 transition duration-300',
                  (isSubmitting || !geoChecked) && 'opacity-50 cursor-not-allowed',
                )}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Information'}
              </button>
            </form>
            <button
              onClick={() => setIsBookingOpen(false)}
              className="w-full mt-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
            >
              Close
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
  );
};

export default Pricing;