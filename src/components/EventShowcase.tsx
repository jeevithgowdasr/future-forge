import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, Phone, X, Award, Info, Filter } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  }
];

const categories = ["All", "Technical", "Innovation", "Sports", "Literary", "Cultural"];

export default function EventShowcase() {
  const [filter, setFilter] = useState("All");

  const filteredEvents = filter === "All" 
    ? eventDetails 
    : eventDetails.filter(e => e.type === filter);

  return (
    <section id="lineup" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30 text-primary">
            Event Posters
          </Badge>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            MYSIRI <span className="neon-text">Lineup</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-10">
            Dive into the detailed posters of our flagship events. Click on any card to view the full details and registration info.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                onClick={() => setFilter(cat)}
                className={`transition-all duration-300 ${filter === cat ? "neon-glow-cyan" : ""}`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </ScrollReveal>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="group relative glass-panel overflow-hidden cursor-pointer rounded-2xl border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                      <div className="aspect-[3/4] overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">{event.type}</Badge>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground gap-3">
                          <Calendar size={14} className="text-primary" />
                          <span>{event.date}</span>
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
                          <Info size={20} />
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  
                  <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-white/10">
                    <div className="grid md:grid-cols-2 h-full max-h-[90vh]">
                      <div className="relative h-[400px] md:h-full bg-black flex items-center justify-center">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="p-8 overflow-y-auto custom-scrollbar">
                        <Badge className="mb-4">{event.type}</Badge>
                        <DialogTitle className="text-3xl font-bold mb-4">{event.title}</DialogTitle>
                        <p className="text-muted-foreground mb-8 leading-relaxed">
                          {event.description}
                        </p>

                        <div className="grid grid-cols-1 gap-6 mb-8">
                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary">
                              <Calendar size={20} />
                            </div>
                            <div>
                              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Date & Time</p>
                              <p className="text-lg font-medium">{event.date} @ {event.timings}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary">
                              <MapPin size={20} />
                            </div>
                            <div>
                              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Venue</p>
                              <p className="text-lg font-medium">{event.venue}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary">
                              <Users size={20} />
                            </div>
                            <div>
                              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Requirement</p>
                              <p className="text-lg font-medium">{event.teamSize} • Last Date: {event.deadline}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary">
                              <Award size={20} />
                            </div>
                            <div>
                              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Registration</p>
                              <p className="text-lg font-medium text-primary">{event.registration}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4 border-t border-white/10 pt-6">
                          <h4 className="font-semibold text-lg flex items-center gap-2">
                            <Phone size={18} className="text-primary" />
                            Coordinators
                          </h4>
                          <div className="grid grid-cols-1 gap-3">
                            {event.coordinators.map((c) => (
                              <div key={c.phone} className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                                <span className="text-sm font-medium">{c.name}</span>
                                <a href={`tel:${c.phone}`} className="text-primary text-sm font-bold hover:underline">{c.phone}</a>
                              </div>
                            ))}
                            <p className="text-xs text-muted-foreground pt-2">
                              <span className="font-semibold">Student Co-ords:</span> {event.studentCoords}
                            </p>
                          </div>
                        </div>

                        <div className="mt-8">
                          <Button className="w-full h-12 text-lg font-bold group neon-glow-cyan">
                            Participate Now
                            <motion.span 
                              animate={{ x: [0, 5, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                              className="ml-2"
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
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
