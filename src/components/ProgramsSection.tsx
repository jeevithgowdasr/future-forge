import { motion } from "framer-motion";
import { Code, Music, Trophy, Gamepad2, Palette, BookOpen } from "lucide-react";
import { ScrollReveal, ParallaxLayer } from "./ScrollAnimations";
import { Badge } from "@/components/ui/badge";

const eventCategories = [
  { icon: Music, name: "Cultural Extravaganza", code: "CULT", color: "from-primary/20 to-transparent", desc: "Showcase your talent in dance, music, and the grand fashion show." },
  { icon: Code, name: "Technical Symposium", code: "TECH", color: "from-primary/20 to-transparent", desc: "Hackathons, paper presentations, and high-level coding battles." },
  { icon: Trophy, name: "Sports Arena", code: "SPRT", color: "from-primary/20 to-transparent", desc: "Cricket, football, and various track-and-field championships." },
  { icon: Gamepad2, name: "Gaming Universe", code: "GAME", color: "from-primary/20 to-transparent", desc: "Competitive e-sports tournaments like BGMI and Valorant." },
  { icon: Palette, name: "Creative Arts", code: "ARTS", color: "from-primary/20 to-transparent", desc: "Photography, short-films, and hands-on design masterclasses." },
  { icon: BookOpen, name: "Literary Events", code: "LIT", color: "from-primary/20 to-transparent", desc: "Debates, quizzes, and high-caliber creative writing competitions." },
];

export default function EventsSection() {
  return (
    <section id="events" className="section-padding relative overflow-hidden bg-black/40">
      <ParallaxLayer speed={0.4} className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none">
        <div className="w-full h-full" />
      </ParallaxLayer>

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-16">
          <Badge variant="outline" className="mb-6 px-6 py-2 border-primary/30 text-primary font-black uppercase tracking-[0.3em]">
            Engage & Compete
          </Badge>
          <h2 className="font-display text-4xl md:text-6xl font-black mt-4 uppercase tracking-tighter">
            CHAMPIONSHIP <span className="neon-text italic">VERTICLES</span>
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventCategories.map((evt, i) => (
            <ScrollReveal
              key={evt.code}
              delay={i * 0.08}
            >
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="glass-panel-hover rounded-[2rem] p-8 group cursor-default h-full border-white/5"
              >
                <div className="flex justify-between items-start mb-10">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${evt.color} flex items-center justify-center border border-primary/20 shadow-xl`}>
                    <evt.icon className="text-primary" size={28} />
                  </div>
                  <span className="text-[10px] text-primary font-mono font-black tracking-widest opacity-50 uppercase">{evt.code}</span>
                </div>
                <h3 className="font-display text-xl font-bold mt-2 mb-4 group-hover:text-primary transition-colors duration-300 uppercase tracking-tight">
                  {evt.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 group-hover:text-foreground/80 transition-colors font-medium">
                  {evt.desc}
                </p>
                <motion.div
                  className="h-1 bg-gradient-to-r from-primary to-transparent rounded-full opacity-30"
                  initial={{ width: "2rem" }}
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
