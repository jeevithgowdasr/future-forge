import { motion } from "framer-motion";
import { Lightbulb, Award, Cpu } from "lucide-react";

const cards = [
  { icon: Lightbulb, title: "Innovation", desc: "Fostering creative thinking and groundbreaking research across all disciplines." },
  { icon: Award, title: "Excellence", desc: "Committed to the highest academic standards and global benchmarks." },
  { icon: Cpu, title: "Technology", desc: "State-of-the-art labs and infrastructure powering next-gen learning." },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function AboutSection() {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">About Us</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 mb-6">
            Where <span className="neon-text">Vision</span> Meets Reality
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Mysore College of Engineering and Management stands at the forefront of technical education,
            blending rigorous academics with hands-on innovation to produce industry-ready graduates
            who shape the future.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={itemVariants}
              className="glass-panel-hover p-8 rounded-2xl group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:neon-glow-cyan transition-all duration-500">
                <card.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{card.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
