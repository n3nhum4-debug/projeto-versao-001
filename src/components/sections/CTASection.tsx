/**
 * ============================================================================
 * K1RA - CTA SECTION
 * Final call-to-action before footer
 * ============================================================================
 */

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative section-padding overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 gradient-mesh opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
      </div>

      <div className="relative section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Card Container */}
          <div className="relative p-8 lg:p-16 rounded-3xl bg-card/50 backdrop-blur-xl border border-border/50 overflow-hidden">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-50" />
            <div className="absolute inset-[1px] rounded-3xl bg-card" />

            {/* Content */}
            <div className="relative text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Comece Hoje Mesmo
                </span>
              </motion.div>

              <h2 className="heading-2 text-balance mb-4">
                Pronto para Transformar{" "}
                <span className="gradient-text-primary">Sua Ideia</span> em
                Realidade?
              </h2>

              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                Junte-se a centenas de profissionais que já utilizam o K1RA para
                criar projetos de engenharia de alta qualidade.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="hero"
                  size="xl"
                  onClick={() => scrollToSection("#pricing")}
                  className="group w-full sm:w-auto"
                >
                  Começar Meu Projeto
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="glass"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Falar com Especialista
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}