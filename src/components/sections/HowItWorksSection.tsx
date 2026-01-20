/**
 * ============================================================================
 * K1RA - HOW IT WORKS SECTION
 * Step-by-step process with premium mobile experience
 * ============================================================================
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, CreditCard, Mail, ArrowRight, Check } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Descreva Seu Projeto",
    description:
      "Converse com nossa IA e descreva em detalhes o que você precisa. Ela vai analisar a complexidade e recomendar o plano ideal.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
  },
  {
    number: "02",
    icon: CreditCard,
    title: "Confirme e Pague",
    description:
      "Escolha o plano recomendado e realize o pagamento de forma segura via PIX, com confirmação instantânea.",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
  },
  {
    number: "03",
    icon: Mail,
    title: "Receba no Email",
    description:
      "Em até 2 dias úteis, você receberá o projeto completo no email cadastrado, pronto para uso profissional.",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
  },
];

export function HowItWorksSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="relative section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20 px-4"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-block px-4 py-1.5 text-xs sm:text-sm font-medium text-primary bg-primary/10 rounded-full mb-4"
          >
            Como Funciona
          </motion.span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-balance mb-4">
            Simples como{" "}
            <span className="gradient-text-primary">1, 2, 3</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Processo 100% digital e automatizado para entregar seu projeto
            de engenharia com agilidade e qualidade.
          </p>
        </motion.div>

        {/* Steps - Mobile-first vertical layout */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative">
            {/* Connection Line - Vertical on mobile, horizontal on desktop */}
            <div className="hidden lg:block absolute top-[72px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-green-500/30" />
            
            {/* Mobile vertical line */}
            <div className="lg:hidden absolute top-0 bottom-0 left-7 w-0.5 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-green-500/30" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Mobile layout - horizontal card */}
                  <div className="lg:hidden flex gap-5">
                    {/* Number circle */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative z-10 flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                    >
                      <step.icon className="w-6 h-6 text-white" />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-muted-foreground">
                          PASSO {step.number}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Desktop layout - vertical card */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="hidden lg:block text-center"
                  >
                    {/* Number circle */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`relative z-10 w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl mb-6`}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                      
                      {/* Pulse ring */}
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.color}`}
                      />
                    </motion.div>

                    {/* Step number */}
                    <span className="inline-block px-3 py-1 text-xs font-bold text-muted-foreground bg-secondary/50 rounded-full mb-3">
                      PASSO {step.number}
                    </span>

                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed px-2">
                      {step.description}
                    </p>
                  </motion.div>

                  {/* Arrow between steps (desktop) */}
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.5 + index * 0.2 }}
                      className="hidden lg:flex absolute top-[72px] -right-3 z-20"
                    >
                      <div className="w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 text-primary" />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 sm:mt-16 px-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <Check className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Sem complicação. Sem burocracia.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
