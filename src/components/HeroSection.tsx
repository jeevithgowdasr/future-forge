import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import { ArrowRight, Compass } from "lucide-react";

const ParticleField = lazy(() => import("./ParticleField"));

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(186 100% 50% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(186 100% 50% / 0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block glass-panel px-4 py-2 text-xs font-medium tracking-[0.2em] uppercase text-primary mb-8">
            Est. Excellence in Engineering
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-6"
        >
          <span className="text-foreground">Mysore College of</span>
          <br />
          <span className="neon-text">Engineering</span>
          <span className="text-foreground"> &</span>
          <br />
          <span className="neon-text">Management</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light"
        >
          Shaping Innovators of Tomorrow
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="group glass-panel-hover px-8 py-4 rounded-full flex items-center justify-center gap-3 text-primary font-medium text-sm tracking-wide hover:bg-primary/10 transition-all"
          >
            <Compass size={18} />
            Explore Campus
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" })}
            className="group px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:shadow-[0_0_30px_hsl(186_100%_50%/0.4)] transition-all"
          >
            Discover Programs
            <ArrowRight size={16} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
