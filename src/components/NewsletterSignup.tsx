"use client";

import { Button } from "./ui/button";

export default function NewsletterSignup() {
  return (
    <section className="bg-[#0a0412] py-16 px-4 md:px-8 lg:px-16 text-center relative">
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#13091f] to-transparent"></div>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Stay Updated
        </h2>
        <p className="text-gray-400 mb-8">
          Get the latest updates about new tools and features
        </p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow px-4 py-2 rounded-md bg-[#13091f] border border-[#2a1a3a] text-white focus:outline-none focus:ring-2 focus:ring-[#8a3ffc]"
          />
          <Button className="bg-[#8a3ffc] hover:bg-[#7b2cf9] text-white px-6 py-2 h-auto rounded-md">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}
