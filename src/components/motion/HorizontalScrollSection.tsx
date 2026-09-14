import React, { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';
import { Shield01Icon, ZapIcon } from 'hugeicons-react';

const SplitTextWord = ({ text, className = "" }: { text: string; className?: string }) => {
  const words = text.split(" ");
  return (
    <span className={`word-trigger-group ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-[0.25em] word-highlight opacity-15 dark:opacity-20 will-change-[opacity]">
          {word}
        </span>
      ))}
    </span>
  );
};

export const HorizontalScrollSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray('.horizontal-panel');
    const track = trackRef.current;
    if (!track || panels.length === 0) return;

    // Horizontal scrolling tween
    const horizontalTween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (panels.length - 1),
          duration: { min: 0.2, max: 0.6 },
          delay: 0.1,
          ease: "power2.inOut"
        },
        // 1:1 mapping: scroll vertically by 1 viewport width to move horizontally by 1 viewport width
        end: () => "+=" + window.innerWidth,
      }
    });

    // Word highlighting tied to the horizontal scroll
    gsap.utils.toArray('.word-trigger-group').forEach((group: any) => {
      const words = group.querySelectorAll('.word-highlight');
      
      gsap.to(words, {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: group,
          containerAnimation: horizontalTween,
          start: "left 80%",
          end: "right 20%",
          scrub: true
        }
      });
    });

    return () => {
      horizontalTween.kill();
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-mistral-surface dark:bg-[#121212] overflow-hidden relative">
      <div ref={trackRef} className="flex h-screen w-[200vw] flex-nowrap">
        
        {/* Panel 1: Auto Mode */}
        <div className="horizontal-panel w-screen h-full flex flex-col justify-center px-6 md:px-16 lg:px-32 flex-shrink-0">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 flex items-center justify-center text-mistral-primary bg-mistral-sunshine-300/10 rounded-full">
                <ZapIcon size={32} />
              </div>
              <p className="text-sm md:text-base font-mono font-medium text-mistral-primary tracking-wide uppercase">Smart TTFT & Dynamic Translation</p>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl leading-none font-editorial tracking-tight text-mistral-ink dark:text-mistral-canvas mb-8">
              Auto Mode
            </h1>

            <h2 className="text-2xl md:text-3xl lg:text-4xl leading-tight font-light text-mistral-slate dark:text-mistral-muted max-w-3xl">
              <SplitTextWord text="In Auto Mode, Keymux prioritizes Speed and Uptime over model strictness." />
              <br className="hidden md:block" />
              <SplitTextWord text="The router analyzes the Exponential Moving Average of Time-To-First-Token latency across all healthy keys, establishing a dynamic Tolerance Banding window to identify the absolute fastest provider." />
            </h2>
            
            <div className="mt-16 inline-block px-4 py-2 rounded bg-mistral-hairline-soft dark:bg-mistral-surface-code text-sm font-semibold text-mistral-slate dark:text-mistral-muted tracking-widest uppercase">
              Best for autonomous agents
            </div>
          </div>
        </div>

        {/* Panel 2: Strict Mode */}
        <div className="horizontal-panel w-screen h-full flex flex-col justify-center px-6 md:px-16 lg:px-32 flex-shrink-0 bg-mistral-cream/50 dark:bg-[#151515]">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 flex items-center justify-center text-mistral-slate dark:text-mistral-muted bg-mistral-hairline-soft dark:bg-mistral-surface-code rounded-full">
                <Shield01Icon size={32} />
              </div>
              <p className="text-sm md:text-base font-mono font-medium text-mistral-slate dark:text-mistral-muted tracking-wide uppercase">Enforced Model Routing</p>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl leading-none font-editorial tracking-tight text-mistral-ink dark:text-mistral-canvas mb-8">
              Strict Mode
            </h1>

            <h2 className="text-2xl md:text-3xl lg:text-4xl leading-tight font-light text-mistral-slate dark:text-mistral-muted max-w-3xl">
              <SplitTextWord text="Strict Mode enforces isolated pools, ensuring precise capability matching." />
              <br className="hidden md:block" />
              <SplitTextWord text="If all keys for the requested model drop, Keymux hard fails with a standard HTTP 429 instead of silently shifting capability families, preserving perfect predictability for production benchmarking." />
            </h2>

            <div className="mt-16 inline-block px-4 py-2 rounded bg-mistral-hairline-soft dark:bg-mistral-surface-code text-sm font-semibold text-mistral-slate dark:text-mistral-muted tracking-widest uppercase">
              Best for strict adherence
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
