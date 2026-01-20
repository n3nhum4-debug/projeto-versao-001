/**
 * ============================================================================
 * LANGUAGE CONTEXT
 * Multi-language support for K1RA
 * ============================================================================
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "pt-BR" | "en-US" | "es-ES";

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

const translations: Translations = {
  // Header
  "nav.features": { "pt-BR": "Funcionalidades", "en-US": "Features", "es-ES": "Características" },
  "nav.howItWorks": { "pt-BR": "Como Funciona", "en-US": "How It Works", "es-ES": "Cómo Funciona" },
  "nav.pricing": { "pt-BR": "Planos", "en-US": "Pricing", "es-ES": "Precios" },
  "nav.contact": { "pt-BR": "Contato", "en-US": "Contact", "es-ES": "Contacto" },
  "nav.login": { "pt-BR": "Entrar", "en-US": "Sign In", "es-ES": "Iniciar Sesión" },
  "nav.startProject": { "pt-BR": "Começar Projeto", "en-US": "Start Project", "es-ES": "Iniciar Proyecto" },
  
  // Hero
  "hero.badge": { "pt-BR": "IA de próxima geração", "en-US": "Next-gen AI", "es-ES": "IA de próxima generación" },
  "hero.title1": { "pt-BR": "Projetos de Engenharia", "en-US": "Engineering Projects", "es-ES": "Proyectos de Ingeniería" },
  "hero.title2": { "pt-BR": "Criados por IA", "en-US": "Created by AI", "es-ES": "Creados por IA" },
  "hero.description": { 
    "pt-BR": "Transforme suas ideias em projetos técnicos profissionais. Nossa IA cria desenhos, memoriais e documentação completa em até 2 dias úteis.",
    "en-US": "Transform your ideas into professional technical projects. Our AI creates drawings, reports and complete documentation in up to 2 business days.",
    "es-ES": "Transforma tus ideas en proyectos técnicos profesionales. Nuestra IA crea planos, memorias y documentación completa en hasta 2 días hábiles."
  },
  
  // Chat
  "chat.newConversation": { "pt-BR": "Nova conversa", "en-US": "New conversation", "es-ES": "Nueva conversación" },
  "chat.conversations": { "pt-BR": "Conversas", "en-US": "Conversations", "es-ES": "Conversaciones" },
  "chat.placeholder": { "pt-BR": "Descreva seu projeto...", "en-US": "Describe your project...", "es-ES": "Describe tu proyecto..." },
  "chat.send": { "pt-BR": "Enviar", "en-US": "Send", "es-ES": "Enviar" },
  "chat.plans": { "pt-BR": "Planos", "en-US": "Plans", "es-ES": "Planes" },
  "chat.selectPlan": { "pt-BR": "Selecionar plano", "en-US": "Select plan", "es-ES": "Seleccionar plan" },
  
  // Pricing
  "pricing.title": { "pt-BR": "Planos e Preços", "en-US": "Plans & Pricing", "es-ES": "Planes y Precios" },
  "pricing.basic": { "pt-BR": "Básico", "en-US": "Basic", "es-ES": "Básico" },
  "pricing.pro": { "pt-BR": "Profissional", "en-US": "Professional", "es-ES": "Profesional" },
  "pricing.advanced": { "pt-BR": "Avançado", "en-US": "Advanced", "es-ES": "Avanzado" },
  "pricing.enterprise": { "pt-BR": "Empresarial", "en-US": "Enterprise", "es-ES": "Empresarial" },
  
  // Auth
  "auth.login": { "pt-BR": "Entrar", "en-US": "Sign In", "es-ES": "Iniciar Sesión" },
  "auth.register": { "pt-BR": "Criar conta", "en-US": "Create account", "es-ES": "Crear cuenta" },
  "auth.email": { "pt-BR": "E-mail", "en-US": "Email", "es-ES": "Correo" },
  "auth.password": { "pt-BR": "Senha", "en-US": "Password", "es-ES": "Contraseña" },
  "auth.forgotPassword": { "pt-BR": "Esqueceu a senha?", "en-US": "Forgot password?", "es-ES": "¿Olvidó su contraseña?" },
  
  // Admin
  "admin.dashboard": { "pt-BR": "Painel Admin", "en-US": "Admin Dashboard", "es-ES": "Panel de Admin" },
  "admin.users": { "pt-BR": "Usuários", "en-US": "Users", "es-ES": "Usuarios" },
  "admin.projects": { "pt-BR": "Projetos", "en-US": "Projects", "es-ES": "Proyectos" },
  "admin.payments": { "pt-BR": "Pagamentos", "en-US": "Payments", "es-ES": "Pagos" },
  "admin.conversations": { "pt-BR": "Conversas", "en-US": "Conversations", "es-ES": "Conversaciones" },
  
  // Common
  "common.loading": { "pt-BR": "Carregando...", "en-US": "Loading...", "es-ES": "Cargando..." },
  "common.save": { "pt-BR": "Salvar", "en-US": "Save", "es-ES": "Guardar" },
  "common.cancel": { "pt-BR": "Cancelar", "en-US": "Cancel", "es-ES": "Cancelar" },
  "common.delete": { "pt-BR": "Excluir", "en-US": "Delete", "es-ES": "Eliminar" },
  "common.back": { "pt-BR": "Voltar", "en-US": "Back", "es-ES": "Volver" },
  "common.darkMode": { "pt-BR": "Modo escuro", "en-US": "Dark mode", "es-ES": "Modo oscuro" },
  "common.lightMode": { "pt-BR": "Modo claro", "en-US": "Light mode", "es-ES": "Modo claro" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  availableLanguages: { code: Language; label: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const availableLanguages: { code: Language; label: string; flag: string }[] = [
  { code: "pt-BR", label: "Português", flag: "🇧🇷" },
  { code: "en-US", label: "English", flag: "🇺🇸" },
  { code: "es-ES", label: "Español", flag: "🇪🇸" },
];

function detectBrowserLanguage(): Language {
  const browserLang = navigator.language;
  if (browserLang.startsWith("pt")) return "pt-BR";
  if (browserLang.startsWith("es")) return "es-ES";
  return "en-US";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem("k1ra-language") as Language;
    return stored || detectBrowserLanguage();
  });

  useEffect(() => {
    localStorage.setItem("k1ra-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language] || translation["pt-BR"] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
