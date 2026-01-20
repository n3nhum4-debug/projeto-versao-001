/**
 * ============================================================================
 * K1RA - PRICING SECTION
 * Webflow-quality pricing with complexity levels
 * All plans include everything - price varies by complexity
 * ============================================================================
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { Check, ArrowRight, MessageSquare, Sparkles, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pricingPlans, universalDeliverables } from "@/data/pricing";
import { Link } from "react-router-dom";
import { useRef } from "react";

export function PricingSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={sectionRef} id="pricing" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Effects */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 gradient-mesh opacity-30"
      />
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
            whileHover={{ scale: 1.02 }}
          >
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Níveis de Complexidade
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4 lg:mb-6">
            Preço por{" "}
            <span className="gradient-text-primary">Complexidade</span>
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Todos os planos incluem os mesmos entregáveis completos.
            O preço varia apenas pela complexidade técnica do seu projeto.
          </p>
        </motion.div>

        {/* What's Included Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-6 lg:p-8 bg-card/60 backdrop-blur-xl rounded-2xl lg:rounded-3xl border border-border/50"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Todos os planos incluem:
                </h3>
                <p className="text-sm text-muted-foreground">
                  Entregáveis completos independente do nível
                </p>
              </div>
            </div>
            
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {universalDeliverables.slice(0, 4).map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pricing Grid - Webflow Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="group relative"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="h-full p-6 lg:p-8 rounded-2xl lg:rounded-3xl bg-card/50 backdrop-blur-xl border border-border/50 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
              >
                {/* Complexity Badge */}
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-3">
                    {plan.complexity}
                  </span>
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-border/50">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl lg:text-5xl font-bold gradient-text-primary">
                      {plan.priceFormatted}
                    </span>
                    <span className="text-muted-foreground text-sm">/projeto</span>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  asChild
                  variant="outline"
                  className="w-full mb-6 group/btn border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <Link to="/chat">
                    Falar com K1RA
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </Button>

                {/* Examples */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Exemplos de Projetos
                  </p>
                  <ul className="space-y-2">
                    {plan.examples.map((example, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1 h-1 mt-2 rounded-full bg-primary shrink-0" />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-6 lg:p-8 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 backdrop-blur-sm">
            <div className="text-center sm:text-left">
              <h3 className="text-lg lg:text-xl font-semibold mb-1">
                Não sabe qual nível escolher?
              </h3>
              <p className="text-sm text-muted-foreground">
                Descreva seu projeto para a K1RA e ela recomendará o nível ideal.
              </p>
            </div>
            <Button asChild variant="hero" size="lg" className="group whitespace-nowrap">
              <Link to="/chat">
                <MessageSquare className="w-5 h-5 mr-2" />
                Conversar com K1RA
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Trust Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            💳 Pagamento seguro via PIX ou Cartão •{" "}
            📧 Entrega em até 2 dias úteis
          </p>
        </motion.div>
      </div>
    </section>
  );
}
