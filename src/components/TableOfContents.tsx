import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'overview', label: 'Get started' },
  { id: 'about', label: 'What you can do' },
  { id: 'installation', label: 'Use Claude Code everywhere' },
  { id: 'contact', label: 'Next steps' },
];

export function TableOfContents() {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -40% 0px' } 
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id);
      // Small offset for the fixed header
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="hidden xl:block fixed top-32 right-8 w-64 z-40">
      <div className="flex items-center gap-3 mb-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-mistral-ink dark:text-mistral-canvas">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        <h3 className="text-xl font-editorial tracking-tight text-mistral-ink dark:text-mistral-canvas font-normal">
          On this page
        </h3>
      </div>
      
      <nav className="flex flex-col gap-5 pl-1 relative">
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={`text-[17px] tracking-tight relative pl-4 transition-all duration-300
                ${isActive 
                  ? 'text-mistral-primary font-medium' 
                  : 'text-mistral-slate dark:text-mistral-muted hover:text-mistral-ink dark:hover:text-mistral-canvas hover:translate-x-1'
                }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="absolute left-[-2px] top-[4px] w-1 h-4 bg-mistral-primary rounded-r-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
