import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { SocialFeed } from "@/components/home/SocialFeed";
import { MembershipsSection } from "@/components/home/MembershipsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <ServicesShowcase />
      <FeaturedProducts />
      <MarqueeStrip reverse />
      <TestimonialsSection />
      <SocialFeed />
      <MembershipsSection />
    </>
  );
}
