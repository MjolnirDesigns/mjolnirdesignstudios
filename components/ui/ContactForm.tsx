// components/ContactForm.tsx
import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    // 1. Send email via Resend
    await fetch("/api/resend", {
      method: "POST",
      body: JSON.stringify({
        from: "contact@mjolnirdesignstudios.com",
        to: "you@yourdomain.com",
        subject: `New Lead: ${data.name}`,
        html: `<p><strong>${data.name}</strong> from ${data.company}</p><p>${data.message}</p><p>Email: ${data.email}</p>`,
      }),
    });

    // 2. Save to Supabase
    await fetch("/api/supabase", {
      method: "POST",
      body: JSON.stringify(data),
    });

    alert("Message sent! I'll be in touch within 24 hours.");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input name="name" placeholder="Name" required className="w-full p-4 rounded-lg" />
      <input name="company" placeholder="Company" className="w-full p-4 rounded-lg" />
      <input
        name="email"
        type="email"
        required
        className="w-full p-4 rounded-lg"
        placeholder="Email"
        title="Please enter your email address"
      />
      <textarea name="message" rows={6} placeholder="Tell me about your project..." required className="w-full p-4 rounded-lg" />
      <button type="submit" disabled={loading} className="w-full py-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xl rounded-2xl hover:scale-105 transition">
        {loading ? "Sending..." : "Send Message →"}
      </button>
    </form>
  );
}