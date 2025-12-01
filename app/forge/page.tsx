// app/forge-success/page.tsx
import { InlineWidget } from 'react-calendly';

export default function ForgeSuccess({
  searchParams,
}: {
  searchParams: { name?: string; email?: string };
}) {
  const name = searchParams.name || '';
  const email = searchParams.email || '';

  // Optional: Add security later (e.g. session token)
  // For tonight: trust Stripe redirect

  return (
    <div className="min-h-screen bg-shadow text-silver flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Welcome to the <span className="text-gold">Mjolnir Forge</span>. 
        Please select your preferred date and time below.
      </p>
      <div className="w-full max-w-4xl">
        <InlineWidget
          url="https://calendly.com/mjolnirdesignstudios/mjolnir-forge"
          prefill={{
            name,
            email,
            customAnswers: {
              a1: "Paid via Stripe – Mjolnir Forge Seminar",
            },
          }}
          styles={{ height: '800px' }}
        />
      </div>
    </div>
  );
}