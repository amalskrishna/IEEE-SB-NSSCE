"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Societies", href: "/societies" },
  { name: "Events", href: "/events" },
  { name: "Team", href: "/team" },
  { name: "Achievements", href: "/achievements" },
  { name: "Gallery", href: "/gallery" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isDarkHeader = pathname?.startsWith('/societies/') && pathname !== '/societies';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out",
        scrolled ? "glass py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center z-50 relative">
          <img 
            src="/logo.png" 
            alt="IEEE SB NSSCE Logo" 
            className="h-7 md:h-8 w-auto object-contain drop-shadow-sm transition-transform hover:scale-105" 
          />
        </Link>

        {/* Desktop Nav & Join Button */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors hover:text-ieee-blue",
                    !scrolled && isDarkHeader ? "text-white/90 hover:text-white" : "text-foreground"
                  )}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-accent-cyan/10 rounded-full z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          
          <Link
            href="https://www.ieee.org/membership/join/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-sm font-bold text-white bg-ieee-blue hover:bg-ieee-blue/90 rounded-full shadow-md shadow-ieee-blue/20 transition-all hover:-translate-y-0.5"
          >
            Join IEEE
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={cn("md:hidden z-50 relative p-2", !scrolled && isDarkHeader && !mobileMenuOpen ? "text-white" : "text-foreground")}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} className="text-ieee-blue" /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 left-0 w-full h-screen bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 z-40"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-heading font-semibold hover:text-ieee-blue transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              <Link
                href="https://www.ieee.org/membership/join/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 px-8 py-3 text-xl font-bold text-white bg-ieee-blue rounded-full shadow-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join IEEE
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
