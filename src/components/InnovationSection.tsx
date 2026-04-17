import { motion } from "framer-motion";
import { Mic, Zap, Music, PartyPopper } from "lucide-react";
import { ScrollReveal, ParallaxLayer } from "./ScrollAnimations";

const scheduleItems = [
  { icon: Zap, title: "April 7-8: Action Begins", time: "12:00 PM Onwards", desc: "Sports tournaments kickoff on the 7th, followed by the high-octane Bike Stunt Show by Hell Riderz on the 8th." },
  { icon: Mic, title: "April 9-10: Indoor & Strength", time: "2:00 PM - 5:00 PM", desc: "Tug of War, Inter-Branch Chess, and the Boys' Carrom Competition across campus halls." },
  { icon: PartyPopper, title: "April 11-16: Main Events", time: "Full Days", desc: "MPL Cricket Season 5 starts on the 11th. Innovation, Art, and Music events fill the core festival days." },
  { icon: Music, title: "April 17: Grand Finale", time: "10:00 AM onwards", desc: "Stage Performance Fest (Dance, Fashion), Singing, and Tech Challenges conclude the main competitions." },
  { icon: PartyPopper, title: "April 18: Community & Stalls", time: "10:00 AM - 6:00 PM", desc: "A day for the community with Student Stalls on display and the fun Petsiri Fest 2026." },
];

export default function ScheduleSection() {
  return (
    <section id="schedule" className="section-padding relative overflow-hidden">
      <ParallaxLayer speed={0.3} className="absolute -left-40 top-1/3 w-80 h-80 rounded-full bg-primary/5 blur-[100px] pointer-events-none">
        <div className="w-full h-full" />
      </ParallaxLayer>

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-primary text-[10px] font-black tracking-[0.4em] uppercase opacity-70">The Master Plan</span>
          <h2 className="font-display text-4xl md:text-6xl font-black mt-4 uppercase tracking-tighter">
            FESTIVAL <span className="neon-text italic">TIMELINE</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scheduleItems.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="glass-panel-hover rounded-[2rem] p-8 h-full flex flex-col gap-6 items-start group border-white/5"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 shadow-xl group-hover:bg-primary/20 transition-all duration-500">
                  <item.icon className="text-primary" size={28} />
                </div>
                <div>
                  <div className="flex flex-col mb-4">
                    <span className="text-[10px] text-primary font-black uppercase tracking-widest mb-1">{item.time}</span>
                    <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors uppercase tracking-tight leading-none">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
