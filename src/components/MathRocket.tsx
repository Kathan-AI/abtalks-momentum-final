import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * A rocket whose entire silhouette is packed with mathematics:
 * matrix grids, linear-algebra notation, a 2x2 confusion matrix and
 * calculus notation — dense, layered, thin glowing linework.
 */

const ROCKET_BODY =
  "M110 4 C138 40 158 92 158 152 L158 252 L62 252 L62 152 C62 92 82 40 110 4 Z";
const FIN_LEFT = "M62 176 L22 254 L22 296 L62 262 Z";
const FIN_RIGHT = "M158 176 L198 254 L198 296 L158 262 Z";

const FORMULA_ROWS = [
  "∂L/∂w = Σᵢ (ŷᵢ−yᵢ)xᵢ",
  "Ax = λx   det(A−λI)=0",
  "u·v = Σ uᵢvᵢ = ‖u‖‖v‖cosθ",
  "∫₀¹ f(x)dx ≈ Σ f(xᵢ)Δx",
  "σ(z)=1/(1+e⁻ᶻ)",
  "∇f = [∂f/∂x, ∂f/∂y]ᵀ",
  "W⁽²⁾h + b   h=ReLU(W⁽¹⁾x)",
  "d/dx eˣ = eˣ",
  "cos θ = (u·v)/(‖u‖‖v‖)",
  "Σₙ₌₁^∞ 1/n² = π²/6",
  "argmin_θ  J(θ)",
  "P(y|x) = P(x|y)P(y)/P(x)",
  "‖Ax−b‖² → min",
  "lim_{h→0} (f(x+h)−f(x))/h",
  "tr(AᵀA) = Σᵢⱼ aᵢⱼ²",
  "softmax(zᵢ)=e^{zᵢ}/Σe^{zⱼ}",
  "∮ F·dr = ∬ (∇×F)·dS",
  "θ ← θ − η∇J(θ)",
  "rank(A) + null(A) = n",
  "∫ x eˣ dx = eˣ(x−1)+C",
  "Q Kᵀ / √dₖ",
  "Var(X)=E[X²]−E[X]²",
  "A = UΣVᵀ",
  "∂²f/∂x∂y = ∂²f/∂y∂x",
];

function MatrixBlock({ x, y, cols, rows }: { x: number; y: number; cols: number; rows: number }) {
  const cw = 13;
  const rh = 12;
  const w = cols * cw;
  const h = rows * rh;
  return (
    <g transform={`translate(${x} ${y})`} stroke="currentColor" fill="none" strokeWidth="0.7">
      <rect x="-5" y="-2" width={w + 10} height={h + 4} fill="oklch(0.19 0.04 264 / 96%)" stroke="none" />
      <path d={`M0 0 h-4 v${h} h4`} />
      <path d={`M${w} 0 h4 v${h} h-4`} />
      {Array.from({ length: rows * cols }).map((_, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        return (
          <text
            key={i}
            x={c * cw + 2}
            y={r * rh + 9}
            fontSize="8"
            stroke="none"
            fill="currentColor"
            fontFamily="ui-monospace, monospace"
          >
            {(i * 7) % 9}
          </text>
        );
      })}
    </g>
  );
}

function ConfusionMatrix({ x, y }: { x: number; y: number }) {
  const cell = 30;
  const labels = ["TP", "FP", "FN", "TN"];
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-3" y="-3" width={cell * 2 + 6} height={cell * 2 + 6} fill="oklch(0.19 0.04 264)" />
      <rect
        width={cell * 2}
        height={cell * 2}
        fill="color-mix(in oklab, var(--momentum) 14%, transparent)"
        stroke="currentColor"
        strokeWidth="0.9"
      />
      <line x1={cell} y1="0" x2={cell} y2={cell * 2} stroke="currentColor" strokeWidth="0.7" />
      <line x1="0" y1={cell} x2={cell * 2} y2={cell} stroke="currentColor" strokeWidth="0.7" />
      {labels.map((l, i) => (
        <text
          key={l}
          x={(i % 2) * cell + cell / 2}
          y={Math.floor(i / 2) * cell + cell / 2 + 3.5}
          fontSize="9"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
        >
          {l}
        </text>
      ))}
    </g>
  );
}

