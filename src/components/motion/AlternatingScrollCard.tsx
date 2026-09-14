import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface AlternatingScrollCardProps {
  index: number;
  title: string;
  name: string;
  desc: string;
}

export const AlternatingScrollCard: React.FC<AlternatingScrollCardProps> = ({ 
  index, 
  title, 
  name, 
  desc 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const isLeft = index % 2 === 0;

  useGSAP(() => {
    if (!containerRef.current || !cardRef.current) return;

    gsap.fromTo(cardRef.current, 
      {
        x: isLeft ? -40 : 40,
        y: 20,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        }
      }
    );

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full flex items-center justify-center relative py-12 md:py-20">
      <div 
        ref={cardRef} 
        className={cn(
          "w-full max-w-4xl p-6 md:p-12 relative",
          isLeft ? "text-left" : "text-left md:text-right"
        )}
      >
        
        <div className={cn(
          "relative z-10 flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center",
          !isLeft && "md:flex-row-reverse"
        )}>
          <div className="flex-1">
            <div className="font-mono text-sm font-bold text-mistral-slate dark:text-[#6b6b70] uppercase tracking-[0.2em] mb-4">
              {title}
            </div>
            <h3 className="font-sans text-4xl md:text-5xl font-semibold text-mistral-ink dark:text-[#f3f3f3] leading-[1.1] mb-6 tracking-tight">
              {name}
            </h3>
          </div>
          
          <div className="flex-1">
            <p className="text-xl md:text-xl text-mistral-slate dark:text-[#8b8b90] font-normal leading-[1.6]">
              {desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
