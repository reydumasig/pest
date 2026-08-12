import { useRef, useState } from 'react';

const W = 520;
const H = 220;
const PAD_L = 42;
const PAD_R = 16;
const PAD_T = 18;
const PAD_B = 30;
const PLOT_W = W - PAD_L - PAD_R;
const PLOT_H = H - PAD_T - PAD_B;

export default function LineChart({ series, labels, surfaceVar = 'var(--surface-1)' }) {
  const [hoverIdx, setHoverIdx] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ left: 0, top: 0 });
  const wrapRef = useRef(null);
  const svgRef = useRef(null);

  const allVals = series.flatMap((s) => s.values);
  const min = Math.min(0, ...allVals);
  let max = Math.max(...allVals);
  if (max === min) max = min + 1;
  const niceMax = Math.ceil((max * 1.15) / 5) * 5 || max * 1.15;

  const stepX = PLOT_W / (labels.length - 1);
  const xFor = (i) => PAD_L + i * stepX;
  const yFor = (v) => PAD_T + PLOT_H - ((v - min) / (niceMax - min)) * PLOT_H;

  const gridTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    y: PAD_T + PLOT_H * t,
    val: Math.round(niceMax - t * (niceMax - min)),
  }));

  function handleHover(i) {
    const svg = svgRef.current;
    const wrap = wrapRef.current;
    if (!svg || !wrap) return;
    const svgRect = svg.getBoundingClientRect();
    const wrapRect = wrap.getBoundingClientRect();
    const scale = Math.min(svgRect.width / W, svgRect.height / H);
    const offsetX = (svgRect.width - W * scale) / 2;
    const offsetY = (svgRect.height - H * scale) / 2;
    const left = svgRect.left - wrapRect.left + offsetX + xFor(i) * scale;
    const top = svgRect.top - wrapRect.top + offsetY + PAD_T * scale - 6;
    setTooltipPos({ left, top });
    setHoverIdx(i);
  }

  return (
    <div className="linechart-wrap" ref={wrapRef}>
      {series.length > 1 && (
        <div className="legend">
          {series.map((s) => (
            <div className="item" key={s.name}>
              <span className="swatch" style={{ background: s.colorVar }} />
              {s.name}
            </div>
          ))}
        </div>
      )}

      <svg
        ref={svgRef}
        className="linechart"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {gridTicks.map((g, i) => (
          <g key={i}>
            <line className="grid-line" x1={PAD_L} x2={W - PAD_R} y1={g.y} y2={g.y} />
            <text className="axis-text" x={PAD_L - 8} y={g.y + 3} textAnchor="end">
              {g.val.toLocaleString()}
            </text>
          </g>
        ))}

        {series.map((s) => {
          const pts = s.values.map((v, i) => [xFor(i), yFor(v)]);
          const d = pts
            .map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1))
            .join(' ');
          const lastPt = pts[pts.length - 1];
          const lastVal = s.values[s.values.length - 1];
          return (
            <g key={s.name}>
              <path
                d={d}
                fill="none"
                style={{ stroke: s.colorVar }}
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {pts.map((p, i) => (
                <circle
                  key={i}
                  cx={p[0]}
                  cy={p[1]}
                  r="4"
                  style={{ fill: s.colorVar, stroke: surfaceVar }}
                  strokeWidth="2"
                />
              ))}
              <text
                className="end-label"
                x={Math.min(lastPt[0] + 6, W - PAD_R - 30)}
                y={lastPt[1] - 10}
              >
                {s.fmt ? s.fmt(lastVal) : lastVal}
              </text>
            </g>
          );
        })}

        {labels.map((l, i) => (
          <text key={l} className="axis-text" x={xFor(i)} y={H - 8} textAnchor="middle">
            {l}
          </text>
        ))}

        {labels.map((l, i) => {
          const x0 = i === 0 ? PAD_L : (xFor(i - 1) + xFor(i)) / 2;
          const x1 = i === labels.length - 1 ? W - PAD_R : (xFor(i) + xFor(i + 1)) / 2;
          return (
            <rect
              key={l}
              className="hover-target"
              x={x0}
              y={PAD_T}
              width={x1 - x0}
              height={PLOT_H}
              onMouseEnter={() => handleHover(i)}
              onMouseLeave={() => setHoverIdx(null)}
            />
          );
        })}
      </svg>

      {hoverIdx !== null && (
        <div
          className="chart-tooltip show"
          style={{ left: `${tooltipPos.left}px`, top: `${tooltipPos.top}px` }}
        >
          <strong>{labels[hoverIdx]}</strong>
          {series.map((s) => (
            <div key={s.name}>
              {s.name}: {s.fmt ? s.fmt(s.values[hoverIdx]) : s.values[hoverIdx]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
