/**
 * ============================================================================
 * K1RA - FOOTER COMPONENT
 * Premium footer with links, social media, and branding
 * ============================================================================
 */

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import k1raLogo from "@/assets/k1ra-logo.png";

const footerLinks = {
  produto: [{
    label: "Funcionalidades",
    href: "#features"
  }, {
    label: "Como Funciona",
    href: "#how-it-works"
  }, {
    label: "Planos",
    href: "#pricing"
  }, {
    label: "Projetos",
    href: "#demo"
  }],
  empresa: [{
    label: "Sobre Nós",
    href: "#about"
  }, {
    label: "Contato",
    href: "#contact"
  }, {
    label: "Blog",
    href: "#blog"
  }, {
    label: "Carreiras",
    href: "#careers"
  }],
  legal: [{
    label: "Termos de Uso",
    href: "/termos"
  }, {
    label: "Privacidade",
    href: "/privacidade"
  }, {
    label: "Cookies",
    href: "/cookies"
  }]
};

const socialLinks = [{
  icon: Twitter,
  href: "https://twitter.com/kerberlabs",
  label: "Twitter"
}, {
  icon: Linkedin,
  href: "https://linkedin.com/company/kerberlabs",
  label: "LinkedIn"
}, {
  icon: Github,
  href: "https://github.com/kerberlabs",
  label: "GitHub"
}];

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  };
  
  return (
    <footer className="relative bg-card/50 border-t border-border">
      {/* Gradient overlay no topo */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="section-container section-padding">
        {/* Grid Principal */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <motion.a 
              href="#" 
              onClick={e => {
                e.preventDefault();
                window.scrollTo({
                  top: 0,
                  behavior: "smooth"
                });
              }} 
              className="flex items-center gap-3 mb-6 group" 
              whileHover={{ scale: 1.02 }}
            >
              <img src={k1raLogo} alt="K1RA" className="w-10 h-10 object-contain" />
              <span className="text-2xl font-bold tracking-tight">K1RA</span>
            </motion.a>

            <p className="text-muted-foreground mb-6 max-w-xs leading-relaxed">
              Transformando ideias em projetos profissionais de engenharia através
              de inteligência artificial avançada.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <a 
                href="mailto:kerberlabs@proton.me" 
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span>kerberlabs@proton.me</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">Liberland</span>
                  <span className="text-xs">45° 46′N 18° 52′E</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(social => (
                <motion.a 
                  key={social.label} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ scale: 1.1, y: -2 }} 
                  whileTap={{ scale: 0.95 }} 
                  className="p-2 bg-secondary hover:bg-primary/10 hover:text-primary rounded-lg transition-colors" 
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Produto */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Produto</h3>
            <ul className="space-y-3">
              {footerLinks.produto.map(link => (
                <li key={link.label}>
                  <button 
                    onClick={() => scrollToSection(link.href)} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map(link => (
                <li key={link.label}>
                  <button 
                    onClick={() => scrollToSection(link.href)} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map(link => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Kerber Labs. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}