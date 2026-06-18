"use client";

import { useState, useRef } from "react";
import { Upload, FileText, Building2, Layers, ArrowRight } from "lucide-react";

const inputTypes = [
  {
    icon: FileText,
    label: "Text description",
    placeholder:
      "Describe your organization structure, main flows, and pain points...",
  },
  {
    icon: Building2,
    label: "CSV org chart",
    placeholder: "Upload a CSV with columns: entity, reports_to, type, layer",
  },
  {
    icon: Layers,
    label: "Notion export",
    placeholder: "Paste Notion page URL or export content",
  },
];

const exampleInputs = [
  "We have 4 engineering squads that report to a VP of Engineering, but all decisions go through a single architect. The data team is isolated, creating bottlenecks when product needs analytics.",
  "Our sales and product teams have conflicting KPIs — sales pushes volume, product optimizes retention. The feedback loop is broken: customers churn but the signal never reaches product.",
  "We run 6 microservices but they share a single database. The data service is a hub with 14 inbound connections and 3 outbound. Any change cascades unpredictably.",
];

interface AnalysisResult {
  vector: { F: number; C: number; A: number; R: number };
  match: string;
  matchDetail: string;
  score: number;
  recommendation: string;
  caseId: "saas" | "hr" | "product";
}

function analyzeInput(text: string): AnalysisResult {
  const t = text.toLowerCase();

  const hasHierarchy = /\b(hierarchy|hierarchi|bottleneck|architect|vp\b|cto|approval|centrali|single point|all decisions|monolith)\b/.test(t);
  const hasSilos = /\b(silo|isolated|hr\b|talent|payroll|l&d|workforce|employee|conflict|kpi|department)\b/.test(t);
  const hasRetention = /\b(churn|retention|feedback|user signal|latenc|delay|hops?|product.*signal|signal.*product)\b/.test(t);
  const hasServices = /\b(microservice|service|api\b|database|db\b|connection|dependency|cascade|inbound|hub)\b/.test(t);
  const hasScaling = /\b(scal(e|ing)|growth|distribut|expand|headcount|team size)\b/.test(t);

  if (hasHierarchy) {
    return {
      vector: { F: 0.73, C: 0.41, A: 0.29, R: 0.61 },
      match: "Centralized neural ganglion — high hub dependency",
      matchDetail: "Neural network",
      score: 87,
      recommendation: "Neural pruning: distribute authority across autonomous conduction pathways",
      caseId: "saas",
    };
  }
  if (hasSilos) {
    return {
      vector: { F: 0.44, C: 0.68, A: 0.31, R: 0.55 },
      match: "Compartmentalized lymphoid system — no shared signal memory",
      matchDetail: "Immune system",
      score: 83,
      recommendation: "Immune memory model: shared signal registry with cross-team adaptive response",
      caseId: "hr",
    };
  }
  if (hasRetention) {
    return {
      vector: { F: 0.58, C: 0.29, A: 0.22, R: 0.70 },
      match: "Uncoupled receptor-effector pathway — signal latency > 3 cycles",
      matchDetail: "Metabolic system",
      score: 91,
      recommendation: "Allosteric receptor model: direct user signal to product nucleus within one cycle",
      caseId: "product",
    };
  }
  if (hasServices) {
    return {
      vector: { F: 0.81, C: 0.35, A: 0.24, R: 0.48 },
      match: "Hypervascularized hub — critical node with excessive tributary load",
      matchDetail: "Vascular system",
      score: 79,
      recommendation: "Distributive vascular model: decouple hub via parallel routing pathways",
      caseId: "saas",
    };
  }
  if (hasScaling) {
    return {
      vector: { F: 0.62, C: 0.55, A: 0.38, R: 0.57 },
      match: "Undifferentiated growth — morphogenic gradient absent",
      matchDetail: "Morphogenesis",
      score: 74,
      recommendation: "Morphogenic field model: gradient signals to guide differentiated scaling",
      caseId: "saas",
    };
  }

  return {
    vector: { F: 0.66, C: 0.44, A: 0.31, R: 0.58 },
    match: "Generic coordination topology — disambiguation required",
    matchDetail: "Colony organism",
    score: 68,
    recommendation: "Stigmergic model: redistribute coordination through local interaction rules",
    caseId: "saas",
  };
}

