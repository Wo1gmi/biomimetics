"use client";

import { useState, useRef } from "react";
import { Upload, FileText, Building2, Layers } from "lucide-react";

const inputTypes = [
  {
    icon: FileText,
    label: "Text description",
    placeholder:
      "Describe your organization structure, main flows, and pain points...",
    type: "text",
  },
  {
    icon: Building2,
    label: "CSV org chart",
    placeholder: "Upload a CSV with columns: entity, reports_to, type, layer",
    type: "file",
  },
  {
    icon: Layers,
    label: "Notion export",
    placeholder: "Paste Notion page URL or export content",
    type: "text",
  },
];

const exampleInputs = [
  "We have 4 engineering squads that report to a VP of Engineering, but all decisions go through a single architect. The data team is isolated, creating bottlenecks when product needs analytics.",
  "Our sales and product teams have conflicting KPIs — sales pushes volume, product optimizes retention. The feedback loop is broken: customers churn, sales ignores it.",
  "We run 6 microservices but they share a single database. The data service is a hub with 14 inbound connections and 3 outbound. Any change cascades unpredictably.",
];

export function SystemUploadSection() {
  const [activeType, setActiveType] = useState(0);
  const [input, setInput] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | {
    vector: string;
    match: string;
    score: number;
  }>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleAnalyze() {
    if (!input.trim()) return;
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        vector: "S = (F:0.73, C:0.41, A:0.29, R:0.61)",
        match: "Centralized neural ganglion — high hub dependency",
        score: 87,
      });
    }, 2400);
  }

  return (
    <section
      id="upload"
      className="py-32 px-6"
    >
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
            the state vector S, and retrieves the closest biological analogue.
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
                    color:
                      activeType === i
                        ? "var(--primary)"
                        : "var(--text-secondary)",
                    borderColor:
                      activeType === i ? "var(--primary)" : "transparent",
                    background:
                      activeType === i ? "rgba(39,245,163,0.04)" : "transparent",
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
                borderColor: input
                  ? "rgba(39,245,163,0.3)"
                  : "rgba(255,255,255,0.07)",
                color: "var(--text-primary)",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.82rem",
              }}
            />

            {/* Example prompts */}
            <div className="mt-3 flex flex-wrap gap-2">
              <span
                className="text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
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

          {/* Result */}
          {(analyzing || result) && (
            <div
              className="mx-6 mb-6 rounded-lg border p-5"
              style={{
                background: "rgba(10,13,18,0.6)",
                borderColor: "rgba(39,245,163,0.2)",
              }}
            >
              {analyzing ? (
                <div className="flex flex-col gap-3">
                  <LoadingBar label="Parsing graph G(V,E)" delay={0} />
                  <LoadingBar label="Computing state vector S" delay={400} />
                  <LoadingBar label="Retrieving biological analogues" delay={900} />
                  <LoadingBar label="Scoring candidates B = {b1...bn}" delay={1500} />
                </div>
              ) : result ? (
                <div className="grid sm:grid-cols-3 gap-5">
                  <div>
                    <div
                      className="font-mono-bio text-xs mb-1"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      STATE VECTOR
                    </div>
                    <div
                      className="font-mono-bio text-sm"
                      style={{ color: "var(--primary)" }}
                    >
                      {result.vector}
                    </div>
                  </div>
                  <div>
                    <div
                      className="font-mono-bio text-xs mb-1"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      BIOLOGICAL MATCH
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {result.match}
                    </div>
                  </div>
                  <div>
                    <div
                      className="font-mono-bio text-xs mb-1"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      SIMILARITY SCORE
                    </div>
                    <div
                      className="font-semibold text-2xl"
                      style={{ color: "var(--primary)" }}
                    >
                      {result.score}%
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
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
