import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  Calendar, MapPin, Users, Phone, Award, Info, 
  ChevronRight, ChevronLeft, Download, CheckCircle2,
  Trash2, X, ClipboardList, PenTool
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogHeader } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollReveal } from "./ScrollAnimations";

// --- Registration Logic ---
const STORAGE_KEY = "MYSIRI_REGISTRATIONS_2026";

interface Registration {
  id: string;
  eventId: string;
  eventTitle: string;
  name: string;
  college: string;
  email: string;
  phone: string;
  timestamp: string;
}

const getRegistrations = (): Registration[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveRegistration = (reg: Omit<Registration, "id" | "timestamp">) => {
  const existing = getRegistrations();
  const newReg = {
    ...reg,
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, newReg]));
  return newReg;
};

// --- Event Data ---
const eventDetails = [
  {
    id: "tech-pictionary",
    title: "Tech Pictionary",
    type: "Technical",
    image: "/posters/tech-pictionary.jpg",
    description: "An Inter-departmental Technical Drawing and Guessing Competition. Draw, Guess and Win!",
    date: "17th April 2026",
    timings: "10:00 AM",
    venue: "Lab 3, CSE Block",
    registration: "No Entry Fees",
    deadline: "13th April 2026",
    teamSize: "4 members",
    coordinators: [{ name: "Prof. Anusha C K", phone: "9632794541" }],
    studentCoords: "Shreya M M & Sneha M M (AI&ML)"
  },
  {
    id: "web-design",
    title: "Web Design Challenge",
    type: "Technical",
    image: "/posters/web-design.jpg",
    description: "Battle it out in the ultimate web design competition. Theme: College Fest Event Updation.",
    date: "17th April 2026",
    timings: "10:00 AM",
    venue: "Lab 3, 1st Floor, Dept. of CSE",
    registration: "No Entry Fee",
    deadline: "13th April 2026",
    teamSize: "2 per team",
    coordinators: [{ name: "Prof. Anjali", phone: "7483760914" }],
    studentCoords: "Nityashree & Bhavatarini"
  },
  {
    id: "hackathon",
    title: "Intra-College Hackathon",
    type: "Innovation",
    image: "/posters/hackathon.jpg",
    description: "6 Hours of Non-stop Innovation. Solve real-world problems with your coding skills.",
    date: "15th April 2026",
    timings: "9:00 AM onwards",
    venue: "MyCEM Labs",
    registration: "Free Entry",
    deadline: "10th April 2026",
    teamSize: "As per rules",
    coordinators: [{ name: "Prof. Harsha Kumar H S", phone: "9964811559" }],
    studentCoords: "Jeevith Gowda S R"
  },
  {
    id: "volleyball",
    title: "Inter-Branch Volleyball",
    type: "Sports",
    image: "/posters/volleyball.jpg",
    description: "Serve, Spike, Win! The ultimate inter-branch volleyball showdown.",
    date: "7th April 2026",
    timings: "2:30 PM",
    venue: "College Volleyball Court",
    registration: "Free Entry",
    teamSize: "Branch Team",
    coordinators: [{ name: "Prajwal SV", phone: "9480291240" }],
    studentCoords: "Akash & Chinmay"
  },
  {
    id: "mpl-cricket",
    title: "MPL Season 5",
    type: "Sports",
    image: "/posters/mpl-cricket.jpg",
    description: "MPL Season 5 Interbranch Cricket Tournament. The biggest cricketing event of the year.",
    date: "Starts 11th April 2026",
    venue: "College Ground",
    registration: "Free Entry",
    teamSize: "Branch Team",
    coordinators: [{ name: "Chethan M U", phone: "9743349231" }],
    studentCoords: "Akash [CIVIL] & Sachin [CSE]"
  },
  {
    id: "bike-stunt",
    title: "Bike Stunt Show",
    type: "Sports",
    image: "/posters/bike-stunt.jpg",
    description: "Hell Riderz presents the ultimate Bike Stunt Show. High-octane action and jaw-dropping stunts.",
    date: "8th April 2026",
    timings: "12:00 PM Onwards",
    venue: "Sports Ground, MyCEM",
    registration: "Event By: MM Group",
    teamSize: "Spectacle",
    coordinators: [{ name: "Hell Riderz Team", phone: "N/A" }],
    studentCoords: "Hell Riderz Stunt Team"
  },
  {
    id: "stage-performance",
    title: "State Fest",
    type: "Cultural",
    image: "/posters/stage-performance.jpg",
    description: "Inter-College Competitions: Dance, Fashion Show, Ramp Walk, and Singing.",
    date: "17th April 2026",
    timings: "10:00 AM - 5:00 PM",
    venue: "College Auditorium",
    registration: "Inter-College",
    teamSize: "Solo/Group",
    coordinators: [{ name: "Prof. Janaki Reddy D", phone: "984529877" }],
    studentCoords: "Varshini C Gowda"
  },
  {
    id: "petsiri-fest",
    title: "Petsiri Fest 2026",
    type: "Cultural",
    image: "/posters/petsiri-fest.png",
    description: "A fun-filled day for our furry friends! Join the cute pet contests.",
    date: "18th April 2026",
    timings: "2:00 PM",
    venue: "College Campus",
    registration: "Open to All",
    teamSize: "Individual Pet",
    coordinators: [{ name: "Manvitha M Patel", phone: "7349264044" }],
    studentCoords: "Pet Parade & Games"
  }
];

