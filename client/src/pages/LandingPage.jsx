import Hero from '../components/landing/Hero';
import ProblemSection from '../components/landing/ProblemSection';
import SolutionSection from '../components/landing/SolutionSection';
import FeatureShowcase from '../components/landing/FeatureShowcase';
import HowItWorks from '../components/landing/HowItWorks';
import DashboardPreview from '../components/landing/DashboardPreview';
import CTASection from '../components/landing/CTASection';

export default function LandingPage() {
  return (
    <main className="relative overflow-x-clip bg-brand-bg">
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <FeatureShowcase />
      <HowItWorks />
      <DashboardPreview />
      <CTASection />
    </main>
  );
}
