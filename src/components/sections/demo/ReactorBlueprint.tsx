/**
 * REACTOR BLUEPRINT - Fusion Tokamak Reactor
 * Nuclear fusion reactor with plasma visualization
 */

import { motion } from "framer-motion";
import type { Transition } from "framer-motion";

export function ReactorBlueprint({ isActive }: { isActive: boolean }) {
  const drawTransition: Transition = { duration: 2, ease: "easeInOut" };
  const delayedDraw = (delay: number): Transition => ({ ...drawTransition, delay });

  return (
    <svg viewBox="0 0 800 500" className="w-full h-full">
      <defs>
        <linearGradient id="plasmaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
          <stop offset="50%" stopColor="#ec4899" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id="plasmaCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#f97316" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
        </radialGradient>
        <filter id="plasmaGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="reactorGlow">
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

      {/* Tokamak cross-section view */}
      
      {/* Outer vacuum vessel */}
      <motion.ellipse
        cx="400" cy="250" rx="200" ry="180"
        fill="none"
        stroke="hsl(var(--muted-foreground))"
        strokeWidth="4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0)}
      />
      
      {/* Cryostat */}
      <motion.ellipse
        cx="400" cy="250" rx="210" ry="190"
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.2)}
      />

      {/* Blanket modules */}
      <motion.ellipse
        cx="400" cy="250" rx="175" ry="155"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.4)}
      />

      {/* First wall */}
      <motion.ellipse
        cx="400" cy="250" rx="150" ry="130"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.6)}
      />

      {/* Plasma chamber - D-shaped */}
      <motion.path
        d="M350,120 
           Q280,170 280,250 
           Q280,330 350,380 
           L450,380 
           Q520,330 520,250 
           Q520,170 450,120 
           Z"
        fill="none"
        stroke="url(#plasmaGradient)"
        strokeWidth="2"
        filter="url(#reactorGlow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.8)}
      />

      {/* Plasma core (animated) */}
      <motion.ellipse
        cx="400" cy="250" rx="100" ry="90"
        fill="url(#plasmaCore)"
        filter="url(#plasmaGlow)"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: isActive ? [0.3, 0.6, 0.3] : 0, 
          scale: isActive ? [0.95, 1.05, 0.95] : 0.5 
        }}
        transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
      />

      {/* Magnetic field coils - Toroidal */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
        const x = 400 + Math.cos(angle * Math.PI / 180) * 185;
        const y = 250 + Math.sin(angle * Math.PI / 180) * 165;
        return (
          <motion.rect
            key={`tf-coil-${i}`}
            x={x - 8} y={y - 15}
            width="16" height="30"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            transform={`rotate(${angle}, ${x}, ${y})`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
            transition={{ delay: 1.5 + i * 0.05, duration: 0.3 }}
          />
        );
      })}

      {/* Poloidal field coils */}
      {[
        { cx: 400, cy: 60, rx: 30, ry: 10 },
        { cx: 400, cy: 440, rx: 30, ry: 10 },
        { cx: 200, cy: 250, rx: 10, ry: 25 },
        { cx: 600, cy: 250, rx: 10, ry: 25 },
        { cx: 250, cy: 120, rx: 15, ry: 8 },
        { cx: 550, cy: 120, rx: 15, ry: 8 },
        { cx: 250, cy: 380, rx: 15, ry: 8 },
        { cx: 550, cy: 380, rx: 15, ry: 8 },
      ].map((coil, i) => (
        <motion.ellipse
          key={`pf-coil-${i}`}
          cx={coil.cx} cy={coil.cy} rx={coil.rx} ry={coil.ry}
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={delayedDraw(2 + i * 0.1)}
        />
      ))}

      {/* Central solenoid */}
      <motion.rect
        x="385" y="100" width="30" height="300"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(2.5)}
      />
      {Array.from({ length: 15 }, (_, i) => (
        <motion.line
          key={`solenoid-${i}`}
          x1="387" y1={110 + i * 19}
          x2="413" y2={110 + i * 19}
          stroke="#f59e0b"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 0.6 : 0 }}
          transition={{ delay: 2.6 + i * 0.02 }}
        />
      ))}

      {/* Divertor */}
      <motion.path
        d="M330,400 Q350,420 400,420 Q450,420 470,400 L450,380 Q400,395 350,380 Z"
        fill="none"
        stroke="#ef4444"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(2.8)}
      />

      {/* Neutral beam injectors */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(3)}
      >
        <rect x="620" y="220" width="80" height="60" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" />
        <line x1="620" y1="250" x2="520" y2="250" stroke="hsl(var(--accent))" strokeWidth="1" strokeDasharray="5 3" />
        <text x="640" y="245" fill="hsl(var(--accent))" fontSize="7" fontFamily="monospace">NBI</text>
        <text x="635" y="260" fill="hsl(var(--accent))" fontSize="6" fontFamily="monospace">40MW</text>
      </motion.g>

      {/* RF Heating */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(3.1)}
      >
        <rect x="100" y="220" width="70" height="60" fill="none" stroke="#a855f7" strokeWidth="1.5" />
        <line x1="170" y1="250" x2="280" y2="250" stroke="#a855f7" strokeWidth="1" strokeDasharray="5 3" />
        <text x="115" y="245" fill="#a855f7" fontSize="7" fontFamily="monospace">ICRH</text>
        <text x="110" y="260" fill="#a855f7" fontSize="6" fontFamily="monospace">20MW</text>
      </motion.g>

      {/* Magnetic field lines (animated) */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.4 : 0 }}
        transition={delayedDraw(3.3)}
      >
        {[0.7, 0.85, 1].map((scale, i) => (
          <motion.ellipse
            key={`field-${i}`}
            cx="400" cy="250"
            rx={100 * scale} ry={85 * scale}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            strokeDasharray="3 3"
            animate={{ 
              rotate: isActive ? 360 : 0,
              opacity: isActive ? [0.3, 0.6, 0.3] : 0
            }}
            transition={{ 
              rotate: { duration: 10 + i * 5, repeat: Infinity, ease: "linear" },
              opacity: { duration: 2, repeat: Infinity }
            }}
            style={{ transformOrigin: "400px 250px" }}
          />
        ))}
      </motion.g>

      {/* Dimensions */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(3.5)}
      >
        <line x1="190" y1="480" x2="610" y2="480" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="4 2" />
        <line x1="190" y1="475" x2="190" y2="485" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="610" y1="475" x2="610" y2="485" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="400" y="495" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="monospace" textAnchor="middle">R = 6.2m</text>
      </motion.g>

      {/* Annotations */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(3.7)}
      >
        <line x1="400" y1="250" x2="80" y2="80" stroke="url(#plasmaGradient)" strokeWidth="0.5" />
        <circle cx="80" cy="80" r="2" fill="#a855f7" />
        <text x="20" y="75" fill="#a855f7" fontSize="9" fontFamily="monospace">PLASMA CORE</text>
        <text x="20" y="87" fill="#a855f7" fontSize="8" fontFamily="monospace">T = 150M °C</text>

        <line x1="520" y1="250" x2="720" y2="150" stroke="#3b82f6" strokeWidth="0.5" />
        <circle cx="720" cy="150" r="2" fill="#3b82f6" />
        <text x="650" y="145" fill="#3b82f6" fontSize="9" fontFamily="monospace">TF COILS</text>
        <text x="650" y="157" fill="#3b82f6" fontSize="8" fontFamily="monospace">B = 5.3 T</text>

        <line x1="400" y1="60" x2="550" y2="30" stroke="#22c55e" strokeWidth="0.5" />
        <circle cx="550" cy="30" r="2" fill="#22c55e" />
        <text x="560" y="25" fill="#22c55e" fontSize="9" fontFamily="monospace">PF COILS</text>
        <text x="560" y="37" fill="#22c55e" fontSize="8" fontFamily="monospace">PLASMA SHAPE</text>

        <line x1="400" y1="400" x2="300" y2="460" stroke="#ef4444" strokeWidth="0.5" />
        <circle cx="300" cy="460" r="2" fill="#ef4444" />
        <text x="200" y="455" fill="#ef4444" fontSize="9" fontFamily="monospace">DIVERTOR</text>
        <text x="200" y="467" fill="#ef4444" fontSize="8" fontFamily="monospace">EXHAUST HEAT</text>

        <line x1="400" y1="250" x2="400" y2="30" stroke="#f59e0b" strokeWidth="0.5" />
        <circle cx="400" cy="30" r="2" fill="#f59e0b" />
        <text x="320" y="25" fill="#f59e0b" fontSize="9" fontFamily="monospace">CENTRAL SOLENOID</text>
      </motion.g>

      {/* Performance specs */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(4)}
      >
        <rect x="20" y="350" width="140" height="100" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
        <text x="30" y="370" fill="hsl(var(--foreground))" fontSize="9" fontFamily="monospace" fontWeight="bold">PERFORMANCE</text>
        <text x="30" y="390" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">FUSION POWER: 500 MW</text>
        <text x="30" y="405" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">Q FACTOR: &gt; 10</text>
        <text x="30" y="420" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">PLASMA: D-T</text>
        <text x="30" y="435" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">PULSE: 400s</text>
      </motion.g>

      {/* Title block */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(4.2)}
      >
        <rect x="640" y="400" width="140" height="80" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
        <line x1="640" y1="420" x2="780" y2="420" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <line x1="640" y1="450" x2="780" y2="450" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <text x="650" y="415" fill="hsl(var(--foreground))" fontSize="8" fontFamily="monospace" fontWeight="bold">FUSION TOKAMAK</text>
        <text x="650" y="440" fill="hsl(var(--muted-foreground))" fontSize="7" fontFamily="monospace">SCALE: 1:50</text>
        <text x="720" y="440" fill="hsl(var(--muted-foreground))" fontSize="7" fontFamily="monospace">REV: A</text>
        <text x="650" y="470" fill="hsl(var(--muted-foreground))" fontSize="7" fontFamily="monospace">K1RA AI</text>
        <text x="720" y="470" fill="hsl(var(--muted-foreground))" fontSize="7" fontFamily="monospace">DWG-008</text>
      </motion.g>
    </svg>
  );
}
