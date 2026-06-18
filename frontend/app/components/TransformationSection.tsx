"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";

const caseTransformations = [
  {
    id: "saas",
    label: "SaaS scaling",
    before: {
      title: "Monolithic decision hub",
      nodes: ["CEO", "VP Eng", "Architect", "Squad A", "Squad B", "Squad C"],
      edges: [
        [0, 1], [1, 2], [2, 3], [2, 4], [2, 5],
      ],
      issue: "Single architect node has 4 inbound + 3 outbound dependencies. Coordination cost = 87% of sprint capacity.",
      entropy: 0.82,
    },
    after: {
      title: "Neural pruning model",
      nodes: ["Cortex", "Axon A", "Axon B", "Axon C", "Terminal A", "Terminal B"],
      edges: [
        [0, 1], [0, 2], [0, 3], [1, 4], [2, 4], [3, 5], [1, 5],
      ],
      model: "Distributed axonal transmission — each squad carries its own conduction pathway.",
      entropy: 0.31,
    },
    delta: { ent: -62, coord: -74, adapt: +210 },
  },
  {
    id: "hr",
    label: "HR inefficiency",
    before: {
      title: "Siloed HR cascade",
      nodes: ["CHRO", "Talent", "L&D", "Payroll", "Ops", "Finance"],
      edges: [[0, 1], [0, 2], [0, 3], [3, 5], [2, 4]],
      issue: "Learning & Development and Payroll operate in isolated silos. No shared signal about workforce health.",
      entropy: 0.71,
    },
    after: {
      title: "Immune system analog",
      nodes: ["Thymus", "B-cell", "T-cell", "Memory", "Effector", "Feedback"],
      edges: [
        [0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [4, 5], [5, 0],
      ],
      model: "Adaptive immune response: shared memory cells update all branches after each signal event.",
      entropy: 0.28,
    },
    delta: { ent: -61, coord: -55, adapt: +180 },
  },
  {
    id: "retention",
    label: "Product retention",
    before: {
      title: "Broken feedback loop",
      nodes: ["Product", "Growth", "Data", "Sales", "Support", "User"],
      edges: [[0, 1], [1, 3], [3, 5], [5, 4], [4, 2]],
      issue: "User signal reaches Product only through 4 hops with >3 day latency. Churn prediction is impossible.",
      entropy: 0.78,
    },
    after: {
      title: "Metabolic feedback loop",
      nodes: ["Receptor", "Signal", "Nucleus", "Effector", "Membrane", "Output"],
      edges: [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [2, 0],
      ],
      model: "Allosteric regulation: receptor directly gates nucleus. Signal latency < 1 cycle.",
      entropy: 0.24,
    },
    delta: { ent: -69, coord: -60, adapt: +240 },
  },
];

export function TransformationSection() {
  const [active, setActive] = useState(0);
  const tc = caseTransformations[active];

  return (
    <section
      id="transformation"
      className="py-32 px-6"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span
            className="font-mono-bio text-xs tracking-[0.2em] uppercase"
            style={{ color: "var(--primary)" }}
          >
            T: S → S&apos;
          </span>
          <h2
            className="mt-3 font-semibold leading-tight"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              color: "var(--text-primary)",
            }}
          >
            Transformation preview
          </h2>
        </div>

        {/* Case selector */}
        <div className="flex gap-3 mb-10">
          {caseTransformations.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(i)}
              className="px-4 py-2 rounded-full text-sm transition-all border"
              style={{
                background: active === i ? "rgba(39,245,163,0.1)" : "transparent",
                borderColor:
                  active === i ? "rgba(39,245,163,0.4)" : "rgba(255,255,255,0.1)",
                color: active === i ? "var(--primary)" : "var(--text-secondary)",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Before / After */}
        <div className="grid md:grid-cols-[1fr,auto,1fr] gap-6 items-start mb-8">
          <TransformCard mode="before" data={tc.before} />

          <div className="flex flex-col items-center justify-center gap-2 py-8">
            <ArrowRight
              size={24}
              style={{ color: "var(--primary)" }}
            />
            <span
              className="font-mono-bio text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              φ → T
            </span>
          </div>

          <TransformCard mode="after" data={tc.after} />
        </div>

        {/* Delta metrics */}
        <div
          className="rounded-xl border p-6 grid grid-cols-3 gap-6"
          style={{
            background: "rgba(10,13,18,0.5)",
            borderColor: "rgba(39,245,163,0.15)",
          }}
        >
          <DeltaMetric
            label="Structural entropy"
            value={tc.delta.ent}
            unit="%"
            icon={TrendingDown}
            good={true}
          />
          <DeltaMetric
            label="Coordination cost"
            value={tc.delta.coord}
            unit="%"
            icon={TrendingDown}
            good={true}
          />
          <DeltaMetric
            label="Adaptive throughput"
            value={tc.delta.adapt}
            unit="%"
            icon={TrendingUp}
            good={true}
          />
        </div>
      </div>
    </section>
  );
}

