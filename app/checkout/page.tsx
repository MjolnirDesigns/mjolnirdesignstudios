"use client";

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 1500 * 100 }), // Example: $1,500 in cents
    });
    const { clientSecret } = await response.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement)! },
    });

    if (result.error) {
      setError(result.error.message || 'Payment failed');
      setLoading(false);
    } else {
      setLoading(false);
      window.location.href = '/success'; // Redirect to success page
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-black/80 rounded-3xl border border-white/10">
      <h2 className="text-2xl font-bold text-gold mb-6">Checkout</h2>
      <CardElement className="p-4 bg-white/10 rounded-xl text-silver" />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-3 mt-6 bg-gold text-iron rounded-xl font-bold text-lg hover:opacity-90 transition"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-shadow flex items-center justify-center py-20">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}