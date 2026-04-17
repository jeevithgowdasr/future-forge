import { motion } from "framer-motion";
import { Code, Music, Trophy, Gamepad2, Palette, BookOpen } from "lucide-react";
import { ScrollReveal, ParallaxLayer } from "./ScrollAnimations";

const eventCategories = [
  { icon: Music, name: "Cultural Extravaganza", code: "CULT", color: "from-neon-cyan/20 to-neon-blue/10", desc: "Showcase your talent in dance, music, and fashion show." },
  { icon: Code, name: "Technical Symposium", code: "TECH", color: "from-neon-purple/20 to-neon-cyan/10", desc: "Hackathons, paper presentations, and coding battles." },
  { icon: Trophy, name: "Sports Arena", code: "SPRT", color: "from-neon-blue/20 to-neon-purple/10", desc: "Cricket, football, and various track-and-field events." },
  { icon: Gamepad2, name: "Gaming Universe", code: "GAME", color: "from-neon-cyan/20 to-neon-purple/10", desc: "Competitive e-sports tournaments like BGMI and Valorant." },
  { icon: Palette, name: "Creative Arts", code: "ARTS", color: "from-neon-purple/20 to-neon-blue/10", desc: "Photography, short-films, and hands-on design workshops." },
  { icon: BookOpen, name: "Literary Events", code: "LIT", color: "from-neon-blue/20 to-neon-cyan/10", desc: "Debates, quizzes, and creative writing competitions." },
];

export default function EventsSection() {
  return (
    <section id="events" className="section-padding relative overflow-hidden">
      <ParallaxLayer speed={0.4} className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none">
        <div className="w-full h-full" />
      </ParallaxLayer>

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">Participate</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4">
            Compete in <span className="neon-text">Spectacular</span> Events
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventCategories.map((evt, i) => (
            <ScrollReveal
              key={evt.code}
              delay={i * 0.08}
              direction={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "up"}
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3 } }}
                className="glass-panel-hover glow-border rounded-2xl p-8 group cursor-default h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <motion.div
                    whileHover={{ rotateY: 180, transition: { duration: 0.6 } }}
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${evt.color} flex items-center justify-center`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <evt.icon className="text-primary" size={28} />
                  </motion.div>
                  <span className="text-xs text-primary font-mono tracking-widest">{evt.code}</span>
                </div>
                <h3 className="font-display text-lg font-semibold mt-2 mb-3 group-hover:text-primary transition-colors duration-300">
                  {evt.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 group-hover:text-foreground/80 transition-colors">
                  {evt.desc}
                </p>
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
