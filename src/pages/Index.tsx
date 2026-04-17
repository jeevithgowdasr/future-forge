
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/ProgramsSection";
import EventShowcase from "@/components/EventShowcase";
import InnovationSection from "@/components/InnovationSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { SectionDivider } from "@/components/ScrollAnimations";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">

      <Navbar />
      <HeroSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <EventsSection />
      <SectionDivider />
      <EventShowcase />
      <SectionDivider />
      <InnovationSection />
      <SectionDivider />
      <AchievementsSection />
      <SectionDivider />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
