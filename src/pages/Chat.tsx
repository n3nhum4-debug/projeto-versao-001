/**
 * ============================================================================
 * K1RA - PROFESSIONAL AI CHAT
 * Ultra-minimal, Lovable-inspired chat interface with sidebar
 * ============================================================================
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Send,
  Plus,
  LogOut,
  Menu,
  X,
  Sparkles,
  User,
  Copy,
  Check,
  MessageSquare,
  Trash2,
  CreditCard,
  ArrowRight,
  Home,
  Settings,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { pricingPlans } from "@/data/pricing";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { ScrollArea } from "@/components/ui/scroll-area";
import k1raLogo from "@/assets/k1ra-logo.png";

// ============================================================================
// TYPES
// ============================================================================

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  recommendedPlan?: string;
}

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// WELCOME MESSAGE
// ============================================================================

const welcomeMessage: Message = {
  id: "welcome",
  role: "assistant",
  content: `Olá. Eu sou **K1RA** — *Knowledge-Integrated Reasoning Architecture*.

Descreva seu projeto e eu irei:
- 📐 **Analisar a complexidade** com precisão absoluta
- 💡 **Recomendar o plano ideal** para sua necessidade

**O que você deseja projetar?**`,
  timestamp: new Date()
};

// ============================================================================
// AI STREAMING HELPER
// ============================================================================

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-ai`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: { role: string; content: string }[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({ error: "Erro desconhecido" }));
      onError(errorData.error || `Erro ${resp.status}`);
      onDone();
      return;
    }

    if (!resp.body) {
      onError("Sem resposta do servidor");
      onDone();
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, newlineIndex);
        buffer = buffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          // Incomplete JSON, put back
          buffer = line + "\n" + buffer;
          break;
        }
      }
    }

    onDone();
  } catch (e) {
    console.error("Stream error:", e);
    onError("Erro de conexão. Tente novamente.");
    onDone();
  }
}

// Plan detection from AI response
function detectPlanFromContent(content: string): string | undefined {
  const lower = content.toLowerCase();
  if (lower.includes("empresarial") || lower.includes("enterprise") || lower.includes("r$ 4.999")) return "enterprise";
  if (lower.includes("avançado") || lower.includes("advanced") || lower.includes("r$ 997")) return "advanced";
  if (lower.includes("profissional") || lower.includes("r$ 297")) return "pro";
  if (lower.includes("básico") || lower.includes("basic") || lower.includes("r$ 79")) return "basic";
  return undefined;
}

// ============================================================================
// TYPING INDICATOR
// ============================================================================

function TypingIndicator() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 px-4 py-3"
    >
      <motion.div 
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 rounded-full bg-gradient-to-r from-primary/20 to-primary/40 flex items-center justify-center"
      >
        <Sparkles className="w-4 h-4 text-primary" />
      </motion.div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{ 
              duration: 0.8, 
              repeat: Infinity, 
              delay: i * 0.15,
              ease: "easeInOut"
            }}
            className="w-2 h-2 bg-primary rounded-full"
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground ml-1">K1RA está processando...</span>
    </motion.div>
  );
}

// ============================================================================
// PLAN RECOMMENDATION CARD
// ============================================================================

function PlanRecommendationCard({ planId }: { planId: string }) {
  const plan = pricingPlans.find(p => p.id === planId) || pricingPlans[1];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="mt-4 p-4 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-primary rounded-full"
            />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">Recomendado</span>
          </div>
          <p className="text-sm font-semibold">{plan.name} — {plan.priceFormatted}</p>
        </div>
        <Button asChild size="sm" className="group shadow-lg shadow-primary/20">
          <Link to={`/checkout?plan=${planId}`}>
            Escolher Plano
            <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}

// ============================================================================
// MESSAGE BUBBLE
// ============================================================================

function MessageBubble({ message, onCopy }: { message: Message; onCopy: (text: string) => void }) {
  const [copied, setCopied] = useState(false);
  const isAssistant = message.role === "assistant";

  const handleCopy = () => {
    onCopy(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>');
      if (line.startsWith("- ")) {
        return (
          <div key={i} className="flex gap-2 my-1">
            <span className="text-primary">•</span>
            <span dangerouslySetInnerHTML={{ __html: line.slice(2) }} />
          </div>
        );
      }
      return <p key={i} className={line === "" ? "h-3" : ""} dangerouslySetInnerHTML={{ __html: line }} />;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`flex gap-3 ${isAssistant ? "" : "flex-row-reverse"}`}
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring" }}
        className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg ${
          isAssistant 
            ? "bg-gradient-to-br from-primary/20 to-primary/40" 
            : "bg-gradient-to-br from-secondary to-secondary/50"
        }`}
      >
        {isAssistant ? (
          <Sparkles className="w-4 h-4 text-primary" />
        ) : (
          <User className="w-4 h-4 text-foreground" />
        )}
      </motion.div>

      <div className={`group relative max-w-[80%] ${isAssistant ? "" : "text-right"}`}>
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className={`inline-block px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
            isAssistant
              ? "bg-card/80 backdrop-blur-sm border border-border/50 rounded-tl-md text-left"
              : "bg-primary text-primary-foreground rounded-tr-md shadow-primary/20"
          }`}
        >
          {isAssistant ? renderContent(message.content) : message.content}
        </motion.div>

        {isAssistant && message.recommendedPlan && (
          <PlanRecommendationCard planId={message.recommendedPlan} />
        )}

        {isAssistant && (
          <motion.button
            initial={{ opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleCopy}
            className="absolute -right-10 top-3 p-1.5 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

// ============================================================================
// PLANS PANEL (Overlay)
// ============================================================================

function PlansPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="absolute right-0 top-0 bottom-0 w-80 sm:w-96 bg-card/95 backdrop-blur-xl border-l border-border flex flex-col shadow-2xl"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Escolha seu Plano</h3>
          </div>
          <Button onClick={onClose} variant="ghost" size="icon" className="rounded-lg">
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-3">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="p-4 rounded-2xl border cursor-pointer transition-all duration-200 border-border/50 bg-card/50 hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold">{plan.name}</span>
                  <span className="text-[10px] px-2.5 py-1 bg-primary/10 text-primary rounded-full font-medium">
                    {plan.complexity}
                  </span>
                </div>
                <p className="text-3xl font-bold mb-1">{plan.priceFormatted}</p>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{plan.description}</p>
                <Button asChild size="sm" variant="outline" className="w-full group">
                  <Link to={`/checkout?plan=${plan.id}`}>
                    Selecionar
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </motion.div>
    </div>
  );
}

// ============================================================================
// FLOATING INPUT (Lovable-style)
// ============================================================================

function FloatingInput({
  value,
  onChange,
  onSend,
  isTyping
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  isTyping: boolean;
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + "px";
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="w-full max-w-2xl mx-auto px-4"
    >
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-primary/5 overflow-hidden"
      >
        {/* Animated gradient border */}
        <motion.div
          animate={{ 
            background: [
              "linear-gradient(90deg, hsl(var(--primary)/0.3), transparent, hsl(var(--primary)/0.3))",
              "linear-gradient(90deg, transparent, hsl(var(--primary)/0.3), transparent)",
              "linear-gradient(90deg, hsl(var(--primary)/0.3), transparent, hsl(var(--primary)/0.3))"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ padding: "1px" }}
        />
        
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Descreva seu projeto de engenharia..."
          rows={1}
          className="w-full bg-transparent px-5 py-4 pr-14 text-sm resize-none focus:outline-none placeholder:text-muted-foreground/60 max-h-32"
        />
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onSend}
            disabled={!value.trim() || isTyping}
            size="icon"
            className="absolute right-3 bottom-3 rounded-xl h-10 w-10 shadow-lg shadow-primary/30"
          >
            <Send className="w-4 h-4" />
          </Button>
        </motion.div>
      </motion.div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xs text-muted-foreground/50 text-center mt-4"
      >
        Pressione <kbd className="px-1.5 py-0.5 bg-secondary/50 rounded text-[10px]">Enter</kbd> para enviar
      </motion.p>
    </motion.div>
  );
}

