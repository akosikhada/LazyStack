"use client";

import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <div className="bg-[#13091f] rounded-lg p-6 border border-[#2a1a3a] transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#8a3ffc]/20">
      <div className="p-3 rounded-full bg-[#2a1a3a] text-[#8a3ffc] inline-block mb-4">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

interface WhyChooseUsSectionProps {
  features: FeatureCardProps[];
}

export default function WhyChooseUsSection({
  features,
}: WhyChooseUsSectionProps) {
  return (
    <section className="bg-[#0a0412] py-16 px-4 md:px-8 lg:px-16 relative">
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#0f0617] to-transparent"></div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose Our Platform
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We provide the most comprehensive collection of developer tools with
            features designed to enhance your workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
