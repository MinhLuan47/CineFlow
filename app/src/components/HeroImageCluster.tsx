import React from "react";
import { motion } from "framer-motion";

export const HeroImageCluster: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 48, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 1.15,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: 0.35,
      }}
      className="lg:col-span-5 relative w-full max-w-[390px] md:max-w-[460px] mx-auto z-20 group"
    >
      <div className="relative w-full h-[430px] md:h-[560px] flex items-center justify-center select-none mt-12 lg:mt-0">
        {/* Ambient cinematic glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/20 blur-[90px]" />
          <div className="absolute right-2 top-20 h-[220px] w-[220px] rounded-full bg-red-500/15 blur-[80px]" />
          <div className="absolute left-0 bottom-10 h-[220px] w-[220px] rounded-full bg-cyan-400/10 blur-[80px]" />
        </div>

        {/* Decorative rings */}
        <div className="absolute inset-x-8 top-16 h-[320px] rounded-full border border-white/10 rotate-[-12deg] opacity-60" />
        <div className="absolute inset-x-12 top-24 h-[280px] rounded-full border border-amber-300/10 rotate-[10deg] opacity-70" />

        {/* Ảnh giữa - background poster */}
        <motion.div
          animate={{ y: [-6, 6, -6], rotate: [-3, -1, -3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[3%] w-[210px] md:w-[290px] lg:w-[330px] aspect-[2/3] overflow-hidden rounded-[28px] border border-white/20 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.55)] z-10 backdrop-blur-sm"
        >
          <img
            src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=900&auto=format&fit=crop&q=90"
            alt="Space"
            className="h-full w-full object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-white/10" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/15" />

          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">Cosmic Cut</p>
            <p className="mt-1 text-lg font-semibold text-white">Deep Space</p>
          </div>
        </motion.div>

        {/* Ảnh trái */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [-12, -15, -12] }}
          whileHover={{ scale: 1.08, rotate: -8, y: -18 }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[1%] md:left-[3%] lg:left-[-4%] top-[22%] w-[185px] md:w-[255px] lg:w-[300px] aspect-[3/4] overflow-hidden rounded-[26px] border border-white/25 bg-white/10 shadow-[0_35px_80px_rgba(0,0,0,0.75)] z-30 backdrop-blur-md"
        >
          <img
            src="https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=900&auto=format&fit=crop&q=90"
            alt="Controller"
            className="h-full w-full object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-white/10" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/20" />

          <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/80 backdrop-blur-md">
            Gaming
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-xl font-bold text-white drop-shadow">Play Mode</p>
            <p className="mt-1 line-clamp-2 text-xs text-white/65">
              Interactive cinematic experience
            </p>
          </div>
        </motion.div>

        {/* Ảnh phải */}
        <motion.div
          animate={{ y: [-12, 0, -12], rotate: [10, 13, 10] }}
          whileHover={{ scale: 1.08, rotate: 7, y: -18 }}
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[1%] md:right-[3%] lg:right-[-4%] top-[27%] w-[185px] md:w-[255px] lg:w-[300px] aspect-[3/4] overflow-hidden rounded-[26px] border border-white/25 bg-white/10 shadow-[0_35px_80px_rgba(0,0,0,0.75)] z-30 backdrop-blur-md"
        >
          <img
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=900&auto=format&fit=crop&q=90"
            alt="Cinema"
            className="h-full w-full object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-white/10" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/20" />

          <div className="absolute right-4 top-4 rounded-full border border-amber-300/30 bg-amber-400/15 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-amber-100 backdrop-blur-md">
            Cinema
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-xl font-bold text-white drop-shadow">Movie Night</p>
            <p className="mt-1 line-clamp-2 text-xs text-white/65">
              Curated scenes, trailers and stories
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