function RegistrationForm({ event, onComplete }: { event: typeof eventDetails[0], onComplete: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    email: "",
    phone: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay
    await new Promise(r => setTimeout(r, 1500));
    
    saveRegistration({
      eventId: event.id,
      eventTitle: event.title,
      ...formData
    });
    
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle2 size={40} className="text-primary" />
        </motion.div>
        <h3 className="text-2xl font-black text-white uppercase mb-2">Registration Secured!</h3>
        <p className="text-muted-foreground">Your entry has been recorded in the system.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pt-4">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-[0.2em] font-black text-primary/70">Full Name</Label>
          <Input 
            required
            className="bg-white/5 border-white/10 rounded-xl h-12 focus:border-primary/50 transition-all font-medium"
            placeholder="Enter your name"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-[0.2em] font-black text-primary/70">College / Institution</Label>
          <Input 
            required
            className="bg-white/5 border-white/10 rounded-xl h-12 focus:border-primary/50 transition-all font-medium"
            placeholder="Your college name"
            value={formData.college}
            onChange={e => setFormData({...formData, college: e.target.value})}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.2em] font-black text-primary/70">Email Address</Label>
            <Input 
              type="email"
              required
              className="bg-white/5 border-white/10 rounded-xl h-12 focus:border-primary/50 transition-all font-medium"
              placeholder="email@example.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.2em] font-black text-primary/70">Phone Number</Label>
            <Input 
              required
              className="bg-white/5 border-white/10 rounded-xl h-12 focus:border-primary/50 transition-all font-medium"
              placeholder="+91..."
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>
        </div>
      </div>
      <Button 
        type="submit" 
        disabled={loading}
        className="w-full h-14 bg-primary text-black font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all transform hover:scale-[1.02]"
      >
        {loading ? "Processing..." : "Confirm My Entry"}
      </Button>
    </form>
  );
}

