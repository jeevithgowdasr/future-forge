import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
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
    desc: "Premier event management and production group specializing in high-octane sports and entertainment spectacles.",
    link: "https://www.justdial.com/Mysore/Event-Organisers/nct-10189334"
  },
  { 
    name: "Ad Vision", 
    role: "Creative Partner", 
    desc: "Expert advertising agency providing branding, creative design, and large-scale printing solutions for mega festivals.",
    link: "https://www.justdial.com/Mysore/Ad-Vision-Kr-Mohalla/0821P821STD2000571_BZDET"
  },
  { 
    name: "Live Photography", 
    role: "Media Partner", 
    desc: "Saraswathipuram's leading studio capturing cinematic candid moments and professional event coverage.",
    link: "https://www.justdial.com/Mysore/Live-Photography-Near-Fire-Station-Saraswathipuram/0821PX821-X140801115121-Y7C7_BZDET"
  },
  { 
    name: "Chirayu Dance Institute", 
    role: "Cultural Partner", 
    desc: "Mysore's premier dance academy fostering folk, contemporary, and classical excellence since 2009.",
    link: "https://mysuru.directory/listing/chirayu-dance-institute-siddarthanagar-mysuru/"
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

export default function SponsorsSection() {
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
          <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">Fest Highlights</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4">
            The <span className="neon-text">Scale</span> of Sambrama
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                className="glass-panel rounded-2xl p-8 text-center"
              >
                <Counter target={s.value} suffix={s.suffix} />
                <p className="text-muted-foreground text-sm mt-3 font-medium">{s.label}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mb-12">
            <h3 className="font-display text-2xl font-bold">Our Exclusive Partners</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <motion.a
                key={partner.name}
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="glass-panel rounded-2xl p-6 flex flex-col hover:border-primary/50 transition-colors group"
              >
                <div className="flex-1">
                  <h4 className="font-display text-xl font-bold group-hover:text-primary transition-colors">
                    {partner.name}
                  </h4>
                  <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-3 mt-1 opacity-70">
                    {partner.role}
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed italic">
                    "{partner.desc}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-tighter text-muted-foreground group-hover:text-primary">
                  View Profile <ExternalLink size={12} />
                </div>
              </motion.a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
