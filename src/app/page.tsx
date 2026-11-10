import FAQ from "@/components/FAQ";
import FeatureScenes from "@/components/FeatureScenes";
import FirstScroll from "@/components/FirstScroll";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import LogoSheet from "@/components/LogoSheet";
import Opportunity from "@/components/Opportunity";
import QuotesCarousel from "@/components/QuotesCarousel";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <FirstScroll />
      <LogoSheet />
      <Opportunity />

      <div data-theme-light="true">
        <FeatureScenes />
        <QuotesCarousel />
      </div>

      <Journey />
      <FAQ />
    </div>
  );
}
