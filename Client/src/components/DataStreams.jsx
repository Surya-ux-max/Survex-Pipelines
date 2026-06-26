import React, { Suspense, lazy } from 'react';

// Lazy load Beams so it does not block the initial paint/TTI
const Beams = lazy(() => import('./Beams/Beams'));

export default function DataStreams() {
  return (
    <section className="features-section section-hairline-top section-hairline-bottom" id="pipeline" style={{ backgroundColor: '#F1F6F4', paddingBlock: 'clamp(4rem, 8vw, 6rem)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
        
        {/* Left Column: 3D Shader Beams Visual (placed inside a premium container matching Screenshot 3) */}
        <div style={{
          position: 'relative',
          height: '420px',
          backgroundColor: '#172B36', // Oceanic Noir matching Beams canvas background
          border: '1px solid rgba(23, 43, 54, 0.1)',
          borderRadius: '6px',
          overflow: 'hidden'
        }}
        className="animate-fade-up"
        >
          <Suspense fallback={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#F1F6F4', fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>
              Initializing Shader Grid...
            </div>
          }>
            <Beams
              beamWidth={2}
              beamHeight={16}
              beamNumber={10}
              lightColor="#FFC801" // Forsythia beams
              speed={1.5}
              noiseIntensity={1.5}
              scale={0.15}
              rotation={45} // Tilt the beams system diagonally
            />
          </Suspense>

          {/* Technical label overlay */}
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            fontFamily: 'JetBrains Mono',
            fontSize: '0.7rem',
            color: '#FFC801',
            letterSpacing: '0.05em',
            backgroundColor: 'rgba(23, 43, 54, 0.75)',
            padding: '0.35rem 0.65rem',
            borderRadius: '2px',
            pointerEvents: 'none'
          }}>
            BEAM_GRID_ACTIVE // STREAM_NODES: 10
          </div>
        </div>

        {/* Right Column: Premium feature spec details matching Armory Screenshot 3 */}
        <div className="animate-fade-up animate-fade-up-delay-1">
          <div className="section-label">Operations telemetry</div>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '1.25rem' }}>
            Built for sustained pipeline load
          </h2>
          <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
            We architect low-latency pathways that route, partition, and secure data in flight without buffering delays.
          </p>

          {/* Bullet points with wireframe details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Feature 1 */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '38px',
                height: '38px',
                border: '1px solid rgba(23, 43, 54, 0.1)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#172B36', marginBottom: '0.25rem' }}>
                  Deterministic Routers
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(23, 43, 54, 0.65)', lineHeight: '1.5' }}>
                  Forward packets to endpoints based on strict JSON Schema criteria. Zero packet drift, zero route conflicts.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '38px',
                height: '38px',
                border: '1px solid rgba(23, 43, 54, 0.1)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                  <line x1="6" y1="6" x2="6.01" y2="6"/>
                  <line x1="6" y1="18" x2="6.01" y2="18"/>
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#172B36', marginBottom: '0.25rem' }}>
                  Auto-Scale Broker pools
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(23, 43, 54, 0.65)', lineHeight: '1.5' }}>
                  Resource provisioning adapts to throughput spikes automatically, preventing broker saturation.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '38px',
                height: '38px',
                border: '1px solid rgba(23, 43, 54, 0.1)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#172B36', marginBottom: '0.25rem' }}>
                  PII Isolation boundaries
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(23, 43, 54, 0.65)', lineHeight: '1.5' }}>
                  Anonymize sensitive customer columns in real-time at the pipeline entry to maintain strict compliance locks.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
