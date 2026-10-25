import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const INTRO_KEY = "tensra-intro-seen";

/**
 * Scroll/mount reveal wrapper. Elements start slightly translated and faded,
 * then settle once they enter the viewport (once only). While the intro
 * loader is playing (`html.intro-playing`), reveals wait for the curtain.
 */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      data-visible={visible ? "true" : "false"}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

const INTRO_BLOCKS: Array<{ x: number; y: number; fill: string }> = [
  { x: 2, y: 2, fill: "#d9dadf" },
  { x: 31, y: 2, fill: "#d9dadf" },
  { x: 60, y: 2, fill: "#d9dadf" },
  { x: 89, y: 2, fill: "#d9dadf" },
  { x: 31, y: 31, fill: "#1ac5ff" },
  { x: 31, y: 60, fill: "#9aa4bd" },
  { x: 31, y: 89, fill: "#c7cdd9" },
];

/**
 * First-visit intro: the Tensra mark assembles block by block, the wordmark
 * settles, then the curtain fades to the page. Plays once per browser
 * session; respects prefers-reduced-motion via CSS.
 */
export function IntroLoader() {
  const [phase, setPhase] = useState<"hidden" | "showing" | "exiting">("hidden");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;
    document.documentElement.classList.add("intro-playing");
    setPhase("showing");
    const t1 = window.setTimeout(() => setPhase("exiting"), 1500);
    const t2 = window.setTimeout(() => {
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        /* private mode: intro simply replays next visit */
      }
      document.documentElement.classList.remove("intro-playing");
      setPhase("hidden");
    }, 2050);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.documentElement.classList.remove("intro-playing");
    };
  }, []);

  useEffect(() => {
    if (phase !== "showing") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "intro-overlay fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-2 transition-opacity duration-500",
        phase === "exiting" && "pointer-events-none opacity-0",
      )}
    >
      <svg viewBox="0 0 120 120" className="size-20 md:size-24">
        {INTRO_BLOCKS.map((b, i) => (
          <rect
            key={`${b.x}-${b.y}`}
            x={b.x}
            y={b.y}
            width="24"
            height="24"
            rx="5"
            fill={b.fill}
            className="intro-block"
            style={{ animationDelay: `${i * 85}ms` }}
          />
        ))}
      </svg>
      <div className="intro-word mt-7 text-2xl font-semibold tracking-tight text-white" style={{ animationDelay: "640ms" }}>
        Tensra AI
      </div>
      <div className="intro-line mt-4 h-px w-40 bg-signal" style={{ animationDelay: "520ms" }} />
    </div>
  );
}
