import { useState, useEffect } from 'react';
import { 
  Menu01Icon, 
  Cancel01Icon, 
  GithubIcon, 
  Copy01Icon, 
  Tick01Icon,
  ZapIcon,
  Shield01Icon,
  DatabaseIcon,
  Search01Icon,
  Linkedin02Icon,
  Mail01Icon
} from 'hugeicons-react';
import { Sun, Moon } from 'lucide-react';
import { InstallationSection } from './components/InstallationSection';
import { TableOfContents } from './components/TableOfContents';
import { ScrollReveal } from "@/components/lightswind/scroll-reveal";
import { TextParticleAnimation } from '@/components/lightswind/text-particle-animation';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion-variants';

function App() {
  const [isCopied, setIsCopied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle direct links with hashes on initial load
  useEffect(() => {
    if (window.location.hash) {
      // Small timeout to allow Framer Motion components to mount
      setTimeout(() => {
        const id = window.location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 500);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('git clone https://github.com/Mayank332k/keymux.git');
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="min-h-[100dvh] bg-mistral-canvas dark:bg-[#121212] text-mistral-ink dark:text-mistral-canvas font-sans selection:bg-mistral-sunshine-300 selection:text-mistral-ink transition-colors duration-300">
      
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/60 dark:bg-black/40 backdrop-blur-2xl backdrop-saturate-150 border-b border-mistral-hairline-soft dark:border-mistral-ink-tint transition-all">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a className="flex items-center group" href="#">
              <div className="h-7 flex items-center pt-1 overflow-visible">
                <TextParticleAnimation 
                  text="keymux" 
                  textColor="#fa520f"
                  theme={isDarkMode ? "dark" : "light"}
                  fontSize={22}
                  padding={2}
                  pixelSize={1.5}
                  resolution={2}
                  hoverRadius={20}
                />
              </div>
            </a>
          </div>

          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-6 md:p-8 text-sm font-medium text-mistral-slate dark:text-mistral-muted">
            <a className="hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212] rounded-sm" href="#">Home</a>
            <a className="hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212] rounded-sm" href="#installation">Installation</a>
            <a className="hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212] rounded-sm" href="#about">About</a>
            <a className="hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212] rounded-sm" href="#contact">Contact</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg text-mistral-slate dark:text-mistral-muted hover:bg-mistral-hairline-soft dark:hover:bg-mistral-ink-tint transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212]"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <a className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-medium bg-mistral-ink text-mistral-canvas hover:bg-mistral-ink-tint dark:bg-mistral-surface dark:text-mistral-ink dark:hover:bg-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212]" href="https://github.com/Mayank332k/keymux" target="_blank" rel="noopener noreferrer">
              <GithubIcon size={16} className="mr-2" />
              View on GitHub
            </a>
            
            <a className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-medium bg-mistral-primary text-white hover:bg-mistral-primary-deep transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212]" href="#early-access">
              Get Started
            </a>

            {/* Mobile Hamburger Button */}
            <button 
              className="lg:hidden p-2 rounded-lg text-mistral-slate dark:text-mistral-muted hover:bg-mistral-hairline-soft dark:hover:bg-mistral-ink-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <Cancel01Icon size={24} /> : <Menu01Icon size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden absolute top-16 inset-x-0 h-[calc(100vh-64px)] bg-white dark:bg-[#121212] px-5 md:px-8 py-10 flex flex-col gap-6 md:p-8 overflow-y-auto z-[999]"
          >
            <a className="text-mistral-ink dark:text-mistral-canvas font-semibold text-3xl tracking-tight" href="#" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            <a className="text-mistral-ink dark:text-mistral-canvas font-semibold text-3xl tracking-tight" href="#installation" onClick={() => setIsMobileMenuOpen(false)}>Installation</a>
            <a className="text-mistral-ink dark:text-mistral-canvas font-semibold text-3xl tracking-tight" href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a className="text-mistral-ink dark:text-mistral-canvas font-semibold text-3xl tracking-tight" href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-mistral-hairline-soft dark:border-mistral-ink-tint">
              <a className="flex items-center justify-center w-full px-6 py-4 rounded-lg text-lg font-medium bg-mistral-ink dark:bg-mistral-surface text-mistral-canvas dark:text-mistral-ink" href="https://github.com/Mayank332k/keymux" onClick={() => setIsMobileMenuOpen(false)}>
                View on GitHub
              </a>
              <a className="flex items-center justify-center w-full px-6 py-4 rounded-lg text-lg font-medium bg-mistral-primary text-white" href="#early-access" onClick={() => setIsMobileMenuOpen(false)}>
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </header>

      <TableOfContents />

      <main className="overflow-x-hidden">
        {/* BEGIN: Hero Section */}
        <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 bg-mistral-canvas dark:bg-[#121212] bg-mistral-grid border-b border-mistral-hairline-soft dark:border-mistral-ink-tint overflow-hidden" id="overview">
        {/* Ambient Background Blobs */}
        <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-mistral-sunshine-300/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 pointer-events-none"></div>
        <div className="absolute top-1/3 right-[-5%] w-[600px] h-[600px] bg-mistral-primary/10 rounded-full mix-blend-multiply filter blur-[150px] opacity-70 pointer-events-none"></div>
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#a78bfa]/10 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 pointer-events-none"></div>
        
        {/* Visual Glow / Mesh Behind Text for Engagement */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[600px] bg-mistral-cream-deeper/30 dark:bg-mistral-ink/20 rounded-full mix-blend-normal filter blur-[100px] opacity-60 pointer-events-none"></div>

        {/* Subtle radial fade for the grid so it's not too harsh everywhere */}
        <div className="absolute inset-0 bg-mistral-canvas dark:bg-[#121212] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_100%)] pointer-events-none"></div>

        <div className="max-w-[1280px] mx-auto px-5 md:px-8 xl:pr-72 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-6 md:p-8 items-center">
            
            {/* Left Column: Huge Copy */}
            <motion.div 
              initial={{ opacity: 0, y: 4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col lg:col-span-7"
            >
              <div className="mb-8">
                <span className="font-mono text-sm font-semibold text-mistral-steel uppercase tracking-widest">
                  v1.2 Released
                </span>
              </div>
              <div className="mb-4 flex justify-start -ml-4 sm:-ml-12 w-full relative z-20">
                <TextParticleAnimation 
                  text="Keymux" 
                  theme={isDarkMode ? "dark" : "light"}
                  fontSize={120} 
                  padding={30}
                />
              </div>
              <p className="text-lg md:text-2xl text-mistral-slate dark:text-mistral-muted leading-[1.5] max-w-xl mb-12">
                A lightweight multiplexer for local agent orchestration. 
                Seamlessly route Claude Code context through a unified port.
              </p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <a className="inline-flex items-center justify-center px-6 py-3 sm:py-2.5 rounded-md text-base sm:text-sm font-medium bg-mistral-primary text-white hover:bg-mistral-primary-deep transition-all w-full sm:w-auto text-center" href="#installation">
                  Get Started
                </a>
                <button 
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 rounded-md text-base sm:text-sm font-medium bg-transparent border border-mistral-hairline-strong dark:border-mistral-ink-tint text-mistral-ink dark:text-mistral-canvas hover:bg-mistral-surface dark:hover:bg-mistral-ink transition-all w-full sm:w-auto text-center"
                >
                  {isCopied ? <Tick01Icon size={16} className="text-emerald-600" /> : <Copy01Icon size={16} />}
                  <span className="font-mono">git clone ...</span>
                </button>
              </motion.div>
            </motion.div>

            {/* Right Column: Mock Terminal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" as const }}
              className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl flex items-center justify-center p-4 sm:p-6 md:p-8 lg:col-span-5"
            >
              {/* Floating Code Mockup */}
              <div className="relative w-full max-w-[320px] sm:max-w-sm bg-mistral-surface-code border border-mistral-ink-tint rounded-xl shadow-2xl overflow-hidden transform sm:-rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center px-4 py-3 border-b border-mistral-ink-tint bg-[#2a2a2c]">
                  <div className="flex gap-1.5 items-center mr-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-mistral-steel/40"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-mistral-steel/40"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-mistral-steel/40"></span>
                  </div>
                  <span className="ml-auto text-[10px] font-mono font-medium text-mistral-muted">keymux-daemon</span>
                </div>
                <div className="p-4 sm:p-5 font-mono text-[11px] sm:text-[13px] leading-[1.7] text-mistral-canvas whitespace-nowrap overflow-x-auto">
                  <p><span className="text-mistral-muted">$</span> <span className="text-mistral-sunshine-500">keymux</span> start --port 8080</p>
                  <p className="text-mistral-steel mt-2">→ Initializing daemon...</p>
                  <p className="text-mistral-canvas">✓ Binding to 127.0.0.1:8080</p>
                  <p className="text-mistral-canvas mt-2">[MCP] Discovered 3 local agents</p>
                  <p className="text-mistral-steel mt-4">Waiting for incoming connections...</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <InstallationSection />

        {/* BEGIN: About Keymux Section */}
        <section className="py-16 md:py-24 bg-mistral-cream dark:bg-[#1a1a1c] border-b border-mistral-hairline-soft dark:border-mistral-ink-tint" id="about">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 xl:pr-72">
            <motion.div 
              initial={{ opacity: 0, y: 4, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <div className="mb-6">
                <span className="font-mono text-xs font-semibold text-mistral-steel uppercase tracking-widest">
                  About
                </span>
              </div>

              <h2 className="font-editorial text-[52px] font-normal tracking-[-0.5px] leading-[1.15] text-mistral-ink dark:text-mistral-canvas mb-8">
                <ScrollReveal staggerDelay={0.15} duration={1} blurStrength={10}>The gateway for autonomous agents.</ScrollReveal>
              </h2>
              
              <div className="prose prose-lg text-mistral-slate dark:text-mistral-muted max-w-none space-y-6 leading-[1.6]">
                <p>
                  Keymux was born out of the necessity to orchestrate multiple LLM models and local agent loops seamlessly. As terminal-based agents like Claude Code become more prevalent, managing API keys, context routing, and failovers across multiple providers becomes a bottleneck.
                </p>
                <p>
                  We provide a unified, ultra-fast multiplexer that sits between your local developer tooling and the cloud. By injecting directly as an MCP (Model Context Protocol) routing daemon, Keymux intercepts requests, standardizes schemas, and handles adaptive rate-limiting automatically. 
                </p>
                <p>
                  Zero jitter. Lock-free execution. Just point your agent to `localhost:8080` and let the multiplexer handle the rest.
                </p>
              </div>
            </motion.div>

            {/* Routing Logic Features */}
            <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6 md:p-8 lg:gap-12">
              
              {/* Auto Mode Card */}
              <motion.div 
                initial={{ opacity: 0, y: 4, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                className="bg-white dark:bg-[#121212] border border-mistral-hairline dark:border-mistral-ink-tint rounded-xl p-6 md:p-8 shadow-sm flex flex-col h-full relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-mistral-sunshine-500 to-mistral-primary opacity-80"></div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-mistral-sunshine-300/20 dark:bg-mistral-sunshine-300/10 flex items-center justify-center text-mistral-primary">
                    <ZapIcon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-mistral-ink dark:text-mistral-canvas tracking-tight">Auto Mode</h3>
                    <p className="text-xs font-mono font-medium text-mistral-primary tracking-wide uppercase mt-1">Smart TTFT & Dynamic Translation</p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="inline-block px-2.5 py-1 rounded bg-mistral-hairline-soft dark:bg-mistral-surface-code text-[11px] font-semibold text-mistral-slate dark:text-mistral-muted tracking-wide uppercase">
                    Best for: High-availability workflows & autonomous agents
                  </span>
                </div>

                <p className="text-sm text-mistral-slate dark:text-mistral-muted leading-[1.6] mb-6">
                  In Auto Mode, Keymux prioritizes <strong>Speed and Uptime</strong> over model strictness. The routing logic executes in four distinct phases:
                </p>

                <ol className="space-y-4 mb-8">
                  <li className="flex gap-4">
                    <span className="font-editorial italic text-2xl text-mistral-steel dark:text-mistral-ink-tint">1</span>
                    <div>
                      <h4 className="text-sm font-bold text-mistral-ink dark:text-mistral-canvas mb-1">Health Verification</h4>
                      <p className="text-sm text-mistral-slate dark:text-mistral-muted leading-relaxed">Filters out any keys currently blocked by the Circuit Breaker (e.g., in a cooling period after hitting a 429 Rate Limit).</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-editorial italic text-2xl text-mistral-steel dark:text-mistral-ink-tint">2</span>
                    <div>
                      <h4 className="text-sm font-bold text-mistral-ink dark:text-mistral-canvas mb-1">TTFT Baseline</h4>
                      <p className="text-sm text-mistral-slate dark:text-mistral-muted leading-relaxed">Analyzes the Exponential Moving Average (EMA) of the Time-To-First-Token latency across all healthy keys to identify the absolute fastest provider.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-editorial italic text-2xl text-mistral-steel dark:text-mistral-ink-tint">3</span>
                    <div>
                      <h4 className="text-sm font-bold text-mistral-ink dark:text-mistral-canvas mb-1">Tolerance Banding</h4>
                      <p className="text-sm text-mistral-slate dark:text-mistral-muted leading-relaxed">Creates a dynamic +100ms window around the fastest baseline to establish a "Fast Pool" of elite providers.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-editorial italic text-2xl text-mistral-steel dark:text-mistral-ink-tint">4</span>
                    <div>
                      <h4 className="text-sm font-bold text-mistral-ink dark:text-mistral-canvas mb-1">Utilization Tie-Breaker</h4>
                      <p className="text-sm text-mistral-slate dark:text-mistral-muted leading-relaxed">Selects the key from the Fast Pool that has the lowest API quota utilization (RPM / Limit).</p>
                    </div>
                  </li>
                </ol>

                <div className="p-5 rounded-lg bg-mistral-cream-soft dark:bg-[#1a1a1c] border border-mistral-hairline dark:border-mistral-ink-tint/50">
                  <h4 className="text-[11px] font-mono font-bold text-mistral-ink dark:text-mistral-canvas uppercase tracking-widest mb-2">Dynamic Model Translation</h4>
                  <p className="text-sm text-mistral-slate dark:text-mistral-muted leading-relaxed">
                    If the selected provider differs from the requested model, Keymux transparently translates the payload to the optimal flagship model. For example, if OpenRouter is congested, Keymux seamlessly routes to Groq targeting <code className="font-mono text-[10px] bg-mistral-hairline-soft dark:bg-black/40 px-1 py-0.5 rounded text-mistral-primary">llama-3.1-70b-versatile</code>, preventing crashes.
                  </p>
                </div>
              </motion.div>

              {/* Strict Mode Card */}
              <motion.div 
                initial={{ opacity: 0, y: 4, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                className="bg-white dark:bg-[#121212] border border-mistral-hairline dark:border-mistral-ink-tint rounded-xl p-6 md:p-8 shadow-sm flex flex-col h-full relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-mistral-steel to-mistral-slate opacity-80 dark:from-mistral-ink-tint dark:to-mistral-slate"></div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-mistral-hairline-soft dark:bg-mistral-surface-code flex items-center justify-center text-mistral-slate dark:text-mistral-muted">
                    <Shield01Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-mistral-ink dark:text-mistral-canvas tracking-tight">Strict Mode</h3>
                    <p className="text-xs font-mono font-medium text-mistral-slate dark:text-mistral-muted tracking-wide uppercase mt-1">Enforced Model Routing</p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="inline-block px-2.5 py-1 rounded bg-mistral-hairline-soft dark:bg-mistral-surface-code text-[11px] font-semibold text-mistral-slate dark:text-mistral-muted tracking-wide uppercase">
                    Best for: Production, benchmarking & strict adherence
                  </span>
                </div>

                <p className="text-sm text-mistral-slate dark:text-mistral-muted leading-[1.6] mb-6">
                  In Strict Mode, Keymux prioritizes <strong>Model Consistency</strong> over absolute uptime. The routing logic ensures precise capability matching:
                </p>

                <ul className="space-y-6 mb-8 flex-grow">
                  <li className="flex gap-4">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-mistral-slate dark:bg-mistral-muted shrink-0"></div>
                    <div>
                      <h4 className="text-sm font-bold text-mistral-ink dark:text-mistral-canvas mb-1">Isolated Pools</h4>
                      <p className="text-sm text-mistral-slate dark:text-mistral-muted leading-relaxed">The router filters the healthy pool to only include keys explicitly supporting the requested model (e.g. strict Anthropic keys for <code className="font-mono text-[10px] bg-mistral-hairline-soft dark:bg-mistral-surface-code px-1 py-0.5 rounded">claude-3-5-sonnet</code>).</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-mistral-slate dark:bg-mistral-muted shrink-0"></div>
                    <div>
                      <h4 className="text-sm font-bold text-mistral-ink dark:text-mistral-canvas mb-1">Intra-Model Balancing</h4>
                      <p className="text-sm text-mistral-slate dark:text-mistral-muted leading-relaxed">Applies the same TTFT & Utilization load-balancing logic, but strictly contained within the keys designated for that exact model.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-rose-500/80 shrink-0"></div>
                    <div>
                      <h4 className="text-sm font-bold text-mistral-ink dark:text-mistral-canvas mb-1">Hard Fails</h4>
                      <p className="text-sm text-mistral-slate dark:text-mistral-muted leading-relaxed">If all keys for the requested model are rate-limited or the API drops, Keymux gracefully returns a standard HTTP 429/500 error instead of silently switching to a different LLM family.</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
              
            </div>
          </div>
        </section>

        {/* BEGIN: Architecture Section */}
        <section className="py-16 md:py-24 bg-mistral-surface dark:bg-[#121212] border-b border-mistral-hairline-soft dark:border-mistral-ink-tint" id="architecture">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 xl:pr-72">
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <div className="max-w-2xl mb-16">
                <h2 className="font-editorial text-[52px] font-normal tracking-[-0.5px] leading-[1.15] text-mistral-ink dark:text-mistral-canvas">
                  Zero-jitter failover in sub-millisecond execution.
                </h2>
                <p className="text-lg text-mistral-slate dark:text-mistral-muted mt-6 leading-[1.50]">
                  Keymux automatically detects provider quotas, drops stale upstream connections, and instantly streams responses across fallback endpoints without breaking client sessions.
                </p>
              </div>

              <div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6 md:p-8 mt-12"
              >
                {[
                  { icon: Shield01Icon, title: 'Atomic Lock-Free Buffers', desc: 'Zero allocation during request hot-path. Atomic bitmasks verify quotas in nanoseconds without thread contention.' },
                  { icon: DatabaseIcon, title: 'Native MCP Bridging', desc: 'Integrated Model Context Protocol socket bridging. Directly injects as an MCP routing daemon for terminal work agents.' },
                  { icon: Search01Icon, title: 'Cross-Provider Mapping', desc: 'Universal OpenAI format compliance. Automatic schema mapping between Anthropic tool-calls and Gemini payloads.' }
                ].map((feature, i) => (
                  <motion.div 
                    key={i}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeUp}
                    className="p-6 md:p-8 rounded-lg bg-mistral-canvas dark:bg-[#1a1a1c] border border-mistral-hairline-soft dark:border-mistral-ink-tint hover:-translate-y-[1px] hover:shadow-card-hover transition-all"
                  >
                    <div className="w-10 h-10 mb-6 text-mistral-primary">
                      <feature.icon size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-sans text-[22px] font-medium text-mistral-ink dark:text-mistral-canvas leading-[1.30] mb-3">{feature.title}</h3>
                    <p className="text-base text-mistral-slate dark:text-mistral-muted font-normal leading-[1.55]">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* BEGIN: Matrix Overview Section */}
        <section className="py-16 md:py-24 bg-mistral-canvas dark:bg-[#121212]" id="features">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 xl:pr-72">
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <div className="mb-16">
                <h2 className="font-editorial text-[52px] font-normal tracking-[-0.5px] leading-[1.15] text-mistral-ink dark:text-mistral-canvas max-w-3xl">
                  Engineered for production agent loops
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {[
                  { num: '01', title: 'Ring Buffer', name: 'Lock-Free Sliding Ring', desc: 'Maintains high-frequency request queues without mutex deadlock risks. Handles 100,000 req/sec per node.' },
                  { num: '02', title: 'Adaptive Pacing', name: 'Sliding RPM Quotas', desc: 'Predictive tier pacing prevents provider rate limits before they happen by dynamically shedding low-priority batch workers.' },
                  { num: '03', title: 'Sanitizer', name: 'Auto Base64 Normalizer', desc: 'Zero-downtime payload sanitation automatically converts non-standard image URLs and binary payloads to target-compatible formats.' },
                  { num: '04', title: 'Observability', name: 'OpenTelemetry Native', desc: 'Full tracing spans exported through OTLP. Pinpoint slow upstream provider time-to-first-token.' }
                ].map((item) => (
                  <motion.div 
                    key={item.num}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeUp}
                    className="p-6 md:p-8 rounded-lg bg-mistral-cream dark:bg-[#1a1a1c] border border-mistral-beige-deep dark:border-mistral-ink-tint transition-all"
                  >
                    <div className="font-mono text-xs font-semibold text-mistral-steel uppercase tracking-widest mb-6">
                      {item.num} / {item.title}
                    </div>
                    <h3 className="font-sans text-[22px] font-medium text-mistral-ink dark:text-mistral-canvas leading-[1.30] mb-3">{item.name}</h3>
                    <p className="text-base text-mistral-slate dark:text-mistral-muted font-normal leading-[1.55]">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* BEGIN: Contact Section */}
        <section className="py-16 md:py-24 bg-mistral-cream-soft dark:bg-[#1a1a1c] border-t border-mistral-hairline-soft dark:border-mistral-ink-tint" id="contact">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 xl:pr-72">
            <motion.div 
              initial={{ opacity: 0, y: 4, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center mb-16"
            >
              <span className="font-mono text-xs font-semibold text-mistral-steel uppercase tracking-widest mb-4 block">
                Contact
              </span>
              <h2 className="font-editorial text-[52px] font-normal tracking-[-0.5px] leading-[1.15] text-mistral-ink dark:text-mistral-canvas mb-6">
                Let's build together.
              </h2>
              <p className="text-lg text-mistral-slate dark:text-mistral-muted leading-[1.6]">
                Have a question or want to integrate Keymux into your workflow? Send a message directly to the maintainer.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 4, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="max-w-xl mx-auto bg-mistral-canvas dark:bg-[#1a1a1c] border border-mistral-hairline-strong dark:border-mistral-ink-tint rounded-xl p-6 md:p-8 lg:p-10 shadow-sm"
            >
              <form action="mailto:singhmayank4146@gmail.com" method="GET" encType="text/plain" className="flex flex-col gap-5 sm:gap-6">
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <label htmlFor="subject" className="text-sm font-medium text-mistral-ink dark:text-mistral-canvas">Subject</label>
                  <input type="text" id="subject" name="subject" placeholder="How can we help?" className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#121212] border border-mistral-hairline-strong dark:border-mistral-ink-tint focus:outline-none focus:border-mistral-slate dark:focus:border-mistral-muted transition-colors text-mistral-ink dark:text-mistral-canvas placeholder:text-mistral-steel/50 shadow-sm" required />
                </div>
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <label htmlFor="body" className="text-sm font-medium text-mistral-ink dark:text-mistral-canvas">Message</label>
                  <textarea id="body" name="body" rows={4} placeholder="Tell us about your project..." className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#121212] border border-mistral-hairline-strong dark:border-mistral-ink-tint focus:outline-none focus:border-mistral-slate dark:focus:border-mistral-muted transition-colors text-mistral-ink dark:text-mistral-canvas placeholder:text-mistral-steel/50 shadow-sm resize-none" required></textarea>
                </div>
                <button type="submit" className="w-full py-3.5 mt-2 rounded-lg font-medium text-mistral-canvas dark:text-mistral-ink bg-mistral-ink dark:bg-mistral-canvas hover:opacity-90 shadow-sm transition-opacity flex items-center justify-center gap-2">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </section>
        
        {/* The Signature Mistral Sunset Stripe Band */}
        <div className="w-full h-4 bg-sunset-stripe"></div>
      </main>

      {/* BEGIN: Footer */}
      <footer className="bg-mistral-cream dark:bg-[#1a1a1c] py-16 text-mistral-ink dark:text-mistral-canvas">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-mistral-ink dark:bg-mistral-canvas text-mistral-canvas dark:text-mistral-ink rounded flex items-center justify-center font-mono font-bold text-[10px]">KM</div>
                <span className="font-semibold text-base tracking-tight">Keymux</span>
              </div>
              <p className="text-sm font-normal text-mistral-slate dark:text-mistral-muted max-w-xs leading-[1.50]">
                Open-source technical gateway and multiplexer. Built for developer sovereignty.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-sm mb-2 text-mistral-ink dark:text-mistral-canvas">Explore</span>
              <a className="text-sm text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors" href="#">Home</a>
              <a className="text-sm text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors" href="#installation">Installation</a>
              <a className="text-sm text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors" href="#about">About</a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-semibold text-sm mb-2 text-mistral-ink dark:text-mistral-canvas">Connect</span>
              <a className="flex items-center gap-2 text-sm text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors" href="mailto:singhmayank4146@gmail.com">
                <Mail01Icon size={16} strokeWidth={2} />
                Email
              </a>
              <a className="flex items-center gap-2 text-sm text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors" href="https://www.linkedin.com/in/mayank-singh-813b68373/" target="_blank" rel="noopener noreferrer">
                <Linkedin02Icon size={16} strokeWidth={2} />
                LinkedIn
              </a>
              <a className="flex items-center gap-2 text-sm text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors" href="https://github.com/Mayank332k" target="_blank" rel="noopener noreferrer">
                <GithubIcon size={16} strokeWidth={2} />
                GitHub
              </a>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-mistral-beige-deep dark:border-mistral-ink-tint flex items-center justify-center text-xs text-mistral-slate dark:text-mistral-muted text-center">
            <div>© 2026 Keymux Project Contributors. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
