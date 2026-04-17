import { motion } from "framer-motion";
import { Mic, Zap, Music, PartyPopper } from "lucide-react";
import { ScrollReveal, ParallaxLayer } from "./ScrollAnimations";

const scheduleItems = [
  { icon: Zap, title: "April 7: Sports Kickoff", time: "2:30 PM - 5:00 PM", desc: "Inter-Branch Volleyball and Women's Cricket Tournament kickoff at College Ground." },
  { icon: Mic, title: "April 9-10: Indoor & Strength", time: "2:00 PM - 5:00 PM", desc: "Tug of War, Inter-Branch Chess, and the Boys' Carrom Competition across campus halls." },
  { icon: PartyPopper, title: "April 11: MPL Season 5", time: "Full Day", desc: "The grand Interbranch Cricket Tournament (MPL) begins its season 5 journey." },
  { icon: Music, title: "April 15-16: Culture & Talent", time: "9:00 AM - 6:00 PM", desc: "Hackathon, Debate, and Rangoli on the 15th, followed by Instrumental Music on the 16th." },
  { icon: PartyPopper, title: "April 17: Tech Finale", time: "10:00 AM onwards", desc: "Tech Pictionary and Web Design Challenges bringing a close to the technical events." },
];

export default function ScheduleSection() {
  return (
    <section id="schedule" className="section-padding relative overflow-hidden">
      <ParallaxLayer speed={0.3} className="absolute -left-40 top-1/3 w-80 h-80 rounded-full bg-primary/5 blur-[100px] pointer-events-none">
        <div className="w-full h-full" />
      </ParallaxLayer>

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">Event Timeline</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4">
            The <span className="neon-text">Schedule</span> at a Glance
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {scheduleItems.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
              <motion.div
                whileHover={{ x: i % 2 === 0 ? 8 : -8, transition: { duration: 0.3 } }}
                className="glass-panel-hover rounded-2xl p-8 flex gap-6 items-start group"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10, transition: { duration: 0.3 } }}
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors"
                >
                  <item.icon className="text-primary" size={24} />
                </motion.div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">{item.title}</h3>
                    <span className="text-xs text-primary font-mono">{item.time}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
