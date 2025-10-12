"use client";

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripePromise) {
      setError('Stripe.js has not loaded yet.');
      setLoading(false);
      return;
    }

    const stripe = await stripePromise;

    try {
      // For static export, use Stripe Checkout with a redirect to a backend for session creation.
      // Replace 'your-backend-session-endpoint' with your serverless function URL (e.g., Supabase Edge Function or Vercel).
      // For now, this is a placeholder; set up a backend to create the checkout session.
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 1500 * 100 }), // Example: $1,500 in cents
      });
      const { id: sessionId } = await response.json();

      if (!stripe) {
        setError('Stripe.js failed to initialize.');
        setLoading(false);
        return;
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        setError(error.message || 'Checkout failed');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-black/80 rounded-3xl border border-white/10">
      <h2 className="text-2xl font-bold text-gold mb-6">Checkout</h2>
      <div className="mb-4">
        <p className="text-silver text-sm mb-2">Total: $1,500.00</p>
        <p className="text-xs text-gray-500">
          Note: For static export, this form redirects to Stripe Checkout. Set up a backend endpoint for session creation.
        </p>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gold text-iron rounded-xl font-bold text-lg hover:opacity-90 transition"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-shadow flex items-center justify-center py-20">
      <CheckoutForm />
    </div>
  );
}