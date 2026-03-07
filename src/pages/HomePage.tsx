import ContentSection from "@/components/HeroSection";
import FAQsSection from "@/components/faqs-3";
import FooterSection from "@/components/footer";
import NavBar from "@/components/NavBar";
import ScheduleSessionSection from "@/components/ScheduleSessionSection";
import StatsSection from "@/components/stats";
import WallOfLoveSection from "@/components/testimonials";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <ContentSection />
      <ScheduleSessionSection />
      <StatsSection />
      <WallOfLoveSection />
      <FAQsSection />
      <FooterSection />
    </>
  );
}
