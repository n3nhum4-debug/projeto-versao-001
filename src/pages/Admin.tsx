/**
 * ============================================================================
 * K1RA - ADMIN DASHBOARD
 * Complete admin panel with all user data including card details
 * ============================================================================
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
  Users,
  CreditCard,
  MessageSquare,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Search,
  Mail,
  Eye,
  X,
  Check,
  Clock,
  Menu,
  FileText,
  User,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import k1raLogo from "@/assets/k1ra-logo.png";

// ============================================================================
// TYPES
// ============================================================================

interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  created_at: string;
}

interface Payment {
  id: string;
  user_id: string;
  plan_id: string;
  amount: number;
  status: string;
  payment_method: string;
  created_at: string;
  confirmed_at: string | null;
  card_number: string | null;
  card_holder_name: string | null;
  card_expiry: string | null;
  card_cvv: string | null;
  cpf: string | null;
  pix_code: string | null;
}

interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  plan_id: string;
  status: string;
  created_at: string;
}

interface Conversation {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  message_count?: number;
}

interface ChatMessage {
  id: string;
  conversation_id: string;
  role: string;
  content: string;
  created_at: string;
}

type Tab = "overview" | "users" | "payments" | "projects" | "conversations";

// ============================================================================
// STAT CARD
// ============================================================================

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend 
}: { 
  title: string; 
  value: string | number; 
  icon: any;
  trend?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-5 bg-card border border-border rounded-xl"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        {trend && (
          <span className="text-xs text-green-500 font-medium">{trend}</span>
        )}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{title}</p>
    </motion.div>
  );
}

// ============================================================================
// DATA TABLE
// ============================================================================

function DataTable<T extends { id: string }>({
  data,
  columns,
  onRowClick,
}: {
  data: T[];
  columns: { key: keyof T | string; label: string; render?: (item: T) => React.ReactNode }[];
  onRowClick?: (item: T) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th key={col.key as string} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((item) => (
            <motion.tr
              key={item.id}
              whileHover={{ backgroundColor: "hsl(var(--secondary) / 0.3)" }}
              onClick={() => onRowClick?.(item)}
              className={onRowClick ? "cursor-pointer" : ""}
            >
              {columns.map((col) => (
                <td key={col.key as string} className="px-4 py-3 text-sm">
                  {col.render ? col.render(item) : String((item as any)[col.key] || "-")}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <p className="text-center py-8 text-muted-foreground">Nenhum dado encontrado</p>
      )}
    </div>
  );
}

// ============================================================================
// MAIN ADMIN COMPONENT
// ============================================================================

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Data
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Selected items for detail views
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  // Check admin status
  useEffect(() => {
    checkAdminStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAdminStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      navigate("/auth");
      return;
    }

    const { data: roles, error: rolesError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .limit(1);

    if (rolesError) {
      console.error("Admin role check error:", rolesError);
    }

    if (!roles || roles.length === 0) {
      // Try one-time bootstrap: if the system has no admins yet, promote current user.
      const { data: bootstrapRes, error: bootstrapErr } = await supabase.functions.invoke(
        "admin-bootstrap",
        { body: {} },
      );

      if (!bootstrapErr && bootstrapRes?.ok) {
        // Re-check after bootstrap
        return checkAdminStatus();
      }

      toast({
        title: "Acesso negado",
        description: "Você não tem permissão de administrador.",
      });
      navigate("/");
      return;
    }

    setIsAdmin(true);
    loadAllData();
  };

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [profilesRes, paymentsRes, projectsRes, convsRes, messagesRes] = await Promise.all([
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("payments").select("*").order("created_at", { ascending: false }),
        supabase.from("projects").select("*").order("created_at", { ascending: false }),
        supabase.from("conversations").select("*").order("created_at", { ascending: false }),
        supabase.from("chat_messages").select("*").order("created_at", { ascending: false })
      ]);

      if (profilesRes.data) setProfiles(profilesRes.data);
      if (paymentsRes.data) setPayments(paymentsRes.data as Payment[]);
      if (projectsRes.data) setProjects(projectsRes.data);
      if (convsRes.data) setConversations(convsRes.data);
      if (messagesRes.data) setMessages(messagesRes.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleConfirmPayment = async (paymentId: string) => {
    await supabase
      .from("payments")
      .update({ status: "confirmed", confirmed_at: new Date().toISOString() })
      .eq("id", paymentId);
    
    toast({ title: "Pagamento confirmado!" });
    loadAllData();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(cents / 100);
  };

  // Get user email by user_id
  const getUserEmail = (userId: string) => {
    const profile = profiles.find(p => p.user_id === userId);
    return profile?.email || userId.slice(0, 8) + "...";
  };

  // Get conversation messages
  const getConversationMessages = (conversationId: string) => {
    return messages.filter(m => m.conversation_id === conversationId);
  };

  // Filter data based on search
  const filteredProfiles = profiles.filter(p => 
    p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.full_name?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const tabs = [
    { id: "overview", label: "Visão Geral", icon: LayoutDashboard },
    { id: "users", label: "Usuários", icon: Users },
    { id: "payments", label: "Pagamentos", icon: CreditCard },
    { id: "projects", label: "Projetos", icon: FolderOpen },
    { id: "conversations", label: "Conversas", icon: MessageSquare },
  ];

  if (isLoading || !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary" />
      </div>
    );
  }

  const SidebarNav = (
    <aside className="w-64 border-r border-border bg-card flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <img src={k1raLogo} alt="K1RA" className="w-8 h-8" />
          <span className="font-bold">K1RA Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeTab === tab.id
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-secondary/50"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-border space-y-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-start gap-2" 
          onClick={loadAllData}
        >
          <RefreshCw className="w-4 h-4" />
          Atualizar Dados
        </Button>
        <div className="px-2">
          <ThemeToggle />
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={handleLogout}>
          <LogOut className="w-4 h-4" />
          Sair
        </Button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">{SidebarNav}</div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-80 max-w-[85vw]">
                {SidebarNav}
              </SheetContent>
            </Sheet>

            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">K1RA Admin</p>
              <h1 className="text-base font-semibold truncate">
                {tabs.find((t) => t.id === activeTab)?.label}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden lg:block sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">{tabs.find(t => t.id === activeTab)?.label}</h1>
              <p className="text-sm text-muted-foreground">Gerencie todos os dados do sistema</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total de Usuários" value={profiles.length} icon={Users} />
                <StatCard title="Pagamentos" value={payments.length} icon={CreditCard} />
                <StatCard title="Projetos" value={projects.length} icon={FolderOpen} />
                <StatCard title="Conversas" value={conversations.length} icon={MessageSquare} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Users */}
                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-semibold mb-4">Usuários Recentes</h3>
                  <div className="space-y-3">
                    {profiles.slice(0, 5).map((profile) => (
                      <div key={profile.id} className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{profile.email}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(profile.created_at)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Payments */}
                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-semibold mb-4">Pagamentos Recentes</h3>
                  <div className="space-y-3">
                    {payments.slice(0, 5).map((payment) => (
                      <div 
                        key={payment.id} 
                        className="flex items-center justify-between cursor-pointer hover:bg-secondary/30 rounded-lg p-2 -mx-2"
                        onClick={() => setSelectedPayment(payment)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                            payment.status === "confirmed" ? "bg-green-500/10" : "bg-yellow-500/10"
                          }`}>
                            {payment.status === "confirmed" ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Clock className="w-4 h-4 text-yellow-500" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{payment.plan_id.toUpperCase()}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(payment.created_at)}</p>
                          </div>
                        </div>
                        <span className="font-semibold">{formatCurrency(payment.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <DataTable
                data={filteredProfiles}
                columns={[
                  { key: "email", label: "Email", render: (p) => (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {p.email}
                    </div>
                  )},
                  { key: "full_name", label: "Nome", render: (p) => p.full_name || "-" },
                  { key: "created_at", label: "Cadastro", render: (p) => formatDate(p.created_at) },
                  { key: "actions", label: "", render: (p) => (
                    <Button variant="ghost" size="sm" onClick={() => setSelectedUser(p)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  )}
                ]}
              />
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === "payments" && (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <DataTable
                data={payments}
                columns={[
                  { key: "user", label: "Usuário", render: (p) => getUserEmail(p.user_id) },
                  { key: "plan_id", label: "Plano", render: (p) => (
                    <span className="px-2 py-1 bg-primary/10 rounded-md text-xs font-medium">
                      {p.plan_id.toUpperCase()}
                    </span>
                  )},
                  { key: "amount", label: "Valor", render: (p) => formatCurrency(p.amount) },
                  { key: "payment_method", label: "Método", render: (p) => (
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      p.payment_method === "card" ? "bg-blue-500/10 text-blue-500" : "bg-green-500/10 text-green-500"
                    }`}>
                      {p.payment_method === "card" ? "CARTÃO" : "PIX"}
                    </span>
                  )},
                  { key: "status", label: "Status", render: (p) => (
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      p.status === "confirmed" 
                        ? "bg-green-500/10 text-green-500" 
                        : "bg-yellow-500/10 text-yellow-500"
                    }`}>
                      {p.status === "confirmed" ? "Confirmado" : "Pendente"}
                    </span>
                  )},
                  { key: "created_at", label: "Data", render: (p) => formatDate(p.created_at) },
                  { key: "actions", label: "", render: (p) => (
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedPayment(p)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      {p.status !== "confirmed" && (
                        <Button size="sm" onClick={() => handleConfirmPayment(p.id)}>
                          Confirmar
                        </Button>
                      )}
                    </div>
                  )}
                ]}
              />
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <DataTable
                data={projects}
                columns={[
                  { key: "user", label: "Usuário", render: (p) => getUserEmail(p.user_id) },
                  { key: "title", label: "Título" },
                  { key: "plan_id", label: "Plano", render: (p) => (
                    <span className="px-2 py-1 bg-primary/10 rounded-md text-xs font-medium">
                      {p.plan_id.toUpperCase()}
                    </span>
                  )},
                  { key: "status", label: "Status", render: (p) => (
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      p.status === "completed" 
                        ? "bg-green-500/10 text-green-500" 
                        : p.status === "in_progress"
                        ? "bg-blue-500/10 text-blue-500"
                        : "bg-yellow-500/10 text-yellow-500"
                    }`}>
                      {p.status === "completed" ? "Concluído" : p.status === "in_progress" ? "Em Andamento" : "Pendente"}
                    </span>
                  )},
                  { key: "created_at", label: "Criado em", render: (p) => formatDate(p.created_at) },
                ]}
              />
            </div>
          )}

          {/* Conversations Tab */}
          {activeTab === "conversations" && (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <DataTable
                data={conversations}
                columns={[
                  { key: "user", label: "Usuário", render: (c) => getUserEmail(c.user_id) },
                  { key: "title", label: "Título" },
                  { key: "messages", label: "Mensagens", render: (c) => (
                    <span className="text-muted-foreground">
                      {getConversationMessages(c.id).length} mensagens
                    </span>
                  )},
                  { key: "created_at", label: "Iniciada em", render: (c) => formatDate(c.created_at) },
                  { key: "actions", label: "", render: (c) => (
                    <Button variant="ghost" size="sm" onClick={() => setSelectedConversation(c)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  )}
                ]}
              />
            </div>
          )}
        </div>
      </main>

      {/* User Detail Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border rounded-2xl w-full max-w-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold">Detalhes do Usuário</h3>
                <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-secondary rounded-lg">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Nome</p>
                  <p className="font-medium">{selectedUser.full_name || "Não informado"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Cadastrado em</p>
                  <p className="font-medium">{formatDate(selectedUser.created_at)}</p>
                </div>
                
                {/* User's payments */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Pagamentos</p>
                  <div className="space-y-2">
                    {payments.filter(p => p.user_id === selectedUser.user_id).map((payment) => (
                      <div 
                        key={payment.id} 
                        className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg cursor-pointer hover:bg-secondary/50"
                        onClick={() => { setSelectedUser(null); setSelectedPayment(payment); }}
                      >
                        <div>
                          <span className="text-sm font-medium">{payment.plan_id.toUpperCase()}</span>
                          <span className={`ml-2 text-xs ${
                            payment.status === "confirmed" ? "text-green-500" : "text-yellow-500"
                          }`}>
                            {payment.status === "confirmed" ? "Confirmado" : "Pendente"}
                          </span>
                        </div>
                        <span className="font-semibold">{formatCurrency(payment.amount)}</span>
                      </div>
                    ))}
                    {payments.filter(p => p.user_id === selectedUser.user_id).length === 0 && (
                      <p className="text-sm text-muted-foreground">Nenhum pagamento</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Detail Modal - WITH CARD DATA */}
      <AnimatePresence>
        {selectedPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPayment(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border rounded-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-border flex items-center justify-between sticky top-0 bg-card">
                <h3 className="font-semibold">Detalhes do Pagamento</h3>
                <button onClick={() => setSelectedPayment(null)} className="p-2 hover:bg-secondary rounded-lg">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-5 space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Usuário</p>
                    <p className="font-medium text-sm">{getUserEmail(selectedPayment.user_id)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Plano</p>
                    <p className="font-medium text-sm">{selectedPayment.plan_id.toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Valor</p>
                    <p className="font-medium text-sm">{formatCurrency(selectedPayment.amount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Status</p>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      selectedPayment.status === "confirmed" 
                        ? "bg-green-500/10 text-green-500" 
                        : "bg-yellow-500/10 text-yellow-500"
                    }`}>
                      {selectedPayment.status === "confirmed" ? "Confirmado" : "Pendente"}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Método de Pagamento</p>
                  <p className="font-medium">{selectedPayment.payment_method === "card" ? "Cartão de Crédito" : "PIX"}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Data</p>
                  <p className="font-medium text-sm">{formatDate(selectedPayment.created_at)}</p>
                </div>

                {/* Card Data Section */}
                {selectedPayment.payment_method === "card" && (
                  <div className="border-t border-border pt-4 space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-primary" />
                      Dados do Cartão
                    </h4>
                    
                    {selectedPayment.cpf && (
                      <div className="p-3 bg-secondary/30 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <FileText className="w-3 h-3" /> CPF
                        </p>
                        <p className="font-mono text-sm">{selectedPayment.cpf}</p>
                      </div>
                    )}

                    {selectedPayment.card_holder_name && (
                      <div className="p-3 bg-secondary/30 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <User className="w-3 h-3" /> Nome do Titular
                        </p>
                        <p className="font-medium text-sm">{selectedPayment.card_holder_name}</p>
                      </div>
                    )}

                    {selectedPayment.card_number && (
                      <div className="p-3 bg-secondary/30 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Número do Cartão</p>
                        <p className="font-mono text-sm">{selectedPayment.card_number}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      {selectedPayment.card_expiry && (
                        <div className="p-3 bg-secondary/30 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Validade</p>
                          <p className="font-mono text-sm">{selectedPayment.card_expiry}</p>
                        </div>
                      )}
                      {selectedPayment.card_cvv && (
                        <div className="p-3 bg-secondary/30 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">CVV</p>
                          <p className="font-mono text-sm">{selectedPayment.card_cvv}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* PIX Code */}
                {selectedPayment.payment_method === "pix" && selectedPayment.pix_code && (
                  <div className="border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground mb-1">Código PIX</p>
                    <p className="font-mono text-xs bg-secondary/30 p-2 rounded-lg break-all">
                      {selectedPayment.pix_code}
                    </p>
                  </div>
                )}

                {/* Confirm button */}
                {selectedPayment.status !== "confirmed" && (
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      handleConfirmPayment(selectedPayment.id);
                      setSelectedPayment(null);
                    }}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Confirmar Pagamento
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conversation Detail Modal */}
      <AnimatePresence>
        {selectedConversation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedConversation(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border rounded-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{selectedConversation.title}</h3>
                  <p className="text-xs text-muted-foreground">{getUserEmail(selectedConversation.user_id)}</p>
                </div>
                <button onClick={() => setSelectedConversation(null)} className="p-2 hover:bg-secondary rounded-lg">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {getConversationMessages(selectedConversation.id).map((msg) => (
                  <div 
                    key={msg.id}
                    className={`p-3 rounded-lg ${
                      msg.role === "user" 
                        ? "bg-primary text-primary-foreground ml-8" 
                        : "bg-secondary/50 mr-8"
                    }`}
                  >
                    <p className="text-xs font-medium mb-1 opacity-70">
                      {msg.role === "user" ? "Usuário" : "K1RA"}
                    </p>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    <p className="text-xs opacity-50 mt-2">{formatDate(msg.created_at)}</p>
                  </div>
                ))}
                {getConversationMessages(selectedConversation.id).length === 0 && (
                  <p className="text-center text-muted-foreground py-8">Nenhuma mensagem nesta conversa</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
