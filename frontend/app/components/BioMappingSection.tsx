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

// ---- Morphing graph --------------------------------------------------------

const orgNodes = [
  { x: 0.5,  y: 0.08, label: "CEO" },
  { x: 0.2,  y: 0.32, label: "Product" },
  { x: 0.5,  y: 0.32, label: "Engineering" },
  { x: 0.8,  y: 0.32, label: "Sales" },
  { x: 0.15, y: 0.62, label: "API" },
  { x: 0.5,  y: 0.68, label: "Data" },
  { x: 0.82, y: 0.62, label: "CRM" },
];
const orgEdges = [
  [0,1],[0,2],[0,3],[1,4],[2,4],[2,5],[3,6],[4,5],
];

const bioNodes = [
  { x: 0.5,  y: 0.08, label: "Cortex" },
  { x: 0.22, y: 0.3,  label: "Dendrite A" },
  { x: 0.5,  y: 0.28, label: "Axon Hub" },
  { x: 0.78, y: 0.3,  label: "Dendrite B" },
  { x: 0.3,  y: 0.62, label: "Synapse" },
  { x: 0.5,  y: 0.72, label: "Nucleus" },
  { x: 0.72, y: 0.62, label: "Receptor" },
];
const bioEdges = [
  [0,1],[0,2],[0,3],[1,4],[2,4],[2,5],[3,6],[4,5],[5,6],[6,2],
];

