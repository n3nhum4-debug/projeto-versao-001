/**
 * ============================================================================
 * K1RA - FEATURES SECTION
 * Premium feature cards with exceptional mobile experience
 * ============================================================================
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Cpu,
  FileText,
  Layers,
  Ruler,
  Shield,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Análise por IA",
    description:
      "Inteligência artificial especializada em engenharia para análise estrutural, térmica e mecânica.",
    gradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    icon: FileText,
    title: "Documentação Técnica",
    description:
      "Geração automática de relatórios, memoriais de cálculo e especificações técnicas completas.",
    gradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    icon: Layers,
    title: "Projetos Detalhados",
    description:
      "Plantas, cortes, elevações e detalhamentos construtivos em alta resolução.",
    gradient: "from-orange-500/10 to-yellow-500/10",
  },
  {
    icon: Ruler,
    title: "Desenhos CAD",
    description:
      "Arquivos DWG e DXF prontos para uso em AutoCAD, SketchUp e outros softwares profissionais.",
    gradient: "from-green-500/10 to-emerald-500/10",
  },
  {
    icon: Shield,
    title: "Normas Técnicas",
    description:
      "Projetos em conformidade com ABNT, ISO e normas internacionais de engenharia.",
    gradient: "from-red-500/10 to-orange-500/10",
  },
  {
    icon: Zap,
    title: "Entrega Expressa",
    description:
      "Receba seu projeto completo em até 2 dias úteis diretamente no seu email.",
    gradient: "from-indigo-500/10 to-purple-500/10",
  },
];

export function FeaturesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      id="features" 
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      <div className="relative section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16 lg:mb-20 px-4"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-block px-4 py-1.5 text-xs sm:text-sm font-medium text-primary bg-primary/10 rounded-full mb-4"
          >
            Funcionalidades
          </motion.span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-balance mb-4">
            Tudo que Você Precisa para{" "}
            <span className="gradient-text-primary">Projetos de Engenharia</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma plataforma completa que combina inteligência artificial avançada
            com ferramentas profissionais de engenharia.
          </p>
        </motion.div>

        {/* Features Grid - Mobile-first */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`relative h-full p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-card/60 backdrop-blur-sm border border-border/30 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden group`}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center mb-4 sm:mb-5 shadow-lg shadow-primary/5"
                  >
                    <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </motion.div>

                  {/* Text */}
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative corner gradient */}
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
