"use client";

import { useEffect, useRef } from "react";

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  type: "entity" | "service" | "team";
}

interface Edge {
  from: string;
  to: string;
}

interface BioNode {
  id: string;
  x: number;
  y: number;
  label: string;
  radius: number;
}

interface BioEdge {
  from: string;
  to: string;
  weight: number;
}

const businessNodes: Node[] = [
  { id: "ceo", x: 200, y: 60, label: "CEO", type: "entity" },
  { id: "product", x: 100, y: 140, label: "Product", type: "team" },
  { id: "eng", x: 200, y: 140, label: "Engineering", type: "team" },
  { id: "sales", x: 300, y: 140, label: "Sales", type: "team" },
  { id: "api", x: 130, y: 220, label: "API", type: "service" },
  { id: "db", x: 200, y: 240, label: "Data", type: "service" },
  { id: "crm", x: 290, y: 220, label: "CRM", type: "service" },
];

const businessEdges: Edge[] = [
  { from: "ceo", to: "product" },
  { from: "ceo", to: "eng" },
  { from: "ceo", to: "sales" },
  { from: "product", to: "api" },
  { from: "eng", to: "api" },
  { from: "eng", to: "db" },
  { from: "sales", to: "crm" },
  { from: "api", to: "db" },
];

const bioNodes: BioNode[] = [
  { id: "n1", x: 200, y: 55, label: "Cortex", radius: 18 },
  { id: "n2", x: 110, y: 130, label: "Dendrite A", radius: 12 },
  { id: "n3", x: 200, y: 130, label: "Axon Hub", radius: 15 },
  { id: "n4", x: 300, y: 130, label: "Dendrite B", radius: 12 },
  { id: "n5", x: 140, y: 215, label: "Synapse", radius: 9 },
  { id: "n6", x: 200, y: 235, label: "Nucleus", radius: 11 },
  { id: "n7", x: 275, y: 215, label: "Receptor", radius: 9 },
];

const bioEdges: BioEdge[] = [
  { from: "n1", to: "n2", weight: 0.9 },
  { from: "n1", to: "n3", weight: 1.0 },
  { from: "n1", to: "n4", weight: 0.7 },
  { from: "n2", to: "n5", weight: 0.8 },
  { from: "n3", to: "n5", weight: 0.6 },
  { from: "n3", to: "n6", weight: 0.9 },
  { from: "n4", to: "n7", weight: 0.8 },
  { from: "n5", to: "n6", weight: 0.7 },
];

function getNodeById(nodes: Node[], id: string) {
  return nodes.find((n) => n.id === id);
}

function getBioNodeById(nodes: BioNode[], id: string) {
  return nodes.find((n) => n.id === id);
}

