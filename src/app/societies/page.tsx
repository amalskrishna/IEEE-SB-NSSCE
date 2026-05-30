"use client";

import { motion, Variants } from "framer-motion";
import { societies } from "@/data/societies";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SocietiesPage() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50/50">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-[800px] h-[800px] bg-ieee-blue/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-6"
          >
            Our <span className="text-gradient">Societies</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Explore our 13 specialized student chapters driving innovation and excellence across diverse technological domains.
          </motion.p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {societies.map((society) => (
            <motion.div key={society.id} variants={item} className="h-full">
              <Link href={`/societies/${society.slug}`} className="block h-full">
                <motion.div 
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative h-full p-8 rounded-3xl glass border border-pale-silver/40 hover:border-accent-cyan/30 transition-all duration-300 overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:shadow-ieee-blue/10"
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-ieee-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {society.logo ? (
                      <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-md border-2 border-slate-100 overflow-hidden p-2">
                        <img 
                          src={society.logo} 
                          alt={society.shortName} 
                          className="w-full h-full object-contain pointer-events-none"
                          style={{ transform: society.logoRotation }}
                        />
                      </div>
                    ) : (
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-heading font-bold text-xl mb-6 ${society.accentColor} shadow-md`}>
                        {society.shortName}
                      </div>
                    )}
                    
                    <h3 className="font-heading font-bold text-2xl leading-tight mb-4 group-hover:text-ieee-blue transition-colors">
                      {society.name}
                    </h3>
                    
                    <p className="text-muted-foreground mb-8 flex-grow">
                      {society.description}
                    </p>
                    
                    <div className="flex items-center font-bold text-ieee-blue mt-auto border-t border-pale-silver/50 pt-4">
                      Explore Chapter 
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
