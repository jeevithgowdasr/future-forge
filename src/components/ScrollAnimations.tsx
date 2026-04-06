import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Animated neon divider between sections.
 * A horizontal line that draws itself in as you scroll into view.
 */
export function SectionDivider() {
  return (
    <div className="relative py-4 flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-full max-w-md origin-left"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(186 100% 50% / 0.4), hsl(263 84% 66% / 0.4), transparent)",
        }}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute w-2 h-2 rounded-full bg-primary/60"
        style={{ boxShadow: "0 0 12px hsl(186 100% 50% / 0.6)" }}
      />
    </div>
  );
}

/**
 * Wraps children with a parallax vertical offset based on scroll position.
 */
export function ParallaxLayer({
  children,
  speed = 0.3,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Reveal wrapper: children scale + fade in from below with a spring effect.
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const initial =
    direction === "left"
      ? { opacity: 0, x: -60 }
      : direction === "right"
        ? { opacity: 0, x: 60 }
        : { opacity: 0, y: 50 };

  const animate =
    direction === "left" || direction === "right"
      ? { opacity: 1, x: 0 }
      : { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1], // custom cubic-bezier like GSAP power3.out
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Text that reveals character by character.
 */
export function TextReveal({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.3em]">
          {word.split("").map((char, ci) => (
            <motion.span
              key={ci}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.4,
                    delay: wi * 0.08 + ci * 0.03,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}

/**
 * Horizontal line that grows as you scroll past it.
 */
export function ScrollProgressLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div ref={ref} className="w-full h-px relative overflow-hidden">
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="absolute inset-0 bg-gradient-to-r from-primary/60 via-accent/40 to-transparent"
      />
    </div>
  );
}
