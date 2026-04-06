import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ScrollReveal } from "./ScrollAnimations";

const stats = [
  { value: 5000, suffix: "+", label: "Students Enrolled" },
  { value: 150, suffix: "+", label: "Faculty Members" },
  { value: 95, suffix: "%", label: "Placement Rate" },
  { value: 50, suffix: "+", label: "Research Papers" },
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
    <section ref={sectionRef} id="achievements" className="section-padding relative overflow-hidden">
      {/* Parallax decorative ring */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary/5 pointer-events-none"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [40, -40]) }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-accent/5 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">Achievements</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4">
            Numbers That <span className="neon-text">Speak</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>
    </section>
  );
}
