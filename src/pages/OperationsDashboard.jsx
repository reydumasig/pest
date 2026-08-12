import { useState } from 'react';
import Sparkline from '../components/charts/Sparkline';
import HBars from '../components/charts/HBars';
import './OperationsDashboard.css';

const NAV = [
  {
    key: 'overview', label: 'Overview',
    icon: (
      <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    key: 'customers', label: 'Customers & Sales', section: true,
    icon: (
      <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="3.2" /><path d="M5 20c0-3.6 3-6 7-6s7 2.4 7 6" />
      </svg>
    ),
  },
  {
    key: 'franchise', label: 'Franchise Orders',
    icon: (
      <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 7l9-4 9 4-9 4-9-4Z" /><path d="M3 7v10l9 4 9-4V7" />
      </svg>
    ),
  },
  {
    key: 'scheduling', label: 'Scheduling',
    icon: (
      <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M3 9.5h18M8 3v3M16 3v3" />
      </svg>
    ),
  },
  {
    key: 'billing', label: 'Billing & Royalties',
    icon: (
      <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="4" width="17" height="16" rx="2" /><path d="M7.5 9h9M7.5 13h9M7.5 17h5" />
      </svg>
    ),
  },
  {
    key: 'reports', label: 'Reports',
    icon: (
      <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 20V10M11 20V4M18 20v-7" />
      </svg>
    ),
  },
];

const CUSTOMERS = [
  { name: 'J. Mercado', area: 'Cainta', channel: 'Online', lastOrder: 'Rat bait ×3', orders90d: 4, status: 'flagged', label: 'Flagged' },
  { name: 'T. Ibarra', area: 'Bacoor, Cavite', channel: 'Online', lastOrder: 'Ant spray ×2', orders90d: 3, status: 'flagged', label: 'Flagged' },
  { name: 'S. Perez', area: 'Talisay, Cebu', channel: 'Online', lastOrder: 'Cockroach gel', orders90d: 3, status: 'flagged', label: 'Flagged' },
  { name: 'R. Villanueva', area: 'Antipolo', channel: 'Service', lastOrder: 'Quarterly plan visit', orders90d: 1, status: 'active-svc', label: 'Active service' },
  { name: 'C. Bautista', area: 'Antipolo', channel: 'Service', lastOrder: 'Monthly condo contract', orders90d: 1, status: 'active-svc', label: 'Active service' },
  { name: 'L. Aquino', area: 'Angeles City', channel: 'Counter', lastOrder: 'Termite kit', orders90d: 1, status: 'diy', label: 'DIY only' },
  { name: 'M. Garcia', area: 'Cainta', channel: 'Online', lastOrder: 'Mosquito fogger', orders90d: 2, status: 'diy', label: 'DIY only' },
  { name: 'F. Torres', area: 'Bacoor, Cavite', channel: 'Counter', lastOrder: 'Rat trap', orders90d: 1, status: 'diy', label: 'DIY only' },
];

const TOP_SELLERS = [
  { label: 'Ant & roach spray', value: 2140 },
  { label: 'Rat bait stations', value: 1860 },
  { label: 'Termite kit', value: 940 },
  { label: 'Mosquito fogger', value: 780 },
  { label: 'Bed bug spray', value: 610 },
];

const CHANNEL_SPLIT = [
  { label: 'Online store', value: 78, display: '78%' },
  { label: 'HQ counter', value: 22, display: '22%' },
];

const FRANCHISE_ORDERS = [
  { id: '#0447', region: 'Central Visayas (Cebu)', item: 'Insecticide Batch A', qty: 40, status: 'approved', label: 'Approved', date: 'Aug 06' },
  { id: '#0448', region: 'NCR (Metro Manila)', item: 'Insecticide Batch A', qty: 60, status: 'fulfilled', label: 'Fulfilled', date: 'Aug 05' },
  { id: '#0449', region: 'Calabarzon', item: 'Rodenticide Batch B', qty: 25, status: 'shipped', label: 'Shipped', date: 'Aug 03' },
  { id: '#0450', region: 'Central Luzon', item: 'Spray Tools Kit', qty: 15, status: 'submitted', label: 'Submitted', date: 'Aug 08' },
  { id: '#0451', region: 'Davao Region', item: 'Insecticide Batch A', qty: 30, status: 'flagged', label: 'Pending approval', date: 'Aug 09' },
  { id: '#0452', region: 'NCR (Metro Manila)', item: 'Rodenticide Batch B', qty: 20, status: 'fulfilled', label: 'Fulfilled', date: 'Aug 02' },
];

const BATCH_BY_REGION = [
  { label: 'NCR', value: 340 },
  { label: 'Central Luzon', value: 310 },
  { label: 'Calabarzon', value: 290 },
  { label: 'Central Visayas', value: 260 },
  { label: 'Davao Region', value: 180 },
];

const TODAY_JOBS = [
  { time: '08:00', tech: 'R. Santos', customer: 'R. Villanueva', type: 'home', typeLabel: 'Home', address: '12 Mabini St., Antipolo', status: 'fulfilled', label: 'Completed' },
  { time: '09:30', tech: 'R. Santos', customer: '—', type: 'home', typeLabel: 'Home', address: '45 Rizal Ave., Antipolo', status: 'approved', label: 'On site' },
  { time: '10:00', tech: 'M. Dela Cruz', customer: 'Sunrise Residences', type: 'condo', typeLabel: 'Condo', address: 'Tower C', status: 'approved', label: 'On site' },
  { time: '11:00', tech: 'M. Dela Cruz', customer: 'Sunrise Residences', type: 'condo', typeLabel: 'Condo', address: 'Tower D', status: 'submitted', label: 'Queued' },
  { time: '13:00', tech: 'D. Reyes', customer: 'Robinsons Place', type: 'comm', typeLabel: 'Commercial', address: 'Unit 4, Antipolo', status: 'submitted', label: 'Queued' },
  { time: '14:30', tech: 'J. Fernandez', customer: 'C. Bautista', type: 'home', typeLabel: 'Home', address: 'Cainta', status: 'submitted', label: 'Queued' },
  { time: '15:30', tech: 'J. Fernandez', customer: '—', type: 'home', typeLabel: 'Home', address: 'Cainta', status: 'submitted', label: 'Queued' },
];

const JOB_MIX = [
  { label: 'Home', value: 60, display: '60%' },
  { label: 'Condo', value: 25, display: '25%' },
  { label: 'Commercial', value: 15, display: '15%' },
];

const INVOICES = [
  { id: 'INV-3391', who: 'Sunrise Residences', type: 'Condo contract', amount: '₱134,000', status: 'paid', label: 'Paid' },
  { id: 'INV-3392', who: 'Robinsons Place Antipolo', type: 'Commercial visit', amount: '₱11,800', status: 'pending', label: 'Pending' },
  { id: 'INV-3393', who: 'J. Mercado', type: 'Online order', amount: '₱2,450', status: 'paid', label: 'Paid' },
  { id: 'INV-3394', who: 'NCR Franchise — #0448', type: 'Franchise order', amount: '₱1,920,000', status: 'paid', label: 'Paid' },
  { id: 'INV-3395', who: 'Cebu Franchise — #0447', type: 'Franchise order', amount: '₱1,280,000', status: 'pending', label: 'Pending' },
  { id: 'INV-3396', who: 'R. Villanueva', type: 'Home visit', amount: '₱4,800', status: 'overdue', label: 'Overdue' },
];

const COST_BREAKDOWN = [
  { label: 'Technician pay', value: 31, display: '31%' },
  { label: 'Net margin', value: 25, display: '25%' },
  { label: 'Raw materials', value: 22, display: '22%' },
  { label: 'Office overhead', value: 14, display: '14%' },
  { label: 'Other', value: 8, display: '8%' },
];

const ROYALTY_BY_REGION = [
  { label: 'NCR', value: 1.96, display: '₱1.96M' },
  { label: 'Central Luzon', value: 1.72, display: '₱1.72M' },
  { label: 'Calabarzon', value: 1.58, display: '₱1.58M' },
  { label: 'Central Visayas', value: 1.28, display: '₱1.28M' },
  { label: 'Davao Region', value: 0.86, display: '₱0.86M' },
];

const REPORTS = [
  { name: 'Direct Sales Summary', scope: 'Customer & channel breakdown', date: 'Aug 11' },
  { name: 'Franchise Order Summary', scope: 'Regional batch orders', date: 'Aug 11' },
  { name: 'Service Job Profitability', scope: 'By property type', date: 'Aug 10' },
  { name: 'Royalty & Expense Statement', scope: 'Monthly, by branch', date: 'Aug 09' },
  { name: 'Local Trends Overlay', scope: 'Rainfall & pest-call correlation', date: 'Aug 09' },
];

const TODAY_LABEL = new Date().toLocaleDateString('en-US', {
  weekday: 'long', month: 'long', day: 'numeric',
});

function Chip({ status, children }) {
  return <span className={`chip ${status}`}>{children}</span>;
}

export default function OperationsDashboard() {
  const [activeView, setActiveView] = useState('overview');
  const activeItem = NAV.find((n) => n.key === activeView);

  return (
    <div className="ops-theme">
      <div className="app-shell">
        <aside className="sidebar">
          <div className="brand"><span className="mark" /><span>Fieldline</span></div>
          <nav className="nav">
            {NAV.map((item, i) => (
              <span key={item.key} style={{ display: 'contents' }}>
                {item.section && i > 0 && <div className="sec-label">Modules</div>}
                <a
                  href="#"
                  className={activeView === item.key ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); setActiveView(item.key); }}
                >
                  {item.icon}
                  {item.label}
                </a>
              </span>
            ))}
          </nav>
          <div className="foot">Signed in as HQ Admin</div>
        </aside>

        <main className="main">
          <div className="topbar">
            <h1>{activeItem.label}</h1>
            <div className="date mono">{TODAY_LABEL}</div>
          </div>

          {activeView === 'overview' && (
            <section className="view active">
              <div className="kpi-row">
                <div className="kpi">
                  <div className="k-label">Jobs today</div>
                  <div className="k-val">18</div>
                  <div className="k-delta up">3 in progress</div>
                </div>
                <div className="kpi">
                  <div className="k-label">Franchise orders pending</div>
                  <div className="k-val">6</div>
                  <div className="k-delta flag">2 awaiting approval</div>
                </div>
                <div className="kpi">
                  <div className="k-label">Revenue this month</div>
                  <div className="k-val">₱23.1M</div>
                  <div className="k-delta up">+9% vs. last month</div>
                </div>
                <div className="kpi">
                  <div className="k-label">Royalty income this month</div>
                  <div className="k-val">₱6.1M</div>
                  <div className="k-delta up">+7% vs. last month</div>
                </div>
              </div>

              <div className="widget-grid">
                <div className="widget">
                  <div className="w-head"><h2>Today's dispatch</h2><span className="w-sub mono">18 jobs</span></div>
                  <div className="dispatch-row"><span className="tech">R. Santos</span><span className="chip home">Home</span><span className="addr">12 Mabini St., Antipolo</span><span className="status">On site</span></div>
                  <div className="dispatch-row"><span className="tech">R. Santos</span><span className="chip home">Home</span><span className="addr">45 Rizal Ave., Antipolo</span><span className="status q">Queued</span></div>
                  <div className="dispatch-row"><span className="tech">M. Dela Cruz</span><span className="chip condo">Condo</span><span className="addr">Sunrise Residences, Tower C</span><span className="status">On site</span></div>
                  <div className="dispatch-row"><span className="tech">M. Dela Cruz</span><span className="chip condo">Condo</span><span className="addr">Sunrise Residences, Tower D</span><span className="status q">Queued</span></div>
                  <div className="dispatch-row"><span className="tech">D. Reyes</span><span className="chip comm">Commercial</span><span className="addr">Robinsons Place Antipolo — Unit 4</span><span className="status q">Queued</span></div>
                  <div className="w-footnote">Grouped by technician — condo &amp; commercial jobs routed back-to-back.</div>
                </div>

                <div className="widget">
                  <div className="w-head"><h2>Franchise order pipeline</h2><span className="w-sub mono">#0447</span></div>
                  <div className="pipeline">
                    <div className="pipe-step done"><div className="p-node" /><div className="p-line" /><div className="p-txt">Submitted</div><div className="p-meta">Aug 04</div></div>
                    <div className="pipe-step active"><div className="p-node" /><div className="p-line" /><div className="p-txt">Approved</div><div className="p-meta">Aug 06</div></div>
                    <div className="pipe-step"><div className="p-node" /><div className="p-line" /><div className="p-txt">Fulfilled</div><div className="p-meta">—</div></div>
                    <div className="pipe-step"><div className="p-node" /><div className="p-txt">Shipped</div><div className="p-meta">—</div></div>
                  </div>
                  <div className="w-footnote">Central Visayas (Cebu) — 40-unit batch order. Same pipeline every franchisee and HQ can see.</div>
                </div>
              </div>

              <div className="widget-grid">
                <div className="widget">
                  <div className="w-head"><h2>Service conversion candidates</h2><span className="w-sub mono">3 flagged</span></div>
                  <div className="flag-row"><span className="f-dot" /><div><div className="f-name">J. Mercado — Cainta</div><div className="f-note">4th DIY order in 90 days, no service plan</div></div></div>
                  <div className="flag-row"><span className="f-dot" /><div><div className="f-name">T. Ibarra — Bacoor</div><div className="f-note">Rat bait ×2 this month</div></div></div>
                  <div className="flag-row"><span className="f-dot" /><div><div className="f-name">S. Perez — Talisay, Cebu</div><div className="f-note">3rd spray order, area flagged for pest pressure</div></div></div>
                  <div className="w-footnote">Rule-based — fires automatically from order history, no manual review.</div>
                </div>

                <div className="widget">
                  <div className="w-head"><h2>Royalty income trend</h2><span className="w-sub mono">6 mo</span></div>
                  <div className="trend-val"><span className="t-num">₱6.1M</span><span className="t-delta">+7% vs. last month</span></div>
                  <Sparkline
                    values={[4400, 4600, 5000, 5300, 5700, 6100]}
                    colorVar="var(--accent)"
                    surfaceVar="var(--surface)"
                    width={460}
                    height={64}
                    area
                    baseline
                  />
                  <div className="w-footnote">Same figure feeding the analytics dashboard's Expenses &amp; Income section.</div>
                </div>
              </div>
            </section>
          )}

          {activeView === 'customers' && (
            <section className="view active">
              <div className="kpi-row">
                <div className="kpi"><div className="k-label">Total customers</div><div className="k-val">3,240</div><div className="k-delta up">+6% vs. last month</div></div>
                <div className="kpi"><div className="k-label">Orders this month</div><div className="k-val">1,180</div><div className="k-delta up">+9% vs. last month</div></div>
                <div className="kpi"><div className="k-label">Online share</div><div className="k-val">78%</div><div className="k-delta up">+4 pts vs. last month</div></div>
                <div className="kpi"><div className="k-label">DIY-to-service conversion</div><div className="k-val">9.4%</div><div className="k-delta up">+1.2 pts vs. last month</div></div>
              </div>
              <div className="tbl-grid">
                <div className="widget">
                  <div className="w-head"><h2>Customer directory</h2><span className="w-sub mono">3,240 total</span></div>
                  <div className="table-wrap">
                    <table className="data-table">
                      <thead><tr><th>Customer</th><th>Area</th><th>Channel</th><th>Last order</th><th>Orders (90d)</th><th>Status</th></tr></thead>
                      <tbody>
                        {CUSTOMERS.map((c) => (
                          <tr key={c.name}>
                            <td className="strong">{c.name}</td>
                            <td>{c.area}</td>
                            <td>{c.channel}</td>
                            <td>{c.lastOrder}</td>
                            <td className="num">{c.orders90d}</td>
                            <td><Chip status={c.status}>{c.label}</Chip></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="w-footnote">Flags fire automatically at the 3rd repeat DIY order in an area with no active service plan.</div>
                </div>
                <div className="stack">
                  <div className="widget">
                    <div className="w-head"><h2>Top sellers</h2><span className="w-sub mono">30d</span></div>
                    <HBars items={TOP_SELLERS} colorVar="var(--accent)" />
                  </div>
                  <div className="widget">
                    <div className="w-head"><h2>Orders by channel</h2><span className="w-sub mono">30d</span></div>
                    <HBars items={CHANNEL_SPLIT} colorVar="var(--accent)" />
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeView === 'franchise' && (
            <section className="view active">
              <div className="kpi-row">
                <div className="kpi"><div className="k-label">Pending approval</div><div className="k-val">2</div><div className="k-delta flag">Needs review</div></div>
                <div className="kpi"><div className="k-label">In fulfillment</div><div className="k-val">4</div><div className="k-delta up">On schedule</div></div>
                <div className="kpi"><div className="k-label">Shipped this month</div><div className="k-val">11</div><div className="k-delta up">+3 vs. last month</div></div>
                <div className="kpi"><div className="k-label">Batches this quarter</div><div className="k-val">1,380</div><div className="k-delta up">+6% vs. last quarter</div></div>
              </div>
              <div className="tbl-grid">
                <div className="widget">
                  <div className="w-head"><h2>Franchise orders</h2><span className="w-sub mono">6 open</span></div>
                  <div className="table-wrap">
                    <table className="data-table">
                      <thead><tr><th>Order</th><th>Region</th><th>Item</th><th>Qty</th><th>Status</th><th>Date</th></tr></thead>
                      <tbody>
                        {FRANCHISE_ORDERS.map((o) => (
                          <tr key={o.id}>
                            <td className="strong mono">{o.id}</td>
                            <td>{o.region}</td>
                            <td>{o.item}</td>
                            <td className="num">{o.qty}</td>
                            <td><Chip status={o.status}>{o.label}</Chip></td>
                            <td className="mono">{o.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="w-footnote">Same pipeline every franchisee and HQ can see — submitted → approved → fulfilled → shipped.</div>
                </div>
                <div className="widget">
                  <div className="w-head"><h2>Batch orders by region</h2><span className="w-sub mono">Qtr</span></div>
                  <HBars items={BATCH_BY_REGION} colorVar="var(--accent)" />
                  <div className="w-footnote">Central visibility flags any franchise ordering off-catalog quantities.</div>
                </div>
              </div>
            </section>
          )}

          {activeView === 'scheduling' && (
            <section className="view active">
              <div className="kpi-row">
                <div className="kpi"><div className="k-label">Jobs today</div><div className="k-val">18</div><div className="k-delta up">3 in progress</div></div>
                <div className="kpi"><div className="k-label">Jobs this week</div><div className="k-val">96</div><div className="k-delta up">+5% vs. last week</div></div>
                <div className="kpi"><div className="k-label">Avg. job time</div><div className="k-val">42 min</div><div className="k-delta up">−3 min vs. last month</div></div>
                <div className="kpi"><div className="k-label">Recurring contracts active</div><div className="k-val">54</div><div className="k-delta up">+4 vs. last month</div></div>
              </div>
              <div className="tbl-grid">
                <div className="widget">
                  <div className="w-head"><h2>Today's jobs</h2><span className="w-sub mono">18 jobs</span></div>
                  <div className="table-wrap">
                    <table className="data-table">
                      <thead><tr><th>Time</th><th>Technician</th><th>Customer</th><th>Type</th><th>Address</th><th>Status</th></tr></thead>
                      <tbody>
                        {TODAY_JOBS.map((j, i) => (
                          <tr key={i}>
                            <td className="mono">{j.time}</td>
                            <td className="strong">{j.tech}</td>
                            <td>{j.customer}</td>
                            <td><Chip status={j.type}>{j.typeLabel}</Chip></td>
                            <td>{j.address}</td>
                            <td><Chip status={j.status}>{j.label}</Chip></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="w-footnote">Routed by technician — condo &amp; commercial jobs sit back-to-back to cut drive time.</div>
                </div>
                <div className="widget">
                  <div className="w-head"><h2>Job mix by property type</h2><span className="w-sub mono">7d</span></div>
                  <HBars items={JOB_MIX} colorVar="var(--accent)" />
                  <div className="w-footnote">Condo &amp; commercial carry the highest margin per job — see Billing &amp; Royalties.</div>
                </div>
              </div>
            </section>
          )}

          {activeView === 'billing' && (
            <section className="view active">
              <div className="kpi-row">
                <div className="kpi"><div className="k-label">Invoiced this month</div><div className="k-val">₱23.1M</div><div className="k-delta up">+9% vs. last month</div></div>
                <div className="kpi"><div className="k-label">Outstanding balance</div><div className="k-val">₱1.4M</div><div className="k-delta flag">2 overdue</div></div>
                <div className="kpi"><div className="k-label">Royalties due this quarter</div><div className="k-val">₱7.4M</div><div className="k-delta up">+6% vs. last quarter</div></div>
                <div className="kpi"><div className="k-label">Net margin</div><div className="k-val">25%</div><div className="k-delta up">+3 pts vs. last month</div></div>
              </div>
              <div className="tbl-grid">
                <div className="widget">
                  <div className="w-head"><h2>Recent invoices</h2><span className="w-sub mono">6 shown</span></div>
                  <div className="table-wrap">
                    <table className="data-table">
                      <thead><tr><th>Invoice</th><th>Customer / franchise</th><th>Type</th><th>Amount</th><th>Status</th></tr></thead>
                      <tbody>
                        {INVOICES.map((inv) => (
                          <tr key={inv.id}>
                            <td className="strong mono">{inv.id}</td>
                            <td>{inv.who}</td>
                            <td>{inv.type}</td>
                            <td className="num">{inv.amount}</td>
                            <td><Chip status={inv.status}>{inv.label}</Chip></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="w-footnote">Generated straight from completed jobs and orders — no re-keying.</div>
                </div>
                <div className="stack">
                  <div className="widget">
                    <div className="w-head"><h2>Cost breakdown</h2><span className="w-sub mono">Last month</span></div>
                    <HBars items={COST_BREAKDOWN} colorVar="var(--accent)" />
                  </div>
                  <div className="widget">
                    <div className="w-head"><h2>Royalty due by region</h2><span className="w-sub mono">Qtr</span></div>
                    <HBars items={ROYALTY_BY_REGION} colorVar="var(--accent)" />
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeView === 'reports' && (
            <section className="view active">
              <div className="tbl-grid">
                <div className="widget">
                  <div className="w-head"><h2>Available reports</h2><span className="w-sub mono">5 ready</span></div>
                  {REPORTS.map((r) => (
                    <div className="report-row" key={r.name}>
                      <div><div className="r-name">{r.name}</div><div className="r-scope">{r.scope}</div></div>
                      <div className="r-meta"><span className="r-date mono">{r.date}</span><Chip status="ready">Ready</Chip></div>
                    </div>
                  ))}
                  <div className="w-footnote">Every report reads from the same shared database — no export-and-reassemble step.</div>
                </div>
                <div className="widget">
                  <div className="w-head"><h2>Revenue trend</h2><span className="w-sub mono">6 mo</span></div>
                  <div className="trend-val"><span className="t-num">₱23.1M</span><span className="t-delta">+9% vs. last month</span></div>
                  <Sparkline
                    values={[19.8, 20.5, 21.4, 22.0, 22.6, 23.1]}
                    colorVar="var(--accent)"
                    surfaceVar="var(--surface)"
                    width={460}
                    height={64}
                    area
                    baseline
                  />
                  <div className="w-footnote">Feeds the full analytics dashboard already built for this pitch.</div>
                </div>
              </div>
            </section>
          )}

          <div className="foot-note">Fieldline — Illustrative data for presentation purposes</div>
        </main>
      </div>
    </div>
  );
}
