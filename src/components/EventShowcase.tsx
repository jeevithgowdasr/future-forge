import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Calendar, MapPin, Users, Phone, Award, Info } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "./ScrollAnimations";

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
    coordinators: [
      { name: "Prof. Anusha C K", phone: "9632794541" },
      { name: "Prof. Harshika U", phone: "9141633607" }
    ],
    studentCoords: "Shreya M M & Sneha M M (AI&ML)",
    highlights: ["Draw. Guess. Win!", "Inter-departmental"]
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
    coordinators: [
      { name: "Prof. Anjali", phone: "7483760914" }
    ],
    studentCoords: "Nityashree & Bhavatarini",
    highlights: ["90 Min Duration", "Bring your own laptop"]
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
    coordinators: [
      { name: "Prof. Harsha Kumar H S", phone: "9964811559" }
    ],
    studentCoords: "Jeevith Gowda S R",
    highlights: ["6 Hours Non-Stop", "Intra-College"]
  },
  {
    id: "volleyball",
    title: "Inter-Branch Volleyball",
    type: "Sports",
    image: "/posters/volleyball.jpg",
    description: "Serve, Spike, Win! The ultimate inter-branch volleyball showdown.",
    date: "7th April 2026",
    timings: "2:30 PM - 5:00 PM",
    venue: "College Volleyball Court",
    registration: "Free Entry",
    deadline: "N/A",
    teamSize: "Branch Team",
    coordinators: [
      { name: "Prajwal SV", phone: "9480291240" }
    ],
    studentCoords: "Akash & Chinmay",
    highlights: ["Inter-Branch", "Serve • Spike • Win"]
  },
  {
    id: "debate",
    title: "Debate Competition",
    type: "Literary",
    image: "/posters/debate.png",
    description: "Will AI replace human jobs? Voice your opinion in this high-stakes debate.",
    date: "15th April 2026",
    timings: "10:30 AM",
    venue: "MyCEM Campus",
    registration: "Free Entry",
    deadline: "Scan QR to register",
    teamSize: "Individual/Team",
    coordinators: [
      { name: "Prof. Yashwanth raj D", phone: "6366287448" },
      { name: "Prof. Santhosh B R", phone: "8884917430" }
    ],
    studentCoords: "Contact Coordinators",
    highlights: ["Hot AI Topic", "Public Speaking"]
  },
  {
    id: "mpl-cricket",
    title: "MPL Season 5",
    type: "Sports",
    image: "/posters/mpl-cricket.jpg",
    description: "MPL Season 5 Interbranch Cricket Tournament. The biggest cricketing event of the year.",
    date: "Starts 11th April 2026",
    timings: "Full Day",
    venue: "College Ground",
    registration: "Free Entry",
    deadline: "7th April 2026",
    teamSize: "Branch Team",
    coordinators: [
      { name: "Chethan M U", phone: "9743349231" }
    ],
    studentCoords: "Akash [CIVIL] & Sachin [CSE]",
    highlights: ["Season 5", "Interbranch Tournament"]
  },
  {
    id: "womens-cricket",
    title: "Women's Cricket",
    type: "Sports",
    image: "/posters/womens-cricket.jpg",
    description: "Women's Cricket Tournament exclusively for girls. Showcase your cricketing prowess.",
    date: "7th April 2026",
    timings: "2:30 PM - 5:00 PM",
    venue: "College Ground",
    registration: "No Entry Fee",
    deadline: "As per schedule",
    teamSize: "Girls Team",
    coordinators: [
      { name: "Siraj Ahmed", phone: "9036117441" }
    ],
    studentCoords: "N/A",
    highlights: ["Exclusively for Girls", "Inter-Department"]
  },
  {
    id: "tug-of-war",
    title: "Tug of War",
    type: "Sports",
    image: "/posters/tug-of-war.jpg",
    description: "The ultimate test of strength and team spirit. Join the Tug of War competitions.",
    date: "9th April 2026",
    timings: "2:30 PM - 5:00 PM",
    venue: "College Ground",
    registration: "No Entry Fee",
    deadline: "As per schedule",
    teamSize: "Strength of 8-10",
    coordinators: [
      { name: "Kavya DC", phone: "7483614255" },
      { name: "Harshika", phone: "9141633607" }
    ],
    studentCoords: "Contact Coordinators",
    highlights: ["Test of Strength", "Team Spirit"]
  },
  {
    id: "chess",
    title: "Inter-Branch Chess",
    type: "Sports",
    image: "/posters/chess.jpg",
    description: "Inter-Branch Chess Tournament. Think, Strategy, and Win the board.",
    date: "9th April 2026",
    timings: "Full Day",
    venue: "College Chess Hall",
    registration: "Free Entry",
    deadline: "As per schedule",
    teamSize: "Individual",
    coordinators: [
      { name: "Prajwal K M", phone: "7204163692" }
    ],
    studentCoords: "Think • Strategy • Win",
    highlights: ["Board Battle", "Strategy focused"]
  },
  {
    id: "rangoli",
    title: "Rangoli Competition",
    type: "Cultural",
    image: "/posters/rangoli.jpg",
    description: "Bring colors to life in this 1-hour Rangoli competition. Free registration.",
    date: "15th April 2026",
    timings: "1 Hour (TBA)",
    venue: "MyCEM Campus",
    registration: "Free Registration",
    deadline: "15th April",
    teamSize: "Individual/Team of 2",
    coordinators: [
      { name: "Nisarga P", phone: "9148472075" }
    ],
    studentCoords: "Nisarga P",
    highlights: ["1 Hour Time Limit", "Color Art"]
  },
  {
    id: "instrumental-music",
    title: "Instrumental Music",
    type: "Cultural",
    image: "/posters/instrumental-music.jpg",
    description: "Unleash your musical passion. Perform live on stage and win exciting prizes in the Instrumental Music Competition.",
    date: "16th April 2026",
    timings: "TBA",
    venue: "MyCEM College Open Stage",
    registration: "Open to all students",
    deadline: "16th April",
    teamSize: "Individual",
    coordinators: [
      { name: "Lavanya V", phone: "8073603113" }
    ],
    studentCoords: "Harshitha K P & Brunda M",
    highlights: ["Live Performance", "Open to all students"]
  },
  {
    id: "carrom",
    title: "Inter-Branch Carrom",
    type: "Sports",
    image: "/posters/carrom.jpg",
    description: "Inter-Branch Carrom Competition for Boys. Test your focus and precision on the board.",
    date: "Starts 10th April 2026",
    timings: "2:00 PM - 4:30 PM",
    venue: "College Campus",
    registration: "FREE",
    deadline: "10th April",
    teamSize: "Boys Only",
    coordinators: [
      { name: "Prof. Rajesh S", phone: "8722582222" },
      { name: "Prof. Jaswanth M", phone: "9986731169" }
    ],
    studentCoords: "Contact Faculty Coordinators",
    highlights: ["For Boys", "Focus & Precision"]
  },
  {
    id: "bike-stunt",
    title: "Bike Stunt Show",
    type: "Sports",
    image: "/posters/bike-stunt.jpg",
    description: "Hell Riderz presents the ultimate Bike Stunt Show. High-octane action and jaw-dropping stunts on the sports ground.",
    date: "8th April 2026",
    timings: "12:00 PM Onwards",
    venue: "Sports Ground, MyCEM",
    registration: "Event By: MM Group",
    deadline: "N/A",
    teamSize: "Spectacle",
    coordinators: [
      { name: "Hell Riderz Team", phone: "N/A" }
    ],
    studentCoords: "In association with Ad Vision & Live Photography",
    highlights: ["Hell Riderz", "High-Octane Action"]
  },
  {
    id: "stage-performance",
    title: "Stage Performance Fest",
    type: "Cultural",
    image: "/posters/stage-performance.jpg",
    description: "Inter-College Competitions: Dance Performance, Fashion Show, Ramp Walk, and Singing. The grandest stage of the year.",
    date: "17th April 2026",
    timings: "10:00 AM - 5:00 PM",
    venue: "College Auditorium",
    registration: "Inter-College Competition",
    deadline: "17th April",
    teamSize: "Solo/Group",
    coordinators: [
      { name: "Prof. Janaki Reddy D", phone: "984529877" },
      { name: "Prof. Divyashree P", phone: "9164334785" }
    ],
    studentCoords: "Varshini C Gowda, Ramyashree Rao & Spandana H M",
    highlights: ["Fashion Show", "Dance Battles", "Main Stage"]
  },
  {
    id: "singing-competition",
    title: "Singing Competition",
    type: "Cultural",
    image: "/posters/singing-competition.jpg",
    description: "Inter-College Singing Competition. Let your voice shine on the grand stage of Mysiri Sambrama.",
    date: "17th April 2026",
    timings: "10:00 AM onwards",
    venue: "Main Stage / Auditorium",
    registration: "Fee: ₹50",
    deadline: "17th April",
    teamSize: "Individual",
    coordinators: [
      { name: "Kavya DC", phone: "7483614255" }
    ],
    studentCoords: "Harshitha (90367 93583)",
    highlights: ["Inter-College", "Cash Prizes"]
  },
  {
    id: "student-stalls",
    title: "Student Stalls",
    type: "Cultural",
    image: "/posters/student-stalls.png",
    description: "Explore a variety of unique stalls hosted by our very own students. Features include Handmade Crafts, Clothing & Accessories, Books & Plants, and a wide array of Snacks & Beverages.",
    date: "18th April 2026",
    timings: "Full Day",
    venue: "College Campus",
    registration: "For Students",
    deadline: "18th April",
    teamSize: "Stall Group",
    coordinators: [
      { name: "Manvitha M Patel", phone: "7349264044" },
      { name: "R M Likhitha", phone: "9164497946" }
    ],
    studentCoords: "Contact Manvitha or Likhitha",
    highlights: ["Handmade Crafts", "Student Entrepreneurship"]
  },
  {
    id: "petsiri-fest",
    title: "Petsiri Fest 2026",
    type: "Cultural",
    image: "/posters/petsiri-fest.png",
    description: "A fun-filled day for our furry friends! Join the cute pet contests, enjoy fun games, and stand a chance to win paw-tastic prizes.",
    date: "18th April 2026",
    timings: "2:00 PM",
    venue: "College Campus",
    registration: "Open to All",
    deadline: "18th April",
    teamSize: "Individual Pet",
    coordinators: [
      { name: "Manvitha M Patel", phone: "7349264044" },
      { name: "R M Likhitha", phone: "9164497946" }
    ],
    studentCoords: "Cute Pet contests & Fun Games",
    highlights: ["Pet Contests", "Fun Games", "Win Prizes"]
  }
];

