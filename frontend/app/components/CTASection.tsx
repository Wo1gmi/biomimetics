"use client";

export function CTASection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(39,245,163,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span
          className="font-mono-bio text-xs tracking-[0.25em] uppercase"
          style={{ color: "var(--primary)" }}
        >
          Structural Intelligence Layer
        </span>

        <h2
          className="mt-5 font-semibold leading-tight"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            color: "var(--text-primary)",
          }}
        >
          Your organization has a
          <br />
          <span className="shimmer-text">biological equivalent</span>
        </h2>

        <p
          className="mt-6 max-w-xl mx-auto text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Submit your system description. Receive the structural vector, the
          biological analogue, and a transformation roadmap — without a sales
          call.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a
            href="#upload"
            className="px-10 py-4 rounded-full font-medium transition-all"
            style={{
              background: "var(--primary)",
              color: "#0A0D12",
              fontSize: "0.95rem",
            }}
          >
            Analyze your system →
          </a>
          <a
            href="mailto:apelsinmiau@gmail.com"
            className="px-10 py-4 rounded-full font-medium border transition-all"
            style={{
              borderColor: "rgba(255,255,255,0.12)",
              color: "var(--text-secondary)",
              fontSize: "0.95rem",
            }}
          >
            Request a deep audit
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          {[
            { label: "This is not", items: ["Management consulting", "AI assistant", "BI analytics"] },
            { label: "This is", items: ["Structural transformation", "Biological-grade validation", "Formal optimization model"] },
            { label: "Output", items: ["State vector S=(F,C,A,R)", "Biological analogue match", "Transformation plan T: S→S'"] },
          ].map((col, i) => (
            <div key={i} className="text-left">
              <div
                className="font-mono-bio text-xs tracking-wider mb-3"
                style={{
                  color: i === 0 ? "var(--error)" : i === 1 ? "var(--primary)" : "var(--secondary)",
                }}
              >
                {col.label}
              </div>
              <div className="flex flex-col gap-1.5">
                {col.items.map((item, j) => (
                  <div
                    key={j}
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NavBar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b"
      style={{
        background: "rgba(10,13,18,0.85)",
        borderColor: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full animate-bio-pulse"
          style={{ background: "var(--primary)" }}
        />
        <span
          className="font-mono-bio text-sm font-medium tracking-wide"
          style={{ color: "var(--text-primary)" }}
        >
          BioMimetic Insight
        </span>
      </div>

      <div className="hidden md:flex items-center gap-7">
        {["problem", "mapping", "upload", "cases", "metrics"].map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className="text-xs capitalize transition-colors hover:opacity-100"
            style={{ color: "var(--text-secondary)", opacity: 0.8 }}
          >
            {id === "mapping" ? "bio mapping" : id}
          </a>
        ))}
      </div>

      <a
        href="#upload"
        className="px-4 py-2 rounded-full text-xs font-medium transition-all border"
        style={{
          borderColor: "rgba(39,245,163,0.3)",
          color: "var(--primary)",
          background: "rgba(39,245,163,0.06)",
        }}
      >
        Analyze system
      </a>
    </nav>
  );
}

export function Footer() {
  return (
    <footer
      className="py-8 px-6 border-t"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <span
          className="font-mono-bio text-xs"
          style={{ color: "var(--text-secondary)" }}
        >
          BioMimetic Insight — Structural Intelligence Layer
        </span>
        <span
          className="font-mono-bio text-xs"
          style={{ color: "var(--text-secondary)" }}
        >
          φ: S → B · T: S → S&apos;
        </span>
      </div>
    </footer>
  );
}
