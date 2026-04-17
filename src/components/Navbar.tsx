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
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-3 md:gap-5 group max-w-[70%]">
          <div className="relative shrink-0">
            <motion.div 
              whileHover={{ rotateY: 180, scale: 1.1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-2xl p-1 bg-black/40 border border-primary/20 shadow-[0_0_20px_rgba(212,175,55,0.15)] flex items-center justify-center overflow-hidden"
            >
              <img 
                src="/college-logo.png" 
                alt="MYCEM Logo" 
                className="w-full h-full object-contain mix-blend-lighten scale-110" 
              />
            </motion.div>
            <div className="absolute -inset-2 bg-primary/10 blur-xl opacity-0 group-hover:opacity-40 transition-opacity animate-pulse" />
          </div>
          <div className="flex flex-col items-start leading-[1.1] transition-transform duration-500 group-hover:translate-x-1">
            <span className="font-display font-black text-xs md:text-sm tracking-widest text-primary/80 uppercase">MYSORE COLLEGE OF</span>
            <span className="font-display font-black text-sm md:text-lg tracking-tighter text-foreground group-hover:text-primary transition-colors uppercase">ENGINEERING AND MANAGEMENT</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-[1px] w-4 bg-primary/30" />
              <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground font-bold">MYSIRI SAMBRAMA 2026</span>
            </div>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all duration-500 font-black hover:scale-105 relative group/item"
            >
              {l}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-500 group-hover/item:w-full" />
            </button>
          ))}
          <Button className="neon-glow-gold h-11 px-8 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl bg-primary text-black hover:bg-white transition-all transform hover:-rotate-2">
            Register
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