// ============================================================================
// MAIN CHAT PAGE
// ============================================================================

export default function Chat() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPlansOpen, setIsPlansOpen] = useState(false);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const hasStarted = messages.length > 0;

  // Auth
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email || "" });
      } else {
        setUser(null);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email || "" });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load conversations
  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  const loadConversations = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("conversations")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });
    
    if (data) setConversations(data);
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Auto-resize input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + "px";
    }
  }, [inputValue]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // If first message, add welcome first
    if (messages.length === 0) {
      setMessages([welcomeMessage]);
      await new Promise((r) => setTimeout(r, 100));
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Build messages for API (without welcomeMessage and timestamps)
    const apiMessages = [...messages, userMessage]
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role, content: m.content }));

    let assistantContent = "";
    const assistantId = (Date.now() + 1).toString();

    // Create initial assistant message
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "", timestamp: new Date() },
    ]);

    await streamChat({
      messages: apiMessages,
      onDelta: (chunk) => {
        assistantContent += chunk;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: assistantContent } : m
          )
        );
      },
      onDone: () => {
        setIsTyping(false);
        // Detect plan recommendation
        const detectedPlan = detectPlanFromContent(assistantContent);
        if (detectedPlan) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, recommendedPlan: detectedPlan } : m
            )
          );
        }
      },
      onError: (error) => {
        toast({ title: "Erro", description: error, variant: "destructive" });
        setIsTyping(false);
      },
    });

    // Save to DB
    if (user) {
      try {
        let convId = activeConversationId;

        if (!convId) {
          const { data: newConv } = await supabase
            .from("conversations")
            .insert({ user_id: user.id, title: userMessage.content.slice(0, 50) })
            .select()
            .single();

          if (newConv) {
            convId = newConv.id;
            setActiveConversationId(convId);
            setConversations((prev) => [newConv, ...prev]);
          }
        }

        if (convId && assistantContent) {
          await supabase.from("chat_messages").insert([
            { user_id: user.id, role: "user", content: userMessage.content, conversation_id: convId },
            { user_id: user.id, role: "assistant", content: assistantContent, conversation_id: convId },
          ]);
        }
      } catch (error) {
        console.error("Error saving messages:", error);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copiado!", description: "Mensagem copiada para a área de transferência" });
  };

  const handleNewConversation = () => {
    setMessages([]);
    setActiveConversationId(null);
    setIsSidebarOpen(false);
  };

  const handleSelectConversation = async (id: string) => {
    setActiveConversationId(id);
    setIsSidebarOpen(false);

    const { data } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("conversation_id", id)
      .order("created_at", { ascending: true });

    if (data) {
      const msgs: Message[] = [welcomeMessage, ...data.map(m => ({
        id: m.id,
        role: m.role as "user" | "assistant",
        content: m.content,
        timestamp: new Date(m.created_at)
      }))];
      setMessages(msgs);
    }
  };

  const handleDeleteConversation = async (id: string) => {
    await supabase.from("conversations").delete().eq("id", id);
    setConversations(prev => prev.filter(c => c.id !== id));
    if (activeConversationId === id) {
      handleNewConversation();
    }
    toast({ title: "Conversa excluída" });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* ================================================================
          SIDEBAR - Always visible on desktop
          ================================================================ */}
      
      {/* Mobile overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-50 
        w-72 bg-card/50 backdrop-blur-xl border-r border-border 
        flex flex-col 
        transform transition-transform duration-300 ease-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Header */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <motion.img 
                whileHover={{ rotate: 10 }}
                src={k1raLogo} 
                alt="K1RA" 
                className="w-8 h-8" 
              />
              <span className="font-bold text-lg tracking-tight">K1RA</span>
            </Link>
            <Button 
              onClick={() => setIsSidebarOpen(false)} 
              variant="ghost" 
              size="icon" 
              className="lg:hidden rounded-lg"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <Button 
            onClick={handleNewConversation} 
            variant="outline" 
            className="w-full justify-start gap-2 rounded-xl border-dashed" 
            size="sm"
          >
            <Plus className="w-4 h-4" />
            Nova conversa
          </Button>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1 p-2">
          <p className="px-3 py-2 text-xs text-muted-foreground/70 font-medium uppercase tracking-wider">
            Conversas Recentes
          </p>
          {conversations.length === 0 ? (
            <div className="px-3 py-8 text-center">
              <MessageSquare className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground/50">Nenhuma conversa ainda</p>
            </div>
          ) : (
            <div className="space-y-1 mt-1">
              {conversations.map((conv, index) => (
                <motion.div
                  key={conv.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                  className={`group flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                    activeConversationId === conv.id 
                      ? "bg-primary/10 text-primary border border-primary/20" 
                      : "hover:bg-secondary/50"
                  }`}
                  onClick={() => handleSelectConversation(conv.id)}
                >
                  <MessageSquare className="w-4 h-4 flex-shrink-0 opacity-60" />
                  <span className="flex-1 text-sm truncate">{conv.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteConversation(conv.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-destructive/10 rounded-lg text-destructive transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="p-3 border-t border-border/50 space-y-3">
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSelector />
          </div>
          
          {user && (
            <div className="flex items-center gap-2 px-2 py-2 bg-secondary/30 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <span className="flex-1 text-xs truncate">{user.email}</span>
            </div>
          )}
          
          <div className="flex gap-2">
            <Button asChild variant="ghost" size="sm" className="flex-1 justify-start rounded-lg">
              <Link to="/">
                <Home className="w-3.5 h-3.5 mr-1.5" />
                Site
              </Link>
            </Button>
            {user && (
              <Button variant="ghost" size="sm" onClick={handleLogout} className="rounded-lg">
                <LogOut className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Plans Panel */}
      <AnimatePresence>
        <PlansPanel isOpen={isPlansOpen} onClose={() => setIsPlansOpen(false)} />
      </AnimatePresence>

      {/* ================================================================
          MAIN CONTENT
          ================================================================ */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-4 h-14 border-b border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => setIsSidebarOpen(true)} 
              variant="ghost" 
              size="icon"
              className="lg:hidden rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50"
              />
              <span className="text-sm font-medium">K1RA Online</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              onClick={() => setIsPlansOpen(true)} 
              variant="ghost" 
              size="sm" 
              className="gap-2 rounded-lg"
            >
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Planos</span>
            </Button>
            {!user && (
              <Button asChild variant="default" size="sm" className="rounded-lg">
                <Link to="/auth">Entrar</Link>
              </Button>
            )}
          </div>
        </header>

        {/* Content */}
        {!hasStarted ? (
          /* ============================================
             EMPTY STATE - Lovable-style floating input
             ============================================ */
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            {/* Animated background orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{ 
                  x: [0, 50, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ 
                  x: [0, -30, 0],
                  y: [0, 50, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative text-center mb-10"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 mb-6 shadow-xl shadow-primary/10"
              >
                <img src={k1raLogo} alt="K1RA" className="w-12 h-12" />
              </motion.div>
              <h1 className="text-3xl font-bold mb-3">K1RA</h1>
              <p className="text-muted-foreground max-w-md leading-relaxed">
                Descreva seu projeto de engenharia. Eu analisarei e recomendarei o plano ideal.
              </p>
            </motion.div>

            <FloatingInput
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSendMessage}
              isTyping={isTyping}
            />

            {/* Quick suggestions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-wrap justify-center gap-2"
            >
              {["Projeto residencial simples", "Estrutura metálica industrial", "Reforma de fachada"].map((suggestion, i) => (
                <motion.button
                  key={suggestion}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  onClick={() => setInputValue(suggestion)}
                  className="px-4 py-2 text-xs bg-secondary/50 hover:bg-secondary border border-border/50 rounded-full text-muted-foreground hover:text-foreground transition-all"
                >
                  {suggestion}
                </motion.button>
              ))}
            </motion.div>
          </div>
        ) : (
          /* ============================================
             CHAT VIEW - Messages and input
             ============================================ */
          <>
            <ScrollArea className="flex-1">
              <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
                <AnimatePresence>
                  {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} onCopy={handleCopy} />
                  ))}
                </AnimatePresence>
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t border-border/50 bg-card/30 backdrop-blur-sm p-4">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-end gap-2 bg-card/80 rounded-2xl border border-border/50 focus-within:border-primary/50 focus-within:shadow-lg focus-within:shadow-primary/5 transition-all">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Continue a conversa..."
                    rows={1}
                    className="flex-1 bg-transparent px-4 py-3 text-sm resize-none focus:outline-none max-h-32 placeholder:text-muted-foreground/50"
                  />
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      size="icon"
                      className="m-2 rounded-xl h-9 w-9"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
