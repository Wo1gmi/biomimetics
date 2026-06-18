import { HeroSection } from "./components/HeroSection";
import { ProblemSection } from "./components/ProblemSection";
import { BioMappingSection } from "./components/BioMappingSection";
import { SystemUploadSection } from "./components/SystemUploadSection";
import { TransformationSection } from "./components/TransformationSection";
import { CaseStudiesSection } from "./components/CaseStudiesSection";
import { MetricsSection } from "./components/MetricsSection";
import { CTASection, NavBar, Footer } from "./components/CTASection";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="pt-16">
        <HeroSection />
        <ProblemSection />
        <BioMappingSection />
        <SystemUploadSection />
        <TransformationSection />
        <CaseStudiesSection />
        <MetricsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
