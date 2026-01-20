/**
 * CHIP BLUEPRINT - 3nm Processor Layout
 * Microelectronics die layout with transistor blocks
 */

import { motion } from "framer-motion";
import type { Transition } from "framer-motion";

export function ChipBlueprint({ isActive }: { isActive: boolean }) {
  const drawTransition: Transition = { duration: 2, ease: "easeInOut" };
  const delayedDraw = (delay: number): Transition => ({ ...drawTransition, delay });

  // Generate grid of transistor blocks
  const blocks = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (Math.random() > 0.15) { // Some empty spaces for routing
        blocks.push({
          x: 260 + col * 35,
          y: 130 + row * 30,
          w: 30,
          h: 25,
          type: Math.random() > 0.7 ? 'core' : Math.random() > 0.5 ? 'cache' : 'logic'
        });
      }
    }
  }

  return (
    <svg viewBox="0 0 800 500" className="w-full h-full">
      <defs>
        <linearGradient id="chipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="1" />
          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.6" />
        </linearGradient>
        <pattern id="circuitPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M0,10 L20,10 M10,0 L10,20" stroke="hsl(var(--border))" strokeWidth="0.3" fill="none" opacity="0.3" />
        </pattern>
        <filter id="chipGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background pattern */}
      <rect width="800" height="500" fill="url(#circuitPattern)" opacity="0.3" />

      {/* Die outline */}
      <motion.rect
        x="240" y="100" width="320" height="300"
        fill="none"
        stroke="url(#chipGradient)"
        strokeWidth="3"
        filter="url(#chipGlow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.1)}
      />

      {/* Die inner border */}
      <motion.rect
        x="250" y="110" width="300" height="280"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(0.3)}
      />

      {/* Bond pads - Top */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.rect
          key={`pad-t-${i}`}
          x={255 + i * 15} y="102"
          width="8" height="6"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="0.8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
          transition={{ delay: 0.5 + i * 0.02, duration: 0.2 }}
        />
      ))}

      {/* Bond pads - Bottom */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.rect
          key={`pad-b-${i}`}
          x={255 + i * 15} y="392"
          width="8" height="6"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="0.8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
          transition={{ delay: 0.5 + i * 0.02, duration: 0.2 }}
        />
      ))}

      {/* Bond pads - Left */}
      {Array.from({ length: 18 }, (_, i) => (
        <motion.rect
          key={`pad-l-${i}`}
          x="242" y={115 + i * 15}
          width="6" height="8"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="0.8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
          transition={{ delay: 0.6 + i * 0.02, duration: 0.2 }}
        />
      ))}

      {/* Bond pads - Right */}
      {Array.from({ length: 18 }, (_, i) => (
        <motion.rect
          key={`pad-r-${i}`}
          x="552" y={115 + i * 15}
          width="6" height="8"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="0.8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
          transition={{ delay: 0.6 + i * 0.02, duration: 0.2 }}
        />
      ))}

      {/* CPU Cores - Main compute blocks */}
      {[
        { x: 270, y: 130, label: "CORE 0" },
        { x: 340, y: 130, label: "CORE 1" },
        { x: 410, y: 130, label: "CORE 2" },
        { x: 480, y: 130, label: "CORE 3" },
        { x: 270, y: 200, label: "CORE 4" },
        { x: 340, y: 200, label: "CORE 5" },
        { x: 410, y: 200, label: "CORE 6" },
        { x: 480, y: 200, label: "CORE 7" },
      ].map((core, i) => (
        <motion.g key={`core-${i}`}>
          <motion.rect
            x={core.x} y={core.y}
            width="60" height="60"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive ? 1 : 0 }}
            transition={delayedDraw(0.8 + i * 0.1)}
          />
          {/* Internal structure */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 0.7 : 0 }}
            transition={{ delay: 1.2 + i * 0.1 }}
          >
            <line x1={core.x + 5} y1={core.y + 15} x2={core.x + 55} y2={core.y + 15} stroke="hsl(var(--accent))" strokeWidth="0.5" />
            <line x1={core.x + 5} y1={core.y + 30} x2={core.x + 55} y2={core.y + 30} stroke="hsl(var(--accent))" strokeWidth="0.5" />
            <line x1={core.x + 5} y1={core.y + 45} x2={core.x + 55} y2={core.y + 45} stroke="hsl(var(--accent))" strokeWidth="0.5" />
            <line x1={core.x + 20} y1={core.y + 5} x2={core.x + 20} y2={core.y + 55} stroke="hsl(var(--accent))" strokeWidth="0.5" />
            <line x1={core.x + 40} y1={core.y + 5} x2={core.x + 40} y2={core.y + 55} stroke="hsl(var(--accent))" strokeWidth="0.5" />
          </motion.g>
          <motion.text
            x={core.x + 30} y={core.y + 33}
            fill="hsl(var(--primary))"
            fontSize="7"
            fontFamily="monospace"
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ delay: 1.5 + i * 0.05 }}
          >
            {core.label}
          </motion.text>
        </motion.g>
      ))}

      {/* L3 Cache block */}
      <motion.rect
        x="270" y="270" width="270" height="40"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(1.8)}
      />
      <motion.text
        x="405" y="295"
        fill="hsl(var(--accent))"
        fontSize="10"
        fontFamily="monospace"
        textAnchor="middle"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ delay: 2 }}
      >
        L3 CACHE - 64MB
      </motion.text>

      {/* Memory controller */}
      <motion.rect
        x="270" y="320" width="130" height="60"
        fill="none"
        stroke="#a855f7"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(2.1)}
      />
      <motion.text
        x="335" y="355"
        fill="#a855f7"
        fontSize="8"
        fontFamily="monospace"
        textAnchor="middle"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ delay: 2.3 }}
      >
        DDR5 CTRL
      </motion.text>

      {/* NPU - AI accelerator */}
      <motion.rect
        x="410" y="320" width="130" height="60"
        fill="none"
        stroke="#f472b6"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(2.1)}
      />
      <motion.text
        x="475" y="355"
        fill="#f472b6"
        fontSize="8"
        fontFamily="monospace"
        textAnchor="middle"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ delay: 2.3 }}
      >
        NPU 40 TOPS
      </motion.text>

      {/* Interconnect lines */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.6 : 0 }}
        transition={delayedDraw(2.5)}
      >
        {/* Horizontal bus lines */}
        {[145, 160, 215, 230, 285].map((y, i) => (
          <motion.line
            key={`bus-h-${i}`}
            x1="260" y1={y} x2="540" y2={y}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="0.5"
            strokeDasharray="2 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive ? 1 : 0 }}
            transition={{ delay: 2.5 + i * 0.05, duration: 0.5 }}
          />
        ))}
        {/* Vertical bus lines */}
        {[280, 350, 420, 490, 530].map((x, i) => (
          <motion.line
            key={`bus-v-${i}`}
            x1={x} y1="120" x2={x} y2="385"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="0.5"
            strokeDasharray="2 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive ? 1 : 0 }}
            transition={{ delay: 2.6 + i * 0.05, duration: 0.5 }}
          />
        ))}
      </motion.g>

      {/* Power delivery network visualization */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.4 : 0 }}
        transition={delayedDraw(2.8)}
      >
        {Array.from({ length: 15 }, (_, i) => (
          <motion.circle
            key={`power-${i}`}
            cx={280 + (i % 5) * 55}
            cy={140 + Math.floor(i / 5) * 80}
            r="3"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="0.5"
            initial={{ scale: 0 }}
            animate={{ scale: isActive ? [1, 1.3, 1] : 0 }}
            transition={{ delay: 2.8 + i * 0.03, duration: 1, repeat: Infinity }}
          />
        ))}
      </motion.g>

      {/* Die dimensions */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(3)}
      >
        <line x1="240" y1="420" x2="560" y2="420" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="4 2" />
        <line x1="240" y1="415" x2="240" y2="425" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="560" y1="415" x2="560" y2="425" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="400" y="435" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="monospace" textAnchor="middle">12.5mm</text>
        
        <line x1="580" y1="100" x2="580" y2="400" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="4 2" />
        <line x1="575" y1="100" x2="585" y2="100" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="575" y1="400" x2="585" y2="400" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="600" y="255" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="monospace">11.2mm</text>
      </motion.g>

      {/* Annotations */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(3.2)}
      >
        <line x1="310" y1="160" x2="150" y2="140" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <circle cx="150" cy="140" r="2" fill="hsl(var(--primary))" />
        <text x="50" y="135" fill="hsl(var(--primary))" fontSize="9" fontFamily="monospace">ARM CORTEX-X4</text>
        <text x="50" y="147" fill="hsl(var(--primary))" fontSize="8" fontFamily="monospace">3.5GHz @ 0.7V</text>

        <line x1="335" y1="290" x2="150" y2="320" stroke="hsl(var(--accent))" strokeWidth="0.5" />
        <circle cx="150" cy="320" r="2" fill="hsl(var(--accent))" />
        <text x="50" y="315" fill="hsl(var(--accent))" fontSize="9" fontFamily="monospace">64MB L3 CACHE</text>
        <text x="50" y="327" fill="hsl(var(--accent))" fontSize="8" fontFamily="monospace">16-WAY ASSOC.</text>

        <line x1="475" y1="350" x2="650" y2="350" stroke="#f472b6" strokeWidth="0.5" />
        <circle cx="650" cy="350" r="2" fill="#f472b6" />
        <text x="660" y="345" fill="#f472b6" fontSize="9" fontFamily="monospace">AI ACCELERATOR</text>
        <text x="660" y="357" fill="#f472b6" fontSize="8" fontFamily="monospace">INT8/FP16/BF16</text>
      </motion.g>

      {/* Process info */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(3.5)}
      >
        <rect x="620" y="100" width="160" height="100" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
        <text x="630" y="120" fill="hsl(var(--foreground))" fontSize="10" fontFamily="monospace" fontWeight="bold">TSMC N3E</text>
        <text x="630" y="140" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">DIE SIZE: 140mm²</text>
        <text x="630" y="155" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">TRANSISTORS: 50B</text>
        <text x="630" y="170" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">TDP: 5W</text>
        <text x="630" y="185" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">PACKAGE: FCBGA</text>
      </motion.g>

      {/* Signal integrity test points */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.8 : 0 }}
        transition={delayedDraw(3.8)}
      >
        {[
          { x: 258, y: 125, label: "TP1" },
          { x: 542, y: 125, label: "TP2" },
          { x: 258, y: 375, label: "TP3" },
          { x: 542, y: 375, label: "TP4" },
        ].map((tp, i) => (
          <g key={`tp-${i}`}>
            <circle cx={tp.x} cy={tp.y} r="4" fill="none" stroke="#ef4444" strokeWidth="1" />
            <text x={tp.x} y={tp.y + 12} fill="#ef4444" fontSize="6" fontFamily="monospace" textAnchor="middle">{tp.label}</text>
          </g>
        ))}
      </motion.g>

      {/* Title block */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(4)}
      >
        <rect x="20" y="400" width="180" height="80" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
        <line x1="20" y1="420" x2="200" y2="420" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <line x1="20" y1="450" x2="200" y2="450" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <text x="30" y="415" fill="hsl(var(--foreground))" fontSize="9" fontFamily="monospace" fontWeight="bold">K1RA SOC-3NM</text>
        <text x="30" y="440" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">SCALE: 50:1</text>
        <text x="130" y="440" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">REV: A</text>
        <text x="30" y="470" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">K1RA AI</text>
        <text x="130" y="470" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">DWG-004</text>
      </motion.g>
    </svg>
  );
}
