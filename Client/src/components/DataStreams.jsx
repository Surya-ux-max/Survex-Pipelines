import React from 'react';

function GraphLoop() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '420px',
      backgroundColor: '#172B36', // Oceanic Noir
      borderRadius: '6px',
      overflow: 'hidden',
      border: '1px solid rgba(241, 246, 244, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box'
    }}>
      {/* SVG Interactive Loop of Graph */}
      <svg viewBox="0 0 400 400" style={{ width: '90%', height: '90%', overflow: 'visible' }}>
        <defs>
          {/* Radial glow for nodes */}
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFC801" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFC801" stopOpacity="0" />
          </radialGradient>
          {/* Linear gradient for paths */}
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFC801" />
            <stop offset="100%" stopColor="#42fcff" />
          </linearGradient>
          {/* Performance-optimized packet glows */}
          <radialGradient id="yellowGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFC801" stopOpacity="1" />
            <stop offset="30%" stopColor="#FFC801" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#FFC801" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cyanGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#42fcff" stopOpacity="1" />
            <stop offset="30%" stopColor="#42fcff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#42fcff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orangeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF9932" stopOpacity="1" />
            <stop offset="30%" stopColor="#FF9932" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#FF9932" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Circular main track loop */}
        <circle cx="200" cy="200" r="120" fill="none" stroke="rgba(241, 246, 244, 0.06)" strokeWidth="4" />
        <circle cx="200" cy="200" r="120" fill="none" stroke="url(#pathGradient)" strokeWidth="2" strokeDasharray="16 32" strokeDashoffset="0" style={{ animation: 'rotate-loop 20s linear infinite' }} />

        {/* Dynamic flowing packet paths */}
        <path id="loop-path" d="M 200 80 A 120 120 0 1 1 199.9 80" fill="none" stroke="transparent" />

        {/* Glowing flow packets (circles moving along path) */}
        <circle r="12" fill="url(#yellowGlow)">
          <animateMotion dur="7s" repeatCount="indefinite" path="M 200 80 A 120 120 0 1 1 199.9 80" />
        </circle>
        <circle r="10" fill="url(#cyanGlow)">
          <animateMotion dur="7s" begin="2.3s" repeatCount="indefinite" path="M 200 80 A 120 120 0 1 1 199.9 80" />
        </circle>
        <circle r="11" fill="url(#orangeGlow)">
          <animateMotion dur="7s" begin="4.6s" repeatCount="indefinite" path="M 200 80 A 120 120 0 1 1 199.9 80" />
        </circle>

        {/* Nodes around the loop */}
        {/* Node 1: Ingest (Top) */}
        <g transform="translate(200, 80)" style={{ cursor: 'pointer' }}>
          <circle r="16" fill="rgba(23, 43, 54, 0.9)" stroke="#FFC801" strokeWidth="2" />
          <circle r="6" fill="#FFC801" />
          <text y="-24" textAnchor="middle" fill="#F1F6F4" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold">01_INGEST</text>
        </g>

        {/* Node 2: Validate */}
        <g transform="translate(304, 140)" style={{ cursor: 'pointer' }}>
          <circle r="16" fill="rgba(23, 43, 54, 0.9)" stroke="#42fcff" strokeWidth="2" />
          <circle r="6" fill="#42fcff" />
          <text x="24" y="4" textAnchor="start" fill="#F1F6F4" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold">02_VALIDATE</text>
        </g>

        {/* Node 3: Mask */}
        <g transform="translate(304, 260)" style={{ cursor: 'pointer' }}>
          <circle r="16" fill="rgba(23, 43, 54, 0.9)" stroke="rgba(241, 246, 244, 0.3)" strokeWidth="1.5" />
          <circle r="5" fill="#F1F6F4" fillOpacity="0.4" />
          <text x="24" y="4" textAnchor="start" fill="rgba(241, 246, 244, 0.6)" fontFamily="JetBrains Mono" fontSize="9">03_MASK</text>
        </g>

        {/* Node 4: Route */}
        <g transform="translate(96, 260)" style={{ cursor: 'pointer' }}>
          <circle r="16" fill="rgba(23, 43, 54, 0.9)" stroke="#FF9932" strokeWidth="2" />
          <circle r="6" fill="#FF9932" />
          <text x="-24" y="4" textAnchor="end" fill="#F1F6F4" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold">04_ROUTE</text>
        </g>

        {/* Node 5: Deliver */}
        <g transform="translate(96, 140)" style={{ cursor: 'pointer' }}>
          <circle r="16" fill="rgba(23, 43, 54, 0.9)" stroke="rgba(241, 246, 244, 0.3)" strokeWidth="1.5" />
          <circle r="5" fill="#F1F6F4" fillOpacity="0.4" />
          <text x="-24" y="4" textAnchor="end" fill="rgba(241, 246, 244, 0.6)" fontFamily="JetBrains Mono" fontSize="9">05_DELIVER</text>
        </g>

        {/* Central Terminal Display */}
        <g transform="translate(200, 200)">
          <circle r="52" fill="rgba(0,0,0,0.4)" stroke="rgba(241,246,244,0.06)" strokeWidth="1" />
          <text y="-10" textAnchor="middle" fill="#FFC801" fontFamily="JetBrains Mono" fontSize="8" letterSpacing="0.05em">LOOP ACTIVE</text>
          <text y="6" textAnchor="middle" fill="rgba(241,246,244,0.5)" fontFamily="JetBrains Mono" fontSize="7">148.2K p/s</text>
          <text y="20" textAnchor="middle" fill="#42fcff" fontFamily="JetBrains Mono" fontSize="7" fontWeight="bold">LATENCY: 1.8ms</text>
        </g>
      </svg>

      {/* Technical label overlay */}
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        left: '1rem',
        fontFamily: 'JetBrains Mono',
        fontSize: '0.7rem',
        color: '#FFC801',
        letterSpacing: '0.05em',
        backgroundColor: 'rgba(23, 43, 54, 0.85)',
        padding: '0.35rem 0.65rem',
        borderRadius: '2px',
        pointerEvents: 'none',
        border: '1px solid rgba(255, 200, 1, 0.15)'
      }}>
        SURVEX_NODE_LOOP // STATUS: TELEMETRY_OK
      </div>
    </div>
  );
}

export default function DataStreams() {
  return (
    <section className="features-section section-hairline-top section-hairline-bottom" id="pipeline" style={{ backgroundColor: '#F1F6F4' }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '3rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        width: '100%'
      }}>
        
        {/* Left Column: Redesigned Interactive Loop of Graph */}
        <div style={{
          flex: '1 1 450px',
          minWidth: '320px',
          boxSizing: 'border-box',
          position: 'relative'
        }}
        className="reveal reveal-left"
        >
          <GraphLoop />
        </div>

        {/* Right Column: Premium feature spec details */}
        <div style={{
          flex: '1 1 450px',
          minWidth: '320px',
          boxSizing: 'border-box'
        }}
        className="reveal reveal-right"
        >
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
                  <path d="m9 11 2 2 4-4"/>
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
