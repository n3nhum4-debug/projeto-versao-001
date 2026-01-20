/**
 * GEAR SYSTEM BLUEPRINT - Planetary Transmission
 * Precision gear system with animated rotation
 */

import { motion } from "framer-motion";
import type { Transition } from "framer-motion";

export function GearSystemBlueprint({ isActive }: { isActive: boolean }) {
  const drawTransition: Transition = { duration: 2, ease: "easeInOut" };
  const delayedDraw = (delay: number): Transition => ({ ...drawTransition, delay });

  // Generate gear teeth
  const generateGearPath = (cx: number, cy: number, outerR: number, innerR: number, teeth: number) => {
    let path = "";
    const toothAngle = (2 * Math.PI) / teeth;
    const toothWidth = toothAngle * 0.4;
    
    for (let i = 0; i < teeth; i++) {
      const angle = i * toothAngle;
      const x1 = cx + Math.cos(angle) * innerR;
      const y1 = cy + Math.sin(angle) * innerR;
      const x2 = cx + Math.cos(angle + toothWidth * 0.3) * outerR;
      const y2 = cy + Math.sin(angle + toothWidth * 0.3) * outerR;
      const x3 = cx + Math.cos(angle + toothWidth * 0.7) * outerR;
      const y3 = cy + Math.sin(angle + toothWidth * 0.7) * outerR;
      const x4 = cx + Math.cos(angle + toothWidth) * innerR;
      const y4 = cy + Math.sin(angle + toothWidth) * innerR;
      
      if (i === 0) path += `M${x1},${y1} `;
      path += `L${x2},${y2} L${x3},${y3} L${x4},${y4} `;
    }
    path += "Z";
    return path;
  };

  return (
    <svg viewBox="0 0 800 500" className="w-full h-full">
      <defs>
        <linearGradient id="gearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="1" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.6" />
        </linearGradient>
        <filter id="gearGlow">
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

      {/* Housing outline */}
      <motion.circle
        cx="400" cy="250" r="180"
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0)}
      />
      <motion.circle
        cx="400" cy="250" r="175"
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth="1"
        strokeDasharray="5 3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.2)}
      />

      {/* Sun gear (center) */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0, rotate: isActive ? 360 : 0 }}
        transition={{ opacity: { delay: 0.5, duration: 0.5 }, rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
        style={{ transformOrigin: "400px 250px" }}
      >
        <motion.path
          d={generateGearPath(400, 250, 55, 45, 20)}
          fill="none"
          stroke="url(#gearGradient)"
          strokeWidth="2"
          filter="url(#gearGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={delayedDraw(0.5)}
        />
        <motion.circle
          cx="400" cy="250" r="20"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={delayedDraw(0.7)}
        />
        <motion.circle
          cx="400" cy="250" r="8"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: isActive ? 1 : 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        />
      </motion.g>

      {/* Planet gears */}
      {[0, 120, 240].map((angle, i) => {
        const cx = 400 + Math.cos(angle * Math.PI / 180) * 90;
        const cy = 250 + Math.sin(angle * Math.PI / 180) * 90;
        return (
          <motion.g
            key={`planet-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0, rotate: isActive ? -720 : 0 }}
            transition={{ opacity: { delay: 1 + i * 0.2, duration: 0.5 }, rotate: { duration: 15, repeat: Infinity, ease: "linear" } }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            <motion.path
              d={generateGearPath(cx, cy, 40, 32, 15)}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isActive ? 1 : 0 }}
              transition={delayedDraw(1 + i * 0.2)}
            />
            <motion.circle
              cx={cx} cy={cy} r="12"
              fill="none"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isActive ? 1 : 0 }}
              transition={delayedDraw(1.2 + i * 0.2)}
            />
            <motion.circle
              cx={cx} cy={cy} r="5"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="1.5"
              initial={{ scale: 0 }}
              animate={{ scale: isActive ? 1 : 0 }}
              transition={{ delay: 1.3 + i * 0.2, duration: 0.3 }}
            />
          </motion.g>
        );
      })}

      {/* Ring gear (outer) */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
      >
        <motion.circle
          cx="400" cy="250" r="145"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={delayedDraw(1.5)}
        />
        <motion.circle
          cx="400" cy="250" r="155"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={delayedDraw(1.6)}
        />
        {/* Internal teeth representation */}
        {Array.from({ length: 48 }, (_, i) => {
          const angle = (i / 48) * 2 * Math.PI;
          const x1 = 400 + Math.cos(angle) * 145;
          const y1 = 250 + Math.sin(angle) * 145;
          const x2 = 400 + Math.cos(angle) * 155;
          const y2 = 250 + Math.sin(angle) * 155;
          return (
            <motion.line
              key={`ring-tooth-${i}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="hsl(var(--accent))"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 0.6 : 0 }}
              transition={{ delay: 1.7 + i * 0.01, duration: 0.2 }}
            />
          );
        })}
      </motion.g>

      {/* Carrier arms */}
      {[0, 120, 240].map((angle, i) => {
        const cx = 400 + Math.cos(angle * Math.PI / 180) * 90;
        const cy = 250 + Math.sin(angle * Math.PI / 180) * 90;
        return (
          <motion.line
            key={`arm-${i}`}
            x1="400" y1="250"
            x2={cx} y2={cy}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive ? 1 : 0 }}
            transition={delayedDraw(2 + i * 0.1)}
          />
        );
      })}

      {/* Input shaft */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(2.3)}
      >
        <rect x="394" y="100" width="12" height="70" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="420" y="140" fill="hsl(var(--primary))" fontSize="9" fontFamily="monospace">INPUT</text>
        <motion.path
          d="M400,100 L395,85 L405,85 Z"
          fill="hsl(var(--primary))"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ delay: 2.5 }}
        />
      </motion.g>

      {/* Output annotation */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(2.5)}
      >
        <text x="360" y="420" fill="hsl(var(--accent))" fontSize="9" fontFamily="monospace">OUTPUT: CARRIER</text>
      </motion.g>

      {/* Dimensions and annotations */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(2.8)}
      >
        {/* Ring gear diameter */}
        <line x1="220" y1="250" x2="580" y2="250" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="4 2" />
        <line x1="220" y1="245" x2="220" y2="255" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="580" y1="245" x2="580" y2="255" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="400" y="245" fill="hsl(var(--muted-foreground))" fontSize="9" fontFamily="monospace" textAnchor="middle">Ø360mm</text>

        {/* Sun gear annotation */}
        <line x1="400" y1="250" x2="150" y2="150" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <circle cx="150" cy="150" r="2" fill="hsl(var(--primary))" />
        <text x="60" y="145" fill="hsl(var(--primary))" fontSize="9" fontFamily="monospace">SUN GEAR</text>
        <text x="60" y="157" fill="hsl(var(--primary))" fontSize="8" fontFamily="monospace">z=20 m=4</text>

        {/* Planet gear annotation */}
        <line x1="490" y1="250" x2="620" y2="150" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <circle cx="620" cy="150" r="2" fill="hsl(var(--primary))" />
        <text x="630" y="145" fill="hsl(var(--primary))" fontSize="9" fontFamily="monospace">PLANET GEAR</text>
        <text x="630" y="157" fill="hsl(var(--primary))" fontSize="8" fontFamily="monospace">z=15 m=4 (x3)</text>

        {/* Ring gear annotation */}
        <line x1="545" y1="250" x2="650" y2="350" stroke="hsl(var(--accent))" strokeWidth="0.5" />
        <circle cx="650" cy="350" r="2" fill="hsl(var(--accent))" />
        <text x="660" y="345" fill="hsl(var(--accent))" fontSize="9" fontFamily="monospace">RING GEAR</text>
        <text x="660" y="357" fill="hsl(var(--accent))" fontSize="8" fontFamily="monospace">z=48 (INTERNAL)</text>
      </motion.g>

      {/* Specs panel */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(3)}
      >
        <rect x="20" y="280" width="160" height="120" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
        <text x="30" y="300" fill="hsl(var(--foreground))" fontSize="10" fontFamily="monospace" fontWeight="bold">SPECIFICATIONS</text>
        <text x="30" y="320" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">RATIO: 1:100</text>
        <text x="30" y="335" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">INPUT: 10,000 RPM</text>
        <text x="30" y="350" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">OUTPUT: 100 RPM</text>
        <text x="30" y="365" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">TORQUE: 50,000 Nm</text>
        <text x="30" y="380" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">EFFICIENCY: 99.5%</text>
        <text x="30" y="395" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">MATERIAL: 18CrNiMo7-6</text>
      </motion.g>

      {/* Motion arrows */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.8 : 0 }}
        transition={delayedDraw(3.2)}
      >
        <motion.path
          d="M370,180 A35,35 0 0,1 430,180"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={delayedDraw(3.2)}
        />
        <text x="380" y="165" fill="#22c55e" fontSize="8" fontFamily="monospace">INPUT ω</text>
      </motion.g>

      {/* Title block */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(3.5)}
      >
        <rect x="620" y="400" width="160" height="80" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
        <line x1="620" y1="420" x2="780" y2="420" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <line x1="620" y1="450" x2="780" y2="450" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <text x="630" y="415" fill="hsl(var(--foreground))" fontSize="9" fontFamily="monospace" fontWeight="bold">PLANETARY GEARBOX</text>
        <text x="630" y="440" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">SCALE: 1:2</text>
        <text x="720" y="440" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">REV: B</text>
        <text x="630" y="470" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">K1RA AI</text>
        <text x="720" y="470" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">DWG-007</text>
      </motion.g>
    </svg>
  );
}
