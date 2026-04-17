import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { ScrollReveal } from "./ScrollAnimations";

const stats = [
  { value: 5000, suffix: "+", label: "Expected Footfall" },
  { value: 30, suffix: "+", label: "Competitive Events" },
  { value: 100, suffix: "+", label: "Colleges Participating" },
  { value: 50, suffix: "+", label: "Event Sponsors" },
];

const partners = [
  { 
    name: "MM Group", 
    role: "Production & Events", 
    desc: "Premier event management and production group specializing in high-octane sports and entertainment spectacles."
  },
  { 
    name: "Ad Vision", 
    role: "Creative Partner", 
    desc: "Expert advertising agency providing branding, creative design, and large-scale printing solutions for mega festivals."
  },
  { 
    name: "Live Photography", 
    role: "Media Partner", 
    desc: "Saraswathipuram's leading studio capturing cinematic candid moments and professional event coverage."
  },
  { 
    name: "Chirayu Dance Institute", 
    role: "Cultural Partner", 
    desc: "Mysore's premier dance academy fostering folk, contemporary, and classical excellence since 2009."
  },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref} className="neon-text font-display text-4xl md:text-6xl font-bold">
      {count}{suffix}
    </span>
  );
}

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} id="sponsors" className="section-padding relative overflow-hidden">
      {/* Parallax decorative ring */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary/5 pointer-events-none"
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-16">
          <Badge variant="outline" className="mb-6 px-6 py-2 border-primary/30 text-primary font-black uppercase tracking-[0.3em]">
            Fest Magnitude
          </Badge>
          <h2 className="font-display text-4xl md:text-6xl font-black mt-4 uppercase tracking-tighter">
            THE <span className="neon-text italic">SCALE</span> OF SAMBRAMA
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 text-center hover:border-primary/30 transition-all duration-500"
              >
                <div className="mb-2">
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <p className="text-white font-black uppercase tracking-[0.2em] text-[10px] opacity-50">{s.label}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mb-16">
            <h3 className="font-display text-3xl font-black uppercase tracking-tight">Production & Media <span className="text-primary">Cohorts</span></h3>
            <p className="text-muted-foreground mt-4 font-medium italic">Collaborating with regional specialists for unmatched event quality.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <ScrollReveal key={partner.name} delay={index * 0.1}>
                <motion.div
                  whileHover={{ 
                    y: -10,
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(212, 175, 55, 0.15)"
                  }}
                  className="glass-panel-hover rounded-[2.5rem] p-8 h-full flex flex-col border-white/5 transition-all duration-700 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-colors" />
                  
                  <div className="flex-1 relative z-10">
                    <Badge className="bg-primary/10 text-primary border-primary/20 mb-6 px-3 py-1 uppercase tracking-[0.2em] text-[8px] font-black">
                      {partner.role}
                    </Badge>
                    <h4 className="font-display text-2xl font-black group-hover:text-primary transition-colors uppercase tracking-tight mb-4">
                      {partner.name}
                    </h4>
                    <p className="text-muted-foreground text-[11px] leading-relaxed font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                      {partner.desc}
                    </p>
                  </div>
                  
                  <motion.div 
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    className="h-1 bg-primary mt-8 rounded-full"
                  />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
