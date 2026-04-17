import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-3 font-display font-black text-xl tracking-tighter hover:scale-105 transition-transform">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <img src="/fest-logo.jpg" alt="Mysiri Logo" className="relative h-14 w-auto rounded-lg shadow-xl" />
          </div>
          <span className="neon-text hidden sm:inline">MYSIRI</span>
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
