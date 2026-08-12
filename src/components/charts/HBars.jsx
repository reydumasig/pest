export default function HBars({ items, colorVar = 'var(--accent)' }) {
  const max = Math.max(...items.map((d) => d.value));

  return (
    <div className="hbars">
      {items.map((d) => {
        const pct = Math.max(3, (d.value / max) * 100);
        return (
          <div className="hbar-row" key={d.label}>
            <span className="hlabel" title={d.label}>{d.label}</span>
            <div className="hbar-track">
              <div
                className="hbar-fill"
                style={{ width: `${pct}%`, background: d.colorVar || colorVar }}
              />
            </div>
            <span className="hval">{d.display ?? d.value.toLocaleString()}</span>
          </div>
        );
      })}
    </div>
  );
}
