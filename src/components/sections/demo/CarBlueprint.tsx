/**
 * CAR BLUEPRINT - Hypercar Electric Vehicle
 * Stunning side profile with technical details
 */

import { motion } from "framer-motion";
import type { Transition } from "framer-motion";

export function CarBlueprint({ isActive }: { isActive: boolean }) {
  const drawTransition: Transition = { duration: 2, ease: "easeInOut" };
  const delayedDraw = (delay: number): Transition => ({ ...drawTransition, delay });

  return (
    <svg viewBox="0 0 800 500" className="w-full h-full">
      <defs>
        <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="1" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.6" />
        </linearGradient>
        <filter id="carGlow">
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

      {/* Ground line */}
      <motion.line
        x1="100" y1="380" x2="700" y2="380"
        stroke="hsl(var(--border))"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0)}
      />

      {/* Main body outline - Side profile */}
      <motion.path
        d="M150,340 
           L150,320 
           C150,310 160,300 180,300 
           L280,300 
           C300,300 320,280 350,250 
           L420,220 
           C450,210 480,210 520,220 
           L580,240 
           C610,250 630,270 650,300 
           L680,300 
           C700,300 720,310 720,330 
           L720,340"
        fill="none"
        stroke="url(#carGradient)"
        strokeWidth="2.5"
        filter="url(#carGlow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.2)}
      />

      {/* Bottom line */}
      <motion.path
        d="M150,340 
           L200,350 
           L270,350 
           L300,340 
           L550,340 
           L580,350 
           L650,350 
           L720,340"
        fill="none"
        stroke="url(#carGradient)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.5)}
      />

      {/* Front wheel */}
      <motion.g>
        <motion.circle
          cx="235" cy="355" r="45"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={delayedDraw(0.8)}
        />
        <motion.circle
          cx="235" cy="355" r="35"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={delayedDraw(0.9)}
        />
        <motion.circle
          cx="235" cy="355" r="15"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={delayedDraw(1)}
        />
        {/* Wheel spokes */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <motion.line
            key={`spoke-f-${i}`}
            x1="235" y1="355"
            x2={235 + Math.cos(angle * Math.PI / 180) * 30}
            y2={355 + Math.sin(angle * Math.PI / 180) * 30}
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive ? 1 : 0 }}
            transition={delayedDraw(1.1 + i * 0.05)}
          />
        ))}
      </motion.g>

      {/* Rear wheel */}
      <motion.g>
        <motion.circle
          cx="615" cy="355" r="45"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={delayedDraw(0.8)}
        />
        <motion.circle
          cx="615" cy="355" r="35"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={delayedDraw(0.9)}
        />
        <motion.circle
          cx="615" cy="355" r="15"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={delayedDraw(1)}
        />
        {/* Wheel spokes */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <motion.line
            key={`spoke-r-${i}`}
            x1="615" y1="355"
            x2={615 + Math.cos(angle * Math.PI / 180) * 30}
            y2={355 + Math.sin(angle * Math.PI / 180) * 30}
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive ? 1 : 0 }}
            transition={delayedDraw(1.1 + i * 0.05)}
          />
        ))}
      </motion.g>

      {/* Windshield */}
      <motion.path
        d="M320,270 L380,230 L480,225 L520,245"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(1.3)}
      />

      {/* Side window */}
      <motion.path
        d="M380,235 L410,230 L470,230 L490,240 L490,265 L385,265 Z"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(1.4)}
      />

      {/* Door line */}
      <motion.path
        d="M370,270 L370,330 M500,250 L500,330"
        stroke="hsl(var(--muted-foreground))"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(1.5)}
      />

      {/* Headlights */}
      <motion.path
        d="M165,310 L185,305 L185,325 L165,320 Z"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(1.6)}
      />

      {/* Taillights */}
      <motion.path
        d="M700,305 L720,310 L720,330 L700,325 Z"
        fill="none"
        stroke="#ef4444"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(1.6)}
      />

      {/* Rear spoiler */}
      <motion.path
        d="M660,205 L700,200 L720,205 L720,220 L660,215 Z"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(1.7)}
      />
      <motion.line
        x1="690" y1="220" x2="690" y2="300"
        stroke="hsl(var(--primary))"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(1.8)}
      />

      {/* Side air intakes */}
      <motion.path
        d="M540,290 L570,285 L570,305 L540,310 Z"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(1.9)}
      />

      {/* Front splitter */}
      <motion.path
        d="M130,350 L170,345 L170,355 L130,360"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(2)}
      />

      {/* Battery pack (floor) */}
      <motion.rect
        x="280" y="335" width="280" height="10"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(2.1)}
      />
      {/* Battery cells */}
      {Array.from({ length: 10 }, (_, i) => (
        <motion.line
          key={`cell-${i}`}
          x1={290 + i * 27} y1="337"
          x2={290 + i * 27} y2="343"
          stroke="hsl(var(--accent))"
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 0.7 : 0 }}
          transition={{ delay: 2.2 + i * 0.03 }}
        />
      ))}

      {/* Dimensions */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(2.5)}
      >
        {/* Length */}
        <line x1="130" y1="420" x2="740" y2="420" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="4 2" />
        <line x1="130" y1="415" x2="130" y2="425" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="740" y1="415" x2="740" y2="425" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="410" y="435" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="monospace" textAnchor="middle">4.850m</text>

        {/* Height */}
        <line x1="760" y1="200" x2="760" y2="380" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="4 2" />
        <line x1="755" y1="200" x2="765" y2="200" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="755" y1="380" x2="765" y2="380" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="775" y="295" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="monospace">1.15m</text>

        {/* Wheelbase */}
        <line x1="235" y1="400" x2="615" y2="400" stroke="hsl(var(--accent))" strokeWidth="0.5" strokeDasharray="3 3" />
        <text x="425" y="410" fill="hsl(var(--accent))" fontSize="9" fontFamily="monospace" textAnchor="middle">WHEELBASE: 2.800m</text>
      </motion.g>

      {/* Annotations */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(2.8)}
      >
        {/* Motor annotation */}
        <line x1="580" y1="320" x2="650" y2="280" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <circle cx="650" cy="280" r="2" fill="hsl(var(--primary))" />
        <text x="660" y="275" fill="hsl(var(--primary))" fontSize="9" fontFamily="monospace">DUAL MOTOR</text>
        <text x="660" y="287" fill="hsl(var(--primary))" fontSize="8" fontFamily="monospace">1000hp EACH</text>

        {/* Battery annotation */}
        <line x1="420" y1="340" x2="420" y2="160" stroke="hsl(var(--accent))" strokeWidth="0.5" />
        <circle cx="420" cy="160" r="2" fill="hsl(var(--accent))" />
        <text x="340" y="155" fill="hsl(var(--accent))" fontSize="9" fontFamily="monospace">120kWh BATTERY</text>
        <text x="340" y="167" fill="hsl(var(--accent))" fontSize="8" fontFamily="monospace">FLOOR-MOUNTED</text>

        {/* Aero annotation */}
        <line x1="690" y1="210" x2="730" y2="130" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
        <circle cx="730" cy="130" r="2" fill="hsl(var(--muted-foreground))" />
        <text x="650" y="120" fill="hsl(var(--muted-foreground))" fontSize="9" fontFamily="monospace">ACTIVE AERO</text>
        <text x="650" y="132" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">DRS SYSTEM</text>

        {/* Carbon monocoque */}
        <line x1="350" y1="290" x2="250" y2="200" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
        <circle cx="250" cy="200" r="2" fill="hsl(var(--foreground))" />
        <text x="150" y="195" fill="hsl(var(--foreground))" fontSize="9" fontFamily="monospace">CFRP MONOCOQUE</text>
        <text x="150" y="207" fill="hsl(var(--foreground))" fontSize="8" fontFamily="monospace">TORSION: 45kNm/°</text>
      </motion.g>

      {/* Airflow lines */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.5 : 0 }}
        transition={delayedDraw(3)}
      >
        {[240, 270, 300].map((y, i) => (
          <motion.path
            key={`airflow-${i}`}
            d={`M80,${y} Q200,${y-10} 300,${y} T500,${y-5} T700,${y+10} L780,${y+5}`}
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="0.5"
            strokeDasharray="5 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive ? 1 : 0 }}
            transition={{ delay: 3 + i * 0.2, duration: 1.5 }}
          />
        ))}
      </motion.g>

      {/* Title block */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(3.2)}
      >
        <rect x="20" y="20" width="180" height="80" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
        <line x1="20" y1="40" x2="200" y2="40" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <line x1="20" y1="65" x2="200" y2="65" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <text x="30" y="35" fill="hsl(var(--foreground))" fontSize="10" fontFamily="monospace" fontWeight="bold">HYPERCAR EV-X</text>
        <text x="30" y="55" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">SCALE: 1:15</text>
        <text x="130" y="55" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">REV: C</text>
        <text x="30" y="90" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">K1RA AI</text>
        <text x="130" y="90" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">DWG-003</text>
      </motion.g>

      {/* Speed indicator */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(3.5)}
      >
        <text x="70" y="480" fill="hsl(var(--accent))" fontSize="12" fontFamily="monospace" fontWeight="bold">TOP SPEED: 412 km/h</text>
        <text x="300" y="480" fill="hsl(var(--primary))" fontSize="12" fontFamily="monospace" fontWeight="bold">0-100: 1.8s</text>
        <text x="500" y="480" fill="hsl(var(--muted-foreground))" fontSize="12" fontFamily="monospace" fontWeight="bold">RANGE: 650km</text>
      </motion.g>
    </svg>
  );
}
