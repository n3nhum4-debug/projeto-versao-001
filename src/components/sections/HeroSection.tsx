/**
 * ============================================================================
 * K1RA - HERO SECTION
 * Premium Webflow-quality hero with sophisticated animations
 * Desktop-first design with exceptional visual hierarchy
 * ============================================================================
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Shield, Clock, ChevronDown, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Link } from "react-router-dom";

export function HeroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: Zap,
      label: "IA Avançada",
      description: "Tecnologia de última geração",
    },
    {
      icon: Clock,
      label: "Entrega Rápida",
      description: "Até 2 dias úteis",
    },
    {
      icon: Shield,
      label: "100% Seguro",
      description: "Dados protegidos",
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ================================================================
          PREMIUM BACKGROUND EFFECTS
          ================================================================ */}
      {/* Base gradient mesh */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Radial gradient from center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />

      {/* Animated Orbs - Large and subtle */}
      <motion.div
        style={{ y }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px]"
      />

      {/* ================================================================
          MAIN CONTENT
          ================================================================ */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative section-container pt-28 lg:pt-36 pb-20"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Subtle badge without the full tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 lg:mb-10"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-card/60 border border-border/50 backdrop-blur-xl shadow-lg shadow-primary/5"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="p-1.5 rounded-full bg-primary/10"
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-sm font-medium text-foreground">
                Inteligência Artificial para Engenharia
              </span>
            </motion.div>
          </motion.div>

          {/* Main Heading - Sophisticated Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05] mb-6 lg:mb-8">
              <span className="block">Transforme Ideias em</span>
              <span className="block mt-2 gradient-text-primary">
                Projetos Profissionais
              </span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 lg:mb-12 leading-relaxed"
          >
            A K1RA utiliza IA de última geração para criar projetos de engenharia
            completos — entregues em até 2 dias úteis.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 lg:mb-20"
          >
            <Button
              asChild
              variant="hero"
              size="lg"
              className="group h-14 px-8 text-base rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-shadow"
            >
              <Link to="/chat">
                <span>Começar Meu Projeto</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("#how-it-works")}
              className="group h-14 px-8 text-base rounded-2xl border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <MousePointer2 className="w-5 h-5 mr-2" />
              <span>Ver Como Funciona</span>
            </Button>
          </motion.div>

          {/* Trust Badges - Premium Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative p-5 lg:p-6 rounded-2xl bg-card/40 backdrop-blur-xl border border-border/30 hover:border-primary/30 hover:bg-card/60 transition-all duration-300 cursor-pointer"
              >
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative flex flex-col items-center gap-3">
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10"
                  >
                    <feature.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div className="text-center">
                    <h3 className="font-semibold text-foreground mb-0.5">{feature.label}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator - Elegant Design */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex"
        >
          <motion.button
            onClick={() => scrollToSection("#features")}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-medium">Explorar</span>
            <div className="w-6 h-10 rounded-full border-2 border-border/50 group-hover:border-primary/30 flex items-start justify-center p-2 transition-colors">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-2 bg-primary rounded-full"
              />
            </div>
          </motion.button>
        </motion.div>

        {/* Mobile scroll hint */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="lg:hidden flex justify-center mt-12"
        >
          <motion.button
            onClick={() => scrollToSection("#features")}
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="p-3 rounded-full bg-card/50 border border-border/30"
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
