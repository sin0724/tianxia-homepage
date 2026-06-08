"use client";

import { motion, useReducedMotion } from "motion/react";
import { SITE_CONFIG } from "@/lib/config";

export default function StatsSection() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-zinc-900 py-20 md:py-24 px-6 md:px-12 border-y border-zinc-800">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {SITE_CONFIG.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="flex flex-col items-start border-l border-zinc-800 first:border-l-0 px-6 md:px-10 py-8"
            >
              <p className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-50 mb-2">
                {stat.value}
              </p>
              <p className="text-xs text-zinc-500 uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
