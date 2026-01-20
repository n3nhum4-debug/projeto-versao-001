/**
 * ============================================================================
 * MOBILE NAVIGATION - App-style bottom navigation
 * Premium mobile experience with fluid animations and gestures
 * ============================================================================
 */

import { motion } from "framer-motion";
import { Home, MessageSquare, CreditCard, User, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: MessageSquare, label: "Chat", path: "/chat" },
  { icon: CreditCard, label: "Planos", path: "/checkout" },
  { icon: User, label: "Conta", path: "/auth" },
];

export function MobileNav() {
  const location = useLocation();

  // Don't show on certain pages
  if (["/admin"].includes(location.pathname)) return null;

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden pb-safe"
    >
      {/* Blur background */}
      <div className="absolute inset-0 bg-card/80 backdrop-blur-2xl border-t border-border/50" />
      
      {/* Gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="relative flex items-center justify-around px-2 py-2">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex-1"
            >
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1 : 0.95,
                }}
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-2xl transition-colors ${
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground"
                }`}
              >
                {/* Active background */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 bg-primary/10 rounded-2xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                
                <motion.div
                  animate={{ 
                    y: isActive ? -2 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="relative"
                >
                  {item.path === "/chat" && isActive ? (
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <item.icon className="w-6 h-6" />
                  )}
                  
                  {/* Active dot */}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    />
                  )}
                </motion.div>
                
                <span className={`text-[10px] font-medium relative z-10 ${isActive ? "text-primary" : ""}`}>
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
