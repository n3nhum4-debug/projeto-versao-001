/**
 * SHIP BLUEPRINT - Mega Container Ship
 * Side profile of massive cargo vessel
 */

import { motion } from "framer-motion";
import type { Transition } from "framer-motion";

export function ShipBlueprint({ isActive }: { isActive: boolean }) {
  const drawTransition: Transition = { duration: 2, ease: "easeInOut" };
  const delayedDraw = (delay: number): Transition => ({ ...drawTransition, delay });

  return (
    <svg viewBox="0 0 800 500" className="w-full h-full">
      <defs>
        <linearGradient id="shipGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#64748b" stopOpacity="1" />
          <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0.1" />
        </linearGradient>
        <filter id="shipGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Grid */}
      {[...Array(40)].map((_, i) => (
        <motion.line
          key={`grid-${i}`}
          x1="0" y1={i * 12.5} x2="800" y2={i * 12.5}
          stroke="hsl(var(--border))"
          strokeWidth="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 0.15 : 0 }}
          transition={{ delay: i * 0.008 }}
        />
      ))}

      {/* Water line */}
      <motion.rect
        x="0" y="340" width="800" height="160"
        fill="url(#waterGradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.3 : 0 }}
        transition={delayedDraw(0)}
      />
      <motion.line
        x1="0" y1="340" x2="800" y2="340"
        stroke="#0ea5e9"
        strokeWidth="1.5"
        strokeDasharray="10 5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.1)}
      />

      {/* Hull - Main body */}
      <motion.path
        d="M50,340 
           L50,280 
           L100,250 
           L700,250 
           L750,280 
           L750,340 
           L730,380 
           L70,380 
           L50,340"
        fill="none"
        stroke="url(#shipGradient)"
        strokeWidth="2.5"
        filter="url(#shipGlow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.2)}
      />

      {/* Bow bulb */}
      <motion.path
        d="M50,340 Q20,350 30,370 Q40,390 70,380"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.5)}
      />

      {/* Stern */}
      <motion.path
        d="M730,380 Q760,370 770,350 Q780,330 750,340"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.5)}
      />

      {/* Deck line */}
      <motion.line
        x1="100" y1="250" x2="700" y2="250"
        stroke="hsl(var(--muted-foreground))"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.7)}
      />

      {/* Container stacks */}
      {Array.from({ length: 12 }, (_, stack) => (
        <motion.g key={`stack-${stack}`}>
          {Array.from({ length: 6 }, (_, row) => (
            <motion.rect
              key={`container-${stack}-${row}`}
              x={130 + stack * 45}
              y={240 - row * 20}
              width="40"
              height="18"
              fill="none"
              stroke={row < 2 ? "hsl(var(--accent))" : row < 4 ? "hsl(var(--primary))" : "#ef4444"}
              strokeWidth="0.8"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isActive ? 0.8 : 0, scale: isActive ? 1 : 0 }}
              transition={{ delay: 1 + stack * 0.05 + row * 0.02, duration: 0.2 }}
            />
          ))}
        </motion.g>
      ))}

      {/* Bridge superstructure */}
      <motion.path
        d="M650,250 L650,150 L720,150 L720,250"
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(1.5)}
      />
      {/* Bridge levels */}
      {[170, 190, 210, 230].map((y, i) => (
        <motion.line
          key={`bridge-level-${i}`}
          x1="650" y1={y} x2="720" y2={y}
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={delayedDraw(1.6 + i * 0.05)}
        />
      ))}

      {/* Bridge windows */}
      <motion.rect
        x="655" y="155" width="60" height="12"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(1.8)}
      />

      {/* Funnel */}
      <motion.path
        d="M700,150 L700,100 L730,100 L730,150"
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(1.9)}
      />

      {/* Cranes */}
      {[200, 400, 550].map((x, i) => (
        <motion.g key={`crane-${i}`}>
          <motion.path
            d={`M${x},250 L${x},170 L${x + 60},170 L${x + 60},180`}
            fill="none"
            stroke="#fbbf24"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive ? 1 : 0 }}
            transition={delayedDraw(2 + i * 0.1)}
          />
          <motion.line
            x1={x + 50} y1="175" x2={x + 50} y2="200"
            stroke="#fbbf24"
            strokeWidth="0.5"
            strokeDasharray="2 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive ? 1 : 0 }}
            transition={delayedDraw(2.1 + i * 0.1)}
          />
        </motion.g>
      ))}

      {/* Propeller */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(2.3)}
      >
        <circle cx="730" cy="365" r="20" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" />
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <motion.line
            key={`blade-${i}`}
            x1="730" y1="365"
            x2={730 + Math.cos(angle * Math.PI / 180) * 18}
            y2={365 + Math.sin(angle * Math.PI / 180) * 18}
            stroke="hsl(var(--accent))"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive ? 1 : 0 }}
            transition={delayedDraw(2.4 + i * 0.05)}
          />
        ))}
      </motion.g>

      {/* Rudder */}
      <motion.path
        d="M755,355 L770,355 L770,385 L755,385 Z"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(2.5)}
      />

      {/* Bow thruster */}
      <motion.circle
        cx="80" cy="320" r="8"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(2.6)}
      />

      {/* Dimensions */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(2.8)}
      >
        {/* Length */}
        <line x1="30" y1="420" x2="770" y2="420" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="4 2" />
        <line x1="30" y1="415" x2="30" y2="425" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="770" y1="415" x2="770" y2="425" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="400" y="435" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="monospace" textAnchor="middle">LOA: 400.0m</text>

        {/* Beam */}
        <text x="400" y="455" fill="hsl(var(--muted-foreground))" fontSize="9" fontFamily="monospace" textAnchor="middle">BEAM: 61.0m | DRAFT: 16.0m</text>

        {/* Height */}
        <line x1="780" y1="100" x2="780" y2="380" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="4 2" />
        <line x1="775" y1="100" x2="785" y2="100" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="775" y1="380" x2="785" y2="380" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
      </motion.g>

      {/* Annotations */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(3)}
      >
        <line x1="45" y1="355" x2="40" y2="450" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <circle cx="40" cy="450" r="2" fill="hsl(var(--primary))" />
        <text x="50" y="455" fill="hsl(var(--primary))" fontSize="9" fontFamily="monospace">BULBOUS BOW</text>
        <text x="50" y="467" fill="hsl(var(--primary))" fontSize="8" fontFamily="monospace">FUEL EFF. +5%</text>

        <line x1="685" y1="150" x2="620" y2="80" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
        <circle cx="620" cy="80" r="2" fill="hsl(var(--foreground))" />
        <text x="520" y="75" fill="hsl(var(--foreground))" fontSize="9" fontFamily="monospace">BRIDGE DECK</text>
        <text x="520" y="87" fill="hsl(var(--foreground))" fontSize="8" fontFamily="monospace">HEIGHT: 45m</text>

        <line x1="300" y1="140" x2="300" y2="70" stroke="hsl(var(--accent))" strokeWidth="0.5" />
        <circle cx="300" cy="70" r="2" fill="hsl(var(--accent))" />
        <text x="220" y="65" fill="hsl(var(--accent))" fontSize="9" fontFamily="monospace">CONTAINER BAY</text>
        <text x="220" y="77" fill="hsl(var(--accent))" fontSize="8" fontFamily="monospace">24,000 TEU CAPACITY</text>

        <line x1="730" y1="365" x2="680" y2="430" stroke="hsl(var(--accent))" strokeWidth="0.5" />
        <circle cx="680" cy="430" r="2" fill="hsl(var(--accent))" />
        <text x="590" y="440" fill="hsl(var(--accent))" fontSize="9" fontFamily="monospace">LNG DUAL-FUEL</text>
      </motion.g>

      {/* Title block */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(3.3)}
      >
        <rect x="20" y="20" width="180" height="80" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
        <line x1="20" y1="40" x2="200" y2="40" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <line x1="20" y1="60" x2="200" y2="60" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <text x="30" y="35" fill="hsl(var(--foreground))" fontSize="9" fontFamily="monospace" fontWeight="bold">MEGA CONTAINER</text>
        <text x="30" y="55" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">SCALE: 1:1500</text>
        <text x="130" y="55" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">REV: A</text>
        <text x="30" y="75" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">DWT: 220,000t</text>
        <text x="30" y="90" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">K1RA AI</text>
        <text x="130" y="90" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">DWG-006</text>
      </motion.g>
    </svg>
  );
}
