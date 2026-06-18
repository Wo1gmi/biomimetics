"use client";

import { useEffect, useRef, useState } from "react";
import { BusinessGraph, BioGraph } from "./GraphCanvas";

const mappingPairs = [
  ["Communication flow", "Neural network"],
  ["Error handling", "Immune system"],
  ["Scaling behavior", "Morphogenesis"],
  ["Distributed teams", "Colony organism"],
  ["Resource allocation", "Metabolic system"],
];

export function HeroSection() {
  const [activePair, setActivePair] = useState(0);
  const [showMapping, setShowMapping] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowMapping(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      setActivePair((p) => (p + 1) % mappingPairs.length);
    }, 2800);
    return () => clearInterval(iv);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(39,245,163,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(39,245,163,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 700,
          height: 700,
          background:
            "radial-gradient(ellipse at center, rgba(39,245,163,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Label */}
        <div className="flex justify-center mb-8">
          <span
            className="font-mono-bio text-xs tracking-[0.25em] uppercase border px-4 py-1.5 rounded-full"
            style={{
              borderColor: "rgba(39,245,163,0.2)",
              color: "var(--primary)",
              background: "rgba(39,245,163,0.04)",
            }}
          >
            Structural Intelligence Layer
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-center font-semibold leading-[1.1] tracking-tight mb-6"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "var(--text-primary)" }}
        >
          Organizational design
          <br />
          <span className="shimmer-text">through biological logic</span>
        </h1>

        <p
          className="text-center max-w-2xl mx-auto mb-14 leading-relaxed"
          style={{ fontSize: "1.05rem", color: "var(--text-secondary)" }}
        >
          Any complex system can be mapped into the space of biological structures
          through transformations that preserve flow topology, feedback loops, and
          adaptive capacity.
        </p>

        {/* Split-screen graph */}
        <div
          className="rounded-2xl overflow-hidden border"
          style={{
            borderColor: "rgba(255,255,255,0.07)",
            background: "rgba(17,20,25,0.8)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Header row */}
          <div
            className="grid grid-cols-2 border-b"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            <div
              className="flex items-center gap-2.5 px-5 py-3 border-r"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "var(--secondary)" }}
              />
              <span
                className="font-mono-bio text-xs tracking-wider"
                style={{ color: "var(--secondary)", opacity: 0.9 }}
              >
                BUSINESS SYSTEM
              </span>
            </div>
            <div className="flex items-center gap-2.5 px-5 py-3">
              <span
                className="w-2 h-2 rounded-full animate-bio-pulse"
                style={{ background: "var(--primary)" }}
              />
              <span
                className="font-mono-bio text-xs tracking-wider"
                style={{ color: "var(--primary)", opacity: 0.9 }}
              >
                BIOLOGICAL ANALOGUE
              </span>
            </div>
          </div>

          {/* Graph area */}
          <div className="grid grid-cols-2 relative" style={{ height: 280 }}>
            {/* Business graph */}
            <div
              className="border-r"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <BusinessGraph />
            </div>

            {/* Mapping lines overlay */}
            <MappingLines show={showMapping} />

            {/* Bio graph */}
            <div>
              <BioGraph />
            </div>
          </div>

          {/* Mapping label row */}
          <div
            className="border-t px-5 py-3 flex items-center gap-3"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            <span
              className="font-mono-bio text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              φ mapping:
            </span>
            <div className="flex items-center gap-2">
              <span
                className="font-mono-bio text-xs px-2 py-0.5 rounded"
                style={{
                  color: "var(--secondary)",
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  transition: "all 0.4s",
                }}
              >
                {mappingPairs[activePair][0]}
              </span>
              <span style={{ color: "var(--primary)", fontSize: 13 }}>→</span>
              <span
                className="font-mono-bio text-xs px-2 py-0.5 rounded"
                style={{
                  color: "var(--primary)",
                  background: "rgba(39,245,163,0.1)",
                  border: "1px solid rgba(39,245,163,0.2)",
                  transition: "all 0.4s",
                }}
              >
                {mappingPairs[activePair][1]}
              </span>
            </div>
          </div>
        </div>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <a
            href="#upload"
            className="px-8 py-3.5 rounded-full font-medium text-sm transition-all"
            style={{
              background: "var(--primary)",
              color: "#0A0D12",
            }}
          >
            Analyze your system
          </a>
          <a
            href="#problem"
            className="px-8 py-3.5 rounded-full font-medium text-sm transition-all border"
            style={{
              borderColor: "rgba(255,255,255,0.12)",
              color: "var(--text-secondary)",
            }}
          >
            See the problem
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div
          className="w-px h-10 mx-auto"
          style={{
            background:
              "linear-gradient(to bottom, rgba(39,245,163,0.4), transparent)",
          }}
        />
      </div>
    </section>
  );
}

function MappingLines({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
      width="100%"
      height="100%"
    >
      <defs>
        <linearGradient id="mapLine1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#27F5A3" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {/* Horizontal mapping lines across split */}
      <line x1="48%" y1="22%" x2="52%" y2="22%" stroke="url(#mapLine1)" strokeWidth="1" strokeDasharray="3,3" className="flow-line" />
      <line x1="48%" y1="48%" x2="52%" y2="48%" stroke="url(#mapLine1)" strokeWidth="1" strokeDasharray="3,3" className="flow-line" style={{ animationDelay: "0.3s" }} />
      <line x1="48%" y1="74%" x2="52%" y2="74%" stroke="url(#mapLine1)" strokeWidth="1" strokeDasharray="3,3" className="flow-line" style={{ animationDelay: "0.6s" }} />
    </svg>
  );
}
