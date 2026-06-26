import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero/Hero';
import BentoGrid from './components/BentoGrid/BentoGrid';
import DataStreams from './components/DataStreams';
import Pricing from './components/Pricing/Pricing';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

export default function App() {
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
        {/* Hero with full-bleed 3D terrain waves background */}
        <Hero />

        {/* Features specifications (Bento Grid / Accordion) */}
        <BentoGrid />

        {/* Active Data Streams shader panel */}
        <DataStreams />

        {/* Pricing REPL calculator */}
        <Pricing />

        {/* Social proof / testimonials */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}


