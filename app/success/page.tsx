export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-shadow flex items-center justify-center py-20">
      <div className="text-center text-silver">
        <h1 className="text-4xl font-bold text-gold mb-4">Payment Successful!</h1>
        <p className="text-lg">Thank you for choosing Mjolnir Design Studios. We’ll contact you soon to start your project!</p>
        <a href="/" className="mt-6 inline-block py-3 px-6 bg-gold text-iron rounded-xl font-bold">
          Back to Home
        </a>
      </div>
    </div>
  );
}