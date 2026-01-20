/**
 * ============================================================================
 * K1RA - HEADER COMPONENT
 * Navigation header with glassmorphism effect
 * 
 * Features:
 * - Sticky header with backdrop blur
 * - Responsive mobile menu
 * - Smooth scroll to sections
 * - Login/CTA buttons with navigation
 * ============================================================================
 */

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import k1raLogo from "@/assets/k1ra-logo.png";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavItem {
  label: string;
  href: string;
}

export function Header() {
  const { t } = useLanguage();

  const navItems: NavItem[] = useMemo(
    () => [
      { label: t("nav.features"), href: "#features" },
      { label: t("nav.howItWorks"), href: "#how-it-works" },
      { label: t("nav.pricing"), href: "#pricing" },
      { label: t("nav.contact"), href: "#contact" },
    ],
    [t],
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detecta scroll para aplicar efeitos no header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll suave para seções
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* ================================================================
          HEADER PRINCIPAL
          ================================================================ */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/5"
            : "bg-transparent"
        }`}
      >
        <div className="section-container">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-3 group"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="relative"
              >
                <img
                  src={k1raLogo}
                  alt="K1RA"
                  className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
                />
                {/* Glow effect no hover */}
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
              <span className="text-xl lg:text-2xl font-bold tracking-tight">
                K1RA
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2">
              <ThemeToggle />
              <LanguageSelector />
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth">{t("nav.login")}</Link>
              </Button>
              <Button variant="hero" size="sm" className="group" asChild>
                <Link to="/chat">
                  {t("nav.startProject")}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* ================================================================
          MOBILE MENU OVERLAY
          ================================================================ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-16 left-0 right-0 bg-card/95 backdrop-blur-xl border-b border-border z-40 lg:hidden"
            >
              <div className="section-container py-6">
                <nav className="flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => scrollToSection(item.href)}
                      className="flex items-center justify-between px-4 py-3 text-lg text-foreground hover:bg-secondary rounded-lg transition-colors"
                    >
                      {item.label}
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </motion.button>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-border flex flex-col gap-3">
                  <div className="flex items-center justify-center gap-3">
                    <ThemeToggle />
                    <LanguageSelector />
                  </div>
                  <Button variant="outline" className="w-full justify-center" asChild>
                    <Link to="/auth">{t("nav.login")}</Link>
                  </Button>
                  <Button variant="hero" className="w-full justify-center" asChild>
                    <Link to="/chat">
                      {t("nav.startProject")}
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
