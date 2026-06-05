"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EventGallery({ images }: { images: string[] }) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <section>
      <h2 className="text-3xl font-heading font-bold mb-8 flex items-center gap-2">
        <span className="w-3 h-8 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-[#FFD700] rounded-full inline-block"></span>
        Event Gallery
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className="relative w-full aspect-video rounded-xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden group cursor-pointer"
            onClick={() => setSelectedImg(img)}
          >
            <img 
              src={img} 
              alt={`Event photo ${idx + 1}`} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedImg(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-[#FFD700] transition-colors z-[110]"
              onClick={() => setSelectedImg(null)}
            >
              <X size={40} strokeWidth={2.5} />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImg} 
              alt="Full size event photo" 
              className="max-w-full max-h-[90vh] object-contain border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
