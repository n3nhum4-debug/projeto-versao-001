/**
 * ROCKET BLUEPRINT - SpaceX Falcon Heavy Style
 * Stunning SVG animation showing rocket being drawn
 */

import { motion } from "framer-motion";
import type { Transition } from "framer-motion";

export function RocketBlueprint({ isActive }: { isActive: boolean }) {
  const drawTransition: Transition = { duration: 2, ease: "easeInOut" };
  const delayedDraw = (delay: number): Transition => ({ ...drawTransition, delay });

  return (
    <svg
      viewBox="0 0 800 500"
      className="w-full h-full"
      style={{ maxHeight: "100%" }}
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="1" />
          <stop offset="50%" stopColor="#ef4444" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.4" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Grid background */}
      {[...Array(40)].map((_, i) => (
        <motion.line
          key={`grid-h-${i}`}
          x1="0" y1={i * 12.5} x2="800" y2={i * 12.5}
          stroke="hsl(var(--border))"
          strokeWidth="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 0.2 : 0 }}
          transition={{ delay: i * 0.01 }}
        />
      ))}
      {[...Array(64)].map((_, i) => (
        <motion.line
          key={`grid-v-${i}`}
          x1={i * 12.5} y1="0" x2={i * 12.5} y2="500"
          stroke="hsl(var(--border))"
          strokeWidth="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 0.2 : 0 }}
          transition={{ delay: i * 0.01 }}
        />
      ))}

      {/* CENTER BOOSTER - Main rocket body */}
      <motion.path
        d="M400,50 
           C400,50 420,80 420,120 
           L420,350 
           L440,380 
           L440,420 
           L360,420 
           L360,380 
           L380,350 
           L380,120 
           C380,80 400,50 400,50"
        fill="none"
        stroke="url(#rocketGradient)"
        strokeWidth="2"
        filter="url(#glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(0.2)}
      />

      {/* LEFT BOOSTER */}
      <motion.path
        d="M320,100 
           C320,100 335,120 335,150 
           L335,360 
           L350,390 
           L350,420 
           L290,420 
           L290,390 
           L305,360 
           L305,150 
           C305,120 320,100 320,100"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: isActive ? 1 : 0, opacity: isActive ? 0.8 : 0 }}
        transition={delayedDraw(0.5)}
      />

      {/* RIGHT BOOSTER */}
      <motion.path
        d="M480,100 
           C480,100 465,120 465,150 
           L465,360 
           L450,390 
           L450,420 
           L510,420 
           L510,390 
           L495,360 
           L495,150 
           C495,120 480,100 480,100"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: isActive ? 1 : 0, opacity: isActive ? 0.8 : 0 }}
        transition={delayedDraw(0.5)}
      />

      {/* Nose cone detail */}
      <motion.path
        d="M395,60 L405,60 M390,70 L410,70 M388,80 L412,80"
        stroke="hsl(var(--accent))"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={delayedDraw(1)}
      />

      {/* Center engines - 9 Merlin engines pattern */}
      {[
        { cx: 400, cy: 435 },
        { cx: 385, cy: 432 },
        { cx: 415, cy: 432 },
        { cx: 375, cy: 428 },
        { cx: 425, cy: 428 },
        { cx: 390, cy: 440 },
        { cx: 410, cy: 440 },
        { cx: 395, cy: 445 },
        { cx: 405, cy: 445 },
      ].map((engine, i) => (
        <motion.circle
          key={`engine-c-${i}`}
          cx={engine.cx}
          cy={engine.cy}
          r="5"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
          transition={{ delay: 1.5 + i * 0.05, duration: 0.3 }}
        />
      ))}

      {/* Side booster engines */}
      {[
        { cx: 320, cy: 430 },
        { cx: 310, cy: 428 },
        { cx: 330, cy: 428 },
        { cx: 480, cy: 430 },
        { cx: 470, cy: 428 },
        { cx: 490, cy: 428 },
      ].map((engine, i) => (
        <motion.circle
          key={`engine-s-${i}`}
          cx={engine.cx}
          cy={engine.cy}
          r="4"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="0.8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isActive ? 1 : 0, opacity: isActive ? 0.8 : 0 }}
          transition={{ delay: 1.8 + i * 0.05, duration: 0.3 }}
        />
      ))}

      {/* Flames */}
      <motion.path
        d="M400,450 Q395,480 400,500 Q405,480 400,450"
        fill="url(#flameGradient)"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: isActive ? [1, 1.2, 1] : 0, opacity: isActive ? [0.6, 0.9, 0.6] : 0 }}
        transition={{ delay: 2.5, duration: 0.5, repeat: Infinity }}
        style={{ transformOrigin: "center top" }}
      />
      <motion.path
        d="M320,440 Q315,460 320,475 Q325,460 320,440"
        fill="url(#flameGradient)"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: isActive ? [1, 1.3, 1] : 0, opacity: isActive ? [0.5, 0.8, 0.5] : 0 }}
        transition={{ delay: 2.6, duration: 0.4, repeat: Infinity }}
        style={{ transformOrigin: "center top" }}
      />
      <motion.path
        d="M480,440 Q475,460 480,475 Q485,460 480,440"
        fill="url(#flameGradient)"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: isActive ? [1, 1.3, 1] : 0, opacity: isActive ? [0.5, 0.8, 0.5] : 0 }}
        transition={{ delay: 2.7, duration: 0.4, repeat: Infinity }}
        style={{ transformOrigin: "center top" }}
      />

      {/* Dimension lines */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(2)}
      >
        {/* Height dimension */}
        <line x1="540" y1="50" x2="540" y2="420" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="4 2" />
        <line x1="535" y1="50" x2="545" y2="50" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="535" y1="420" x2="545" y2="420" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="555" y="240" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="monospace">70.0m</text>

        {/* Width dimension */}
        <line x1="290" y1="450" x2="510" y2="450" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="4 2" />
        <line x1="290" y1="445" x2="290" y2="455" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="510" y1="445" x2="510" y2="455" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="385" y="465" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="monospace">12.2m</text>
      </motion.g>

      {/* Technical annotations */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(2.5)}
      >
        {/* Nose cone annotation */}
        <line x1="410" y1="60" x2="480" y2="30" stroke="hsl(var(--accent))" strokeWidth="0.5" />
        <circle cx="480" cy="30" r="2" fill="hsl(var(--accent))" />
        <text x="490" y="35" fill="hsl(var(--accent))" fontSize="9" fontFamily="monospace">PAYLOAD FAIRING</text>

        {/* Engine annotation */}
        <line x1="430" y1="435" x2="520" y2="460" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <circle cx="520" cy="460" r="2" fill="hsl(var(--primary))" />
        <text x="530" y="465" fill="hsl(var(--primary))" fontSize="9" fontFamily="monospace">9x MERLIN 1D</text>

        {/* LOX Tank */}
        <line x1="380" y1="180" x2="260" y2="160" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
        <circle cx="260" cy="160" r="2" fill="hsl(var(--muted-foreground))" />
        <text x="170" y="165" fill="hsl(var(--muted-foreground))" fontSize="9" fontFamily="monospace">LOX TANK</text>

        {/* RP-1 Tank */}
        <line x1="380" y1="280" x2="260" y2="300" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
        <circle cx="260" cy="300" r="2" fill="hsl(var(--muted-foreground))" />
        <text x="175" y="305" fill="hsl(var(--muted-foreground))" fontSize="9" fontFamily="monospace">RP-1 TANK</text>
      </motion.g>

      {/* Connection struts between boosters */}
      <motion.g
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: isActive ? 1 : 0, opacity: isActive ? 0.6 : 0 }}
        transition={delayedDraw(1.2)}
      >
        <motion.line x1="350" y1="200" x2="380" y2="200" stroke="hsl(var(--primary))" strokeWidth="1" 
          initial={{ pathLength: 0 }} animate={{ pathLength: isActive ? 1 : 0 }} transition={delayedDraw(1.2)} />
        <motion.line x1="350" y1="300" x2="380" y2="300" stroke="hsl(var(--primary))" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: isActive ? 1 : 0 }} transition={delayedDraw(1.3)} />
        <motion.line x1="420" y1="200" x2="450" y2="200" stroke="hsl(var(--primary))" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: isActive ? 1 : 0 }} transition={delayedDraw(1.2)} />
        <motion.line x1="420" y1="300" x2="450" y2="300" stroke="hsl(var(--primary))" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: isActive ? 1 : 0 }} transition={delayedDraw(1.3)} />
      </motion.g>

      {/* Grid fins (landing gear) */}
      <motion.g
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        style={{ transformOrigin: "center top" }}
      >
        <rect x="356" y="130" width="8" height="25" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" />
        <rect x="436" y="130" width="8" height="25" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" />
        {/* Grid pattern */}
        <line x1="358" y1="135" x2="362" y2="135" stroke="hsl(var(--accent))" strokeWidth="0.5" />
        <line x1="358" y1="140" x2="362" y2="140" stroke="hsl(var(--accent))" strokeWidth="0.5" />
        <line x1="358" y1="145" x2="362" y2="145" stroke="hsl(var(--accent))" strokeWidth="0.5" />
        <line x1="358" y1="150" x2="362" y2="150" stroke="hsl(var(--accent))" strokeWidth="0.5" />
        <line x1="438" y1="135" x2="442" y2="135" stroke="hsl(var(--accent))" strokeWidth="0.5" />
        <line x1="438" y1="140" x2="442" y2="140" stroke="hsl(var(--accent))" strokeWidth="0.5" />
        <line x1="438" y1="145" x2="442" y2="145" stroke="hsl(var(--accent))" strokeWidth="0.5" />
        <line x1="438" y1="150" x2="442" y2="150" stroke="hsl(var(--accent))" strokeWidth="0.5" />
      </motion.g>

      {/* Title block */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={delayedDraw(3)}
      >
        <rect x="600" y="400" width="180" height="80" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
        <line x1="600" y1="420" x2="780" y2="420" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <line x1="600" y1="450" x2="780" y2="450" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <text x="610" y="415" fill="hsl(var(--foreground))" fontSize="10" fontFamily="monospace" fontWeight="bold">FALCON HEAVY</text>
        <text x="610" y="440" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">SCALE: 1:200</text>
        <text x="700" y="440" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">REV: A</text>
        <text x="610" y="470" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">K1RA AI</text>
        <text x="700" y="470" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">DWG-001</text>
      </motion.g>
    </svg>
  );
}
