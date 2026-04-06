import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Github, Twitter, Linkedin, Instagram } from "lucide-react";

const socials = [
  { icon: Twitter, label: "Twitter" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Instagram, label: "Instagram" },
  { icon: Github, label: "GitHub" },
];

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">Connect</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4">
            Get in <span className="neon-text">Touch</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-panel rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-primary" size={18} />
                </div>
                <div>
                  <h4 className="font-display font-semibold mb-1">Location</h4>
                  <p className="text-muted-foreground text-sm">Mysore, Karnataka, India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="text-primary" size={18} />
                </div>
                <div>
                  <h4 className="font-display font-semibold mb-1">Email</h4>
                  <p className="text-muted-foreground text-sm">info@mcem.edu.in</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="text-primary" size={18} />
                </div>
                <div>
                  <h4 className="font-display font-semibold mb-1">Phone</h4>
                  <p className="text-muted-foreground text-sm">+91 821 000 0000</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-display font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <button
                    key={s.label}
                    className="w-11 h-11 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:neon-glow-cyan transition-all duration-300"
                    aria-label={s.label}
                  >
                    <s.icon size={18} />
                  </button>
                ))}
              </div>
              <div className="mt-8">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Ready to shape your future? Reach out to us and begin your journey into the world of engineering excellence.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
