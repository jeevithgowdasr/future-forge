import { motion } from "framer-motion";
import { Lightbulb, Award, Cpu } from "lucide-react";
import { ParallaxLayer, ScrollReveal, TextReveal } from "./ScrollAnimations";

const cards = [
  { icon: Lightbulb, title: "Innovation", desc: "Fostering creative thinking and groundbreaking research across all disciplines." },
  { icon: Award, title: "Excellence", desc: "Committed to the highest academic standards and global benchmarks." },
  { icon: Cpu, title: "Technology", desc: "State-of-the-art labs and infrastructure powering next-gen learning." },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Floating decorative orbs with parallax */}
      <ParallaxLayer speed={0.5} className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary/5 blur-[100px] pointer-events-none" >
        <div className="w-full h-full" />
      </ParallaxLayer>
      <ParallaxLayer speed={-0.3} className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-accent/5 blur-[80px] pointer-events-none">
        <div className="w-full h-full" />
      </ParallaxLayer>

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">About Us</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 mb-6">
            Where <span className="neon-text">Vision</span> Meets Reality
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            <TextReveal text="Mysore College of Engineering and Management stands at the forefront of technical education, blending rigorous academics with hands-on innovation to produce industry-ready graduates who shape the future." />
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="glass-panel-hover p-8 rounded-2xl group cursor-default h-full"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:neon-glow-cyan transition-all duration-500"
                >
                  <card.icon className="text-primary" size={24} />
                </motion.div>
                <h3 className="font-display text-xl font-semibold mb-3">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{card.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
