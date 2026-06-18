"use client";

import { useReveal } from "../hooks/useReveal";

const metrics = [
  {
    id: "sci",
    abbr: "SCI",
    name: "Structural Coherence Index",
    formula: "SCI = 1 − H(G) / H_max(G)",
    description:
      "Measures how well the organization's flow graph aligns with a low-entropy reference structure. Derived from information-theoretic entropy of the adjacency distribution.",
    range: "0 → 1",
    ideal: "> 0.85",
    analogy: "Genetic regulatory coherence in developmental biology",
  },
  {
    id: "fss",
    abbr: "FSS",
    name: "Feedback Stability Score",
    formula: "|λ_max(J)| < 1",
    description:
      "System is stable if and only if the spectral radius of the Jacobian of the feedback dynamics is less than 1. Identical to the Lyapunov stability criterion for nonlinear systems.",
    range: "0 → ∞",
    ideal: "< 1.0",
    analogy: "Homeostatic stability in biological regulatory networks",
  },
  {
    id: "atr",
    abbr: "ATR",
    name: "Adaptive Throughput Rate",
    formula: "ATR = Δ_output / Δ_perturbation × τ_recovery⁻¹",
    description:
      "Rate at which the system produces effective output under perturbation, normalized by recovery time. Analogous to metabolic flux efficiency under substrate stress.",
    range: "0 → ∞",
    ideal: "> 2.0×",
    analogy: "Metabolic flux rate in stressed organisms",
  },
];

export function MetricsSection() {
  const ref = useReveal();
  return (
    <section
      id="metrics"
      className="py-32 px-6"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="mb-16 max-w-2xl reveal">
          <span
            className="font-mono-bio text-xs tracking-[0.2em] uppercase"
            style={{ color: "var(--primary)" }}
          >
            Evaluation layer
          </span>
          <h2
            className="mt-3 font-semibold leading-tight"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              color: "var(--text-primary)",
            }}
          >
            How we measure
            <br />
            transformation quality
          </h2>
          <p
            className="mt-5 text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Three formally defined metrics, each with a direct biological analogue.
            All are computable from the state vector S = (F, C, A, R) derived
            during ingestion.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {metrics.map((m, i) => (
            <div key={m.id} className={`reveal reveal-delay-${i + 1}`}>
              <MetricCard {...m} />
            </div>
          ))}
        </div>

        {/* Objective function */}
        <div
          className="mt-12 rounded-xl border p-8"
          style={{
            background: "rgba(10,13,18,0.6)",
            borderColor: "rgba(39,245,163,0.15)",
          }}
        >
          <div
            className="font-mono-bio text-xs tracking-wider mb-5"
            style={{ color: "var(--text-secondary)" }}
          >
            OPTIMIZATION OBJECTIVE
          </div>
          <div
            className="font-mono-bio text-sm leading-loose"
            style={{ color: "var(--primary)" }}
          >
            S&apos; = argmin J(S)
            <br />
            <br />
            <span style={{ color: "var(--text-secondary)" }}>
              J(S) = λ₁ · entropy(S)
              <br />
              {"       "}+ λ₂ · instability(S)
              <br />
              {"       "}+ λ₃ · coordination_cost(S)
              <br />
              {"       "}− λ₄ · adaptability(S)
            </span>
          </div>
          <p
            className="mt-6 text-sm leading-relaxed max-w-2xl"
            style={{ color: "var(--text-secondary)" }}
          >
            The transformation engine finds S&apos; — the post-transformation state —
            by minimizing structural entropy, feedback instability, and coordination cost,
            while maximizing adaptability. Coefficients λ₁–λ₄ are calibrated per
            industry vertical and organizational scale.
          </p>
        </div>
      </div>
    </section>
  );
}

function MetricCard(m: (typeof metrics)[0]) {
  return (
    <div
      className="rounded-xl border p-6 flex flex-col gap-5"
      style={{
        background: "rgba(10,13,18,0.5)",
        borderColor: "rgba(39,245,163,0.1)",
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <div
            className="font-mono-bio text-2xl font-medium"
            style={{ color: "var(--primary)" }}
          >
            {m.abbr}
          </div>
          <div
            className="text-xs mt-0.5"
            style={{ color: "var(--text-secondary)" }}
          >
            {m.name}
          </div>
        </div>
        <div
          className="px-2 py-0.5 rounded font-mono-bio text-xs border"
          style={{
            color: "var(--primary)",
            borderColor: "rgba(39,245,163,0.2)",
            background: "rgba(39,245,163,0.06)",
          }}
        >
          ideal {m.ideal}
        </div>
      </div>

      <div
        className="rounded-lg px-4 py-3 font-mono-bio text-xs leading-relaxed border"
        style={{
          background: "rgba(10,13,18,0.6)",
          borderColor: "rgba(39,245,163,0.1)",
          color: "var(--primary)",
        }}
      >
        {m.formula}
      </div>

      <p
        className="text-xs leading-relaxed flex-1"
        style={{ color: "var(--text-secondary)" }}
      >
        {m.description}
      </p>

      <div
        className="pt-4 border-t text-xs"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <span style={{ color: "var(--text-secondary)" }}>Biological analogue: </span>
        <span style={{ color: "var(--primary)" }}>{m.analogy}</span>
      </div>
    </div>
  );
}