export function MathRocket({ className }: { className?: string }) {
  const uid = useId().replace(/[:]/g, "");
  const clip = `rocket-clip-${uid}`;
  const grad = `rocket-grad-${uid}`;

  return (
    <svg
      viewBox="0 0 220 320"
      className={cn("h-auto w-[240px] max-w-[72vw] overflow-visible", className)}
      role="img"
      aria-label="Rocket constructed from mathematical notation"
    >
      <defs>
        <clipPath id={clip}>
          <path d={ROCKET_BODY} />
          <path d={FIN_LEFT} />
          <path d={FIN_RIGHT} />
        </clipPath>
        <linearGradient id={grad} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="var(--momentum)" />
          <stop offset="100%" stopColor="var(--primary)" />
        </linearGradient>
      </defs>

      {/* dense math fill */}
      <g clipPath={`url(#${clip})`}>
        <rect x="0" y="0" width="220" height="320" fill="oklch(0.22 0.04 264)" />
        <rect x="0" y="0" width="220" height="320" fill={`url(#${grad})`} opacity="0.1" />

        {/* layer: fine grid */}
        <g stroke="var(--primary)" strokeWidth="0.35" opacity="0.35">
          {Array.from({ length: 23 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 14} x2="220" y2={i * 14} />
          ))}
          {Array.from({ length: 17 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 14} y1="0" x2={i * 14} y2="320" />
          ))}
        </g>

        {/* layer: formula rows, packed edge to edge */}
        <g fill="var(--momentum)" opacity="0.85" fontFamily="ui-monospace, monospace">
          {FORMULA_ROWS.map((f, i) => (
            <text key={i} x={i % 2 === 0 ? 4 : -14} y={16 + i * 12.4} fontSize="8.4" letterSpacing="-0.2">
              {f} {f}
            </text>
          ))}
        </g>

        {/* layer: matrices + vectors */}
        <g color="var(--primary)" opacity="0.95">
          <MatrixBlock x={78} y={58} cols={3} rows={3} />
          <MatrixBlock x={26} y={196} cols={2} rows={3} />
          <MatrixBlock x={140} y={206} cols={2} rows={2} />
        </g>

        <g color="var(--momentum)">
          <ConfusionMatrix x={80} y={124} />
        </g>

        {/* layer: vectors / transformations */}
        <g stroke="var(--momentum)" strokeWidth="0.9" fill="none" opacity="0.9">
          <path d="M70 108 l30 -14" markerEnd="" />
          <path d="M96 96 l6 -3 l-5 -3" />
          <path d="M118 190 l28 10" />
          <path d="M142 198 l6 3 l-5 3" />
        </g>
        <g fill="var(--foreground)" fontFamily="ui-monospace, monospace" fontSize="8" opacity="0.9">
          <text x="64" y="116">
            v⃗ = Tu⃗
          </text>
          <text x="112" y="186">
            ∇·F
          </text>
          <text x="30" y="186">
            det(A)
          </text>
          <text x="72" y="238">
            Σ wᵢxᵢ + b
          </text>
          <text x="66" y="286">
            ∫∫ f dA
          </text>
        </g>
      </g>

      {/* silhouette outline */}
      <g fill="none" stroke={`url(#${grad})`} strokeWidth="1.6" strokeLinejoin="round">
        <path d={ROCKET_BODY} />
        <path d={FIN_LEFT} />
        <path d={FIN_RIGHT} />
        <path d="M62 152 h96" strokeWidth="0.9" opacity="0.7" />
        <path d="M62 214 h96" strokeWidth="0.9" opacity="0.7" />
      </g>
    </svg>
  );
}