function computeGraphLayout(
  nodeCount: number,
  edges: number[][],
  W: number,
  H: number,
  padding = 28
): { x: number; y: number }[] {
  const layers: number[] = new Array(nodeCount).fill(-1);
  layers[0] = 0;
  const queue = [0];
  while (queue.length) {
    const curr = queue.shift()!;
    for (const [from, to] of edges) {
      if (from === curr && layers[to] === -1) {
        layers[to] = layers[curr] + 1;
        queue.push(to);
      }
    }
  }
  const maxL = Math.max(...layers.filter((l) => l >= 0), 0);
  layers.forEach((l, i) => { if (l === -1) layers[i] = maxL + 1; });

  const byLayer: number[][] = [];
  layers.forEach((l, i) => {
    if (!byLayer[l]) byLayer[l] = [];
    byLayer[l].push(i);
  });

  const numLayers = byLayer.length;
  const positions: { x: number; y: number }[] = new Array(nodeCount);
  byLayer.forEach((group, li) => {
    const y =
      numLayers === 1 ? H / 2 : padding + (li / (numLayers - 1)) * (H - 2 * padding);
    group.forEach((nodeIdx, pos) => {
      const x =
        group.length === 1
          ? W / 2
          : padding + (pos / (group.length - 1)) * (W - 2 * padding);
      positions[nodeIdx] = { x, y };
    });
  });
  return positions;
}

