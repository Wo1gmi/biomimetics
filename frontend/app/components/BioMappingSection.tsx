"use client";

import { useState, useEffect, useRef } from "react";

const mappingTable = [
  {
    business: "Communication flow",
    biological: "Neural network",
    desc: "Signal propagation with selective inhibition and amplification across distributed nodes.",
    metric: "d_topology = 0.12",
  },
  {
    business: "Error handling",
    biological: "Immune system",
    desc: "Pattern recognition, memory formation, and adaptive response to novel perturbations.",
    metric: "d_dynamics = 0.09",
  },
  {
    business: "Scaling behavior",
    biological: "Morphogenesis",
    desc: "Growth guided by local positional information; form emerges from gradient fields.",
    metric: "d_topology = 0.18",
  },
  {
    business: "Distributed teams",
    biological: "Colony organism",
    desc: "Stigmergic coordination — globally optimal behavior from local interaction rules.",
    metric: "d_dynamics = 0.07",
  },
  {
    business: "Resource allocation",
    biological: "Metabolic system",
    desc: "Allometric scaling laws; resource distribution follows fractal vascular geometry.",
    metric: "d_topology = 0.11",
  },
];

export function BioMappingSection() {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  return (
    <section
      id="mapping"
      className="py-32 px-6"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: explanation */}
          <div>
            <span
              className="font-mono-bio text-xs tracking-[0.2em] uppercase"
              style={{ color: "var(--primary)" }}
            >
              φ: S → B
            </span>
            <h2
              className="mt-3 font-semibold leading-tight mb-6"
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                color: "var(--text-primary)",
              }}
            >
              Structural abstraction
              <br />
              engine
            </h2>
            <p
              className="leading-relaxed mb-8"
              style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}
            >
              Every organization is projected into a universal biological space
              through a mapping φ that minimizes structural distance:
            </p>

            <div
              className="rounded-lg px-5 py-4 border font-mono-bio text-sm mb-8 leading-loose"
              style={{
                background: "rgba(10,13,18,0.7)",
                borderColor: "rgba(39,245,163,0.15)",
                color: "var(--primary)",
                fontSize: "0.8rem",
              }}
            >
              d(S, B) = α · topology_distance
              <br />
              {"       "} + β · dynamics_distance
              <br />
              <br />
              <span style={{ color: "var(--text-secondary)" }}>
                S = (F, C, A, R)
                <br />
                F=flows · C=control · A=adaptation · R=resources
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "SCI", name: "Structural Coherence", value: "0.91" },
                { label: "FSS", name: "Feedback Stability", value: "0.84" },
                { label: "ATR", name: "Adaptive Throughput", value: "2.3×" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg p-3 border"
                  style={{
                    background: "rgba(10,13,18,0.5)",
                    borderColor: "rgba(39,245,163,0.12)",
                  }}
                >
                  <div
                    className="font-mono-bio text-xs mb-1"
                    style={{ color: "var(--primary)" }}
                  >
                    {m.label}
                  </div>
                  <div
                    className="font-semibold text-lg"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {m.value}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {m.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: mapping table */}
          <div className="flex flex-col gap-2">
            {mappingTable.map((row, i) => (
              <button
                key={i}
                className="text-left rounded-lg border transition-all"
                style={{
                  background:
                    activeRow === i
                      ? "rgba(39,245,163,0.05)"
                      : "rgba(10,13,18,0.4)",
                  borderColor:
                    activeRow === i
                      ? "rgba(39,245,163,0.3)"
                      : "rgba(255,255,255,0.07)",
                }}
                onMouseEnter={() => setActiveRow(i)}
                onMouseLeave={() => setActiveRow(null)}
              >
                <div className="flex items-center px-4 py-3 gap-4">
                  <span
                    className="text-sm font-medium flex-1"
                    style={{ color: "var(--secondary)" }}
                  >
                    {row.business}
                  </span>
                  <span
                    className="font-mono-bio text-xs"
                    style={{ color: "rgba(240,244,248,0.3)" }}
                  >
                    →
                  </span>
                  <span
                    className="text-sm font-medium flex-1 text-right"
                    style={{ color: "var(--primary)" }}
                  >
                    {row.biological}
                  </span>
                </div>
                {activeRow === i && (
                  <div
                    className="px-4 pb-3 border-t"
                    style={{ borderColor: "rgba(39,245,163,0.1)" }}
                  >
                    <p
                      className="text-xs mt-2 leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {row.desc}
                    </p>
                    <span
                      className="font-mono-bio text-xs mt-1.5 inline-block"
                      style={{ color: "var(--primary)" }}
                    >
                      {row.metric}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
