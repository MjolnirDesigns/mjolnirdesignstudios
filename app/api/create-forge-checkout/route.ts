// app/api/create-forge-checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil', // Use the expected version
});

export async function POST(req: Request) {
  const { name, email } = await req.json();

  // Guard clause – just in case
  if (!name || !email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid name and email required' }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: process.env.STRIPE_FORGE_PRICE_ID!,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/forge?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/#pricing`,
    customer_email: email,
    metadata: {
      product: 'Mjolnir Forge Seminar',
      attendee_name: name,     // Now used
      attendee_email: email,   // Now used
    },
    customer_creation: 'always',
    billing_address_collection: 'required',
    // Optional: prevent duplicate purchases
    // payment_intent_data: { metadata: { email } },
  });

  return NextResponse.json({ url: session.url });
}