function MiniGraph({
  nodes,
  edges,
  mode,
}: {
  nodes: string[];
  edges: number[][];
  mode: "before" | "after";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const isBefore = mode === "before";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;

    const pos = computeGraphLayout(nodes.length, edges, W, H);

    function draw(t: number) {
      ctx!.clearRect(0, 0, W, H);

      // Edges
      edges.forEach(([from, to], ei) => {
        const fp = pos[from];
        const tp = pos[to];
        if (!fp || !tp) return;

        if (isBefore) {
          ctx!.strokeStyle = "rgba(255,77,77,0.35)";
          ctx!.lineWidth = 1;
          ctx!.setLineDash([4, 4]);
          ctx!.lineDashOffset = -(t / 35) % 8;
          ctx!.beginPath();
          ctx!.moveTo(fp.x, fp.y);
          ctx!.lineTo(tp.x, tp.y);
          ctx!.stroke();
          ctx!.setLineDash([]);
        } else {
          const alpha = 0.25 + 0.15 * Math.sin(t / 900 + ei * 0.7);
          ctx!.strokeStyle = `rgba(39,245,163,${alpha})`;
          ctx!.lineWidth = 1.2;
          ctx!.setLineDash([]);
          ctx!.beginPath();
          ctx!.moveTo(fp.x, fp.y);
          ctx!.lineTo(tp.x, tp.y);
          ctx!.stroke();

          // Travelling pulse
          const prog = (t / 1600 + ei * 0.37) % 1;
          const px = fp.x + (tp.x - fp.x) * prog;
          const py = fp.y + (tp.y - fp.y) * prog;
          const grd = ctx!.createRadialGradient(px, py, 0, px, py, 5);
          grd.addColorStop(0, "rgba(39,245,163,0.85)");
          grd.addColorStop(1, "transparent");
          ctx!.fillStyle = grd;
          ctx!.beginPath();
          ctx!.arc(px, py, 5, 0, Math.PI * 2);
          ctx!.fill();
        }
      });

      // Nodes
      pos.forEach((p, i) => {
        if (!p) return;
        const pulse = 0.85 + 0.15 * Math.sin(t / 750 + i * 1.1);
        const r = 13;
        const nodeColor = isBefore ? "255,77,77" : "39,245,163";

        const grd = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2.2);
        grd.addColorStop(0, `rgba(${nodeColor},${0.18 * pulse})`);
        grd.addColorStop(1, "transparent");
        ctx!.fillStyle = grd;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, r * 2.2, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.strokeStyle = `rgba(${nodeColor},${0.75 * pulse})`;
        ctx!.lineWidth = 1.2;
        ctx!.fillStyle = "rgba(10,13,18,0.92)";
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.stroke();

        const label = nodes[i].length > 7 ? nodes[i].slice(0, 7) : nodes[i];
        ctx!.fillStyle = `rgba(${nodeColor},${0.85 * pulse})`;
        ctx!.font = "500 6.5px Inter, sans-serif";
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillText(label, p.x, p.y);
      });
    }

    function loop(ts: number) {
      draw(ts);
      frameRef.current = requestAnimationFrame(loop);
    }
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [nodes, edges, isBefore]);

  return (
    <canvas ref={canvasRef} className="w-full rounded-lg" style={{ height: 150 }} />
  );
}

function TransformCard({
  mode,
  data,
}: {
  mode: "before" | "after";
  data: { title: string; nodes: string[]; edges: number[][]; issue?: string; model?: string; entropy: number };
}) {
  const isBefore = mode === "before";
  const color = isBefore ? "var(--error)" : "var(--primary)";
  const borderColor = isBefore ? "rgba(255,77,77,0.15)" : "rgba(39,245,163,0.2)";

  return (
    <div
      className="rounded-xl border p-5 flex flex-col gap-4"
      style={{ background: "var(--surface-2)", borderColor }}
    >
      <div className="flex items-center justify-between">
        <span
          className="font-mono-bio text-xs tracking-wider"
          style={{ color: isBefore ? "var(--error)" : "var(--primary)" }}
        >
          {isBefore ? "BEFORE" : "AFTER"}
        </span>
        <span
          className="font-mono-bio text-xs px-2 py-0.5 rounded"
          style={{
            color,
            background: isBefore ? "rgba(255,77,77,0.1)" : "rgba(39,245,163,0.1)",
            border: `1px solid ${borderColor}`,
          }}
        >
          entropy = {data.entropy.toFixed(2)}
        </span>
      </div>

      <h3 className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>
        {data.title}
      </h3>

      {/* Canvas graph */}
      <div
        className="rounded-lg overflow-hidden border"
        style={{ borderColor: isBefore ? "rgba(255,77,77,0.1)" : "rgba(39,245,163,0.1)" }}
      >
        <MiniGraph nodes={data.nodes} edges={data.edges} mode={mode} />
      </div>

      <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {data.issue ?? data.model}
      </p>
    </div>
  );
}

function DeltaMetric({
  label,
  value,
  unit,
  icon: Icon,
  good,
}: {
  label: string;
  value: number;
  unit: string;
  icon: React.ElementType;
  good: boolean;
}) {
  const isPositive = value > 0;
  const color = good
    ? isPositive
      ? "var(--primary)"
      : "var(--error)"
    : isPositive
    ? "var(--error)"
    : "var(--primary)";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Icon size={14} style={{ color }} />
        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
          {label}
        </span>
      </div>
      <div className="font-semibold text-2xl" style={{ color }}>
        {isPositive ? "+" : ""}
        {value}
        {unit}
      </div>
    </div>
  );
}
