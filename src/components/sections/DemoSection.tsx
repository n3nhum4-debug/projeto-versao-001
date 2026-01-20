/**
 * ============================================================================
 * K1RA - PROJECTS SHOWCASE SECTION
 * Technical blueprint-style project gallery
 * Webflow-quality design with CAD-inspired visuals
 * ============================================================================
 */

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Cog, Home, Armchair, Wrench, Box, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// ============================================================================
// TECHNICAL PROJECT DATA - Realistic projects
// ============================================================================

const technicalProjects = [
  {
    id: 1,
    title: "Sistema de Engrenagens 3D",
    category: "Impressão 3D",
    description: "Redutor planetário projetado para fabricação em impressora 3D com tolerâncias precisas",
    specs: ["PLA/PETG", "Ratio 1:5", "Torque 2Nm"],
    icon: Cog,
  },
  {
    id: 2,
    title: "Móveis Sob Medida",
    category: "Marcenaria",
    description: "Projeto completo de estante modular com sistema de encaixe para sala de estar",
    specs: ["MDF 18mm", "2.4m altura", "Modulável"],
    icon: Armchair,
  },
  {
    id: 3,
    title: "Elevador Residencial",
    category: "Automação",
    description: "Sistema de elevador hidráulico para residência com 2 pavimentos e acessibilidade",
    specs: ["Cap. 300kg", "2 paradas", "Hidráulico"],
    icon: Home,
  },
  {
    id: 4,
    title: "Suporte CNC Fresadora",
    category: "Metalurgia",
    description: "Estrutura de suporte para fresadora CNC desktop com sistema de nivelamento",
    specs: ["Aço SAE 1020", "Mesa 600x400", "Vibração -80%"],
    icon: Wrench,
  },
  {
    id: 5,
    title: "Caixa Organizadora Modular",
    category: "Impressão 3D",
    description: "Sistema de organização modular com divisórias ajustáveis para oficina",
    specs: ["PETG", "Encaixável", "IP54"],
    icon: Box,
  },
  {
    id: 6,
    title: "Bancada de Trabalho",
    category: "Marcenaria",
    description: "Bancada profissional com tampo de MDF e estrutura em metalon reforçado",
    specs: ["1.8m x 0.8m", "Cap. 500kg", "Ajustável"],
    icon: Ruler,
  }
];

// ============================================================================
// BLUEPRINT CARD - CAD-inspired design
// ============================================================================

function BlueprintCard({ 
  project, 
  index 
}: { 
  project: typeof technicalProjects[0]; 
  index: number;
}) {
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative h-full overflow-hidden rounded-2xl lg:rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
      >
        {/* Blueprint Header */}
        <div className="relative h-48 lg:h-56 overflow-hidden bg-gradient-to-br from-[#1a2744] to-[#0d1829]">
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
          
          {/* Technical Drawing Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
            {/* Horizontal lines */}
            <line x1="10%" y1="30%" x2="90%" y2="30%" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="5,5" />
            <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="5,5" />
            <line x1="10%" y1="70%" x2="90%" y2="70%" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="5,5" />
            
            {/* Vertical lines */}
            <line x1="30%" y1="10%" x2="30%" y2="90%" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="5,5" />
            <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="5,5" />
            <line x1="70%" y1="10%" x2="70%" y2="90%" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="5,5" />
            
            {/* Dimension lines */}
            <line x1="15%" y1="85%" x2="85%" y2="85%" stroke="#60a5fa" strokeWidth="1" />
            <line x1="15%" y1="82%" x2="15%" y2="88%" stroke="#60a5fa" strokeWidth="1" />
            <line x1="85%" y1="82%" x2="85%" y2="88%" stroke="#60a5fa" strokeWidth="1" />
            
            {/* Center crosshair */}
            <circle cx="50%" cy="50%" r="15" stroke="#3b82f6" strokeWidth="0.5" fill="none" />
            <line x1="50%" y1="35%" x2="50%" y2="65%" stroke="#3b82f6" strokeWidth="0.5" />
            <line x1="35%" y1="50%" x2="65%" y2="50%" stroke="#3b82f6" strokeWidth="0.5" />
          </svg>

          {/* Center Icon */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="p-6 rounded-full bg-blue-500/20 border border-blue-500/30">
              <Icon className="w-10 h-10 text-blue-400" />
            </div>
          </motion.div>

          {/* Corner markers */}
          <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-blue-500/50" />
          <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-blue-500/50" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-blue-500/50" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-blue-500/50" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-sm text-xs font-medium text-blue-300 border border-blue-500/30">
              {project.category}
            </span>
          </div>

          {/* Drawing Number */}
          <div className="absolute bottom-4 right-4">
            <span className="text-xs font-mono text-blue-400/60">
              DWG-{String(project.id).padStart(4, '0')}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 lg:p-6">
          <h4 className="text-lg lg:text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h4>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>
          
          {/* Specs Grid */}
          <div className="flex flex-wrap gap-2">
            {project.specs.map((spec, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-secondary/50 border border-border/30 text-xs text-muted-foreground rounded-lg font-mono"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// STATS SECTION
// ============================================================================

function StatsSection() {
  const stats = [
    { value: "500+", label: "Projetos Entregues" },
    { value: "98%", label: "Satisfação" },
    { value: "2 dias", label: "Prazo Médio" },
    { value: "24/7", label: "Suporte IA" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16 lg:mb-20"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * index }}
          whileHover={{ y: -4 }}
          className="p-4 lg:p-6 rounded-2xl bg-card/50 border border-border/50 text-center backdrop-blur-sm"
        >
          <p className="text-2xl lg:text-3xl xl:text-4xl font-bold gradient-text-primary mb-1">
            {stat.value}
          </p>
          <p className="text-xs lg:text-sm text-muted-foreground">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function DemoSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      id="demo"
      className="relative py-20 lg:py-32 overflow-hidden bg-background"
    >
      {/* Background Effects */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 gradient-mesh opacity-30"
      />
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-primary">
              Projetos Técnicos
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4 lg:mb-6">
            Exemplos de{" "}
            <span className="gradient-text-primary">Projetos</span>
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Projetos reais desenvolvidos com precisão técnica. 
            Do conceito ao desenho técnico completo.
          </p>
        </motion.div>

        {/* Stats Section */}
        <StatsSection />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {technicalProjects.map((project, index) => (
            <BlueprintCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 lg:p-8 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 backdrop-blur-sm">
            <div className="text-center sm:text-left">
              <h3 className="text-lg lg:text-xl font-semibold mb-1">
                Tem um projeto em mente?
              </h3>
              <p className="text-sm text-muted-foreground">
                Descreva sua ideia e receba um orçamento personalizado.
              </p>
            </div>
            <Button asChild variant="hero" size="lg" className="group whitespace-nowrap">
              <Link to="/chat">
                Iniciar Projeto
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
