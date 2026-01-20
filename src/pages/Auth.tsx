/**
 * ============================================================================
 * K1RA - AUTHENTICATION PAGE
 * Kerber Labs - Sistema de IA para Engenharia
 * 
 * Premium login/register interface with:
 * - Glassmorphism design
 * - Animated transitions between login/register
 * - Real authentication with Lovable Cloud
 * - Form validation with visual feedback
 * ============================================================================
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import k1raLogo from "@/assets/k1ra-logo.png";

// ============================================================================
// TYPES
// ============================================================================

type AuthMode = "login" | "register";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const formVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
};

// ============================================================================
// FEATURE BADGES COMPONENT
// ============================================================================

const features = [
  { icon: Sparkles, text: "IA Avançada para Engenharia" },
  { icon: Shield, text: "Dados 100% Seguros" },
  { icon: Zap, text: "Respostas em Segundos" }
];

function FeatureBadges() {
  return (
    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + index * 0.1 }}
          className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-full border border-border/50"
        >
          <feature.icon className="w-4 h-4 text-primary" />
          <span className="text-xs text-muted-foreground">{feature.text}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================================
// FLOATING ORBS BACKGROUND
// ============================================================================

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary orb */}
      <motion.div
        animate={{
          x: [0, 100, 50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.2, 0.8, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
      />
      {/* Accent orb */}
      <motion.div
        animate={{
          x: [0, -80, 30, 0],
          y: [0, 80, -40, 0],
          scale: [1, 0.9, 1.1, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
      />
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-30" />
    </div>
  );
}

// ============================================================================
// MAIN AUTH PAGE COMPONENT
// ============================================================================

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // --------------------------------------------------------------------------
  // CHECK AUTH STATE
  // --------------------------------------------------------------------------

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          navigate("/chat");
        }
      }
    );

    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/chat");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // --------------------------------------------------------------------------
  // HANDLERS
  // --------------------------------------------------------------------------

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password) {
      setError("Por favor, preencha todos os campos.");
      return false;
    }

    // Permitir emails com @ e pelo menos um caractere antes e depois
    if (!formData.email.includes("@") || formData.email.length < 3) {
      setError("Por favor, insira um e-mail válido.");
      return false;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }

    if (mode === "register") {
      if (!formData.name.trim()) {
        setError("Por favor, insira seu nome.");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("As senhas não coincidem.");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      if (mode === "register") {
        const { error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: formData.name
            }
          }
        });

        if (signUpError) {
          if (signUpError.message.includes("already registered")) {
            setError("Este e-mail já está cadastrado. Tente fazer login.");
          } else {
            setError(signUpError.message);
          }
          return;
        }

        toast({
          title: "Conta criada com sucesso!",
          description: "Bem-vindo ao K1RA. Você já pode começar a usar.",
        });
        
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) {
          if (signInError.message.includes("Invalid login credentials")) {
            setError("E-mail ou senha incorretos.");
          } else {
            setError(signInError.message);
          }
          return;
        }

        toast({
          title: "Login realizado!",
          description: "Bem-vindo de volta ao K1RA.",
        });
      }
    } catch (err) {
      setError("Ocorreu um erro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(prev => prev === "login" ? "register" : "login");
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setError(null);
  };

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* ================================================================
          LEFT SIDE - BRANDING & INFO (Desktop only)
          ================================================================ */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
        <FloatingOrbs />
        
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            {/* Logo */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
              <div className="relative">
                <img src={k1raLogo} alt="K1RA" className="w-16 h-16" />
                <div className="absolute inset-0 bg-primary/30 blur-xl" />
              </div>
              <div>
                <span className="text-4xl font-bold tracking-tight">K1RA</span>
                <p className="text-xs text-muted-foreground">Knowledge-Integrated Reasoning Architecture</p>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={itemVariants}
              className="heading-1 mb-6"
            >
              <span className="gradient-text-primary">Revolucione</span>
              <br />
              seus projetos de
              <br />
              engenharia
            </motion.h1>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              A inteligência artificial mais avançada para 
              engenharia. Análises estruturais, documentação técnica e 
              suporte especializado em segundos.
            </motion.p>

            {/* Feature badges */}
            <motion.div variants={itemVariants}>
              <FeatureBadges />
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="mt-12 grid grid-cols-3 gap-8"
            >
              {[
                { value: "500+", label: "Engenheiros" },
                { value: "10k+", label: "Projetos" },
                { value: "99.9%", label: "Precisão" }
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* ================================================================
          RIGHT SIDE - AUTH FORM
          ================================================================ */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex flex-col items-center justify-center gap-2 mb-8">
            <img src={k1raLogo} alt="K1RA" className="w-12 h-12" />
            <span className="text-2xl font-bold">K1RA</span>
            <p className="text-xs text-muted-foreground text-center">Knowledge-Integrated Reasoning Architecture</p>
          </div>

          {/* Form card */}
          <div className="glass-strong rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="heading-4 mb-2">
                {mode === "login" ? "Bem-vindo de volta" : "Criar conta"}
              </h2>
              <p className="text-muted-foreground">
                {mode === "login" 
                  ? "Entre para acessar seus projetos" 
                  : "Comece sua jornada com a IA K1RA"
                }
              </p>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <AnimatePresence mode="wait">
              <motion.form
                key={mode}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Name field (register only) */}
                {mode === "register" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Nome completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Seu nome"
                        value={formData.name}
                        onChange={handleInputChange("name")}
                        className="pl-11 h-12 bg-secondary/50 border-border/50 focus:border-primary/50"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Email field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    E-mail
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleInputChange("email")}
                      className="pl-11 h-12 bg-secondary/50 border-border/50 focus:border-primary/50"
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange("password")}
                      className="pl-11 pr-11 h-12 bg-secondary/50 border-border/50 focus:border-primary/50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm password (register only) */}
                {mode === "register" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Confirmar senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleInputChange("confirmPassword")}
                        className="pl-11 pr-11 h-12 bg-secondary/50 border-border/50 focus:border-primary/50"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full h-12 text-base group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      />
                      <span>Aguarde...</span>
                    </div>
                  ) : (
                    <>
                      <span>{mode === "login" ? "Entrar" : "Criar conta"}</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </motion.form>
            </AnimatePresence>

            {/* Toggle mode */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {mode === "login" ? "Não tem uma conta?" : "Já tem uma conta?"}
                <button
                  onClick={toggleMode}
                  className="ml-1.5 text-primary hover:underline font-medium"
                >
                  {mode === "login" ? "Criar conta" : "Fazer login"}
                </button>
              </p>
            </div>

            {/* Back to home */}
            <div className="mt-4 text-center">
              <Link 
                to="/" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Voltar ao site
              </Link>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Ao continuar, você concorda com nossos{" "}
            <a href="#" className="underline hover:text-foreground">Termos de Uso</a>
            {" "}e{" "}
            <a href="#" className="underline hover:text-foreground">Política de Privacidade</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
