import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero/Hero';
import BentoGrid from './components/BentoGrid/BentoGrid';
import DataStreams from './components/DataStreams';
import Pricing from './components/Pricing/Pricing';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Stop observing once revealed to lock in the layout state and save CPU cycles
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12, // Element is 12% visible before triggering
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before it enters the viewport fully
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      {/* Armory-style background column lines overlay */}
      <div className="global-grid-lines" aria-hidden="true">
        <div className="global-grid-lines-col" />
        <div className="global-grid-lines-col" />
        <div className="global-grid-lines-col" />
        <div className="global-grid-lines-col" />
      </div>

      {/* Sticky header */}
      <Navbar />

      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* Hero is revealed immediately on mount via its internal entry animation */}
        <Hero />

        {/* Features specifications (Bento Grid / Accordion) - Slides vertically */}
        <div className="reveal reveal-up">
          <BentoGrid />
        </div>

        {/* Active Data Streams shader panel - Slides in horizontally from the left */}
        <div className="reveal reveal-left">
          <DataStreams />
        </div>

        {/* Pricing REPL calculator - Volumetric scale reveal */}
        <div className="reveal reveal-scale">
          <Pricing />
        </div>

        {/* Social proof / testimonials - Slides vertically with a delay offset */}
        <div className="reveal reveal-up delay-100">
          <Testimonials />
        </div>

        {/* Volumetric call-to-action panel - Scale reveal */}
        <div className="reveal reveal-scale">
          <CTA />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}




