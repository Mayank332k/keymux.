import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function TerminalBootAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Tracks scroll progress over the 250vh container.
  // "start start" = top of container hits top of viewport (animation starts)
  // "end end" = bottom of container hits bottom of viewport (animation finishes and we scroll past)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Terminal Window Enters and Exits
  const terminalOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);
  const terminalScale = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0.95, 1, 1, 0.95]);

  // Logo Reveal (line by line)
  const logoLine1 = useTransform(scrollYProgress, [0.08, 0.12], [0, 1]);
  const logoLine2 = useTransform(scrollYProgress, [0.12, 0.16], [0, 1]);
  const logoLine3 = useTransform(scrollYProgress, [0.16, 0.20], [0, 1]);
  const logoLine4 = useTransform(scrollYProgress, [0.20, 0.24], [0, 1]);
  const logoLine5 = useTransform(scrollYProgress, [0.24, 0.28], [0, 1]);
  const logoLine6 = useTransform(scrollYProgress, [0.28, 0.32], [0, 1]);
  const dividerOpacity = useTransform(scrollYProgress, [0.32, 0.36], [0, 1]);
  
  // Boot Sequence
  const bootTitle = useTransform(scrollYProgress, [0.38, 0.42], [0, 1]);
  const p1 = useTransform(scrollYProgress, [0.44, 0.48], [0, 1]);
  const p2 = useTransform(scrollYProgress, [0.48, 0.52], [0, 1]);
  const p3 = useTransform(scrollYProgress, [0.52, 0.56], [0, 1]);
  const p4 = useTransform(scrollYProgress, [0.56, 0.60], [0, 1]);
  const p5 = useTransform(scrollYProgress, [0.60, 0.64], [0, 1]);

  // Strategy Block
  const stratTitle = useTransform(scrollYProgress, [0.68, 0.72], [0, 1]);
  const s1 = useTransform(scrollYProgress, [0.74, 0.78], [0, 1]);
  const s2 = useTransform(scrollYProgress, [0.78, 0.82], [0, 1]);
  const s3 = useTransform(scrollYProgress, [0.82, 0.86], [0, 1]);

  // Slide up effect for lines for a bit more dynamic feeling
  const translateYProvider = useTransform(scrollYProgress, [0.44, 0.48], [10, 0]);
  const translateYStrategy = useTransform(scrollYProgress, [0.68, 0.72], [10, 0]);

  return (
    <div ref={containerRef} className="relative w-full h-[250vh] bg-mistral-canvas dark:bg-[#121212] border-b border-mistral-hairline-soft dark:border-mistral-ink-tint">
      {/* Sticky container pins the window in place while we scroll through the 250vh */}
      <div className="sticky top-0 h-[100dvh] flex items-center justify-center overflow-hidden px-4 md:px-8 max-w-[1280px] mx-auto xl:pr-72">
        
        {/* The Terminal Window */}
        <motion.div 
          style={{ opacity: terminalOpacity, scale: terminalScale }}
          className="w-full max-w-4xl bg-mistral-surface-code border border-mistral-ink-tint rounded-xl shadow-2xl overflow-hidden will-change-transform"
        >
          {/* Header */}
          <div className="flex items-center px-4 py-3 border-b border-mistral-ink-tint bg-[#2a2a2c]">
            <div className="flex gap-2 items-center mr-1">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
              <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
            </div>
            <span className="mx-auto text-[11px] font-mono font-medium text-mistral-muted">keymux-daemon</span>
          </div>
          
          {/* Body */}
          <div className="p-6 md:p-10 font-mono text-[9px] sm:text-[13px] md:text-[15px] leading-[1.6] text-mistral-canvas h-[500px] sm:h-[550px] md:h-[650px] overflow-hidden flex flex-col will-change-transform">
            
            {/* ASCII Logo */}
            <div className="text-mistral-primary leading-tight font-bold whitespace-pre mb-6 overflow-x-auto no-scrollbar" style={{ textShadow: "0 0 10px rgba(255, 126, 51, 0.3)" }}>
              <motion.div style={{ opacity: logoLine1 }}>   ██╗  ██╗███████╗██╗   ██╗███╗   ███╗██╗   ██╗██╗  ██╗</motion.div>
              <motion.div style={{ opacity: logoLine2 }}>   ██║ ██╔╝██╔════╝╚██╗ ██╔╝████╗ ████║██║   ██║╚██╗██╔╝</motion.div>
              <motion.div style={{ opacity: logoLine3 }}>   █████╔╝ █████╗   ╚████╔╝ ██╔████╔██║██║   ██║ ╚███╔╝</motion.div>
              <motion.div style={{ opacity: logoLine4 }}>   ██╔═██╗ ██╔══╝    ╚██╔╝  ██║╚██╔╝██║██║   ██║ ██╔██╗</motion.div>
              <motion.div style={{ opacity: logoLine5 }}>   ██║  ██╗███████╗   ██║   ██║ ╚═╝ ██║╚██████╔╝██╔╝ ██╗</motion.div>
              <motion.div style={{ opacity: logoLine6 }}>   ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝</motion.div>
            </div>

            <motion.div style={{ opacity: dividerOpacity }} className="text-mistral-muted/50 mb-6 whitespace-pre overflow-hidden">
              ────────────────────────────────────────────────────────────
            </motion.div>

            {/* Boot Sequence */}
            <div className="flex flex-col gap-1.5 mb-10 overflow-x-auto whitespace-pre no-scrollbar">
              <motion.div style={{ opacity: bootTitle }} className="text-mistral-muted font-bold tracking-wider mb-3">
                [ DECORATIVE BOOT SEQUENCE - NOT LIVE DATA ]
              </motion.div>
              
              <motion.div style={{ opacity: p1, y: translateYProvider }}>◦ groq         ──●───────── <span className="text-[#ffbd2e]">[184ms]</span> <span className="text-[#27c93f]">ONLINE</span></motion.div>
              <motion.div style={{ opacity: p2, y: translateYProvider }}>◦ nvidia       ──●───────── <span className="text-[#ffbd2e]">[412ms]</span> <span className="text-[#27c93f]">ONLINE</span></motion.div>
              <motion.div style={{ opacity: p3, y: translateYProvider }}>◦ openrouter   ──●───────── <span className="text-[#ffbd2e]">[590ms]</span> <span className="text-[#27c93f]">ONLINE</span></motion.div>
              <motion.div style={{ opacity: p4, y: translateYProvider }}>◦ mistral      ──●───────── <span className="text-[#ffbd2e]">[245ms]</span> <span className="text-[#27c93f]">ONLINE</span></motion.div>
              <motion.div style={{ opacity: p5, y: translateYProvider }}>◦ gemini       ──●───────── <span className="text-[#ffbd2e]">[810ms]</span> <span className="text-[#27c93f]">ONLINE</span></motion.div>
            </div>

            {/* Strategy */}
            <div className="flex flex-col gap-1.5 overflow-x-auto whitespace-pre no-scrollbar">
              <motion.div style={{ opacity: stratTitle, y: translateYStrategy }} className="text-mistral-muted font-bold tracking-wider mb-3">
                [ STRATEGY: TTFT FAST-POOL ]
              </motion.div>
              <motion.div style={{ opacity: s1, y: translateYStrategy }}>
                <span className="text-mistral-muted">target_model  :</span> <span className="text-mistral-canvas font-semibold">llama-3.1-70b-versatile</span>
              </motion.div>
              <motion.div style={{ opacity: s2, y: translateYStrategy }}>
                <span className="text-mistral-muted">lead_provider :</span> <span className="text-mistral-sunshine-400 font-semibold">Groq</span>
              </motion.div>
              <motion.div style={{ opacity: s3, y: translateYStrategy }}>
                <span className="text-mistral-muted">variance      :</span> <span className="text-[#27c93f] font-semibold">± 0.0ms</span>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
