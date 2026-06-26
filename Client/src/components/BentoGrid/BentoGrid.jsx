import React, { useMemo } from 'react';

const features = [
  {
    id: 'orchestration',
    title: 'Orchestration Engine',
    tag: 'Pipeline Core',
    desc: 'Define complex DAGs, parallel fan-outs, and linear pipelines. Schedule and trigger workflows via Webhooks, CRON, or event sources with microsecond latency.'
  },
  {
    id: 'validator',
    title: 'Schema Validator',
    tag: 'Data Quality',
    desc: 'Verify incoming payloads against custom JSON Schema, Protobuf, or Avro specs. Reject or sanitize non-compliant fields before they reach downstream databases.'
  },
  {
    id: 'dlq',
    title: 'Dead-Letter Queue',
    tag: 'Fault Tolerance',
    desc: 'Isolate corrupted payloads automatically. Route failed records to an isolated DLQ for inspection, manual correction, and safe replay without stalling the pipeline.'
  },
  {
    id: 'retry',
    title: 'Retry Scheduler',
    tag: 'Self-Healing',
    desc: 'Configure exponential backoff and jittered retry strategies for flaky HTTP endpoints or unstable databases. Avoid thundering herd problems automatically.'
  },
  {
    id: 'metrics',
    title: 'Metric Exporter',
    tag: 'Telemetry',
    desc: 'Export high-fidelity pipeline metrics to Prometheus or Datadog. Monitor throughput, latency, and error rates in real-time.'
  },
  {
    id: 'debugger',
    title: 'Pipeline Debugger',
    tag: 'Diagnostics',
    desc: 'Step through execution history, inspect variable bindings, test schemas live, and trace individual packets through the routing graph.'
  },
  {
    id: 'compliance',
    title: 'Compliance Guard',
    tag: 'Security',
    desc: 'Anonymize PII data automatically with dynamic masking. Ensure compliance with HIPAA and GDPR regulations at the ingestion boundary.'
  }
];

export default function BentoGrid() {
  // Split features into two rows for opposing direction loop flows
  const row1 = useMemo(() => [
    features[0],
    features[1],
    features[2],
    features[3]
  ], []);

  const row2 = useMemo(() => [
    features[4],
    features[5],
    features[6],
    features[0] // Add Orchestration duplicate for symmetry
  ], []);

  // Extend rows to create seamless infinite loop effect in CSS marquee
  const row1Extended = useMemo(() => [...row1, ...row1], [row1]);
  const row2Extended = useMemo(() => [...row2, ...row2], [row2]);

  const renderCard = (feat, idx) => (
    <div key={`${feat.id}-${idx}`} className="marquee-card">
      <div className="marquee-card-header">
        <span className="marquee-card-tag">{feat.tag}</span>
        <span className="marquee-card-num">[{String((idx % 4) + 1).padStart(2, '0')}]</span>
      </div>
      <div className="marquee-card-body">
        <h3 className="marquee-card-title">
          {feat.title}
        </h3>
        <p className="marquee-card-desc">
          {feat.desc}
        </p>
      </div>
      <div className="marquee-card-footer">
        <span>STATUS: ACTIVE</span>
        <span>SYSTEM // SECURE</span>
      </div>
    </div>
  );

  return (
    <section className="features-section section-hairline-bottom" id="features" aria-label="Key Features">
      <div className="container">
        <div className="section-label">Capabilities Spec</div>
        <h2 className="section-title">Engineered for absolute pipeline integrity</h2>
        <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>
          Survex automates structural pipeline concerns so you can focus on writing transformation logic.
        </p>
      </div>

      {/* Infinite Card Loops Marquee Containers */}
      <div className="features-marquee-container">
        {/* Row 1: Flowing Left */}
        <div className="marquee-track-left" role="presentation">
          {row1Extended.map((feat, idx) => renderCard(feat, idx))}
        </div>

        {/* Row 2: Flowing Right */}
        <div className="marquee-track-right" role="presentation">
          {row2Extended.map((feat, idx) => renderCard(feat, idx))}
        </div>
      </div>
    </section>
  );
}
