import React, { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';

interface MagneticElementProps {
  children: React.ReactElement;
  strength?: number;
  className?: string;
}

export const MagneticElement: React.FC<MagneticElementProps> = ({ children, strength = 0.5, className }) => {
  const magneticRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const element = magneticRef.current;
    if (!element) return;

    const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * strength);
      yTo(y * strength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: magneticRef });

  return React.cloneElement(children as React.ReactElement<any>, {
    ref: magneticRef,
    className: `${(children as React.ReactElement<any>).props.className || ''} ${className || ''}`
  });
};
