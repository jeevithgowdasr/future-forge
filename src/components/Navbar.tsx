import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const links = ["Events", "Lineup", "Schedule", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] bg-black/40 backdrop-blur-3xl border-b border-primary/20 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-4 group">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden"
          >
            <img 
              src="/college-logo.png" 
              alt="MYCEM Logo" 
              className="w-full h-full object-contain mix-blend-lighten" 
            />
          </motion.div>
          
          <div className="hidden sm:flex flex-col items-start leading-[1.1]">
            <span className="font-display font-black text-[10px] tracking-widest text-primary">MYSORE COLLEGE OF</span>
            <span className="font-display font-black text-sm tracking-tighter text-white group-hover:text-primary transition-colors">ENGINEERING AND MANAGEMENT</span>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-all duration-500 font-bold relative group/item"
            >
              {l}
              <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] bg-primary transition-all duration-500 group-hover/item:w-full" />
            </button>
          ))}
          <Button className="h-10 px-6 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg bg-primary text-black hover:bg-white transition-all shadow-lg hover:shadow-primary/20">
            Join Fest
          </Button>
        </div>

        <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)}>
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
