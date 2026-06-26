import React from 'react';
import CardSwap, { Card } from './CardSwap/CardSwap';

const testimonials = [
  {
    quote: "Survex solved our schema drift headaches overnight. Being able to declare schema expectations at the ingress and automatically route failures to our Dead-Letter Queue saved our analytics pipeline from breaking repeatedly.",
    author: "Elena Rostova",
    role: "Lead Data Engineer, ScaleOps",
    initials: "ER"
  },
  {
    quote: "The retry scheduler's built-in exponential backoff and jitter stopped our API endpoints from being overwhelmed when recovering from database outages. Outstanding developer experience.",
    author: "Marcus Vance",
    role: "VP of Infrastructure, CloudFlow",
    initials: "MV"
  },
  {
    quote: "With Survex, we mask PII at the boundary before it hits our warehouses. Compliance audits are now trivial because compliance policy is enforced directly within the pipeline configuration.",
    author: "Siddharth Mehta",
    role: "Chief Security Officer, FinRoute",
    initials: "SM"
  }
];

export default function Testimonials() {
  return (
    <section className="testimonials-section section-hairline-top section-hairline-bottom" id="testimonials" aria-label="Customer Testimonials" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
        
        {/* Left Column: Heading and Copy details */}
        <div className="animate-fade-up">
          <div className="section-label">PROVEN IN PRODUCTION</div>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '1.25rem' }}>
            Endorsed by data ops pioneers
          </h2>
          <p className="section-subtitle" style={{ marginBottom: '1.5rem', maxWidth: '480px' }}>
            See how leading technical teams maintain pipeline resilience and schema safety under high-throughput conditions.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#172B36', fontFamily: 'JetBrains Mono' }}>99.99%</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(23, 43, 54, 0.55)', marginTop: '0.25rem' }}>Conduit Uptime</div>
            </div>
            <div style={{ width: '1px', backgroundColor: 'rgba(23, 43, 54, 0.1)' }} />
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#172B36', fontFamily: 'JetBrains Mono' }}>&lt;4ms</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(23, 43, 54, 0.55)', marginTop: '0.25rem' }}>Ingestion Latency</div>
            </div>
          </div>
        </div>

        {/* Right Column: CardSwap Stack Container */}
        <div className="animate-fade-up animate-fade-up-delay-1" style={{
          position: 'relative',
          height: '420px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'visible'
        }}>
          {/* Relative wrapper holding the cardswap stack absolute positioning */}
          <div style={{ width: '380px', height: '280px', position: 'relative', overflow: 'visible' }}>
            <CardSwap
              width={380}
              height={280}
              cardDistance={35}
              verticalDistance={40}
              delay={2800}
              pauseOnHover={true}
              skewAmount={5}
              easing="elastic"
            >
              {testimonials.map((t, idx) => (
                <Card
                  key={idx}
                  style={{
                    color: '#172B36',
                    backgroundColor: '#D9E8E2', // Mystic Mint
                    border: '1px solid rgba(23, 43, 54, 0.1)',
                    boxShadow: '0 10px 30px -10px rgba(23, 43, 54, 0.15)',
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box'
                  }}
                >
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#172B36',
                    lineHeight: '1.6',
                    fontStyle: 'normal',
                    margin: 0
                  }}>
                    "{t.quote}"
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.25rem' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: '#114C5A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      color: '#F1F6F4',
                      flexShrink: 0
                    }}>
                      {t.initials}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#172B36', margin: 0 }}>
                        {t.author}
                      </h4>
                      <p style={{ fontSize: '0.72rem', color: 'rgba(23, 43, 54, 0.55)', margin: 0, fontFamily: 'JetBrains Mono' }}>
                        {t.role}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>

      </div>
    </section>
  );
}
