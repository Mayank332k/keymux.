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
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
type ThemeMode = 'light' | 'dark' | 'system';

const docSections = [
  { id: 'overview', label: 'Overview', group: 'Getting Started' },
  { id: 'installation', label: 'Installation', group: 'Getting Started' },
  { id: 'leo-agent', label: 'Leo Agent', group: 'Getting Started' },
  { id: 'architecture', label: 'Architecture', group: 'Concepts' },
  { id: 'features', label: 'Features', group: 'Concepts' },
  { id: 'about', label: 'About', group: 'Concepts' },
  { id: 'contact', label: 'Contact', group: 'Support' },
] as const;

function App() {
  const [isCopied, setIsCopied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>('system');
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    docSections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.getElementById(window.location.hash.slice(1));
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({ top: y, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
      }, 100);
    }
  }, [prefersReducedMotion]);

  const copyClone = () => {
    navigator.clipboard.writeText('git clone https://github.com/Mayank332k/keymux.git');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-mistral-canvas dark:bg-[#121212] text-mistral-ink dark:text-mistral-canvas font-sans antialiased selection:bg-mistral-sunshine-300 selection:text-mistral-ink transition-colors duration-200">
      
      {/* Sidebar - Desktop */}
      <aside 
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-72 transition-transform duration-200 ease-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Documentation navigation"
      >
        <div className="h-full flex flex-col bg-mistral-cream/50 dark:bg-[#1a1a1c]/50 border-r border-mistral-hairline-soft dark:border-mistral-ink-tint backdrop-blur-sm">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-mistral-hairline-soft dark:border-mistral-ink-tint">
            <a href="#overview" className="flex items-center gap-2" aria-label="Keymux home">
              <span className="font-editorial text-xl font-normal tracking-tight text-mistral-ink dark:text-mistral-canvas">keymux</span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider rounded bg-mistral-primary/10 text-mistral-primary">v1.2</span>
            </a>
            <button 
              onClick={closeSidebar}
              className="lg:hidden p-2 rounded-lg text-mistral-slate dark:text-mistral-muted hover:bg-mistral-hairline-soft dark:hover:bg-mistral-ink-tint transition-colors"
              aria-label="Close sidebar"
            >
              <Cancel01Icon size={22} />
            </button>
          </div>

          {/* Navigation Tree */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6" aria-label="Documentation sections">
            {(() => {
              const groups = [...new Set(docSections.map(s => s.group))];
              return groups.map(group => (
                <div key={group} className="space-y-1">
                  <h3 className="px-3 text-[10px] font-mono font-semibold uppercase tracking-widest text-mistral-steel mb-2">
                    {group}
                  </h3>
                  <ul className="space-y-0.5" role="list">
                    {docSections
                      .filter(s => s.group === group)
                      .map(({ id, label }) => (
                        <li key={id}>
                          <a
                            href={`#${id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              const el = document.getElementById(id);
                              if (el) {
                                const y = el.getBoundingClientRect().top + window.scrollY - 72;
                                window.scrollTo({ top: y, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
                                setActiveSection(id);
                                closeSidebar();
                              }
                            }}
                            className={cn(
                              "block px-3 py-2 text-sm rounded-lg transition-colors min-h-[44px]",
                              activeSection === id
                                ? "bg-mistral-primary/10 text-mistral-primary font-medium"
                                : "text-mistral-slate dark:text-mistral-muted hover:text-mistral-ink dark:hover:text-mistral-canvas hover:bg-mistral-hairline-soft dark:hover:bg-mistral-ink-tint"
                            )}
                            aria-current={activeSection === id ? 'page' : undefined}
                          >
                            {label}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              ));
            })()}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-mistral-hairline-soft dark:border-mistral-ink-tint">
            <a href="https://github.com/Mayank332k/keymux" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-sm text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors py-2 px-3 rounded-lg hover:bg-mistral-hairline-soft dark:hover:bg-mistral-ink-tint min-h-[44px]">
              <GithubIcon size={18} /> View on GitHub
            </a>
          </div>
        </div>
      </aside>

      {/* Sidebar Overlay - Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 lg:hidden bg-black/30 backdrop-blur-sm"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Bar */}
        <header className={cn(
          "sticky top-0 z-50 transition-all duration-200",
          scrolled ? 'bg-mistral-canvas/90 dark:bg-[#121212]/90 backdrop-blur-md border-b border-mistral-hairline-soft dark:border-mistral-ink-tint' : 'bg-transparent border-b border-transparent'
        )}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-14">
              {/* Mobile Menu Button + Brand */}
              <div className="flex items-center gap-4">
                <button 
                  className="lg:hidden p-2 rounded-lg text-mistral-slate dark:text-mistral-muted hover:bg-mistral-hairline-soft dark:hover:bg-mistral-ink-tint transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  onClick={toggleSidebar}
                  aria-expanded={sidebarOpen}
                  aria-controls="doc-sidebar"
                  aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}
                >
                  {sidebarOpen ? <Cancel01Icon size={24} /> : <Menu01Icon size={24} />}
                </button>
                <a href="#overview" className="flex items-center gap-2" aria-label="Keymux home">
                  <span className="font-editorial text-xl lg:text-2xl font-normal tracking-tight text-mistral-ink dark:text-mistral-canvas">keymux</span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider rounded bg-mistral-primary/10 text-mistral-primary">v1.2</span>
                </a>
              </div>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-2">
                {/* Theme Toggle */}
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
                              className={cn(
                                "w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors",
                                theme === t ? 'bg-mistral-primary/10 text-mistral-primary font-medium' : 'text-mistral-ink dark:text-mistral-canvas hover:bg-mistral-hairline-soft dark:hover:bg-mistral-ink-tint'
                              )}
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

                <a href="https://github.com/Mayank332k/keymux" target="_blank" rel="noopener noreferrer"
                   className="px-4 py-2 text-sm font-medium text-mistral-ink dark:text-mistral-canvas bg-transparent border border-mistral-hairline-strong dark:border-mistral-ink-tint rounded-lg hover:bg-mistral-hairline-soft dark:hover:bg-mistral-ink-tint transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212] flex items-center gap-2 min-h-[44px]">
                  <GithubIcon size={18} /> GitHub
                </a>
                <a href="#installation" className="px-4 py-2 text-sm font-medium text-white bg-mistral-primary rounded-lg hover:bg-mistral-primary-deep transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212] min-h-[44px] flex items-center justify-center">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Sheet Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              id="mobile-menu" 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }} 
              className="lg:hidden overflow-hidden border-t border-mistral-hairline-soft dark:border-mistral-ink-tint bg-mistral-canvas dark:bg-[#121212]"
            >
              <div className="px-4 py-4 space-y-1">
                {docSections.map(({ id, label }) => (
                  <a key={id} href={`#${id}`} onClick={closeMobileMenu}
                     className={cn(
                       "block px-3 py-3 text-base font-medium rounded-lg transition-colors min-h-[48px]",
                       activeSection === id
                         ? "bg-mistral-primary/10 text-mistral-primary font-medium"
                         : "text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-canvas hover:bg-mistral-hairline-soft dark:hover:bg-mistral-ink-tint"
                     )}
                     aria-current={activeSection === id ? 'page' : undefined}
                  >
                    {label}
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

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Page Header */}
          <header className="mb-10 lg:mb-14">
            <nav className="hidden sm:flex items-center gap-2 text-sm text-mistral-slate dark:text-mistral-muted mb-4" aria-label="Breadcrumb">
              <a href="#overview" className="hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors">Documentation</a>
              <span aria-hidden="true">/</span>
              <span className="text-mistral-ink dark:text-mistral-canvas font-medium" aria-current="page">
                {docSections.find(s => s.id === activeSection)?.label || 'Overview'}
              </span>
            </nav>
            <h1 className="font-editorial text-3xl md:text-4xl lg:text-5xl font-normal tracking-[-0.02em] leading-[1.1] text-mistral-ink dark:text-mistral-canvas">
              {docSections.find(s => s.id === activeSection)?.label || 'Overview'}
            </h1>
          </header>

          {/* Overview Section */}
          <section id="overview" className="mb-16 lg:mb-20" aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="sr-only">Overview</h2>
            
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
              <div>
                <p className="font-mono text-xs font-semibold text-mistral-steel uppercase tracking-widest mb-4">v1.2 Released</p>
                <h2 className="font-editorial text-3xl md:text-4xl lg:text-5xl font-normal tracking-[-0.02em] leading-[1.05] text-mistral-ink dark:text-mistral-canvas mb-5">
                  Local proxy for <span className="text-mistral-primary">Claude Code</span>
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-mistral-slate dark:text-mistral-muted leading-[1.65] mb-7 max-w-xl">
                  Route Claude Code through free APIs (Gemini, Groq, OpenRouter). Zero-downtime failover. Zero proxy hops. 100% local.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <button onClick={copyClone} className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium bg-mistral-primary text-white rounded-lg hover:bg-mistral-primary-deep transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212] w-full sm:w-auto min-h-[48px]">
                    {isCopied ? <><Tick01Icon size={16} className="text-emerald-400" /> Copied</> : <><Copy01Icon size={16} /> git clone ...</>}
                  </button>
                  <a href="#installation" className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-mistral-ink dark:text-mistral-canvas border border-mistral-hairline-strong dark:border-mistral-ink-tint rounded-lg hover:bg-mistral-hairline-soft dark:hover:bg-mistral-ink-tint transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212] w-full sm:w-auto min-h-[48px]">
                    View Installation
                  </a>
                </div>

                <p className="text-sm text-mistral-muted flex items-center gap-2">
                  <span className="w-12 h-px bg-mistral-hairline-strong dark:bg-mistral-ink-tint" />
                  Works with Claude Code CLI, Desktop, Extensions, Cline, Roo, Continue
                </p>
              </div>

              {/* Terminal Preview */}
              <div className="bg-mistral-surface-code border border-mistral-ink-tint rounded-xl overflow-hidden">
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
            </div>
          </section>

          <InstallationSection />
          <LeoAgentSection />

          {/* Architecture Section */}
          <section id="architecture" className="mb-16 lg:mb-20 border-t border-mistral-hairline-soft dark:border-mistral-ink-tint pt-16 lg:pt-20" aria-labelledby="architecture-heading">
            <h2 id="architecture-heading" className="font-editorial text-3xl md:text-4xl lg:text-5xl font-normal tracking-[-0.02em] leading-[1.1] text-mistral-ink dark:text-mistral-canvas mb-5">
              Zero-jitter failover in sub-millisecond execution.
            </h2>
            <p className="text-base md:text-lg text-mistral-slate dark:text-mistral-muted leading-[1.7] mb-12 max-w-2xl">
              Keymux automatically detects provider quotas, drops stale upstream connections, and instantly streams responses across fallback endpoints without breaking client sessions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[
                { title: 'Atomic Lock-Free Buffers', desc: 'High-frequency request queues without mutex deadlock risks. Handles 100k+ req/sec per node.' },
                { title: 'Native MCP Bridging', desc: 'Protocol translation between Claude Code and OpenAI-compatible endpoints. Tool calls preserved.' },
                { title: 'Cross-Provider Mapping', desc: 'Automatic model translation across Gemini, Groq, OpenRouter, Nvidia, Mistral. Vision-aware routing.' },
              ].map((item) => (
                <article key={item.title} className="p-5 md:p-6 bg-mistral-canvas dark:bg-[#0a0a0b] border border-mistral-hairline-strong dark:border-mistral-ink-tint rounded-xl hover:border-mistral-primary/30 dark:hover:border-mistral-primary/20 transition-colors">
                  <h3 className="font-semibold text-base md:text-lg text-mistral-ink dark:text-mistral-canvas mb-2">{item.title}</h3>
                  <p className="text-sm md:text-base text-mistral-slate dark:text-mistral-muted leading-[1.65]">{item.desc}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="mb-16 lg:mb-20 border-t border-mistral-hairline-soft dark:border-mistral-ink-tint pt-16 lg:pt-20" aria-labelledby="features-heading">
            <h2 id="features-heading" className="font-editorial text-3xl md:text-4xl lg:text-5xl font-normal tracking-[-0.02em] leading-[1.1] text-mistral-ink dark:text-mistral-canvas mb-12">
              Engineered for production agent loops
            </h2>

            <dl className="space-y-3 md:space-y-4">
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
            </dl>
          </section>

          {/* About Section */}
          <section id="about" className="mb-16 lg:mb-20 border-t border-mistral-hairline-soft dark:border-mistral-ink-tint pt-16 lg:pt-20 bg-mistral-cream dark:bg-[#1a1a1c]" aria-labelledby="about-heading">
            <h2 id="about-heading" className="sr-only">About</h2>
            <div className="max-w-3xl">
              <span className="font-mono text-xs font-semibold text-mistral-steel uppercase tracking-widest mb-4 block">About</span>
              <h2 className="font-editorial text-3xl md:text-4xl lg:text-5xl font-normal tracking-[-0.02em] leading-[1.1] text-mistral-ink dark:text-mistral-canvas mb-6">
                The gateway for autonomous agents.
              </h2>
              <div className="space-y-4 text-base md:text-lg text-mistral-slate dark:text-mistral-muted leading-[1.75]">
                <p>Keymux was built to orchestrate multiple LLM models and local agent loops seamlessly. As terminal-based agents like Claude Code become prevalent, managing API keys, context routing, and failovers across providers becomes a bottleneck.</p>
                <p>We provide a unified, ultra-fast multiplexer that sits between your local tooling and the cloud. By injecting directly as an MCP routing daemon, Keymux intercepts requests, standardizes schemas, and handles adaptive rate-limiting automatically.</p>
                <p className="font-medium text-mistral-ink dark:text-mistral-canvas">Zero jitter. Lock-free execution. Just point your agent to <code className="bg-mistral-hairline-soft dark:bg-mistral-ink-tint px-1.5 py-0.5 rounded font-mono text-sm">localhost:8080</code> and let the multiplexer handle the rest.</p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="border-t border-mistral-hairline-soft dark:border-mistral-ink-tint pt-16 lg:pt-20 bg-mistral-cream-soft dark:bg-[#1a1a1c]" aria-labelledby="contact-heading">
            <h2 id="contact-heading" className="sr-only">Contact</h2>
            <div className="max-w-xl mx-auto text-center mb-10">
              <span className="font-mono text-xs font-semibold text-mistral-steel uppercase tracking-widest mb-3 block">Contact</span>
              <h2 className="font-editorial text-3xl md:text-4xl lg:text-5xl font-normal tracking-[-0.02em] leading-[1.1] text-mistral-ink dark:text-mistral-canvas mb-5">
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
          </section>

          {/* Sunset stripe */}
          <div className="w-full h-3 bg-sunset-stripe mt-16" aria-hidden="true" />
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
                  <a href="#overview" className="text-sm text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors block py-1">Overview</a>
                  <a href="#installation" className="text-sm text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors block py-1">Installation</a>
                  <a href="#leo-agent" className="text-sm text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors block py-1">Leo Agent</a>
                  <a href="#architecture" className="text-sm text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors block py-1">Architecture</a>
                  <a href="#features" className="text-sm text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors block py-1">Features</a>
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
    </div>
  );
}

export default App;