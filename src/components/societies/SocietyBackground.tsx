"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  Code, Terminal, Cpu, Database, Monitor,
  Zap, Lightbulb, Battery, Plug, Sun,
  Bot, Settings, Wrench,
  Star, Sparkles, Users, Heart, Award,
  Factory, Building, Hammer, Truck,
  Radio, Wifi, Signal, Satellite, Smartphone,
  Gauge, Ruler, Activity, Thermometer, Compass,
  CircuitBoard, Server,
  Power,
  BookOpen, GraduationCap, Library, PenTool,
  RadioTower, Waves,
  Car, Navigation, Map,
  Globe, HandHeart, Leaf
} from "lucide-react";

interface SocietyBackgroundProps {
  societyId: string;
  accentColor: string;
}

const themeMap: Record<string, any[]> = {
  cs: [Code, Terminal, Cpu, Database, Monitor],
  pes: [Zap, Lightbulb, Battery, Plug, Sun],
  ras: [Bot, Settings, Wrench, Cpu, CircuitBoard],
  wie: [Star, Sparkles, Users, Heart, Award],
  ias: [Factory, Building, Hammer, Settings, Truck],
  comsoc: [Radio, Wifi, Signal, Satellite, Smartphone],
  ims: [Gauge, Ruler, Activity, Thermometer, Compass],
  cas: [CircuitBoard, Cpu, Activity, Server, Zap],
  ies: [Cpu, Settings, Wrench, Factory, Zap],
  pels: [Zap, Battery, Power, Activity, Sun],
  edsoc: [BookOpen, GraduationCap, Library, PenTool, Lightbulb],
  mtts: [RadioTower, Waves, Satellite, Signal, Activity],
  vts: [Car, Navigation, Map, Compass, Truck],
  sight: [Globe, Heart, HandHeart, Leaf, Users],
};

export default function SocietyBackground({ societyId, accentColor }: SocietyBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  const icons = themeMap[societyId] || themeMap.cs; // fallback to CS icons if not found

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate an array of 15 floating icon elements
  const elements = Array.from({ length: 15 }).map((_, i) => {
    const Icon = icons[i % icons.length];
    const size = Math.random() * 24 + 16; // 16px to 40px
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const duration = Math.random() * 20 + 20; // 20s to 40s
    const delay = Math.random() * -20; // random start time
    
    // Choose an animation pattern based on society type (e.g. rising bubbles, floating grid, zig-zag)
    let yAnim = [startY + "vh", (startY - 30) + "vh", startY + "vh"];
    let xAnim = [startX + "vw", (startX + 10) + "vw", startX + "vw"];
    let rotateAnim = [0, 180, 360];

    // Modify animations per society type for uniqueness
    if (["cs", "cas", "ies"].includes(societyId)) {
      // Tech: straight geometric lines
      yAnim = [startY + "vh", "0vh", "100vh"];
      xAnim = [startX + "vw", startX + "vw", startX + "vw"];
      rotateAnim = [0, 0, 0];
    } else if (["pes", "pels"].includes(societyId)) {
      // Power: jittery energetic movement
      yAnim = [startY + "vh", (startY - 5) + "vh", (startY + 5) + "vh"];
      xAnim = [startX + "vw", (startX + 5) + "vw", (startX - 5) + "vw"];
      rotateAnim = [0, 45, -45, 0];
    } else if (["wie", "sight", "edsoc"].includes(societyId)) {
      // Community: soft gentle floating
      yAnim = [startY + "vh", (startY - 20) + "vh", startY + "vh"];
      xAnim = [startX + "vw", (startX + 20) + "vw", startX + "vw"];
    }

    return (
      <motion.div
        key={i}
        className="absolute text-white/10"
        initial={{ x: xAnim[0], y: yAnim[0], opacity: 0 }}
        animate={{ 
          x: xAnim, 
          y: yAnim, 
          rotate: rotateAnim,
          opacity: [0, 0.4, 0.4, 0] 
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
        }}
      >
        <Icon size={size} strokeWidth={1.5} />
      </motion.div>
    );
  });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-slate-950/80" />
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] ${accentColor} opacity-30 rounded-full blur-[120px] mix-blend-screen`} />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      {/* Floating Animated Theme Icons */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]">
        {elements}
      </div>
    </div>
  );
}
