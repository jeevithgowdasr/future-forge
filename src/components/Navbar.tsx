import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const links = ["Events", "Lineup", "Schedule", "Sponsors", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10 shadow-2xl backdrop-blur-3xl"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-4 group">
          <div className="relative">
            <motion.div 
              whileHover={{ rotateY: 180, scale: 1.1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-14 h-14 rounded-full p-2 bg-card border border-primary/30 shadow-[0_0_20px_rgba(34,211,238,0.2)] flex items-center justify-center overflow-hidden"
            >
              <img src="/fest-logo.jpg" alt="Mysiri Logo" className="w-full h-full object-contain mix-blend-lighten scale-150" />
            </motion.div>
            <div className="absolute -inset-2 bg-primary/20 blur-xl opacity-0 group-hover:opacity-60 transition-opacity animate-pulse" />
          </div>
          <div className="flex flex-col items-start leading-none group">
            <span className="font-display font-black text-2xl tracking-tighter text-foreground group-hover:text-primary transition-colors">MYSIRI</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-black group-hover:text-foreground transition-colors">Sambrama 2026</span>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all duration-300 font-bold hover:glow-sm hover:scale-110"
            >
              {l}
            </button>
          ))}
          <Button className="neon-glow-cyan h-9 px-6 text-xs font-black uppercase tracking-widest rounded-full">
            Connect
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border/30"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {links.map((l) => (
                <button
                  key={l}
                  onClick={() => scrollTo(l)}
                  className="text-left text-muted-foreground hover:text-primary transition-colors"
                >
                  {l}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
