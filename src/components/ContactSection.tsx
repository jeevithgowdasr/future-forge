import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { ScrollReveal } from "./ScrollAnimations";

const socials = [
  { icon: Twitter, label: "Twitter" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Instagram, label: "Instagram" },
  { icon: Github, label: "GitHub" },
];

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">Connect</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4">
            Get in <span className="neon-text">Touch</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <motion.div
            whileHover={{ boxShadow: "0 0 40px hsl(186 100% 50% / 0.1)" }}
            transition={{ duration: 0.5 }}
            className="glass-panel rounded-2xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {[
                  { Icon: MapPin, label: "Location", value: "Mysore, Karnataka, India" },
                  { Icon: Mail, label: "Email", value: "info@mcem.edu.in" },
                  { Icon: Phone, label: "Phone", value: "+91 821 000 0000" },
                ].map((item, i) => (
                  <ScrollReveal key={item.label} delay={0.3 + i * 0.1} direction="left">
                    <div className="flex items-start gap-4">
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"
                      >
                        <item.Icon className="text-primary" size={18} />
                      </motion.div>
                      <div>
                        <h4 className="font-display font-semibold mb-1">{item.label}</h4>
                        <p className="text-muted-foreground text-sm">{item.value}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={0.4} direction="right">
                <div>
                  <h4 className="font-display font-semibold mb-4">Follow Us</h4>
                  <div className="flex gap-3">
                    {socials.map((s, i) => (
                      <motion.button
                        key={s.label}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 200 }}
                        whileHover={{ y: -4, scale: 1.1 }}
                        className="w-11 h-11 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:neon-glow-cyan transition-all duration-300"
                        aria-label={s.label}
                      >
                        <s.icon size={18} />
                      </motion.button>
                    ))}
                  </div>
                  <div className="mt-8">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Ready to shape your future? Reach out to us and begin your journey into the world of engineering excellence.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
