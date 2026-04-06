import { motion } from "framer-motion";
import { Brain, CircuitBoard, Terminal, Wifi } from "lucide-react";

const labs = [
  { icon: Brain, title: "AI & Machine Learning Lab", desc: "Deep learning research with GPU clusters and real-world datasets." },
  { icon: CircuitBoard, title: "IoT Innovation Center", desc: "Connected devices ecosystem for smart systems prototyping." },
  { icon: Terminal, title: "Software Development Hub", desc: "Full-stack development environment with cloud infrastructure." },
  { icon: Wifi, title: "5G & Networks Lab", desc: "Next-generation communication systems research facility." },
];

export default function InnovationSection() {
  return (
    <section id="innovation" className="section-padding relative overflow-hidden">
      {/* Animated code background */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] font-mono text-xs leading-relaxed text-primary overflow-hidden pointer-events-none hidden lg:block">
        <div className="animate-grid-flow">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="whitespace-nowrap">
              {`const future = await innovate(${i});`}
            </div>
          ))}
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={`d-${i}`} className="whitespace-nowrap">
              {`const future = await innovate(${i});`}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">Innovation & Labs</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4">
            Built for <span className="neon-text">Breakthroughs</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {labs.map((lab, i) => (
            <motion.div
              key={lab.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="glass-panel-hover rounded-2xl p-8 flex gap-6 items-start group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <lab.icon className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{lab.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{lab.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
