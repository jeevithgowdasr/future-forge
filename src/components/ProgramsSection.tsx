import { motion } from "framer-motion";
import { Code, Radio, Cog, BarChart3, Zap, Database } from "lucide-react";

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
    <section id="programs" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">Departments</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4">
            <span className="neon-text">Programs</span> That Define the Future
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, i) => (
            <motion.div
              key={dept.code}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-panel-hover glow-border rounded-2xl p-8 group cursor-default"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center mb-6`}>
                <dept.icon className="text-primary" size={28} />
              </div>
              <span className="text-xs text-primary font-mono tracking-widest">{dept.code}</span>
              <h3 className="font-display text-lg font-semibold mt-2 mb-3 group-hover:text-primary transition-colors duration-300">
                {dept.name}
              </h3>
              <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-accent rounded-full opacity-50 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
