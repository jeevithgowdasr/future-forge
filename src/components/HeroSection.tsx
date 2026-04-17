import { motion, useScroll, useTransform } from "framer-motion";
import { Suspense, lazy, useRef } from "react";
import { ArrowRight, Compass } from "lucide-react";

const ParticleField = lazy(() => import("./ParticleField"));

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const particleScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5], [0.03, 0]);

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Suspense fallback={null}>
        <motion.div className="absolute inset-0 z-0" style={{ scale: particleScale }}>
          <ParticleField />
        </motion.div>
      </Suspense>

      {/* Grid overlay with parallax fade */}
      {/* Grid overlay with parallax fade */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{
          opacity: gridOpacity,
          backgroundImage: `linear-gradient(hsl(43 70% 50% / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(43 70% 50% / 0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <motion.div
        className="relative z-10 text-center px-6 max-w-7xl mx-auto"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 relative inline-block group"
        >
          {/* Enhanced pulsing glow */}
          <div className="absolute -inset-32 bg-primary/20 rounded-full blur-[140px] opacity-20 group-hover:opacity-60 transition-opacity duration-1000 animate-pulse"></div>
          <div className="absolute -inset-16 bg-accent/10 rounded-full blur-[80px] opacity-10 animate-[pulse_4s_infinite]"></div>
          
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="relative w-[18rem] h-[18rem] md:w-[32rem] md:h-[32rem] flex items-center justify-center animate-float"
          >
            {/* Circular Frame for Logo */}
            <div className="absolute inset-2 md:inset-4 rounded-full border-4 border-primary/40 shadow-[0_0_80px_rgba(212,175,55,0.4)] bg-black/40 backdrop-blur-sm z-0"></div>
            
            <motion.div 
              className="relative z-10 w-full h-full rounded-full overflow-hidden flex items-center justify-center p-8 md:p-12"
            >
              <img 
                src="/fest-logo.jpg" 
                alt="MYSIRI SAMBRAMA 2026" 
                className="w-full h-full object-contain filter drop-shadow-2xl brightness-110" 
              />
            </motion.div>

            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-full flex flex-col items-center z-20">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="block glass-panel px-12 py-5 text-[14px] font-black tracking-[0.6em] uppercase text-primary border-primary/30 shadow-neon-glow-gold backdrop-blur-3xl whitespace-nowrap">
                  MYSIRI SAMBRAMA 2026
                </span>
                <span className="text-[9px] text-white/50 tracking-[1em] uppercase font-bold mt-2">
                  The Grand Cultural Odyssey
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted-foreground text-lg md:text-2xl max-w-3xl mx-auto mb-16 font-medium leading-relaxed"
        >
          The Grand Festival of <span className="text-white">Engineering, Culture & Art</span>.
          <br className="hidden md:block" />
          Hosted at <span className="text-primary font-bold">MYSORE COLLEGE OF ENGINEERING AND MANAGEMENT</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <button
            onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })}
            className="group glass-panel-hover px-10 py-5 rounded-2xl flex items-center justify-center gap-4 text-primary font-black text-xs uppercase tracking-widest hover:bg-primary/10 transition-all border-primary/20"
          >
            <Compass size={18} />
            Explore Event Lineup
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })}
            className="group px-10 py-5 rounded-2xl bg-primary text-black font-black text-xs uppercase tracking-widest hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-1"
          >
            Register Student Stalls
            <ArrowRight size={16} className="inline ml-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity: titleOpacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <div
          className="w-40 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-4"
        />
        <span className="text-primary/50 text-[10px] tracking-[0.5em] uppercase font-black">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-primary/20 flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