export function BusinessGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

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

    const scaleX = (W - 40) / 400;
    const scaleY = (H - 40) / 300;

    function sx(x: number) {
      return 20 + x * scaleX;
    }
    function sy(y: number) {
      return 20 + y * scaleY;
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, W, H);

      // Draw edges
      businessEdges.forEach((edge) => {
        const from = getNodeById(businessNodes, edge.from)!;
        const to = getNodeById(businessNodes, edge.to)!;
        const phase = (t / 1200 + (from.x + to.x) / 600) % 1;
        const alpha = 0.15 + 0.1 * Math.sin(phase * Math.PI * 2);

        ctx!.strokeStyle = `rgba(59, 130, 246, ${alpha + 0.25})`;
        ctx!.lineWidth = 1;
        ctx!.setLineDash([5, 5]);
        ctx!.lineDashOffset = -(t / 30) % 10;
        ctx!.beginPath();
        ctx!.moveTo(sx(from.x), sy(from.y));
        ctx!.lineTo(sx(to.x), sy(to.y));
        ctx!.stroke();
        ctx!.setLineDash([]);
      });

      // Draw nodes
      businessNodes.forEach((node, i) => {
        const pulse = 0.8 + 0.2 * Math.sin(t / 900 + i * 1.1);
        const r = node.type === "entity" ? 14 : node.type === "team" ? 11 : 8;

        const grd = ctx!.createRadialGradient(sx(node.x), sy(node.y), 0, sx(node.x), sy(node.y), r * 2);
        grd.addColorStop(0, `rgba(59, 130, 246, ${0.25 * pulse})`);
        grd.addColorStop(1, "transparent");
        ctx!.fillStyle = grd;
        ctx!.beginPath();
        ctx!.arc(sx(node.x), sy(node.y), r * 2, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.strokeStyle = `rgba(59, 130, 246, ${0.7 * pulse})`;
        ctx!.lineWidth = 1.5;
        ctx!.fillStyle = "rgba(16, 20, 28, 0.9)";
        ctx!.beginPath();
        ctx!.arc(sx(node.x), sy(node.y), r, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.stroke();

        ctx!.fillStyle = `rgba(240, 244, 248, ${0.7 * pulse})`;
        ctx!.font = `${node.type === "entity" ? 600 : 400} ${node.type === "entity" ? 9 : 8}px Inter, sans-serif`;
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillText(node.label, sx(node.x), sy(node.y));
      });
    }

    function loop(ts: number) {
      timeRef.current = ts;
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

export function BioGraph() {
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

    const scaleX = (W - 40) / 400;
    const scaleY = (H - 40) / 300;

    function sx(x: number) {
      return 20 + x * scaleX;
    }
    function sy(y: number) {
      return 20 + y * scaleY;
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, W, H);

      // Draw edges with signal pulses
      bioEdges.forEach((edge) => {
        const from = getBioNodeById(bioNodes, edge.from)!;
        const to = getBioNodeById(bioNodes, edge.to)!;
        const phase = (t / 1000 + (from.x + to.x) / 500) % 1;
        const alpha = (0.3 + 0.15 * Math.sin(phase * Math.PI * 2)) * edge.weight;

        // Base line
        ctx!.strokeStyle = `rgba(39, 245, 163, ${alpha * 0.5})`;
        ctx!.lineWidth = edge.weight * 1.5;
        ctx!.beginPath();
        ctx!.moveTo(sx(from.x), sy(from.y));
        ctx!.lineTo(sx(to.x), sy(to.y));
        ctx!.stroke();

        // Travelling pulse
        const prog = (t / 1600 + (from.id.charCodeAt(0) + to.id.charCodeAt(0)) / 200) % 1;
        const px = sx(from.x) + (sx(to.x) - sx(from.x)) * prog;
        const py = sy(from.y) + (sy(to.y) - sy(from.y)) * prog;
        const grd = ctx!.createRadialGradient(px, py, 0, px, py, 6);
        grd.addColorStop(0, `rgba(39, 245, 163, ${0.8 * edge.weight})`);
        grd.addColorStop(1, "transparent");
        ctx!.fillStyle = grd;
        ctx!.beginPath();
        ctx!.arc(px, py, 6, 0, Math.PI * 2);
        ctx!.fill();
      });

      // Draw nodes
      bioNodes.forEach((node, i) => {
        const pulse = 0.8 + 0.2 * Math.sin(t / 800 + i * 0.9);
        const r = node.radius * scaleX * 1.2;

        // Outer glow
        const grd = ctx!.createRadialGradient(sx(node.x), sy(node.y), 0, sx(node.x), sy(node.y), r * 3);
        grd.addColorStop(0, `rgba(39, 245, 163, ${0.2 * pulse})`);
        grd.addColorStop(1, "transparent");
        ctx!.fillStyle = grd;
        ctx!.beginPath();
        ctx!.arc(sx(node.x), sy(node.y), r * 3, 0, Math.PI * 2);
        ctx!.fill();

        // Node body
        ctx!.strokeStyle = `rgba(39, 245, 163, ${0.8 * pulse})`;
        ctx!.lineWidth = 1.5;
        ctx!.fillStyle = "rgba(10, 13, 18, 0.95)";
        ctx!.beginPath();
        ctx!.arc(sx(node.x), sy(node.y), r, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.stroke();

        // Label
        ctx!.fillStyle = `rgba(39, 245, 163, ${0.8 * pulse})`;
        ctx!.font = `400 7.5px 'IBM Plex Mono', monospace`;
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillText(node.label, sx(node.x), sy(node.y));
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
