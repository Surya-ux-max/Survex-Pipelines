import React from 'react';
import MagicRings from './MagicRings/MagicRings';

export default function CTA() {
  return (
    <section className="cta-section section-hairline-top section-hairline-bottom reveal reveal-scale" id="cta" aria-label="Call to Action">
      {/* Background Magic Rings with cybernetic glowing theme */}
      <div className="cta-bg-wrapper">
        <MagicRings
          color="#FFC801"
          colorTwo="#42fcff"
          ringCount={7}
          speed={0.8}
          attenuation={9}
          lineThickness={2.5}
          baseRadius={0.3}
          radiusStep={0.09}
          scaleRate={0.08}
          opacity={0.85}
          blur={0}
          noiseAmount={0.04}
          rotation={30}
          ringGap={1.45}
          fadeIn={0.6}
          fadeOut={0.65}
          followMouse={true}
          mouseInfluence={0.25}
          hoverScale={1.15}
          parallax={0.04}
          clickBurst={true}
        />
      </div>

      <div className="container cta-container">
        <div className="cta-content-card">
          <div className="cta-terminal-header">
            <span className="terminal-dot terminal-dot-red" />
            <span className="terminal-dot terminal-dot-yellow" />
            <span className="terminal-dot terminal-dot-green" />
            <span className="terminal-filename">~/survex/deploy.sh</span>
          </div>

          <div className="cta-body">
            <div className="cta-tag">GET STARTED</div>
            <h2 className="cta-title">
              Absolute Pipeline Safety.<br />
              <span>Deployed in 60 Seconds.</span>
            </h2>
            <p className="cta-desc">
              Stop debugging structural pipeline failures. Connect Survex to your event sources and experience schema validation, dead-letter queues, and self-healing orchestration out of the box.
            </p>

            <div className="cta-actions">
              <a href="#pricing" className="btn btn-primary">
                Deploy to Production
              </a>
              <a href="#" className="btn btn-secondary btn-dark-theme">
                View Spec Sheet
              </a>
            </div>

            {/* Trusted By Company Logos Strip */}
            <div className="cta-logos-wrap">
              <span className="cta-logos-title">Trusted by engineering teams at</span>
              <div className="cta-logos-grid" aria-label="Partner company logos">
                {/* Vercel */}
                <div className="cta-logo" title="Vercel">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M12 2L2 22h20L12 2z" />
                  </svg>
                  <span className="cta-logo-text">VERCEL</span>
                </div>
                {/* Stripe */}
                <div className="cta-logo" title="Stripe">
                  <svg viewBox="0 0 64 64" width="45" height="18" fill="currentColor">
                    <path d="M11 25.5c0-4.5 3.5-7.5 8.5-7.5 4.5 0 7.8 2.2 9 4.3l-4 3c-.8-1.2-2.5-2.2-4.5-2.2-2.2 0-3.5 1-3.5 2.5 0 3.8 11.5 2.5 11.5 11.5 0 5-4 8.5-9.5 8.5-5 0-8.8-2.2-10-4.8l4.2-2.8c.8 1.5 3 2.5 5.5 2.5 2.5 0 3.8-1 3.8-2.8 0-4.2-11.5-2.5-11.5-12.5zm25-4v4.5h5v5h-5V42c0 2 1.5 2.5 3 2.5h2v4.8h-4.5c-4.5 0-6.5-2.5-6.5-6.5V31h-3v-5h3v-4.5h6zM50 25v4.5a4 4 0 0 1 3.5-2c3.5 0 5.5 2.5 5.5 6.5V47h-6v-12c0-2-1-2.8-2.5-2.8s-3.5 1.2-3.5 3.2V47h-6V25h6z"/>
                  </svg>
                </div>
                {/* Slack */}
                <div className="cta-logo" title="Slack">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.043a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.043zm2.52-6.342a2.528 2.528 0 0 1-2.52-2.52c0-1.392 1.13-2.522 2.52-2.522a2.528 2.528 0 0 1 2.522 2.522v2.52h-2.522zm0 1.261a2.528 2.528 0 0 1 2.522 2.52v5.043a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52V10.084a2.528 2.528 0 0 1 2.52-2.52z"/>
                  </svg>
                  <span className="cta-logo-text" style={{ fontSize: '0.8rem', letterSpacing: '-0.01em', fontWeight: 'bold' }}>slack</span>
                </div>
                {/* Netflix */}
                <div className="cta-logo" title="Netflix">
                  <svg viewBox="0 0 64 64" width="20" height="20" fill="currentColor">
                    <path d="M16 6v52l16-24 16 24V6h-8v36L32 22l-8 20V6h-8z"/>
                  </svg>
                  <span className="cta-logo-text" style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '0.05em' }}>NETFLIX</span>
                </div>
                {/* Snowflake */}
                <div className="cta-logo" title="Snowflake">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19M12 7l3 2M12 17l-3 2M7 12l2 3M17 12l-2-3" />
                  </svg>
                  <span className="cta-logo-text" style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '-0.02em' }}>snowflake</span>
                </div>
              </div>
            </div>

            <div className="cta-terminal-footer" style={{ marginTop: '2.5rem' }}>
              <span className="terminal-prompt">$</span> npm install @survex/core && survex up --prod
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