function MorphingGraph({ mode }: { mode: "org" | "bio" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const progressRef = useRef(mode === "org" ? 0 : 1);
  const targetRef = useRef(mode === "org" ? 0 : 1);

  useEffect(() => {
    targetRef.current = mode === "org" ? 0 : 1;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    function resize() {
      canvas!.width = canvas!.offsetWidth * dpr;
      canvas!.height = canvas!.offsetHeight * dpr;
      ctx!.scale(dpr, dpr);
    }
    resize();
    const W = () => canvas!.offsetWidth;
    const H = () => canvas!.offsetHeight;

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function draw(t: number) {
      const w = W();
      const h = H();
      ctx!.clearRect(0, 0, w, h);

      // Ease progress toward target
      const prog = progressRef.current;
      progressRef.current += (targetRef.current - prog) * 0.04;
      const p = progressRef.current;

      // Interpolated nodes
      const count = Math.min(orgNodes.length, bioNodes.length);
      const nodes = Array.from({ length: count }, (_, i) => ({
        x: lerp(orgNodes[i].x, bioNodes[i].x, p) * w,
        y: lerp(orgNodes[i].y, bioNodes[i].y, p) * h,
        label: p < 0.5 ? orgNodes[i].label : bioNodes[i].label,
      }));

      // Blend edges: org=blue, bio=green
      const blueAlpha = (1 - p) * 0.7 + 0.05;
      const greenAlpha = p * 0.7 + 0.05;

      // Draw org edges (fading out)
      if (blueAlpha > 0.08) {
        orgEdges.forEach(([from, to]) => {
          const fp = nodes[from], tp = nodes[to];
          if (!fp || !tp) return;
          ctx!.strokeStyle = `rgba(59,130,246,${blueAlpha * 0.6})`;
          ctx!.lineWidth = 1;
          ctx!.setLineDash([4, 4]);
          ctx!.lineDashOffset = -(t / 40) % 8;
          ctx!.beginPath();
          ctx!.moveTo(fp.x, fp.y);
          ctx!.lineTo(tp.x, tp.y);
          ctx!.stroke();
          ctx!.setLineDash([]);
        });
      }

      // Draw bio edges (fading in)
      if (greenAlpha > 0.08) {
        bioEdges.forEach(([from, to], ei) => {
          const fp = nodes[Math.min(from, count-1)];
          const tp = nodes[Math.min(to, count-1)];
          if (!fp || !tp) return;
          const alpha = greenAlpha * (0.5 + 0.3 * Math.sin(t / 900 + ei * 0.5));
          ctx!.strokeStyle = `rgba(39,245,163,${alpha})`;
          ctx!.lineWidth = 1.2;
          ctx!.setLineDash([]);
          ctx!.beginPath();
          ctx!.moveTo(fp.x, fp.y);
          ctx!.lineTo(tp.x, tp.y);
          ctx!.stroke();

          // Pulse on bio edges
          if (p > 0.3) {
            const prog2 = (t / 1400 + ei * 0.31) % 1;
            const px = fp.x + (tp.x - fp.x) * prog2;
            const py = fp.y + (tp.y - fp.y) * prog2;
            const grd = ctx!.createRadialGradient(px, py, 0, px, py, 5);
            grd.addColorStop(0, `rgba(39,245,163,${p * 0.8})`);
            grd.addColorStop(1, "transparent");
            ctx!.fillStyle = grd;
            ctx!.beginPath();
            ctx!.arc(px, py, 5, 0, Math.PI * 2);
            ctx!.fill();
          }
        });
      }

      // Draw interpolated nodes
      nodes.forEach((node, i) => {
        const pulse = 0.85 + 0.15 * Math.sin(t / 800 + i * 1.1);
        const r = 16;

        // Blend color: blue → green
        const rb = Math.round(lerp(59, 39, p));
        const gb = Math.round(lerp(130, 245, p));
        const bb = Math.round(lerp(246, 163, p));
        const col = `${rb},${gb},${bb}`;

        const grd = ctx!.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 2.5);
        grd.addColorStop(0, `rgba(${col},${0.2 * pulse})`);
        grd.addColorStop(1, "transparent");
        ctx!.fillStyle = grd;
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, r * 2.5, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.strokeStyle = `rgba(${col},${0.8 * pulse})`;
        ctx!.lineWidth = 1.3;
        ctx!.fillStyle = "rgba(10,13,18,0.92)";
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.stroke();

        ctx!.fillStyle = `rgba(${col},${0.9 * pulse})`;
        ctx!.font = "500 7px Inter, sans-serif";
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        const lbl = node.label.length > 9 ? node.label.slice(0, 9) : node.label;
        ctx!.fillText(lbl, node.x, node.y);
      });
    }

    function loop(ts: number) {
      draw(ts);
      frameRef.current = requestAnimationFrame(loop);
    }
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}

// ---- Section ----------------------------------------------------------------

export function BioMappingSection() {
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [graphMode, setGraphMode] = useState<"org" | "bio">("org");

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

          {/* Right: morphing graph + mapping table */}
          <div className="flex flex-col gap-4">
            {/* Mode toggle */}
            <div className="flex items-center gap-0 rounded-lg overflow-hidden border self-start"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              {(["org", "bio"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setGraphMode(m)}
                  className="px-4 py-2 text-xs font-medium transition-all"
                  style={{
                    background: graphMode === m
                      ? m === "org" ? "rgba(59,130,246,0.15)" : "rgba(39,245,163,0.12)"
                      : "transparent",
                    color: graphMode === m
                      ? m === "org" ? "var(--secondary)" : "var(--primary)"
                      : "var(--text-secondary)",
                    borderRight: m === "org" ? "1px solid rgba(255,255,255,0.08)" : undefined,
                  }}
                >
                  {m === "org" ? "ORG MODE" : "BIO MODE"}
                </button>
              ))}
            </div>

            {/* Graph canvas */}
            <div
              className="rounded-xl border overflow-hidden"
              style={{
                borderColor: graphMode === "org"
                  ? "rgba(59,130,246,0.2)"
                  : "rgba(39,245,163,0.2)",
                background: "rgba(10,13,18,0.7)",
                height: 260,
              }}
            >
              <MorphingGraph mode={graphMode} />
            </div>

            {/* Mapping table */}
            <div className="flex flex-col gap-1.5">
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
                  <div className="flex items-center px-4 py-2.5 gap-4">
                    <span
                      className="text-xs font-medium flex-1"
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
                      className="text-xs font-medium flex-1 text-right"
                      style={{ color: "var(--primary)" }}
                    >
                      {row.biological}
                    </span>
                  </div>
                  {activeRow === i && (
                    <div
                      className="px-4 pb-2.5 border-t"
                      style={{ borderColor: "rgba(39,245,163,0.1)" }}
                    >
                      <p
                        className="text-xs mt-1.5 leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {row.desc}
                      </p>
                      <span
                        className="font-mono-bio text-xs mt-1 inline-block"
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
      </div>
    </section>
  );
}
