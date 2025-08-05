"use client";

import React, { useState } from 'react';
import ShimmerButton from '@/components/ui/ShimmerButton'; // Assume this is your ShimmerButton component

type FormData = {
  name: string;
  email: string;
  services: string[];
  message: string;
};

const SummonUs = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    services: [],
    message: '',
  });

  const servicesOptions = [
    'Animations',
    'Components',
    'Icons/Logos',
    'Images',
    'Videos',
    'Website',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const services = checked
        ? [...prev.services, value]
        : prev.services.filter((service) => service !== value);
      return { ...prev, services };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, services, message } = formData;
    const subject = encodeURIComponent('Service Request from Mjolnir Design Studios');
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nServices: ${services.join(', ')}\nMessage: ${message}`
    );
    window.location.href = `mailto:contact@mjolnirdesignstudios.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="summon" className="py-20 bg-shadow text-silver">
      <h1 className="heading text-silver-100 text-4xl font-bold text-center mb-12">
        Summon Mjolnir Design Studios
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto space-y-6 px-4 sm:px-6 md:px-8 lg:px-0">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-300 mb-2 text-left sm:text-center md:text-left">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-6 py-3 rounded-lg bg-black/30 border border-white/10 text-xl text-white focus:outline-none focus:border-gold mx-auto"
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-300 mb-2 text-left sm:text-center md:text-left">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-6 py-3 rounded-lg bg-black/30 border border-white/10 text-xl text-white focus:outline-none focus:border-gold mx-auto"
          />
        </div>

        {/* Services Checkboxes */}
        <div>
          <label className="block text-lg font-medium text-gray-300 mb-2 text-left sm:text-center md:text-left">
            Services Requested
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-start sm:place-items-center md:place-items-start mx-auto">
            {servicesOptions.map((service) => (
              <div key={service} className="flex items-center">
                <input
                  type="checkbox"
                  id={service}
                  value={service}
                  checked={formData.services.includes(service)}
                  onChange={handleCheckboxChange}
                  className="mr-3 h-5 w-5 accent-gold"
                />
                <label htmlFor={service} className="text-lg text-gray-300">
                  {service}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Message Textarea */}
        <div>
          <label htmlFor="message" className="block text-lg font-medium text-gray-300 mb-2 text-left sm:text-center md:text-left">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={5}
            required
            className="w-full px-6 py-3 rounded-lg bg-black/30 border border-white/10 text-xl text-white focus:outline-none focus:border-gold mx-auto"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <ShimmerButton
            title="Send Request"
            otherClasses="w-64"
          />
        </div>
      </form>
    </section>
  );
};

export default SummonUs;