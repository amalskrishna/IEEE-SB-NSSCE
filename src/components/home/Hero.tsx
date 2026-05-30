"use client";

import { motion, Variants, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Calendar, Cpu, Code, Settings, Sparkles } from "lucide-react";
import Link from "next/link";
import { MouseEvent as ReactMouseEvent } from "react";

export default function Hero() {
  const headingText = "IEEE Student Branch\nNSSCE";
  const letters = Array.from(headingText);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.2 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
    },
  };

  // Background Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Background Orbs movement (Subtle parallax)
  const bgOrbX1 = useTransform(smoothX, [-500, 500], [20, -20]);
  const bgOrbY1 = useTransform(smoothY, [-500, 500], [20, -20]);
  const bgOrbX2 = useTransform(smoothX, [-500, 500], [-30, 30]);
  const bgOrbY2 = useTransform(smoothY, [-500, 500], [-30, 30]);

  // Floating shapes movement (Exaggerated parallax)
  const floatX1 = useTransform(smoothX, [-500, 500], [70, -70]);
  const floatY1 = useTransform(smoothY, [-500, 500], [70, -70]);
  const floatX2 = useTransform(smoothX, [-500, 500], [-90, 90]);
  const floatY2 = useTransform(smoothY, [-500, 500], [-90, 90]);
  const floatX3 = useTransform(smoothX, [-500, 500], [40, -40]);
  const floatY3 = useTransform(smoothY, [-500, 500], [-40, 40]);

  const handleMouseMove = (e: ReactMouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background with Animated Gradient Lighting */}
      <div className="absolute inset-0 z-0 bg-white pointer-events-none">
        {/* Parallax Orbs */}
        <motion.div style={{ x: bgOrbX1, y: bgOrbY1 }} className="absolute inset-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-ieee-blue/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        </motion.div>

        <motion.div style={{ x: bgOrbX2, y: bgOrbY2 }} className="absolute inset-0">
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-cyan/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        </motion.div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 z-10 text-center flex flex-col items-center">
        {/* Minimal Transparent Outline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div className="relative px-6 py-2 rounded-full border border-slate-200 bg-white/50 backdrop-blur-md hover:bg-white/80 hover:shadow-lg hover:border-ieee-blue/30 transition-all duration-300 inline-flex items-center gap-3 group cursor-default shadow-sm">
            {/* Static dot */}
            <div className="relative flex h-3 w-3 items-center justify-center">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-ieee-blue group-hover:scale-150 transition-transform"></span>
            </div>
            <span className="font-bold tracking-wide text-sm bg-gradient-to-r from-ieee-blue to-accent-cyan bg-clip-text text-transparent">
              Innovating Since 2001
            </span>
            <ArrowRight size={14} className="text-accent-cyan opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
          </div>
        </motion.div>

        {/* Main Heading with staggered characters */}
        <motion.h1
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-6"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {letters.map((letter, index) => {
            if (letter === '\n') return <br key={index} />;
            return (
              <motion.span
                key={index}
                variants={child}
                className={letter === " " ? "inline-block w-[0.3em]" : "inline-block text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/70"}
              >
                {letter}
              </motion.span>
            );
          })}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Empowering the next generation of engineers, technologists, and leaders through innovation, community, and global networking.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/societies"
            className="group relative px-8 py-4 bg-ieee-blue text-white rounded-full font-medium shadow-lg shadow-ieee-blue/25 hover:shadow-ieee-blue/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            Explore Societies
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/events"
            className="px-8 py-4 glass text-foreground rounded-full font-medium hover:bg-white/80 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 border border-pale-silver/50 shadow-sm"
          >
            <Calendar size={18} className="text-ieee-blue" />
            Upcoming Events
          </Link>
        </motion.div>
      </div>

      {/* Floating Engineering Elements (Background) Parallax tracking */}
      <motion.div
        style={{ x: floatX1, y: floatY1 }}
        className="absolute left-[5%] md:left-[10%] top-[20%] text-ieee-blue/20 -z-10"
      >
        <motion.div
          animate={{ rotate: [0, 15, 0], y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cpu size={100} strokeWidth={1} className="w-16 h-16 md:w-[100px] md:h-[100px]" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ x: floatX2, y: floatY2 }}
        className="absolute right-[5%] md:right-[12%] bottom-[25%] text-accent-cyan/20 -z-10"
      >
        <motion.div
          animate={{ rotate: [0, -15, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Code size={120} strokeWidth={1} className="w-20 h-20 md:w-[120px] md:h-[120px]" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ x: floatX3, y: floatY3 }}
        className="absolute left-[10%] md:left-[18%] bottom-[15%] text-slate-400/20 -z-10"
      >
        <motion.div
          animate={{ rotate: [0, 30, 0], y: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Settings size={80} strokeWidth={1.5} className="w-12 h-12 md:w-[80px] md:h-[80px]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
