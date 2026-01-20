/**
 * ============================================================================
 * K1RA - BUTTON COMPONENT
 * Premium button variants for the K1RA design system
 * ============================================================================
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  /* Base styles for all buttons */
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /* Primary - Main CTA button with glow effect */
        default:
          "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 hover:shadow-xl active:scale-[0.98]",
        
        /* Destructive - For dangerous actions */
        destructive:
          "bg-destructive text-destructive-foreground shadow-lg shadow-destructive/25 hover:bg-destructive/90 hover:shadow-destructive/40",
        
        /* Outline - Bordered button */
        outline:
          "border border-border bg-transparent text-foreground hover:bg-secondary hover:border-primary/50 hover:text-foreground",
        
        /* Secondary - Subtle background */
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        
        /* Ghost - Minimal, no background */
        ghost:
          "text-foreground hover:bg-secondary hover:text-foreground",
        
        /* Link - Text only with underline */
        link:
          "text-primary underline-offset-4 hover:underline",
        
        /* ============================================================
           K1RA CUSTOM VARIANTS
           ============================================================ */
        
        /* Hero - Primary CTA for hero sections with gradient and glow */
        hero:
          "bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        
        /* Hero Outline - Secondary CTA for hero sections */
        heroOutline:
          "border border-border/50 bg-background/5 text-foreground backdrop-blur-sm hover:bg-background/10 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20",
        
        /* Premium - Special variant with shimmer effect */
        premium:
          "relative overflow-hidden bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-primary-foreground font-semibold animate-gradient shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-accent/40",
        
        /* Glass - Glassmorphism style */
        glass:
          "bg-card/50 backdrop-blur-xl border border-border/50 text-foreground hover:bg-card/70 hover:border-primary/30",
        
        /* Nav - For navigation items */
        nav:
          "text-muted-foreground hover:text-foreground hover:bg-transparent font-normal",
        
        /* Icon - Square button for icons */
        icon:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-foreground",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg font-semibold",
        icon: "h-10 w-10",
        iconSm: "h-8 w-8",
        iconLg: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
