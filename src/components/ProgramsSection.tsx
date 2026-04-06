import { motion } from "framer-motion";
import { Code, Radio, Cog, BarChart3, Zap, Database } from "lucide-react";
import { ScrollReveal, ParallaxLayer } from "./ScrollAnimations";

const departments = [
  { icon: Code, name: "Computer Science & Engineering", code: "CSE", color: "from-neon-cyan/20 to-neon-blue/10" },
  { icon: Radio, name: "Electronics & Communication", code: "ECE", color: "from-neon-purple/20 to-neon-cyan/10" },
  { icon: Cog, name: "Mechanical Engineering", code: "ME", color: "from-neon-blue/20 to-neon-purple/10" },
  { icon: BarChart3, name: "Information Science", code: "ISE", color: "from-neon-cyan/20 to-neon-purple/10" },
  { icon: Zap, name: "Electrical Engineering", code: "EEE", color: "from-neon-purple/20 to-neon-blue/10" },
  { icon: Database, name: "Data Science & AI", code: "DS&AI", color: "from-neon-blue/20 to-neon-cyan/10" },
];

export default function ProgramsSection() {
  return (
    <section id="programs" className="section-padding relative overflow-hidden">
      <ParallaxLayer speed={0.4} className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none">
        <div className="w-full h-full" />
      </ParallaxLayer>

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">Departments</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4">
            <span className="neon-text">Programs</span> That Define the Future
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, i) => (
            <ScrollReveal
              key={dept.code}
              delay={i * 0.08}
              direction={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "up"}
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3 } }}
                className="glass-panel-hover glow-border rounded-2xl p-8 group cursor-default h-full"
              >
                <motion.div
                  whileHover={{ rotateY: 180, transition: { duration: 0.6 } }}
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center mb-6`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <dept.icon className="text-primary" size={28} />
                </motion.div>
                <span className="text-xs text-primary font-mono tracking-widest">{dept.code}</span>
                <h3 className="font-display text-lg font-semibold mt-2 mb-3 group-hover:text-primary transition-colors duration-300">
                  {dept.name}
                </h3>
                <motion.div
                  className="h-0.5 bg-gradient-to-r from-primary to-accent rounded-full opacity-50"
                  initial={{ width: "3rem" }}
                  whileInView={{ width: "3rem" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