function EventCard({ event }: { event: (typeof eventDetails)[0] }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const shineBg = useTransform(
    [mouseXSpring, mouseYSpring],
    ([mx, my]) => `radial-gradient(400px circle at ${((mx as number) + 0.5) * 100}% ${((my as number) + 0.5) * 100}%, rgba(34, 211, 238, 0.2), transparent)`
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d" 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer h-full"
    >
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative glass-panel overflow-hidden rounded-[2.5rem] border-white/[0.05] hover:border-primary/50 transition-all duration-700 bg-white/[0.01] backdrop-blur-xl h-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(34,211,238,0.15)]">
            <div style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }} className="h-full">
              <div className="aspect-[3/4.5] overflow-hidden relative">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                <motion.div 
                  style={{ background: shineBg }}
                  className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
              </div>
              
              <div 
                style={{ transform: "translateZ(60px)" }}
                className="absolute bottom-0 left-0 right-0 p-8 pt-20"
              >
                <div className="flex flex-wrap gap-2 mb-5">
                  <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-md px-4 py-1 text-[10px] font-black uppercase tracking-widest">
                    {event.type}
                  </Badge>
                </div>
                
                <h3 className="text-3xl font-black mb-4 tracking-[-0.05em] group-hover:text-primary transition-colors leading-[0.85] uppercase">
                  {event.title}
                </h3>
                
                <div className="flex items-center text-[10px] font-black text-muted-foreground gap-4 group-hover:text-white transition-colors tracking-[0.2em] uppercase">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-primary/40" />
                  <span>{event.venue.split(',')[0]}</span>
                </div>
              </div>

              <div 
                style={{ transform: "translateZ(120px)" }}
                className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-700 -rotate-12 group-hover:rotate-0"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary shadow-[0_0_30px_rgba(34,211,238,0.6)] flex items-center justify-center text-black">
                  <Info size={28} />
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
        
        <DialogContent className="max-w-5xl p-0 border-white/10 bg-black/90 backdrop-blur-[50px] overflow-hidden rounded-[3rem]">
          <div className="grid md:grid-cols-2 h-full max-h-[95vh]">
            <div className="relative h-[45vh] md:h-full bg-zinc-950 group/preview flex items-center justify-center p-8">
              <motion.img 
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                src={event.image} 
                alt={event.title}
                className="max-w-full max-h-full object-contain rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 opacity-30 pointer-events-none" />
            </div>

            <div className="p-8 md:p-14 overflow-y-auto custom-scrollbar flex flex-col">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-8">
                  <Badge className="px-5 py-2 text-xs font-black uppercase tracking-[0.2em] bg-primary text-black border-none ring-4 ring-primary/20">
                    {event.type}
                  </Badge>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                </div>

                <DialogTitle className="text-5xl md:text-6xl font-black tracking-[-0.05em] mb-8 leading-[0.8] uppercase">
                  {event.title}
                </DialogTitle>
                
                <div className="bg-white/[0.03] p-7 rounded-[2rem] mb-10 border border-white/5 italic text-muted-foreground leading-relaxed text-sm md:text-base border-l-primary border-l-4">
                  "{event.description}"
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-10">
                  <div className="space-y-8">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-3xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-[inset_0_0_20px_rgba(34,211,238,0.1)]">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-black mb-2 opacity-50">Event Schedule</p>
                        <p className="text-xl font-black leading-none">{event.date}</p>
                        <p className="text-sm text-primary font-bold mt-2 uppercase tracking-widest">{event.timings}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-3xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-[inset_0_0_20px_rgba(34,211,238,0.1)]">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-black mb-2 opacity-50">Battle Ground</p>
                        <p className="text-xl font-black leading-tight uppercase">{event.venue}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-3xl bg-white/[0.03] flex items-center justify-center text-white/50 border border-white/10 shadow-inner">
                        <Users size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-black mb-2 opacity-50">Combat Format</p>
                        <p className="text-xl font-black leading-none uppercase">{event.teamSize}</p>
                        <p className="text-[11px] text-yellow-500 font-black mt-2 uppercase tracking-tighter bg-yellow-500/10 px-2 py-0.5 rounded inline-block">
                          Deadline: {event.deadline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-3xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-[inset_0_0_20px_rgba(34,211,238,0.1)]">
                        <Award size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-black mb-2 opacity-50">Entry Token</p>
                        <p className="text-xl font-black text-primary underline decoration-2 underline-offset-4 uppercase">{event.registration}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group/coords">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 transition-opacity duration-1000 group-hover/coords:opacity-100 opacity-50"></div>
                  <h4 className="font-black text-xl flex items-center gap-4 tracking-[-0.05em] uppercase italic text-white/90">
                    <div className="w-2 h-8 bg-primary rounded-full"></div>
                    Event Command Center
                  </h4>
                  <div className="grid grid-cols-1 gap-5 relative z-10">
                    {event.coordinators.map((c) => (
                      <div key={c.phone} className="flex justify-between items-center group/coord p-1">
                        <span className="text-muted-foreground font-black tracking-tight text-sm uppercase opacity-70 group-hover/coord:opacity-100 transition-opacity">{c.name}</span>
                        <a 
                          href={`tel:${c.phone}`} 
                          className="px-6 py-3 rounded-2xl bg-white/[0.03] text-primary text-xs font-bold border border-white/5 group-hover/coord:border-primary/50 group-hover/coord:bg-primary/20 transition-all tracking-[0.2em]"
                        >
                          {c.phone}
                        </a>
                      </div>
                    ))}
                    <div className="mt-4 p-6 rounded-[1.5rem] bg-primary/[0.03] border border-primary/10 backdrop-blur-md">
                      <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">Ground Operations</p>
                      <p className="text-sm font-black leading-relaxed italic text-white/90 uppercase tracking-tight">{event.studentCoords}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-14">
                <Button className="w-full h-24 text-3xl font-black uppercase tracking-[0.3em] group bg-primary hover:bg-primary/90 text-black shadow-[0_0_60px_rgba(34,211,238,0.5)] active:scale-[0.97] transition-all rounded-[2rem] relative overflow-hidden">
                  <span className="relative z-10">Sign Up Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <motion.span 
                    animate={{ x: [0, 15, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="ml-6 relative z-10"
                  >
                    →
                  </motion.span>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

const categories = ["All", "Technical", "Innovation", "Sports", "Literary", "Cultural"];

export default function EventShowcase() {
  const [filter, setFilter] = useState("All");

  const filteredEvents = filter === "All" 
    ? eventDetails 
    : eventDetails.filter(e => e.type === filter);

  return (
    <section id="lineup" className="section-padding relative overflow-visible bg-black">
      {/* Background visual flair */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none opacity-50"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none opacity-50"></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <ScrollReveal className="text-center mb-24">
          <Badge variant="outline" className="mb-8 px-8 py-3 border-primary/30 text-primary font-black uppercase tracking-[0.5em] bg-primary/5 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            Main Arena 2026
          </Badge>
          <h2 className="font-display text-7xl md:text-9xl font-black mb-10 tracking-[-0.06em] uppercase leading-[0.8]">
            THE <span className="neon-text italic">SAMBRAMA</span><br /><span className="text-transparent border-t-zinc-800 [-webkit-text-stroke:1px_rgba(255,255,255,0.1)]">EXPERIENCE</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-xl md:text-2xl font-medium leading-relaxed tracking-tight opacity-80">
            Witness the fusion of technology and tradition. Register for the most prestigious events in the region.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-20">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                onClick={() => setFilter(cat)}
                className={`px-12 py-9 rounded-[2rem] text-sm font-black uppercase tracking-[0.3em] transition-all duration-700 relative overflow-hidden group/btn ${
                  filter === cat 
                    ? "bg-primary text-black shadow-[0_0_40px_rgba(34,211,238,0.4)] -translate-y-3" 
                    : "hover:border-primary/50 text-muted-foreground border-white/5 bg-white/[0.02] backdrop-blur-md"
                }`}
              >
                <span className="relative z-10">{cat}</span>
                {filter === cat && (
                  <motion.div 
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Button>
            ))}
          </div>
        </ScrollReveal>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
