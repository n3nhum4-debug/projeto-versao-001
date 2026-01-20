/**
 * ============================================================================
 * K1RA - LANDING PAGE
 * Kerber Labs - Sistema de IA para Engenharia
 * 
 * Main landing page combining all sections
 * ============================================================================
 */

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { DemoSection } from "@/components/sections/DemoSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ================================================================
          HEADER - Navigation with glassmorphism
          ================================================================ */}
      <Header />

      {/* ================================================================
          MAIN CONTENT - All landing page sections
          ================================================================ */}
      <main>
        {/* Hero Section - Full-height intro with CTAs */}
        <HeroSection />

        {/* Features Section - Platform capabilities grid */}
        <FeaturesSection />

        {/* Demo Section - Animated project showcase */}
        <DemoSection />

        {/* How It Works - 3-step process */}
        <HowItWorksSection />

        {/* Pricing Section - Plan comparison cards */}
        <PricingSection />

        {/* CTA Section - Final conversion push */}
        <CTASection />
      </main>

      {/* ================================================================
          FOOTER - Links, contact, branding
          ================================================================ */}
      <Footer />
    </div>
  );
};

export default Index;
