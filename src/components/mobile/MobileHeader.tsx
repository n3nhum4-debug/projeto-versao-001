/**
 * ============================================================================
 * MOBILE HEADER - Compact, animated header for mobile
 * ============================================================================
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import k1raLogo from "@/assets/k1ra-logo.png";

interface MobileHeaderProps {
  onMenuOpen?: () => void;
}

export function MobileHeader({ onMenuOpen }: MobileHeaderProps) {
  const { scrollY } = useScroll();
  const { t } = useLanguage();
  
  const headerBg = useTransform(
    scrollY,
    [0, 50],
    ["rgba(0,0,0,0)", "rgba(var(--card)/0.8)"]
  );
  
  const headerBlur = useTransform(
    scrollY,
    [0, 50],
    ["blur(0px)", "blur(20px)"]
  );

  return (
    <motion.header
      style={{ 
        backgroundColor: headerBg as any,
        backdropFilter: headerBlur as any,
      }}
      className="fixed top-0 left-0 right-0 z-50 lg:hidden pt-safe"
    >
      <div className="flex items-center justify-between px-4 h-14">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <motion.img
            whileTap={{ scale: 0.9, rotate: -10 }}
            src={k1raLogo}
            alt="K1RA"
            className="w-8 h-8"
          />
          <span className="font-bold text-lg">K1RA</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LanguageSelector />
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuOpen}
            className="rounded-xl"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      {/* Bottom gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </motion.header>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useLanguage();
  
  const menuItems = [
    { label: t("nav.features"), href: "#features" },
    { label: t("nav.howItWorks"), href: "#how-it-works" },
    { label: t("nav.pricing"), href: "#pricing" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-background/90 backdrop-blur-xl z-50"
      />

      {/* Menu Panel - Full screen slide up */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed inset-x-0 bottom-0 top-14 z-50 bg-card/95 backdrop-blur-2xl rounded-t-3xl border-t border-border overflow-hidden"
      >
        {/* Drag handle */}
        <div className="flex justify-center py-3">
          <div className="w-12 h-1.5 bg-border rounded-full" />
        </div>

        {/* Menu content */}
        <div className="px-6 pb-safe">
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => scrollToSection(item.href)}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-secondary/30 hover:bg-secondary/50 active:scale-98 transition-all group"
              >
                <span className="text-lg font-medium">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </motion.button>
            ))}
          </nav>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 space-y-3"
          >
            <Button asChild variant="outline" className="w-full h-14 rounded-2xl text-base">
              <Link to="/auth" onClick={onClose}>
                {t("nav.login")}
              </Link>
            </Button>
            <Button asChild variant="hero" className="w-full h-14 rounded-2xl text-base group">
              <Link to="/chat" onClick={onClose}>
                {t("nav.startProject")}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          {/* Footer info */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-xs text-muted-foreground/50 mt-8"
          >
            Inteligência Artificial para Engenharia
          </motion.p>
        </div>
      </motion.div>
    </>
  );
}