function AdminPanel() {
  const [data, setData] = useState<Registration[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) setData(getRegistrations());
  }, [open]);

  const clearData = () => {
    if (confirm("Delete all registration records?")) {
      localStorage.removeItem(STORAGE_KEY);
      setData([]);
    }
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "registrations_2026.json";
    a.click();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="fixed bottom-6 right-6 z-[100] gap-3 bg-black/80 backdrop-blur-xl border-primary/20 text-primary font-black uppercase text-[10px] tracking-widest rounded-full px-6 h-14 shadow-2xl hover:bg-primary hover:text-black hover:border-transparent transition-all">
          <ClipboardList size={18} />
          Registrar Dashboard
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl bg-black/95 border-white/10 rounded-[2.5rem] p-0 overflow-hidden backdrop-blur-3xl">
        <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
          <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Event Databases</h2>
            <p className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] mt-1">Real-time Registration Records</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={exportJSON} variant="outline" className="gap-2 border-primary/20 text-primary hover:bg-primary hover:text-black">
              <Download size={16} /> Export JSON
            </Button>
            <Button onClick={clearData} variant="outline" className="gap-2 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white">
              <Trash2 size={16} /> Clear All
            </Button>
          </div>
        </div>
        <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {data.length === 0 ? (
            <div className="text-center py-20 opacity-50">No registrations found yet.</div>
          ) : (
            <div className="grid gap-4">
              {data.map((reg) => (
                <div key={reg.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center group hover:border-primary/30 transition-all">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-black uppercase text-primary">{reg.eventTitle}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-[10px] text-muted-foreground uppercase">{new Date(reg.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="text-base font-bold text-white mb-1 uppercase tracking-tight">{reg.name}</div>
                    <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{reg.college}</div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <div className="text-xs font-mono text-primary/80">{reg.email}</div>
                    <div className="text-xs font-mono text-primary/80">{reg.phone}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// --- Modified Event Card & Slider ---
function EventCard({ event, index }: { event: typeof eventDetails[0], index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative shrink-0 w-[24rem] md:w-[28rem] h-[36rem] md:h-[42rem] group"
    >
      <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-1000 -z-10" />
      
      <div className="relative h-full w-full rounded-[3rem] overflow-hidden border border-white/10 group-hover:border-primary/50 transition-all duration-700 bg-zinc-950/50 backdrop-blur-md">
        <img 
          src={event.image} 
          alt={event.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1 opacity-70 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-10 flex flex-col justify-end">
          <Badge className="w-fit mb-6 bg-primary/20 text-primary border-primary/30 backdrop-blur-xl px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">
            {event.type}
          </Badge>
          <h3 className="text-5xl font-black text-white leading-none tracking-tighter mb-4 uppercase group-hover:text-primary transition-colors">
            {event.title.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h3>
          <div className="flex items-center gap-6 text-[10px] font-black text-white/50 mb-8 uppercase tracking-[0.2em]">
            <span className="flex items-center gap-2"><Calendar size={14} className="text-primary" /> {event.date}</span>
            <span className="flex items-center gap-2"><MapPin size={14} className="text-primary" /> {event.venue.split(',')[0]}</span>
          </div>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="w-full h-16 rounded-2xl bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-between px-8 text-white font-black uppercase text-xs tracking-widest group/btn hover:bg-primary hover:text-black hover:border-transparent transition-all overflow-hidden relative">
                <span className="relative z-10 transition-transform group-hover/btn:translate-x-2">Secure Your Slot</span>
                <ChevronRight size={20} className="relative z-10 transition-transform group-hover/btn:translate-x-1" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 border-white/10 bg-black/95 backdrop-blur-[50px] overflow-hidden rounded-[3rem]">
              <div className="grid md:grid-cols-2 h-full max-h-[90vh]">
                <div className="relative p-10 bg-zinc-950 hidden md:flex items-center justify-center">
                  <motion.img 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={event.image} 
                    className="w-full h-full object-contain rounded-2xl shadow-2xl"
                  />
                </div>
                <div className="p-10 md:p-14 overflow-y-auto custom-scrollbar">
                  <Badge className="bg-primary/20 text-primary border-primary/30 mb-6 uppercase tracking-widest px-4 font-black">Registration Portal</Badge>
                  <DialogTitle className="text-4xl md:text-5xl font-black text-white leading-none tracking-tighter mb-6 uppercase italic">
                    {event.title}
                  </DialogTitle>
                  <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8 opacity-80">{event.description}</p>
                  
                  <div className="space-y-6 mb-10">
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-primary/20">
                      <div className="flex items-center gap-4">
                        <Calendar size={20} className="text-primary" />
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Event Date</div>
                          <div className="text-sm font-bold text-white uppercase">{event.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Timings</div>
                        <div className="text-sm font-bold text-primary">{event.timings || "TBA"}</div>
                      </div>
                    </div>
                  </div>

                  <RegistrationForm event={event} onComplete={() => setOpen(false)} />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollXProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="events" className="relative py-32 md:py-48 overflow-hidden bg-black">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[80rem] h-[80rem] bg-primary/10 rounded-full blur-[160px] opacity-20 pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[60rem] h-[60rem] bg-indigo-500/10 rounded-full blur-[140px] opacity-20 pointer-events-none translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-[100rem] mx-auto px-6 relative z-10">
        <ScrollReveal className="px-6 mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-8 px-8 py-3 border-primary/30 text-primary font-black uppercase tracking-[0.5em] bg-primary/5 rounded-[1.5rem] shadow-[0_0_30px_rgba(212,175,55,0.1)]">
              Phase One: Event Selection
            </Badge>
            <h2 className="font-display text-7xl md:text-9xl font-black mb-10 tracking-[-0.08em] uppercase leading-[0.75] italic">
              ARENA <span className="neon-text not-italic">ELITE</span>
            </h2>
            <p className="text-muted-foreground text-xl md:text-2xl font-medium leading-relaxed max-w-2xl">
              Immerse yourself in our premium lineup. <br />
              <span className="text-white italic">Select your challenge and secure your legacy.</span>
            </p>
          </div>
          <div className="flex gap-4 mb-2">
            <div className="text-right hidden md:block">
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/40 mb-2">Navigation Control</div>
              <div className="flex gap-1">
                <div className="w-12 h-1 bg-primary/20 rounded-full overflow-hidden">
                   <motion.div className="h-full bg-primary" style={{ scaleX, transformOrigin: "left" }} />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal Slider Area */}
        <div className="relative group/slider">
          <motion.div 
            ref={containerRef}
            className="flex gap-10 md:gap-14 overflow-x-auto pb-24 pt-4 px-6 no-scrollbar cursor-grab active:cursor-grabbing snap-x snap-mandatory"
            whileTap={{ cursor: "grabbing" }}
          >
            {eventDetails.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
            
            {/* End Spacer */}
            <div className="shrink-0 w-40" />
          </motion.div>

          {/* Draggable Hint */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover/slider:opacity-100 transition-opacity duration-700">
            <div className="flex items-center gap-4 bg-black/60 backdrop-blur-2xl p-6 rounded-l-[3rem] border border-white/10 border-r-0">
              <span className="text-white font-black text-[10px] uppercase tracking-[0.4em] rotate-180 [writing-mode:vertical-lr]">Slide for More</span>
              <ChevronRight size={32} className="text-primary animate-bounce-horizontal" />
            </div>
          </div>
        </div>
      </div>

      {/* Local Admin Access */}
      <AdminPanel />
    </section>
  );
}