export function SystemUploadSection() {
  const [activeType, setActiveType] = useState(0);
  const [input, setInput] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleAnalyze() {
    if (!input.trim()) return;
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(analyzeInput(input));
    }, 2400);
  }

  return (
    <section id="upload" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="font-mono-bio text-xs tracking-[0.2em] uppercase"
            style={{ color: "var(--primary)" }}
          >
            System Ingestion Layer
          </span>
          <h2
            className="mt-3 font-semibold leading-tight"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              color: "var(--text-primary)",
            }}
          >
            Describe your system
          </h2>
          <p
            className="mt-4 max-w-xl mx-auto text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            The engine parses structure, extracts the flow graph G(V,E), computes
            the state vector S = (F, C, A, R), and retrieves the closest biological
            analogue from the pattern library.
          </p>
        </div>

        <div
          className="rounded-2xl border overflow-hidden"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            background: "var(--surface)",
          }}
        >
          {/* Input type selector */}
          <div
            className="flex border-b"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            {inputTypes.map((t, i) => {
              const Icon = t.icon;
              return (
                <button
                  key={i}
                  onClick={() => setActiveType(i)}
                  className="flex items-center gap-2 px-5 py-3.5 text-xs font-medium transition-all border-b-2 -mb-px"
                  style={{
                    color: activeType === i ? "var(--primary)" : "var(--text-secondary)",
                    borderColor: activeType === i ? "var(--primary)" : "transparent",
                    background: activeType === i ? "rgba(39,245,163,0.04)" : "transparent",
                  }}
                >
                  <Icon size={13} />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Input area */}
          <div className="p-6">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={inputTypes[activeType].placeholder}
              rows={6}
              className="w-full resize-none rounded-lg px-4 py-3 text-sm leading-relaxed outline-none transition-all border"
              style={{
                background: "rgba(10,13,18,0.7)",
                borderColor: input ? "rgba(39,245,163,0.3)" : "rgba(255,255,255,0.07)",
                color: "var(--text-primary)",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.82rem",
              }}
            />

            {/* Example prompts */}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Try an example:
              </span>
              {exampleInputs.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setInput(ex)}
                  className="text-xs px-2.5 py-1 rounded border transition-all hover:border-opacity-50"
                  style={{
                    borderColor: "rgba(255,255,255,0.1)",
                    color: "var(--text-secondary)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  Example {i + 1}
                </button>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span
                className="font-mono-bio text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                {input.length > 0 ? `${input.length} chars → parsing G(V,E)` : "awaiting input"}
              </span>
              <button
                onClick={handleAnalyze}
                disabled={!input.trim() || analyzing}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all"
                style={{
                  background:
                    input.trim() && !analyzing
                      ? "var(--primary)"
                      : "rgba(39,245,163,0.2)",
                  color: input.trim() && !analyzing ? "#0A0D12" : "var(--primary)",
                  cursor: input.trim() && !analyzing ? "pointer" : "not-allowed",
                }}
              >
                <Upload size={14} />
                {analyzing ? "Analyzing..." : "Analyze system"}
              </button>
            </div>
          </div>

          {/* Result panel */}
          {(analyzing || result) && (
            <div
              className="mx-6 mb-6 rounded-lg border"
              style={{
                background: "rgba(10,13,18,0.6)",
                borderColor: "rgba(39,245,163,0.2)",
              }}
            >
              {analyzing ? (
                <div className="p-5 flex flex-col gap-3">
                  <LoadingBar label="Parsing graph G(V,E)" delay={0} />
                  <LoadingBar label="Computing state vector S" delay={400} />
                  <LoadingBar label="Retrieving biological analogues" delay={900} />
                  <LoadingBar label="Scoring candidates B = {b₁…bₙ}" delay={1500} />
                </div>
              ) : result ? (
                <ResultPanel result={result} />
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ResultPanel({ result }: { result: AnalysisResult }) {
  const vectorEntries: [string, number][] = [
    ["F", result.vector.F],
    ["C", result.vector.C],
    ["A", result.vector.A],
    ["R", result.vector.R],
  ];

  return (
    <div className="p-5 flex flex-col gap-6">
      {/* Top row: vector + match + score */}
      <div className="grid sm:grid-cols-3 gap-6">
        {/* State vector */}
        <div>
          <div
            className="font-mono-bio text-xs mb-3"
            style={{ color: "var(--text-secondary)" }}
          >
            STATE VECTOR
          </div>
          <div className="flex flex-col gap-2">
            {vectorEntries.map(([key, val]) => (
              <div key={key} className="flex items-center gap-2">
                <span
                  className="font-mono-bio text-xs w-4"
                  style={{ color: "var(--primary)" }}
                >
                  {key}
                </span>
                <div
                  className="flex-1 h-1 rounded-full overflow-hidden"
                  style={{ background: "rgba(39,245,163,0.1)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${val * 100}%`,
                      background: "var(--primary)",
                      transition: "width 0.8s ease-out",
                    }}
                  />
                </div>
                <span
                  className="font-mono-bio text-xs w-8 text-right"
                  style={{ color: "var(--primary)" }}
                >
                  {val.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Biological match */}
        <div>
          <div
            className="font-mono-bio text-xs mb-3"
            style={{ color: "var(--text-secondary)" }}
          >
            BIOLOGICAL MATCH
          </div>
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs mb-3"
            style={{
              borderColor: "rgba(39,245,163,0.3)",
              background: "rgba(39,245,163,0.07)",
              color: "var(--primary)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--primary)" }}
            />
            <span className="font-mono-bio">{result.matchDetail}</span>
          </div>
          <div
            className="text-sm font-medium leading-snug"
            style={{ color: "var(--text-primary)" }}
          >
            {result.match}
          </div>
        </div>

        {/* Score */}
        <div>
          <div
            className="font-mono-bio text-xs mb-3"
            style={{ color: "var(--text-secondary)" }}
          >
            SIMILARITY SCORE
          </div>
          <div
            className="font-semibold leading-none mb-2"
            style={{ fontSize: "2.6rem", color: "var(--primary)" }}
          >
            {result.score}
            <span className="text-2xl">%</span>
          </div>
          {/* Score bar */}
          <div
            className="h-1 rounded-full overflow-hidden"
            style={{ background: "rgba(39,245,163,0.1)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${result.score}%`,
                background: "linear-gradient(90deg, var(--primary), var(--secondary))",
                transition: "width 1s ease-out",
              }}
            />
          </div>
        </div>
      </div>

      {/* Recommendation + CTA */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t"
        style={{ borderColor: "rgba(39,245,163,0.1)" }}
      >
        <div className="flex flex-col gap-1">
          <span
            className="font-mono-bio text-xs uppercase tracking-wider"
            style={{ color: "var(--text-secondary)" }}
          >
            Recommendation
          </span>
          <p className="text-sm" style={{ color: "var(--text-primary)" }}>
            {result.recommendation}
          </p>
        </div>
        <a
          href="#transformation"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 border transition-all"
          style={{
            borderColor: "rgba(39,245,163,0.3)",
            color: "var(--primary)",
            background: "rgba(39,245,163,0.06)",
          }}
        >
          View transformation
          <ArrowRight size={13} />
        </a>
      </div>
    </div>
  );
}

function LoadingBar({ label, delay }: { label: string; delay: number }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-1 rounded-full overflow-hidden flex-1"
        style={{ background: "rgba(39,245,163,0.1)" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            background: "var(--primary)",
            animation: `grow 0.8s ${delay}ms ease-out forwards`,
            width: "0%",
          }}
        />
      </div>
      <span
        className="font-mono-bio text-xs w-52"
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
      </span>
      <style>{`
        @keyframes grow {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </div>
  );
}
