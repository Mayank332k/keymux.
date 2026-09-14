import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP Plugins globally
gsap.registerPlugin(ScrollTrigger, useGSAP);

// Define standard cinematic easings
export const EASE = {
  // Snappy spring-like curve for micro-interactions
  spring: "elastic.out(1, 0.75)",
  springSoft: "elastic.out(1, 0.9)",
  
  // Standard cinematic eases (similar to GSAP's Expo or Power4)
  cinematic: "power4.inOut",
  cinematicOut: "power4.out",
  
  // Smooth continuous motion
  smooth: "power2.out",
  smoothIn: "power2.inOut",

  // For elements that need to feel heavy
  heavy: "expo.out"
};

// Define standard durations for consistency
export const DURATION = {
  fast: 0.25,
  normal: 0.6,
  slow: 1.2,
  cinematic: 2.0
};

// Default ScrollTrigger config for reveal animations
export const ST_REVEAL = {
  start: "top 85%", // Trigger when top of element hits 85% of viewport
  end: "bottom 20%",
  toggleActions: "play none none reverse", // Play on enter, reverse on leave back
};

export { gsap, ScrollTrigger, useGSAP };
