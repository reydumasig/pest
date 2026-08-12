export default function Sparkline({
  values,
  colorVar = 'var(--accent)',
  surfaceVar = 'var(--surface-1)',
  width = 200,
  height = 28,
  area = false,
  baseline = false,
}) {
  const pad = 4;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = (width - pad * 2) / (values.length - 1);
  const innerH = area ? height - pad * 2 - 6 : height - pad * 2;
  const yOffset = area ? 3 : 0;

  const pts = values.map((v, i) => {
    const x = pad + i * stepX;
    const y = height - pad - ((v - min) / range) * innerH - yOffset;
    return [x, y];
  });

  const path = pts
    .map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1))
    .join(' ');
  const last = pts[pts.length - 1];
  const areaPath = `${path} L${pts[pts.length - 1][0]},${height} L${pts[0][0]},${height} Z`;

  return (
    <svg className="spark" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      {baseline && (
        <line className="grid-line" x1="0" x2={width} y1={height - 3} y2={height - 3} />
      )}
      {area && <path d={areaPath} style={{ fill: colorVar }} opacity="0.1" stroke="none" />}
      <path
        d={path}
        fill="none"
        style={{ stroke: colorVar }}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle
        cx={last[0]}
        cy={last[1]}
        r={area ? 4 : 3}
        style={{ fill: colorVar, stroke: surfaceVar }}
        strokeWidth={area ? 2 : 1.5}
      />
    </svg>
  );
}
