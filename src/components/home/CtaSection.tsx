"use client";

import { motion } from "framer-motion";
import { UserPlus, HeartHandshake, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";

const ctaCards = [
  {
    title: "Join IEEE",
    description: "Become a member of the world's largest technical professional organization.",
    icon: UserPlus,
    link: "https://www.ieee.org/membership/join/index.html",
    external: true,
  },
  {
    title: "Become a Volunteer",
    description: "Contribute to organizing events and shaping the future of our student branch.",
    icon: HeartHandshake,
    link: "/team#volunteer",
    external: false,
  },
  {
    title: "Explore Events",
    description: "Participate in workshops, hackathons, and technical talks to level up.",
    icon: Compass,
    link: "/events",
    external: false,
  }
];

export default function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-white" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-black mb-8 text-slate-900 leading-tight"
          >
            Ready to <span className="relative inline-block"><span className="relative z-10 text-white px-2">Get Involved?</span><span className="absolute -bottom-1 left-0 w-full h-full bg-accent-cyan -z-0 rotate-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" /></span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-800 font-medium"
          >
            Take the next step in your professional journey. Join our community of innovators and leaders today.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ctaCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
              >
                <Link
                  href={card.link}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  className="group block h-full"
                >
                  <div className="h-full p-8 rounded-xl bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="w-16 h-16 rounded-xl bg-[#FFD700] text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform duration-300">
                      <Icon size={32} className="stroke-[2.5px]" />
                    </div>

                    <h3 className="font-heading font-black text-2xl mb-4 text-slate-900">
                      {card.title}
                    </h3>

                    <p className="text-slate-700 font-medium mb-8 flex-grow">
                      {card.description}
                    </p>

                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-black bg-ieee-blue text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform duration-300">
                      <ArrowRight size={20} className="stroke-[3px]" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
