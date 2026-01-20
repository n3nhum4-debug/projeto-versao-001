/**
 * AIRCRAFT BLUEPRINT - Supersonic Commercial Jet
 * Delta wing commercial aircraft with CFD annotations
 */

import { motion } from "framer-motion";
import type { Transition } from "framer-motion";

export function AircraftBlueprint({ isActive }: { isActive: boolean }) {
  const drawTransition: Transition = { duration: 2, ease: "easeInOut" };
  const delayedDraw = (delay: number): Transition => ({ ...drawTransition, delay });

  return (
    <svg viewBox="0 0 800 500" className="w-full h-full">
      <defs>
        <linearGradient id="aircraftGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="1" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
        </linearGradient>
        <filter id="aircraftGlow">
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
          key={`grid-${i}`}
          x1="0" y1={i * 12.5} x2="800" y2={i * 12.5}
          stroke="hsl(var(--border))"
          strokeWidth="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 0.15 : 0 }}
          transition={{ delay: i * 0.008 }}
        />
      ))}

      {/* Fuselage - Main body (top view) */}
      <motion.path
        d="M100,250 
           Q120,245 180,245 
           L650,245 
           Q700,245 720,250 
           Q700,255 650,255 
           L180,255 
           Q120,255 100,250 Z"
        fill="none"
        stroke="url(#aircraftGradient)"
        strokeWidth="2.5"
        filter="url(#aircraftGlow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.2)}
      />

      {/* Nose cone */}
      <motion.path
        d="M100,250 Q60,250 50,250"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.4)}
      />

      {/* Delta wing - Left */}
      <motion.path
        d="M300,245 L180,150 L220,150 L400,245"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.6)}
      />
      <motion.path
        d="M180,150 L400,245"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.8)}
      />

      {/* Delta wing - Right */}
      <motion.path
        d="M300,255 L180,350 L220,350 L400,255"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.6)}
      />
      <motion.path
        d="M180,350 L400,255"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.8)}
      />

      {/* Wing leading edge detail */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.7 : 0 }}
        transition={delayedDraw(1)}
      >
        {/* Slats */}
        <line x1="190" y1="160" x2="250" y2="200" stroke="hsl(var(--accent))" strokeWidth="0.5" />
        <line x1="210" y1="165" x2="280" y2="210" stroke="hsl(var(--accent))" strokeWidth="0.5" />
        <line x1="230" y1="170" x2="310" y2="220" stroke="hsl(var(--accent))" strokeWidth="0.5" />
        <line x1="190" y1="340" x2="250" y2="300" stroke="hsl(var(--accent))" strokeWidth="0.5" />
        <line x1="210" y1="335" x2="280" y2="290" stroke="hsl(var(--accent))" strokeWidth="0.5" />
        <line x1="230" y1="330" x2="310" y2="280" stroke="hsl(var(--accent))" strokeWidth="0.5" />
      </motion.g>

      {/* Tail section */}
      <motion.path
        d="M620,245 L700,200 L720,200 L680,245"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(1.1)}
      />
      <motion.path
        d="M620,255 L700,300 L720,300 L680,255"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(1.1)}
      />

      {/* Vertical stabilizer */}
      <motion.path
        d="M670,250 L690,220 L720,220 L710,250"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(1.3)}
      />

      {/* Engines - under wing */}
      {[
        { x: 280, y: 200 },
        { x: 320, y: 185 },
        { x: 280, y: 300 },
        { x: 320, y: 315 },
      ].map((engine, i) => (
        <motion.g key={`engine-${i}`}>
          <motion.ellipse
            cx={engine.x} cy={engine.y}
            rx="25" ry="8"
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive ? 1 : 0 }}
            transition={delayedDraw(1.4 + i * 0.1)}
          />
          <motion.ellipse
            cx={engine.x + 20} cy={engine.y}
            rx="5" ry="4"
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="0.8"
            initial={{ scale: 0 }}
            animate={{ scale: isActive ? 1 : 0 }}
            transition={{ delay: 1.6 + i * 0.1, duration: 0.3 }}
          />
        </motion.g>
      ))}

      {/* Cockpit windows */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(1.8)}
      >
        <ellipse cx="140" cy="248" rx="15" ry="3" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" />
        <ellipse cx="140" cy="252" rx="15" ry="3" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" />
      </motion.g>

      {/* CFD flow lines */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.5 : 0 }}
        transition={delayedDraw(2)}
      >
        {[180, 210, 240, 270, 300, 330].map((y, i) => (
          <motion.path
            key={`flow-${i}`}
            d={`M20,${y} Q100,${y + (i < 3 ? -10 : 10)} 200,${y} T400,${y + (i < 3 ? -5 : 5)} T600,${y} L780,${y}`}
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="0.5"
            strokeDasharray="5 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive ? 1 : 0 }}
            transition={{ delay: 2 + i * 0.1, duration: 1.5 }}
          />
        ))}
      </motion.g>

      {/* Mach cone visualization */}
      <motion.path
        d="M50,250 L150,180 M50,250 L150,320"
        fill="none"
        stroke="#f97316"
        strokeWidth="1"
        strokeDasharray="8 4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(2.5)}
      />
      <motion.text
        x="80" y="175"
        fill="#f97316"
        fontSize="8"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ delay: 2.7 }}
      >
        MACH CONE θ=27°
      </motion.text>

      {/* Dimensions */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(2.8)}
      >
        {/* Length */}
        <line x1="50" y1="400" x2="720" y2="400" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="4 2" />
        <line x1="50" y1="395" x2="50" y2="405" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="720" y1="395" x2="720" y2="405" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="370" y="415" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="monospace" textAnchor="middle">62.8m</text>

        {/* Wingspan */}
        <line x1="180" y1="140" x2="180" y2="360" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="4 2" />
        <line x1="175" y1="150" x2="185" y2="150" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="175" y1="350" x2="185" y2="350" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="160" y="255" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="monospace" transform="rotate(-90, 160, 255)">25.6m</text>
      </motion.g>

      {/* Annotations */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(3)}
      >
        <line x1="280" y1="200" x2="380" y2="100" stroke="hsl(var(--accent))" strokeWidth="0.5" />
        <circle cx="380" cy="100" r="2" fill="hsl(var(--accent))" />
        <text x="390" y="95" fill="hsl(var(--accent))" fontSize="9" fontFamily="monospace">RAMJET ENGINE</text>
        <text x="390" y="107" fill="hsl(var(--accent))" fontSize="8" fontFamily="monospace">THRUST: 180kN</text>

        <line x1="200" y1="200" x2="120" y2="100" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <circle cx="120" cy="100" r="2" fill="hsl(var(--primary))" />
        <text x="30" y="95" fill="hsl(var(--primary))" fontSize="9" fontFamily="monospace">DELTA WING</text>
        <text x="30" y="107" fill="hsl(var(--primary))" fontSize="8" fontFamily="monospace">OGIVE LEADING EDGE</text>

        <line x1="100" y1="250" x2="60" y2="60" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
        <circle cx="60" cy="60" r="2" fill="hsl(var(--foreground))" />
        <text x="70" y="55" fill="hsl(var(--foreground))" fontSize="9" fontFamily="monospace">DROOP NOSE</text>
        <text x="70" y="67" fill="hsl(var(--foreground))" fontSize="8" fontFamily="monospace">VARIABLE GEOMETRY</text>

        <line x1="700" y1="250" x2="750" y2="380" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
        <circle cx="750" cy="380" r="2" fill="hsl(var(--muted-foreground))" />
        <text x="680" y="395" fill="hsl(var(--muted-foreground))" fontSize="9" fontFamily="monospace">AFTERBURNER</text>
      </motion.g>

      {/* Performance specs */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(3.3)}
      >
        <rect x="600" y="20" width="180" height="100" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
        <text x="610" y="40" fill="hsl(var(--foreground))" fontSize="10" fontFamily="monospace" fontWeight="bold">PERFORMANCE</text>
        <text x="610" y="58" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">MAX SPEED: MACH 2.2</text>
        <text x="610" y="72" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">CRUISE ALT: 60,000ft</text>
        <text x="610" y="86" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">RANGE: 8,000km</text>
        <text x="610" y="100" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">PAX: 100 SUPERSONIC</text>
        <text x="610" y="114" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">MTOW: 185,000kg</text>
      </motion.g>

      {/* Title block */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(3.5)}
      >
        <rect x="20" y="420" width="180" height="60" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
        <line x1="20" y1="440" x2="200" y2="440" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <text x="30" y="435" fill="hsl(var(--foreground))" fontSize="9" fontFamily="monospace" fontWeight="bold">MACH-X SUPERSONIC</text>
        <text x="30" y="458" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">SCALE: 1:250</text>
        <text x="130" y="458" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">REV: D</text>
        <text x="30" y="475" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">K1RA AI</text>
        <text x="130" y="475" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">DWG-005</text>
      </motion.g>
    </svg>
  );
}
