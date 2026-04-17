import { motion } from "framer-motion";
import { ExternalLink, ShieldCheck, Globe, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "./ScrollAnimations";

const sponsors = [
  {
    name: "Toyota Kirloskar Motor",
    type: "Title Sponsor",
    description: "A global leader in automotive innovation and hybrid technology. Guided by the 'Toyota Way', they emphasize excellence and community harmony.",
    link: "https://www.toyotabharat.com",
    icon: <Globe className="text-primary" size={24} />,
    color: "from-red-500/20 to-transparent"
  },
  {
    name: "KMF Nandini",
    type: "Dairy Partner",
    description: "The flagship brand of Karnataka Milk Federation, India's second-largest dairy cooperative, bringing quality and prosperity to millions from cow to consumer.",
    link: "https://kmfnandini.coop",
    icon: <ShieldCheck className="text-primary" size={24} />,
    color: "from-blue-500/20 to-transparent"
  },
  {
    name: "KSRTC",
    type: "Transport Partner",
    description: "Karnataka's lifeline for public transport, providing safe, comfortable, and innovative travel solutions connecting urban centers to the heart of rural India.",
    link: "https://ksrtc.in",
    icon: <Truck className="text-primary" size={24} />,
    color: "from-green-500/20 to-transparent"
  }
];

export default function Sponsors() {
  return (
    <section id="sponsors" className="py-32 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-24">
          <Badge variant="outline" className="mb-6 px-6 py-2 border-primary/30 text-primary font-black uppercase tracking-[0.3em]">
            Strategic Alliances
          </Badge>
          <h2 className="font-display text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
            OUR PROUD <span className="neon-text italic">PARTNERS</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-medium">
            Collaboration with the industry giants to bring the most prestigious event experience to the Mysuru region.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${sponsor.color} rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="relative h-full glass-panel-hover p-8 md:p-10 rounded-[2.5rem] border border-white/10 flex flex-col items-start gap-6 backdrop-blur-3xl group-hover:border-primary/50 transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
                  {sponsor.icon}
                </div>
                
                <div>
                  <Badge className="bg-primary/20 text-primary border-none mb-4 uppercase tracking-widest text-[9px] font-black">
                    {sponsor.type}
                  </Badge>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-primary transition-colors">
                    {sponsor.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-medium mb-8">
                    {sponsor.description}
                  </p>
                </div>

                <div className="mt-auto w-full">
                  <a 
                    href={sponsor.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-black hover:border-transparent transition-all group/link"
                  >
                    Visit Official Portal
                    <ExternalLink size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
