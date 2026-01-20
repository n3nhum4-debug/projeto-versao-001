/**
 * SKYSCRAPER BLUEPRINT - Burj Khalifa Style Super Tower
 * Animated technical drawing of a 1km supertower
 */

import { motion } from "framer-motion";
import type { Transition } from "framer-motion";

export function SkyscraperBlueprint({ isActive }: { isActive: boolean }) {
  const drawTransition: Transition = { duration: 2, ease: "easeInOut" };
  const delayedDraw = (delay: number): Transition => ({ ...drawTransition, delay });

  // Generate floor levels
  const floors = Array.from({ length: 25 }, (_, i) => ({
    y: 420 - i * 15,
    width: 120 - i * 3,
  }));

  return (
    <svg viewBox="0 0 800 500" className="w-full h-full">
      <defs>
        <linearGradient id="towerGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
        </linearGradient>
        <filter id="towerGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Grid */}
      {[...Array(40)].map((_, i) => (
        <motion.line
          key={`h-${i}`}
          x1="0" y1={i * 12.5} x2="800" y2={i * 12.5}
          stroke="hsl(var(--border))"
          strokeWidth="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 0.15 : 0 }}
          transition={{ delay: i * 0.008 }}
        />
      ))}

      {/* Foundation */}
      <motion.rect
        x="250" y="430" width="300" height="30"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0)}
      />
      <motion.path
        d="M250,430 L200,460 L600,460 L550,430"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.2)}
      />

      {/* Main tower structure - Y-buttressed design */}
      <motion.path
        d="M340,430 L340,100 L400,30 L460,100 L460,430"
        fill="none"
        stroke="url(#towerGradient)"
        strokeWidth="2"
        filter="url(#towerGlow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.3)}
      />

      {/* Setback levels - Tapering effect */}
      {[
        { y: 350, x1: 320, x2: 480 },
        { y: 280, x1: 330, x2: 470 },
        { y: 210, x1: 345, x2: 455 },
        { y: 140, x1: 360, x2: 440 },
        { y: 80, x1: 375, x2: 425 },
      ].map((level, i) => (
        <motion.line
          key={`setback-${i}`}
          x1={level.x1} y1={level.y}
          x2={level.x2} y2={level.y}
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={delayedDraw(0.5 + i * 0.1)}
        />
      ))}

      {/* Buttress wings - Left */}
      <motion.path
        d="M340,430 L280,430 L280,350 L340,350"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.8)}
      />
      <motion.path
        d="M340,350 L300,350 L300,280 L340,280"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.9)}
      />

      {/* Buttress wings - Right */}
      <motion.path
        d="M460,430 L520,430 L520,350 L460,350"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.8)}
      />
      <motion.path
        d="M460,350 L500,350 L500,280 L460,280"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.9)}
      />

      {/* Floor lines with progressive animation */}
      {Array.from({ length: 20 }, (_, i) => {
        const y = 420 - i * 18;
        const shrink = i * 2;
        return (
          <motion.line
            key={`floor-${i}`}
            x1={345 + shrink / 2} y1={y}
            x2={455 - shrink / 2} y2={y}
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: isActive ? 1 : 0, opacity: isActive ? 0.5 : 0 }}
            transition={delayedDraw(1 + i * 0.03)}
          />
        );
      })}

      {/* Spire */}
      <motion.path
        d="M400,30 L400,10 M395,20 L405,20 M397,15 L403,15"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(1.5)}
      />

      {/* Window pattern - curtain wall */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(1.8)}
      >
        {Array.from({ length: 15 }, (_, row) => {
          const y = 400 - row * 22;
          const shrink = row * 2;
          return Array.from({ length: 8 - Math.floor(row / 3) }, (_, col) => {
            const x = 355 + shrink / 2 + col * 12;
            return (
              <motion.rect
                key={`window-${row}-${col}`}
                x={x} y={y}
                width="8" height="15"
                fill="url(#glassGradient)"
                stroke="hsl(var(--primary))"
                strokeWidth="0.3"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: isActive ? 0.6 : 0, scale: isActive ? 1 : 0 }}
                transition={{ delay: 1.8 + (row * 8 + col) * 0.01, duration: 0.2 }}
              />
            );
          });
        })}
      </motion.g>

      {/* Helipad */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
        transition={{ delay: 2.2, duration: 0.5 }}
      >
        <circle cx="400" cy="85" r="15" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" />
        <text x="394" y="89" fill="hsl(var(--accent))" fontSize="10" fontFamily="monospace">H</text>
      </motion.g>

      {/* Dimensions */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(2.5)}
      >
        {/* Height */}
        <line x1="580" y1="30" x2="580" y2="430" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="4 2" />
        <line x1="575" y1="30" x2="585" y2="30" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="575" y1="430" x2="585" y2="430" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="590" y="235" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="monospace" transform="rotate(90, 590, 235)">1000.0m</text>

        {/* Width at base */}
        <line x1="250" y1="480" x2="550" y2="480" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="4 2" />
        <line x1="250" y1="475" x2="250" y2="485" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="550" y1="475" x2="550" y2="485" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="380" y="495" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="monospace">200.0m</text>
      </motion.g>

      {/* Annotations */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(2.8)}
      >
        {/* Core annotation */}
        <line x1="400" y1="250" x2="180" y2="220" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <circle cx="180" cy="220" r="2" fill="hsl(var(--primary))" />
        <text x="80" y="225" fill="hsl(var(--primary))" fontSize="9" fontFamily="monospace">HEXAGONAL CORE</text>

        {/* Buttress annotation */}
        <line x1="290" y1="390" x2="170" y2="380" stroke="hsl(var(--accent))" strokeWidth="0.5" />
        <circle cx="170" cy="380" r="2" fill="hsl(var(--accent))" />
        <text x="60" y="385" fill="hsl(var(--accent))" fontSize="9" fontFamily="monospace">Y-BUTTRESS WING</text>

        {/* Sky lobby */}
        <line x1="455" y1="210" x2="620" y2="180" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
        <circle cx="620" cy="180" r="2" fill="hsl(var(--muted-foreground))" />
        <text x="630" y="185" fill="hsl(var(--muted-foreground))" fontSize="9" fontFamily="monospace">SKY LOBBY L75</text>

        {/* Observation deck */}
        <line x1="430" y1="100" x2="620" y2="100" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
        <circle cx="620" cy="100" r="2" fill="hsl(var(--muted-foreground))" />
        <text x="630" y="105" fill="hsl(var(--muted-foreground))" fontSize="9" fontFamily="monospace">OBSERVATION DECK</text>
      </motion.g>

      {/* Wind direction indicators */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(3)}
      >
        {[150, 250, 350].map((y, i) => (
          <motion.g key={`wind-${i}`}>
            <motion.path
              d="M120,0 L140,0 L135,5 M140,0 L135,-5"
              transform={`translate(0, ${y})`}
              stroke="hsl(var(--accent))"
              strokeWidth="1"
              fill="none"
              initial={{ x: -50 }}
              animate={{ x: isActive ? [0, 10, 0] : -50 }}
              transition={{ delay: 3 + i * 0.2, duration: 2, repeat: Infinity }}
            />
            <text x="80" y={y + 4} fill="hsl(var(--accent))" fontSize="8" fontFamily="monospace">WIND</text>
          </motion.g>
        ))}
      </motion.g>

      {/* Title block */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(3.2)}
      >
        <rect x="20" y="400" width="160" height="80" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
        <line x1="20" y1="420" x2="180" y2="420" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <line x1="20" y1="450" x2="180" y2="450" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <text x="30" y="415" fill="hsl(var(--foreground))" fontSize="9" fontFamily="monospace" fontWeight="bold">BURJ KHALIFA 2.0</text>
        <text x="30" y="440" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">SCALE: 1:5000</text>
        <text x="120" y="440" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">REV: B</text>
        <text x="30" y="470" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">K1RA AI</text>
        <text x="120" y="470" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">DWG-002</text>
      </motion.g>

      {/* Section callout */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(3.5)}
      >
        <circle cx="400" cy="350" r="25" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" strokeDasharray="3 2" />
        <text x="430" y="345" fill="hsl(var(--accent))" fontSize="8" fontFamily="monospace">SECTION A-A</text>
        <text x="430" y="357" fill="hsl(var(--accent))" fontSize="8" fontFamily="monospace">SEE DWG-002-A</text>
      </motion.g>
    </svg>
  );
}
