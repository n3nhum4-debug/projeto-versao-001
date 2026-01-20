/**
 * ============================================================================
 * MOBILE CARD - Swipeable, interactive cards for mobile
 * ============================================================================
 */

import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { ReactNode } from "react";

interface MobileCardProps {
  children: ReactNode;
  className?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  swipeable?: boolean;
}

export function MobileCard({ 
  children, 
  className = "",
  onSwipeLeft,
  onSwipeRight,
  swipeable = false
}: MobileCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 100 && onSwipeRight) {
      onSwipeRight();
    } else if (info.offset.x < -100 && onSwipeLeft) {
      onSwipeLeft();
    }
  };

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag={swipeable ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 0.98 }}
      className={`bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-5 shadow-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface MobileFeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  gradient?: string;
  delay?: number;
}

export function MobileFeatureCard({
  icon,
  title,
  description,
  gradient = "from-primary/20 to-primary/5",
  delay = 0
}: MobileFeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 200
      }}
      whileTap={{ scale: 0.97 }}
      className="relative overflow-hidden rounded-3xl bg-card/60 backdrop-blur-xl border border-border/30 p-6"
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50`} />
      
      {/* Content */}
      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center mb-4 shadow-lg shadow-primary/10"
        >
          {icon}
        </motion.div>
        
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>

      {/* Decorative corner */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
    </motion.div>
  );
}
