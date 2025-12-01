// app/forge-success/page.tsx
import { InlineWidget } from 'react-calendly';

export default function ForgeSuccess({
  searchParams,
}: {
  searchParams: { name?: string; email?: string };
}) {
  const name = searchParams.name || '';
  const email = searchParams.email || '';

  return (
    <div className="min-h-screen bg-shadow text-silver flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-xl mb-4 text-center max-w-2xl">
        Welcome to the <span className="text-gold">Mjolnir Forge</span>.
      </p>
      <div className="mb-8 text-center">
        <p className="text-lg mb-4">Download your Welcome Kit to prepare!</p>
        <a
          href="/flyer-mjolnir-forge.pdf"
          download
          className="inline-block px-8 py-4 bg-gold text-black font-bold rounded-lg hover:bg-yellow-400 transition"
        >
          Download Mjolnir Forge Welcome Kit (PDF)
        </a>
      </div>
      <p className="text-xl mb-8 text-center max-w-2xl">
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