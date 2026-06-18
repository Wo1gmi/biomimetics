"use client";

import { useState } from "react";

const cases = [
  {
    id: "saas",
    sector: "SaaS / B2B",
    title: "Scaling bottleneck resolved via neural pruning",
    bio: "Neural network",
    problem:
      "Engineering org of 40 people. All architecture decisions routed through a single VP-level node. Sprint planning capacity: 31% effective. Deployment frequency: 1.2 per week.",
    transformation:
      "Applied neural pruning model: eliminated central bottleneck, established 3 autonomous conduction pathways (feature squads), each with local decision authority. Feedback loops shortened from 5 hops to 2.",
    metrics: [
      { label: "Deployment freq", before: "1.2/wk", after: "6.8/wk" },
      { label: "Coord cost", before: "87%", after: "23%" },
      { label: "Sprint eff.", before: "31%", after: "79%" },
    ],
    sci: 0.91,
    fss: 0.88,
    atr: "3.1×",
  },
  {
    id: "hr",
    sector: "Enterprise / HR",
    title: "Workforce signal latency eliminated via immune analogue",
    bio: "Immune system",
    problem:
      "2000-person org. Talent acquisition, L&D, and retention data siloed across 3 independent teams. Churn events discovered 90–120 days post-signal. No shared memory structure.",
    transformation:
      "Restructured as immune memory model: shared signal registry (analogous to B-cell memory), cross-team alert propagation on risk patterns, adaptive response triggered at threshold.",
    metrics: [
      { label: "Signal latency", before: "95 days", after: "4 days" },
      { label: "Churn predict.", before: "N/A", after: "82% recall" },
      { label: "HR cost/hire", before: "100%", after: "61%" },
    ],
    sci: 0.87,
    fss: 0.84,
    atr: "2.4×",
  },
  {
    id: "product",
    label: "Product",
    sector: "Consumer / SaaS",
    title: "Retention loop rebuilt via metabolic feedback",
    bio: "Metabolic system",
    problem:
      "Mobile app with 1.2M MAU. User churn signal takes 4 hops and 5+ days to reach the product team. Growth optimizes for acquisition, not lifecycle. No allosteric regulation.",
    transformation:
      "Implemented metabolic receptor model: direct signal path from user behavior layer to product nucleus. Allosteric gates trigger retention interventions within 6 hours of risk signal.",
    metrics: [
      { label: "Signal latency", before: "5.3 days", after: "0.25 days" },
      { label: "D30 retention", before: "18%", after: "31%" },
      { label: "LTV/CAC", before: "1.4×", after: "3.1×" },
    ],
    sci: 0.93,
    fss: 0.91,
    atr: "4.2×",
  },
];

export function CaseStudiesSection() {
  const [active, setActive] = useState(0);
  const c = cases[active];

  return (
    <section id="cases" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span
            className="font-mono-bio text-xs tracking-[0.2em] uppercase"
            style={{ color: "var(--primary)" }}
          >
            Synthetic case studies
          </span>
          <h2
            className="mt-3 font-semibold leading-tight"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              color: "var(--text-primary)",
            }}
          >
            Transformations in practice
          </h2>
        </div>

        {/* Case tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {cases.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(i)}
              className="flex flex-col gap-0.5 px-4 py-2.5 rounded-lg border text-left transition-all"
              style={{
                background: active === i ? "rgba(39,245,163,0.07)" : "var(--surface)",
                borderColor:
                  active === i
                    ? "rgba(39,245,163,0.35)"
                    : "rgba(255,255,255,0.07)",
              }}
            >
              <span
                className="font-mono-bio text-xs"
                style={{ color: active === i ? "var(--primary)" : "var(--text-secondary)" }}
              >
                {c.sector}
              </span>
              <span
                className="text-xs font-medium max-w-[160px] leading-tight"
                style={{ color: active === i ? "var(--text-primary)" : "var(--text-secondary)" }}
              >
                {c.bio} model
              </span>
            </button>
          ))}
        </div>

        {/* Case detail */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-5 border"
              style={{
                borderColor: "rgba(39,245,163,0.2)",
                background: "rgba(39,245,163,0.05)",
                color: "var(--primary)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--primary)" }}
              />
              <span className="font-mono-bio tracking-wide">{c.bio}</span>
            </div>

            <h3
              className="font-semibold text-lg mb-5 leading-snug"
              style={{ color: "var(--text-primary)" }}
            >
              {c.title}
            </h3>

            <div className="flex flex-col gap-5">
              <div>
                <span
                  className="font-mono-bio text-xs uppercase tracking-wider block mb-2"
                  style={{ color: "var(--error)" }}
                >
                  Problem
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {c.problem}
                </p>
              </div>
              <div>
                <span
                  className="font-mono-bio text-xs uppercase tracking-wider block mb-2"
                  style={{ color: "var(--primary)" }}
                >
                  Transformation
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {c.transformation}
                </p>
              </div>
            </div>
          </div>

          {/* Metrics panel */}
          <div className="flex flex-col gap-5">
            <div
              className="rounded-xl border p-5"
              style={{
                background: "var(--surface)",
                borderColor: "rgba(255,255,255,0.07)",
              }}
            >
              <h4
                className="font-mono-bio text-xs tracking-wider mb-5"
                style={{ color: "var(--text-secondary)" }}
              >
                BEFORE / AFTER METRICS
              </h4>
              <div className="flex flex-col gap-4">
                {c.metrics.map((m, i) => (
                  <div key={i}>
                    <div
                      className="text-xs mb-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {m.label}
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className="font-mono-bio text-sm px-2.5 py-1 rounded"
                        style={{
                          background: "rgba(255,77,77,0.1)",
                          color: "var(--error)",
                          border: "1px solid rgba(255,77,77,0.2)",
                        }}
                      >
                        {m.before}
                      </span>
                      <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>→</span>
                      <span
                        className="font-mono-bio text-sm px-2.5 py-1 rounded"
                        style={{
                          background: "rgba(39,245,163,0.1)",
                          color: "var(--primary)",
                          border: "1px solid rgba(39,245,163,0.2)",
                        }}
                      >
                        {m.after}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "SCI", value: c.sci },
                { label: "FSS", value: c.fss },
                { label: "ATR", value: c.atr },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border p-3"
                  style={{
                    background: "var(--surface)",
                    borderColor: "rgba(39,245,163,0.12)",
                  }}
                >
                  <div className="font-mono-bio text-xs" style={{ color: "var(--primary)" }}>
                    {m.label}
                  </div>
                  <div className="font-semibold text-xl mt-1" style={{ color: "var(--text-primary)" }}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
