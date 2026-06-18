"use client";

import { useEffect, useRef } from "react";

const problems = [
  {
    title: "Overloaded hierarchies",
    description:
      "Org structures that collapse under their own coordination cost. Every decision travels upward, losing signal.",
    metric: "87%",
    metricLabel: "of enterprises report structural bottlenecks",
    color: "var(--error)",
  },
  {
    title: "Cyclic dependencies",
    description:
      "Feedback loops that amplify noise. Teams waiting on teams, systems blocking systems — entropy compounds.",
    metric: "3.4×",
    metricLabel: "mean time to decision in rigid structures",
    color: "var(--warning)",
  },
  {
    title: "Conflicting KPI loops",
    description:
      "Local optimization destroying global coherence. Departments maximizing their own metrics while the whole degrades.",
    metric: "61%",
    metricLabel: "of cross-team initiatives fail due to misaligned incentives",
    color: "var(--secondary)",
  },
];

export function ProblemSection() {
  return (
    <section id="problem" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span
            className="font-mono-bio text-xs tracking-[0.2em] uppercase"
            style={{ color: "var(--primary)" }}
          >
            The structural failure modes
          </span>
          <h2
            className="mt-3 font-semibold leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "var(--text-primary)" }}
          >
            Why organizations break
            <br />
            <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>
              before the market does
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {problems.map((p, i) => (
            <ProblemCard key={i} {...p} index={i} />
          ))}
        </div>

        <EntropyVisualizer />
      </div>
    </section>
  );
}

function ProblemCard({
  title,
  description,
  metric,
  metricLabel,
  color,
  index,
}: (typeof problems)[0] & { index: number }) {
  return (
    <div
      className="rounded-xl p-6 flex flex-col gap-4 border transition-all hover:border-opacity-30"
      style={{
        background: "var(--surface)",
        borderColor: `${color}22`,
        borderWidth: 1,
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-2 h-2 rounded-full mt-1.5 shrink-0"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        />
        <h3
          className="font-medium leading-tight"
          style={{ color: "var(--text-primary)", fontSize: "0.95rem" }}
        >
          {title}
        </h3>
      </div>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {description}
      </p>
      <div className="mt-auto pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="font-semibold" style={{ color, fontSize: "1.6rem" }}>
          {metric}
        </div>
        <div
          className="text-xs mt-0.5"
          style={{ color: "var(--text-secondary)" }}
        >
          {metricLabel}
        </div>
      </div>
    </div>
  );
}

function EntropyVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

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

    // Generate chaotic nodes
    const nodes = Array.from({ length: 28 }, (_, i) => ({
      x: 60 + Math.random() * (W - 120),
      y: 30 + Math.random() * (H - 60),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      heat: Math.random(),
    }));

    function draw(t: number) {
      ctx!.clearRect(0, 0, W, H);

      // Update positions
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 40 || n.x > W - 40) n.vx *= -1;
        if (n.y < 20 || n.y > H - 20) n.vy *= -1;
      });

      // Draw edges between close nodes (chaos heatmap)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const heat = (1 - dist / 120) * ((nodes[i].heat + nodes[j].heat) / 2);
            const phase = Math.sin(t / 1200 + i + j);
            const r = Math.floor(255 * heat);
            const g = Math.floor(40 * (1 - heat));
            ctx!.strokeStyle = `rgba(${r}, ${g}, 40, ${heat * 0.4 + 0.05 + 0.05 * phase})`;
            ctx!.lineWidth = heat * 1.5;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        const r = 3 + n.heat * 3;
        const pulse = 0.7 + 0.3 * Math.sin(t / 700 + n.x);
        const red = Math.floor(255 * n.heat);
        const grn = Math.floor(60 * (1 - n.heat));
        ctx!.fillStyle = `rgba(${red}, ${grn}, 40, ${0.7 * pulse})`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx!.fill();
      });

      // Overlay labels
      ctx!.fillStyle = "rgba(240,244,248,0.12)";
      ctx!.font = "400 11px 'IBM Plex Mono', monospace";
      ctx!.textAlign = "left";
      ctx!.fillText("entropy(S) = high", 20, H - 16);
      ctx!.textAlign = "right";
      ctx!.fillStyle = "rgba(255,77,77,0.5)";
      ctx!.fillText("STRUCTURAL FAILURE", W - 20, H - 16);
    }

    function loop(ts: number) {
      draw(ts);
      frameRef.current = requestAnimationFrame(loop);
    }

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div
      className="rounded-xl overflow-hidden border"
      style={{
        borderColor: "rgba(255,77,77,0.15)",
        background: "var(--surface)",
      }}
    >
      <div
        className="flex items-center justify-between px-5 py-3 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <span
          className="font-mono-bio text-xs tracking-wider"
          style={{ color: "var(--error)", opacity: 0.8 }}
        >
          ENTROPY VISUALIZATION — FLOW CHAOS DENSITY
        </span>
        <span
          className="font-mono-bio text-xs"
          style={{ color: "var(--text-secondary)" }}
        >
          live simulation
        </span>
      </div>
      <canvas ref={canvasRef} className="w-full" style={{ height: 200 }} />
    </div>
  );
}
