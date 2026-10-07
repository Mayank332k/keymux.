import { useState, useEffect } from 'react';
import { 
  Menu01Icon, 
  Cancel01Icon, 
  GithubIcon, 
  Copy01Icon, 
  Tick01Icon,
  Linkedin02Icon,
  Mail01Icon
} from 'hugeicons-react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { InstallationSection } from './components/InstallationSection';
import { LeoAgentSection } from './components/LeoAgentSection';
import { TableOfContents } from './components/TableOfContents';
import { motion, AnimatePresence } from 'framer-motion';

type ThemeMode = 'light' | 'dark' | 'system';

const navItems = ['Home', 'Installation', 'Leo Agent', 'About', 'Contact'] as const;
function App() {
  const [isCopied, setIsCopied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>('system');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = () => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = theme === 'dark' || (theme === 'system' && prefersDark);
      root.classList.toggle('dark', shouldBeDark);
    };
    applyTheme();
    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => applyTheme();
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.getElementById(window.location.hash.slice(1));
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  const copyClone = () => {
    navigator.clipboard.writeText('git clone https://github.com/Mayank332k/keymux.git');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-mistral-canvas dark:bg-[#121212] text-mistral-ink dark:text-mistral-canvas font-sans antialiased selection:bg-mistral-sunshine-300 selection:text-mistral-ink transition-colors duration-200">
      
      {/* Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-200 ${scrolled ? 'bg-mistral-canvas/90 dark:bg-[#121212]/90 backdrop-blur-md border-b border-mistral-hairline-soft dark:border-mistral-ink-tint' : 'bg-transparent border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-14">
            <a href="#overview" className="flex items-center gap-2" aria-label="Keymux home">
              <span className="font-editorial text-xl lg:text-2xl font-normal tracking-tight text-mistral-ink dark:text-mistral-canvas">keymux</span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider rounded bg-mistral-primary/10 text-mistral-primary">v1.2</span>
            </a>

            {/* Desktop Navigation */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1 lg:gap-4">
              {navItems.map(item => (
                <a key={item} href={item === 'Home' ? '#overview' : `#${item.toLowerCase().replace(' ', '-')}`} 
                   className="px-3 py-2 text-sm font-medium text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:bg-mistral-primary after:w-0 after:transition-all hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212] rounded-sm min-h-[44px] flex items-center">
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 lg:gap-3">
              {/* Theme toggle */}
              <div className="relative">
                <button onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)} 
                        className="p-2.5 rounded-lg text-mistral-slate dark:text-mistral-muted hover:bg-mistral-hairline-soft dark:hover:bg-mistral-ink-tint transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212] min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label="Select theme" aria-expanded={isThemeDropdownOpen} aria-haspopup="listbox">
                  {theme === 'system' ? <Monitor size={22} /> : theme === 'dark' ? <Moon size={22} /> : <Sun size={22} />}
                </button>
                <AnimatePresence>
                  {isThemeDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsThemeDropdownOpen(false)} />
                      <motion.div 
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                        className="absolute right-0 mt-2 w-40 rounded-xl shadow-lg bg-white dark:bg-[#1a1a1c] border border-mistral-hairline-strong dark:border-mistral-ink-tint z-50 overflow-hidden"
                        role="listbox"
                      >
                        {(['light', 'dark', 'system'] as ThemeMode[]).map(t => (
                          <button key={t} onClick={() => { setTheme(t); setIsThemeDropdownOpen(false); }}
                            className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${theme === t ? 'bg-mistral-primary/10 text-mistral-primary font-medium' : 'text-mistral-ink dark:text-mistral-canvas hover:bg-mistral-hairline-soft dark:hover:bg-mistral-ink-tint'}`}
                            role="option" aria-selected={theme === t}>
                            {t === 'light' && <Sun size={18} />}
                            {t === 'dark' && <Moon size={18} />}
                            {t === 'system' && <Monitor size={18} />}
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Desktop CTA */}
              <div className="hidden lg:flex items-center gap-2">
                <a href="https://github.com/Mayank332k/keymux" target="_blank" rel="noopener noreferrer"
                   className="px-4 py-2 text-sm font-medium text-mistral-ink dark:text-mistral-canvas bg-transparent border border-mistral-hairline-strong dark:border-mistral-ink-tint rounded-lg hover:bg-mistral-hairline-soft dark:hover:bg-mistral-ink-tint transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212] flex items-center gap-2 min-h-[44px]">
                  <GithubIcon size={18} /> GitHub
                </a>
                <a href="#installation" className="px-4 py-2 text-sm font-medium text-white bg-mistral-primary rounded-lg hover:bg-mistral-primary-deep transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212] min-h-[44px] flex items-center justify-center">
                  Get Started
                </a>
              </div>

              {/* Mobile menu button */}
              <button className="lg:hidden p-2.5 rounded-lg text-mistral-slate dark:text-mistral-muted hover:bg-mistral-hairline-soft dark:hover:bg-mistral-ink-tint transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212] min-h-[44px] min-w-[44px] flex items-center justify-center"
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-expanded={isMobileMenuOpen} aria-controls="mobile-menu" aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}>
                {isMobileMenuOpen ? <Cancel01Icon size={24} /> : <Menu01Icon size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                id="mobile-menu" 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }} 
                className="lg:hidden overflow-hidden border-t border-mistral-hairline-soft dark:border-mistral-ink-tint bg-mistral-canvas dark:bg-[#121212] animate-accordion"
              >
                <div className="px-4 py-5 space-y-1">
                  {navItems.map(item => (
                    <a key={item} href={item === 'Home' ? '#overview' : `#${item.toLowerCase().replace(' ', '-')}`} onClick={closeMobileMenu}
                       className="block px-3 py-3.5 text-base font-medium text-mistral-ink dark:text-mistral-canvas hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors rounded-lg hover:bg-mistral-hairline-soft dark:hover:bg-mistral-ink-tint min-h-[48px]">
                      {item}
                    </a>
                  ))}
                  <div className="pt-2 border-t border-mistral-hairline-soft dark:border-mistral-ink-tint space-y-2">
                    <a href="https://github.com/Mayank332k/keymux" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}
                       className="flex items-center justify-center w-full px-4 py-3.5 rounded-lg text-base font-medium bg-mistral-ink dark:bg-mistral-surface text-mistral-canvas dark:text-mistral-ink border border-mistral-hairline-strong dark:border-mistral-ink-tint min-h-[48px]">
                      <GithubIcon size={20} className="mr-2" /> View on GitHub
                    </a>
                    <a href="#installation" onClick={closeMobileMenu}
                       className="flex items-center justify-center w-full px-4 py-3.5 rounded-lg text-base font-medium bg-mistral-primary text-white min-h-[48px]">
                      Get Started
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Table of Contents - Desktop only */}
      <div className="hidden xl:block">
        <TableOfContents />
      </div>

      <main>
        {/* Hero */}
        <section id="overview" className="relative pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-28 lg:pb-32 bg-mistral-canvas dark:bg-[#121212] overflow-hidden">
          <div className="absolute inset-0 bg-mistral-grid opacity-30 dark:opacity-20" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mistral-primary/5 to-transparent dark:from-transparent dark:via-mistral-primary/5 dark:to-transparent pointer-events-none" aria-hidden="true" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
              {/* Copy */}
              <div className="max-w-2xl">
                <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }} className="inline-block mb-5">
                  <span className="font-mono text-xs font-semibold text-mistral-steel uppercase tracking-widest">v1.2 Released</span>
                </motion.span>
                
                <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }} className="font-editorial text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-[-0.02em] leading-[1.05] text-mistral-ink dark:text-mistral-canvas mb-5">
                  Local proxy for <span className="text-mistral-primary">Claude Code</span>
                </motion.h1>
                
                <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }} className="text-base md:text-lg lg:text-xl text-mistral-slate dark:text-mistral-muted leading-[1.65] mb-7 max-w-xl">
                  Route Claude Code through free APIs (Gemini, Groq, OpenRouter). Zero-downtime failover. Zero proxy hops. 100% local.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }} className="flex flex-col sm:flex-row gap-3">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={copyClone} className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium bg-mistral-primary text-white rounded-lg hover:bg-mistral-primary-deep transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212] w-full sm:w-auto min-h-[48px]">
                    {isCopied ? <><Tick01Icon size={16} className="text-emerald-400" /> Copied</> : <><Copy01Icon size={16} /> git clone ...</>}
                  </motion.button>
                  <a href="#installation" className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-mistral-ink dark:text-mistral-canvas border border-mistral-hairline-strong dark:border-mistral-ink-tint rounded-lg hover:bg-mistral-hairline-soft dark:hover:bg-mistral-ink-tint transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212] w-full sm:w-auto min-h-[48px]">
                    View Installation
                  </a>
                </motion.div>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="mt-8 text-sm text-mistral-muted flex items-center gap-2">
                  <span className="w-12 h-px bg-mistral-hairline-strong dark:bg-mistral-ink-tint" />
                  Works with Claude Code CLI, Desktop, Extensions, Cline, Roo, Continue
                </motion.p>
              </div>

              {/* Visual: Terminal preview */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }} className="relative">
                <div className="bg-mistral-surface-code border border-mistral-ink-tint rounded-xl shadow-2xl overflow-hidden">
                  <div className="flex items-center px-4 py-3 border-b border-mistral-ink-tint bg-[#1a1a1c]">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500/80" /><span className="w-3 h-3 rounded-full bg-yellow-500/80" /><span className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="ml-auto text-[11px] font-mono font-medium text-mistral-muted">keymux -d</span>
                  </div>
                  <div className="p-4 md:p-5 font-mono text-[12px] md:text-[13px] leading-[1.7] text-mistral-canvas overflow-x-auto" style={{ minHeight: 260 }}>
                    <pre className="whitespace-pre-wrap"><code>{`$ keymux start --port 8080
→ Initializing daemon...
✓ Binding to 127.0.0.1:8080
✓ Loaded 5 providers: gemini, groq, openrouter, nvidia, mistral
✓ Circuit breakers armed
✓ TTFT routing active

[MCP] Discovered 3 local agents
[DASHBOARD] http://localhost:8080/keymux

Waiting for connections...`}</code></pre>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <InstallationSection />
        <LeoAgentSection />

        {/* About */}
        <section id="about" className="py-16 md:py-24 lg:py-28 bg-mistral-cream dark:bg-[#1a1a1c] border-y border-mistral-hairline-soft dark:border-mistral-ink-tint">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="font-mono text-xs font-semibold text-mistral-steel uppercase tracking-widest mb-4 block">About</span>
              <h2 className="font-editorial text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-[-0.02em] leading-[1.1] text-mistral-ink dark:text-mistral-canvas mb-6">
                The gateway for autonomous agents.
              </h2>
              <div className="space-y-4 text-base md:text-lg text-mistral-slate dark:text-mistral-muted leading-[1.75]">
                <p>Keymux was built to orchestrate multiple LLM models and local agent loops seamlessly. As terminal-based agents like Claude Code become prevalent, managing API keys, context routing, and failovers across providers becomes a bottleneck.</p>
                <p>We provide a unified, ultra-fast multiplexer that sits between your local tooling and the cloud. By injecting directly as an MCP routing daemon, Keymux intercepts requests, standardizes schemas, and handles adaptive rate-limiting automatically.</p>
                <p className="font-medium text-mistral-ink dark:text-mistral-canvas">Zero jitter. Lock-free execution. Just point your agent to <code className="bg-mistral-hairline-soft dark:bg-mistral-ink-tint px-1.5 py-0.5 rounded font-mono text-sm">localhost:8080</code> and let the multiplexer handle the rest.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section id="architecture" className="py-16 md:py-24 lg:py-28 bg-mistral-surface dark:bg-[#121212] border-b border-mistral-hairline-soft dark:border-mistral-ink-tint">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="font-editorial text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-[-0.02em] leading-[1.1] text-mistral-ink dark:text-mistral-canvas mb-5">
                Zero-jitter failover in sub-millisecond execution.
              </h2>
              <p className="text-base md:text-lg text-mistral-slate dark:text-mistral-muted leading-[1.7]">
                Keymux automatically detects provider quotas, drops stale upstream connections, and instantly streams responses across fallback endpoints without breaking client sessions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[
                { title: 'Atomic Lock-Free Buffers', desc: 'High-frequency request queues without mutex deadlock risks. Handles 100k+ req/sec per node.' },
                { title: 'Native MCP Bridging', desc: 'Protocol translation between Claude Code and OpenAI-compatible endpoints. Tool calls preserved.' },
                { title: 'Cross-Provider Mapping', desc: 'Automatic model translation across Gemini, Groq, OpenRouter, Nvidia, Mistral. Vision-aware routing.' },
              ].map((item) => (
                <div key={item.title} className="p-5 md:p-6 bg-mistral-canvas dark:bg-[#0a0a0b] border border-mistral-hairline-strong dark:border-mistral-ink-tint rounded-xl hover:border-mistral-primary/30 dark:hover:border-mistral-primary/20 transition-colors">
                  <h3 className="font-semibold text-base md:text-lg text-mistral-ink dark:text-mistral-canvas mb-2">{item.title}</h3>
                  <p className="text-sm md:text-base text-mistral-slate dark:text-mistral-muted leading-[1.65]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-16 md:py-24 lg:py-28 bg-mistral-canvas dark:bg-[#121212] border-b border-mistral-hairline-soft dark:border-mistral-ink-tint">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="font-editorial text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-[-0.02em] leading-[1.1] text-mistral-ink dark:text-mistral-canvas">
                Engineered for production agent loops
              </h2>
            </div>

            <div className="space-y-3 md:space-y-4">
              {[
                { num: '01', title: 'Ring Buffer', name: 'Lock-Free Sliding Ring', desc: 'Maintains high-frequency request queues without mutex deadlock risks. Handles 100,000 req/sec per node.' },
                { num: '02', title: 'Adaptive Pacing', name: 'Sliding RPM Quotas', desc: 'Predictive tier pacing prevents provider rate limits before they happen by dynamically shedding low-priority batch workers.' },
                { num: '03', title: 'Sanitizer', name: 'Auto Base64 Normalizer', desc: 'Zero-downtime payload sanitation automatically converts non-standard image URLs and binary payloads to target-compatible formats.' },
                { num: '04', title: 'Observability', name: 'OpenTelemetry Native', desc: 'Full tracing spans exported through OTLP. Pinpoint slow upstream provider time-to-first-token.' },
              ].map((item) => (
                <div key={item.num} className="flex gap-4 md:gap-5 p-4 md:p-5 bg-mistral-cream dark:bg-[#1a1a1c] border border-mistral-hairline-soft dark:border-mistral-ink-tint rounded-xl hover:border-mistral-primary/30 dark:hover:border-mistral-primary/20 transition-colors">
                  <span className="font-editorial text-3xl md:text-4xl font-bold italic text-mistral-primary/20 shrink-0 select-none">{item.num}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 md:gap-3 flex-wrap mb-1">
                      <h3 className="font-semibold text-base md:text-lg text-mistral-ink dark:text-mistral-canvas">{item.title}</h3>
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-mistral-primary/10 text-mistral-primary rounded">{item.name}</span>
                    </div>
                    <p className="text-sm md:text-base text-mistral-slate dark:text-mistral-muted leading-[1.65]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16 md:py-24 lg:py-28 bg-mistral-cream-soft dark:bg-[#1a1a1c] border-t border-mistral-hairline-soft dark:border-mistral-ink-tint">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto text-center mb-10">
              <span className="font-mono text-xs font-semibold text-mistral-steel uppercase tracking-widest mb-3 block">Contact</span>
              <h2 className="font-editorial text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-[-0.02em] leading-[1.1] text-mistral-ink dark:text-mistral-canvas mb-5">
                Let's build together.
              </h2>
              <p className="text-base md:text-lg text-mistral-slate dark:text-mistral-muted leading-[1.7]">
                Have a question or want to integrate Keymux into your workflow? Send a message directly to the maintainer.
              </p>
            </div>

            <div className="max-w-xl mx-auto bg-mistral-canvas dark:bg-[#1a1a1c] border border-mistral-hairline-strong dark:border-mistral-ink-tint rounded-xl p-5 md:p-6 lg:p-8">
              <form action="mailto:singhmayank4146@gmail.com" method="GET" encType="text/plain" className="space-y-5">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-mistral-ink dark:text-mistral-canvas mb-1.5">Subject</label>
                  <input type="text" id="subject" name="subject" placeholder="How can we help?" required className="w-full px-4 py-3.5 rounded-lg bg-white dark:bg-[#121212] border border-mistral-hairline-strong dark:border-mistral-ink-tint focus:outline-none focus:border-mistral-primary dark:focus:border-mistral-primary transition-colors text-mistral-ink dark:text-mistral-canvas placeholder:text-mistral-steel/50 min-h-[48px] text-base" />
                </div>
                <div>
                  <label htmlFor="body" className="block text-sm font-medium text-mistral-ink dark:text-mistral-canvas mb-1.5">Message</label>
                  <textarea id="body" name="body" rows={5} placeholder="Tell us about your project..." required className="w-full px-4 py-3.5 rounded-lg bg-white dark:bg-[#121212] border border-mistral-hairline-strong dark:border-mistral-ink-tint focus:outline-none focus:border-mistral-primary dark:focus:border-mistral-primary transition-colors text-mistral-ink dark:text-mistral-canvas placeholder:text-mistral-steel/50 resize-none text-base" />
                </div>
                <button type="submit" className="w-full py-3.5 mt-2 rounded-lg font-medium text-mistral-canvas dark:text-mistral-ink bg-mistral-ink dark:bg-mistral-canvas hover:opacity-90 transition-opacity flex items-center justify-center gap-2 min-h-[48px] text-base">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Sunset stripe */}
        <div className="w-full h-3 bg-sunset-stripe" aria-hidden="true" />
      </main>

      {/* Footer */}
      <footer className="bg-mistral-cream dark:bg-[#1a1a1c] py-10 lg:py-14 text-mistral-ink dark:text-mistral-canvas border-t border-mistral-hairline-soft dark:border-mistral-ink-tint">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-mistral-ink dark:bg-mistral-canvas text-mistral-canvas dark:text-mistral-ink rounded flex items-center justify-center font-mono font-bold text-[10px]">KM</div>
                <span className="font-semibold text-base tracking-tight">Keymux</span>
              </div>
              <p className="text-sm text-mistral-slate dark:text-mistral-muted max-w-xs leading-[1.6]">
                Open-source technical gateway and multiplexer. Built for developer sovereignty.
              </p>
            </div>
            
            <div>
              <span className="font-semibold text-sm mb-2 block text-mistral-ink dark:text-mistral-canvas">Explore</span>
              <nav className="space-y-2">
                <a href="#overview" className="text-sm text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors block py-1">Home</a>
                <a href="#installation" className="text-sm text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors block py-1">Installation</a>
                <a href="#leo-agent" className="text-sm text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors block py-1">Leo Agent</a>
                <a href="#about" className="text-sm text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors block py-1">About</a>
              </nav>
            </div>

            <div>
              <span className="font-semibold text-sm mb-2 block text-mistral-ink dark:text-mistral-canvas">Connect</span>
              <nav className="space-y-2">
                <a href="mailto:singhmayank4146@gmail.com" className="flex items-center gap-2 text-sm text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors py-1"><Mail01Icon size={16} strokeWidth={2} /> Email</a>
                <a href="https://www.linkedin.com/in/mayank-singh-813b68373/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors py-1"><Linkedin02Icon size={16} strokeWidth={2} /> LinkedIn</a>
                <a href="https://github.com/Mayank332k" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors py-1"><GithubIcon size={16} strokeWidth={2} /> GitHub</a>
              </nav>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-mistral-beige-deep dark:border-mistral-ink-tint text-center">
            <p className="text-xs text-mistral-slate dark:text-mistral-muted">© 2026 Keymux Project Contributors. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;