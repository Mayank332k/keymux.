import { useState, useEffect, useRef } from 'react';
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
import { ScrollReveal } from "@/components/lightswind/scroll-reveal";
import { TextParticleAnimation } from "@/components/lightswind/text-particle-animation";
import { gsap, useGSAP } from '@/lib/gsap';
import { MagneticElement } from '@/components/motion/MagneticElement';
import { HorizontalScrollSection } from '@/components/motion/HorizontalScrollSection';
import { AlternatingScrollCard } from '@/components/motion/AlternatingScrollCard';
import TextScrollMarquee from '@/components/lightswind/text-scroll-marquee';
import { motion } from 'framer-motion';

type ThemeMode = 'light' | 'dark' | 'system';

function App() {
  const [isCopied, setIsCopied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>('system');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    
    const applyTheme = () => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = theme === 'dark' || (theme === 'system' && prefersDark);
      
      if (shouldBeDark) {
        root.classList.add('dark');
        setIsDarkMode(true);
      } else {
        root.classList.remove('dark');
        setIsDarkMode(false);
      }
    };

    applyTheme();

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme();
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

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

  const headerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // 1. Navigation Scroll Response
      // Transition from transparent to frosted glass on scroll
      if (headerRef.current) {
        gsap.fromTo(headerRef.current, 
          { 
            backgroundColor: "transparent", 
            borderBottomColor: "transparent",
            backdropFilter: "blur(0px) saturate(100%)"
          },
          {
            backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.6)",
            borderBottomColor: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            backdropFilter: "blur(16px) saturate(150%)",
            ease: "none",
            scrollTrigger: {
              trigger: "body",
              start: "top -50",
              end: "top -150",
              scrub: true
            }
          }
        );
      }

      // 2. Hero Ambient Blob Parallax
      if (heroRef.current) {
        const blobs = heroRef.current.querySelectorAll('.ambient-blob');
        
        const moveBlobs = (e: MouseEvent) => {
          const { innerWidth, innerHeight } = window;
          const xPos = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
          const yPos = (e.clientY / innerHeight - 0.5) * 2;
          
          gsap.to(blobs[0], { x: xPos * 40, y: yPos * 40, duration: 2, ease: "power2.out" });
          gsap.to(blobs[1], { x: xPos * -30, y: yPos * -30, duration: 2.5, ease: "power2.out" });
          gsap.to(blobs[2], { x: xPos * 20, y: yPos * -20, duration: 3, ease: "power2.out" });
        };
        
        window.addEventListener('mousemove', moveBlobs);
      }

      // 3. Hero Initial Reveal Animation
      gsap.fromTo(".hero-badge", 
        { y: "100%" }, 
        { y: "0%", duration: 0.8, ease: "power4.out", delay: 0.2 }
      );
      gsap.fromTo(".hero-text",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power4.out", stagger: 0.15, delay: 0.4 }
      );
      gsap.fromTo(".hero-terminal",
        { opacity: 0, scale: 0.95, rotationX: 5 },
        { opacity: 1, scale: 1, rotationX: 0, duration: 1.2, ease: "power3.out", delay: 0.6 }
      );

      // 4. Scroll-Driven Section Reveals
      const revealSections = document.querySelectorAll('.gsap-reveal-section');
      revealSections.forEach((section) => {
        gsap.fromTo(section, 
          { opacity: 0, y: 40 },
          {
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 5. Staggered Grid Reveals
      const grids = document.querySelectorAll('.gsap-stagger-grid');
      grids.forEach((grid) => {
        const cards = grid.querySelectorAll('.gsap-stagger-card');
        gsap.fromTo(cards,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: grid,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    });

    return () => {
      // Clean up window listener for hero parallax if component unmounts
      // useGSAP handles most GSAP cleanup automatically
    };
  }, [isDarkMode]);

  return (
    <div className="min-h-[100dvh] bg-mistral-canvas dark:bg-[#121212] text-mistral-ink dark:text-mistral-canvas font-sans selection:bg-mistral-sunshine-300 selection:text-mistral-ink transition-colors duration-300">
      
      {/* Navigation */}
      <header ref={headerRef} className="sticky top-0 z-50 bg-transparent border-b border-transparent transition-all">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a className="flex items-center group" href="#overview">
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

          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-8 md:p-8 text-sm font-medium text-mistral-slate dark:text-mistral-muted">
            {['Home', 'Installation', 'Leo Agent', 'About', 'Contact'].map((item) => (
              <a 
                key={item}
                className="relative group hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212] rounded-sm py-1" 
                href={item === 'Home' ? '#overview' : `#${item.toLowerCase()}`}
              >
                {item}
                <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-mistral-primary transition-all duration-300 ease-out group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            
            <div className="relative">
              <button
                onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                className="p-2 rounded-lg text-mistral-slate dark:text-mistral-muted hover:bg-mistral-hairline-soft dark:hover:bg-mistral-ink-tint transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212]"
                aria-label="Select theme"
              >
                {theme === 'system' ? <Monitor size={20} /> : theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              
              {isThemeDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsThemeDropdownOpen(false)}></div>
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="absolute right-0 mt-3 w-36 rounded-xl shadow-2xl bg-white/90 dark:bg-[#1a1a1c]/90 backdrop-blur-xl border border-black/5 dark:border-white/5 z-50 overflow-hidden"
                  >
                    <button 
                      onClick={() => { setTheme('light'); setIsThemeDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-mistral-cream dark:hover:bg-[#252528] transition-colors ${theme === 'light' ? 'text-mistral-primary font-medium' : 'text-mistral-ink dark:text-mistral-canvas'}`}
                    >
                      <Sun size={16} /> Light
                    </button>
                    <button 
                      onClick={() => { setTheme('dark'); setIsThemeDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-mistral-cream dark:hover:bg-[#252528] transition-colors border-t border-black/5 dark:border-white/5 ${theme === 'dark' ? 'text-mistral-primary font-medium' : 'text-mistral-ink dark:text-mistral-canvas'}`}
                    >
                      <Moon size={16} /> Dark
                    </button>
                    <button 
                      onClick={() => { setTheme('system'); setIsThemeDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-mistral-cream dark:hover:bg-[#252528] transition-colors border-t border-black/5 dark:border-white/5 ${theme === 'system' ? 'text-mistral-primary font-medium' : 'text-mistral-ink dark:text-mistral-canvas'}`}
                    >
                      <Monitor size={16} /> System
                    </button>
                  </motion.div>
                </>
              )}
            </div>

            <MagneticElement strength={0.2} className="hidden sm:inline-flex">
              <a className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-medium bg-mistral-ink text-mistral-canvas hover:bg-mistral-ink-tint dark:bg-mistral-surface dark:text-mistral-ink dark:hover:bg-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212]" href="https://github.com/Mayank332k/keymux" target="_blank" rel="noopener noreferrer">
                <GithubIcon size={16} className="mr-2" />
                View on GitHub
              </a>
            </MagneticElement>
            
            <MagneticElement strength={0.3} className="hidden sm:inline-flex">
              <a className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-medium bg-mistral-primary text-white hover:bg-mistral-primary-deep transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212]" href="#early-access">
                Get Started
              </a>
            </MagneticElement>

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
            <a className="text-mistral-ink dark:text-mistral-canvas font-semibold text-3xl tracking-tight" href="#overview" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            <a className="text-mistral-ink dark:text-mistral-canvas font-semibold text-3xl tracking-tight" href="#installation" onClick={() => setIsMobileMenuOpen(false)}>Installation</a>
            <a className="text-mistral-ink dark:text-mistral-canvas font-semibold text-3xl tracking-tight" href="#leo-agent" onClick={() => setIsMobileMenuOpen(false)}>Leo Agent</a>
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
        <section ref={heroRef} className="relative pt-16 pb-24 md:pt-24 md:pb-32 bg-mistral-canvas dark:bg-[#121212] bg-mistral-grid border-b border-mistral-hairline-soft dark:border-mistral-ink-tint overflow-hidden" id="overview">
        {/* Ambient Background Blobs */}
        <div className="ambient-blob absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-mistral-sunshine-300/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 pointer-events-none"></div>
        <div className="ambient-blob absolute top-1/3 right-[-5%] w-[600px] h-[600px] bg-mistral-primary/10 rounded-full mix-blend-multiply filter blur-[150px] opacity-70 pointer-events-none"></div>
        <div className="ambient-blob absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#a78bfa]/10 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 pointer-events-none"></div>
        
        {/* Visual Glow / Mesh Behind Text for Engagement */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[600px] bg-mistral-cream-deeper/30 dark:bg-mistral-ink/20 rounded-full mix-blend-normal filter blur-[100px] opacity-60 pointer-events-none"></div>

        {/* Subtle radial fade for the grid so it's not too harsh everywhere */}
        <div className="absolute inset-0 bg-mistral-canvas dark:bg-[#121212] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_100%)] pointer-events-none"></div>

        <div className="max-w-[1280px] mx-auto px-5 md:px-8 xl:pr-72 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-6 md:p-8 items-center">
            
            {/* Left Column: Huge Copy */}
            <div className="flex flex-col lg:col-span-7">
              <div className="mb-8 overflow-hidden">
                <span className="hero-badge font-mono text-sm font-semibold text-mistral-steel uppercase tracking-widest inline-block">
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
              <p className="hero-text text-lg md:text-2xl text-mistral-slate dark:text-mistral-muted leading-[1.5] max-w-xl mb-12">
                A lightweight multiplexer for local agent orchestration. 
                Seamlessly route Claude Code context through a unified port.
              </p>

              <div className="hero-text mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <MagneticElement strength={0.3} className="w-full sm:w-auto">
                  <a className="inline-flex items-center justify-center px-6 py-3 sm:py-2.5 rounded-md text-base sm:text-sm font-medium bg-mistral-primary text-white hover:bg-mistral-primary-deep transition-all w-full text-center" href="#installation">
                    Get Started
                  </a>
                </MagneticElement>
                
                <MagneticElement strength={0.15} className="w-full sm:w-auto">
                  <button 
                    onClick={handleCopy}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 rounded-md text-base sm:text-sm font-medium bg-transparent border border-mistral-hairline-strong dark:border-mistral-ink-tint text-mistral-ink dark:text-mistral-canvas hover:bg-mistral-surface dark:hover:bg-mistral-ink transition-all w-full text-center"
                  >
                    {isCopied ? <Tick01Icon size={16} className="text-emerald-600" /> : <Copy01Icon size={16} />}
                    <span className="font-mono">git clone ...</span>
                  </button>
                </MagneticElement>
              </div>
            </div>

            {/* Right Column: Mock Terminal */}
            <div className="hero-terminal relative w-full aspect-square md:aspect-[4/3] rounded-2xl flex items-center justify-center p-4 sm:p-6 md:p-8 lg:col-span-5" style={{ perspective: "1000px" }}>
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
            </div>

          </div>
        </div>
      </section>

      <InstallationSection />
      <LeoAgentSection />

        {/* BEGIN: About Keymux Section */}
        <section className="py-16 md:py-24 bg-mistral-cream dark:bg-[#1a1a1c] border-b border-mistral-hairline-soft dark:border-mistral-ink-tint" id="about">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 xl:pr-72">
            <div className="gsap-reveal-section max-w-2xl">
              <div className="mb-6 overflow-hidden">
                <span className="font-mono text-xs font-semibold text-mistral-steel uppercase tracking-widest inline-block">
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
            </div>
          </div>
        </section>

        {/* Routing Logic Features - Horizontal Scroll GSAP */}
        <HorizontalScrollSection />

        {/* BEGIN: Architecture Section */}
        <section className="py-16 md:py-24 bg-mistral-surface dark:bg-[#121212] border-b border-mistral-hairline-soft dark:border-mistral-ink-tint" id="architecture">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 xl:pr-72">
            <div>
              <div className="gsap-reveal-section max-w-2xl mb-16">
                <h2 className="font-editorial text-[52px] font-normal tracking-[-0.5px] leading-[1.15] text-mistral-ink dark:text-mistral-canvas">
                  Zero-jitter failover in sub-millisecond execution.
                </h2>
                <p className="text-lg text-mistral-slate dark:text-mistral-muted mt-6 leading-[1.50]">
                  Keymux automatically detects provider quotas, drops stale upstream connections, and instantly streams responses across fallback endpoints without breaking client sessions.
                </p>
              </div>

            </div>
          </div>
          
          <div className="w-full flex flex-col gap-8 md:gap-12 mt-4 pb-24 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-mistral-surface dark:from-[#121212] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-mistral-surface dark:from-[#121212] to-transparent z-10 pointer-events-none"></div>
            
            <TextScrollMarquee scrollDependent baseVelocity={-2} className="text-[12vw] md:text-8xl lg:text-[10rem] font-editorial tracking-tight text-mistral-ink dark:text-mistral-canvas opacity-90 pr-8">
              Atomic Lock-Free Buffers — 
            </TextScrollMarquee>
            <TextScrollMarquee scrollDependent baseVelocity={2.5} className="text-[12vw] md:text-8xl lg:text-[10rem] font-editorial tracking-tight text-mistral-ink dark:text-mistral-canvas opacity-50 pr-8">
              Native MCP Bridging — 
            </TextScrollMarquee>
            <TextScrollMarquee scrollDependent baseVelocity={-1.5} className="text-[12vw] md:text-8xl lg:text-[10rem] font-editorial tracking-tight text-mistral-ink dark:text-mistral-canvas opacity-90 pr-8">
              Cross-Provider Mapping — 
            </TextScrollMarquee>
          </div>
        </section>

        {/* BEGIN: Matrix Overview Section */}
        <section className="bg-mistral-canvas dark:bg-[#121212] overflow-hidden" id="features">
          <div className="py-24 max-w-[1280px] mx-auto px-5 md:px-8 xl:pr-72">
            <div className="gsap-reveal-section">
              <h2 className="font-editorial text-[52px] font-normal tracking-[-0.5px] leading-[1.15] text-mistral-ink dark:text-mistral-canvas max-w-3xl">
                Engineered for production agent loops
              </h2>
            </div>
          </div>
          
          <div className="flex flex-col relative w-full">
            {[
              { num: '01', title: 'Ring Buffer', name: 'Lock-Free Sliding Ring', desc: 'Maintains high-frequency request queues without mutex deadlock risks. Handles 100,000 req/sec per node.' },
              { num: '02', title: 'Adaptive Pacing', name: 'Sliding RPM Quotas', desc: 'Predictive tier pacing prevents provider rate limits before they happen by dynamically shedding low-priority batch workers.' },
              { num: '03', title: 'Sanitizer', name: 'Auto Base64 Normalizer', desc: 'Zero-downtime payload sanitation automatically converts non-standard image URLs and binary payloads to target-compatible formats.' },
              { num: '04', title: 'Observability', name: 'OpenTelemetry Native', desc: 'Full tracing spans exported through OTLP. Pinpoint slow upstream provider time-to-first-token.' }
            ].map((item, idx) => (
              <AlternatingScrollCard 
                key={item.num}
                index={idx}
                title={item.title}
                name={item.name}
                desc={item.desc}
              />
            ))}
          </div>
        </section>
        
        {/* BEGIN: Contact Section */}
        <section className="py-16 md:py-24 bg-mistral-cream-soft dark:bg-[#1a1a1c] border-t border-mistral-hairline-soft dark:border-mistral-ink-tint" id="contact">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 xl:pr-72">
            <div className="gsap-reveal-section max-w-2xl mx-auto text-center mb-16">
              <span className="font-mono text-xs font-semibold text-mistral-steel uppercase tracking-widest mb-4 block">
                Contact
              </span>
              <h2 className="font-editorial text-[52px] font-normal tracking-[-0.5px] leading-[1.15] text-mistral-ink dark:text-mistral-canvas mb-6">
                Let's build together.
              </h2>
              <p className="text-lg text-mistral-slate dark:text-mistral-muted leading-[1.6]">
                Have a question or want to integrate Keymux into your workflow? Send a message directly to the maintainer.
              </p>
            </div>

            <div className="gsap-reveal-section max-w-xl mx-auto bg-mistral-canvas dark:bg-[#1a1a1c] border border-mistral-hairline-strong dark:border-mistral-ink-tint rounded-xl p-6 md:p-8 lg:p-10 shadow-sm">
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
            </div>
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
              <a className="text-sm text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors" href="#overview">Home</a>
              <a className="text-sm text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors" href="#installation">Installation</a>
              <a className="text-sm text-mistral-slate dark:text-mistral-muted hover:text-mistral-primary dark:hover:text-mistral-primary transition-colors" href="#leo-agent">Leo Agent</a>
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
