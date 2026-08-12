import Sparkline from '../components/charts/Sparkline';
import HBars from '../components/charts/HBars';
import LineChart from '../components/charts/LineChart';
import './AnalyticsDashboard.css';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const KPIS = [
  { label: 'Total revenue (6 mo)', value: '₱270M', delta: '+12%', dir: 'up', ctx: 'vs prior period', trend: [60, 64, 66, 70, 75, 82] },
  { label: 'Franchise royalty income', value: '₱34.3M', delta: '+8%', dir: 'up', ctx: 'vs prior period', trend: [78, 82, 89, 94, 101, 108] },
  { label: 'Avg. service profit margin', value: '34%', delta: '+3 pts', dir: 'up', ctx: 'vs prior period', trend: [29, 30, 31, 32, 33, 34] },
  { label: 'DIY-to-service conversion', value: '9.4%', delta: '+1.2 pts', dir: 'up', ctx: 'vs prior period', trend: [6.8, 7.2, 7.9, 8.3, 8.9, 9.4] },
];

const TOP_SELLERS = [
  { label: 'Ant & roach spray', value: 2140 },
  { label: 'Rat bait stations', value: 1860 },
  { label: 'Termite treatment kit', value: 940 },
  { label: 'Mosquito fogger', value: 780 },
  { label: 'Bed bug spray', value: 610 },
];

const TOP_LOCATIONS = [
  { label: 'Antipolo, Rizal', value: 480 },
  { label: 'Bacoor, Cavite', value: 410 },
  { label: 'Talisay, Cebu', value: 365 },
  { label: 'Angeles City, Pampanga', value: 290 },
  { label: 'Cainta, Rizal', value: 240 },
];

const FRANCHISE_REGIONS = [
  { label: 'NCR (Metro Manila)', value: 340 },
  { label: 'Central Luzon', value: 310 },
  { label: 'Calabarzon', value: 290 },
  { label: 'Central Visayas (Cebu)', value: 260 },
  { label: 'Davao Region', value: 180 },
];

const COST_BREAKDOWN = [
  { label: 'Technician pay', value: 31, display: '31%' },
  { label: 'Raw materials', value: 22, display: '22%' },
  { label: 'Net margin', value: 25, display: '25%', colorVar: 'var(--series-3)' },
  { label: 'Office overhead', value: 14, display: '14%' },
  { label: 'Other', value: 8, display: '8%' },
];

const HOUSING_STARTS = [
  { label: 'Q4 (this year)', value: 7 },
  { label: 'Q3', value: 4 },
  { label: 'Q2', value: 5 },
  { label: 'Q1', value: 3 },
];

const JOB_STATS = [
  { name: 'Single-family homes', profit: '₱4,800', profitLbl: 'avg. profit / visit', note: 'Higher per-visit rate, offset by drive time between spread-out stops.' },
  { name: 'Condo buildings', profit: '₱134,000', profitLbl: 'avg. contract / month', note: 'Steady, predictable monthly revenue with less travel between units.' },
  { name: 'Commercial buildings', profit: '₱11,800', profitLbl: 'avg. profit / visit', note: 'Highest per-visit ticket; lower volume, longer sales cycle.' },
];

const JOB_MARGINS = [
  { label: 'Condo buildings', value: 41, display: '41%', colorVar: 'var(--series-3)' },
  { label: 'Commercial buildings', value: 33, display: '33%' },
  { label: 'Single-family homes', value: 28, display: '28%' },
];

const SCENARIOS = [
  {
    tag: 'Scenario A',
    title: 'Finding our most profitable services',
    body: 'Single homes pay well per visit, but condo buildings give steady, predictable monthly contracts with far less drive time between jobs — and the highest margin of the three job types (41% vs. 28–33%).',
    strategy: 'Focus the main sales team on signing large condo developments; let franchisees handle spread-out home visits.',
    metrics: [{ v: '41%', l: 'condo margin' }, { v: '28%', l: 'home margin' }],
  },
  {
    tag: 'Scenario B',
    title: 'Turning spray buyers into service clients',
    body: 'Online sales cluster by neighborhood — when hundreds of households in one area buy rat bait or spray in a single month, that’s a pest problem DIY products alone won’t solve.',
    strategy: 'Target DIY buyers in high-density purchase areas with service upsell offers; convert repeat spray purchases into recurring contracts.',
    metrics: [{ v: '480', l: 'top-area orders/mo' }, { v: '9.4%', l: 'conversion rate' }],
  },
  {
    tag: 'Scenario C',
    title: 'Company-owned branch vs. franchise',
    body: 'Comparing company-branch profit against franchise royalty income shows where local overhead is outweighing what a nearby operator could earn on the same territory.',
    strategy: 'Sell underperforming company branches to trusted franchisees — get cash from the sale, drop the management overhead, and lock in steady royalty and chemical-order income.',
    metrics: [{ v: '₱34.3M', l: 'royalty income' }, { v: '+8%', l: 'YoY growth' }],
  },
];

const SWOT = [
  {
    cls: 'strength', title: 'Strengths — Revenue',
    items: [
      'In-house chemical manufacturing yields higher margins than competitors buying from third parties.',
      'Three revenue streams: online product sales, direct service, and franchise fees/orders.',
    ],
  },
  {
    cls: 'weakness', title: 'Weaknesses — Cost',
    items: [
      'Company-owned branches carry heavy management time and overhead vs. franchise branches.',
      'HQ counter sales tie up staff time on small retail orders better handled online.',
    ],
  },
  {
    cls: 'opportunity', title: 'Opportunities — Growth',
    items: [
      'High online sales in towns without a service branch pinpoint exactly where to expand next.',
      'Unused factory capacity could produce extra chemical supply as a new revenue stream.',
    ],
  },
  {
    cls: 'threat', title: 'Threats — Watch out',
    items: [
      'Rising raw-chemical ingredient prices compress manufacturing margin.',
      'Franchisees sourcing off-brand chemicals from unauthorized suppliers instead of HQ.',
    ],
  },
];

export default function AnalyticsDashboard() {
  return (
    <div className="viz-root">
      <header className="top">
        <div className="wrap">
          <div className="title">
            Analytics Demo <span className="demo-flag">Illustrative data</span>
          </div>
          <h1>Pest Control &amp; Chemical Business — Strategy Dashboard</h1>
          <nav className="tabs">
            <a href="#overview">Overview</a>
            <a href="#direct-sales">Direct Sales</a>
            <a href="#franchise">Franchise Orders</a>
            <a href="#service">Service Jobs</a>
            <a href="#finance">Expenses &amp; Income</a>
            <a href="#trends">Local Trends</a>
            <a href="#scenarios">Strategy Scenarios</a>
            <a href="#swot">SWOT</a>
          </nav>
        </div>
      </header>

      <div className="wrap">
        <section id="overview">
          <div className="sec-head"><h2>Overview</h2><div className="sub">Trailing 6 months</div></div>
          <p className="sec-note">Headline numbers blended from the five source datasets — direct sales, franchise orders, field service jobs, expense/income records, and local environmental trends.</p>
          <div className="grid grid-4">
            {KPIS.map((k) => (
              <div className="card stat" key={k.label}>
                <div className="label">{k.label}</div>
                <div className="value">{k.value}</div>
                <div className={`delta ${k.dir}`}>
                  {k.delta} <span className="delta-context">{k.ctx}</span>
                </div>
                <div className="spark">
                  <Sparkline values={k.trend} colorVar="var(--series-1)" surfaceVar="var(--surface-1)" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="direct-sales">
          <div className="sec-head"><h2>1 &middot; Direct Customer Sales</h2><div className="sub">Online store + HQ counter</div></div>
          <p className="sec-note">What regular people buy online or at HQ — top sellers, where orders come from, and the online/counter mix shift.</p>
          <div className="grid grid-3">
            <div className="card">
              <h3>Top sellers</h3>
              <div className="card-sub">Units sold, last 30 days</div>
              <HBars items={TOP_SELLERS} colorVar="var(--series-1)" />
            </div>
            <div className="card">
              <h3>Top order locations</h3>
              <div className="card-sub">Online orders, last 30 days</div>
              <HBars items={TOP_LOCATIONS} colorVar="var(--series-3)" />
            </div>
            <div className="card">
              <h3>Online vs. HQ counter sales</h3>
              <div className="card-sub">Order volume, last 6 months</div>
              <LineChart
                labels={MONTHS}
                surfaceVar="var(--surface-1)"
                series={[
                  { name: 'Online store', values: [2100, 2350, 2600, 2800, 3100, 3400], colorVar: 'var(--series-1)' },
                  { name: 'HQ counter', values: [900, 880, 860, 820, 790, 760], colorVar: 'var(--series-2)' },
                ]}
              />
            </div>
          </div>
        </section>

        <section id="franchise">
          <div className="sec-head"><h2>2 &middot; Franchise Orders</h2><div className="sub">Central-office fulfillment</div></div>
          <p className="sec-note">Chemical batches and tools franchisees purchase from HQ, by region and over time.</p>
          <div className="grid grid-2">
            <div className="card">
              <h3>Chemical batch orders by region</h3>
              <div className="card-sub">Units, last quarter</div>
              <HBars items={FRANCHISE_REGIONS} colorVar="var(--series-1)" />
            </div>
            <div className="card">
              <h3>Total franchise orders</h3>
              <div className="card-sub">Batches/month, last 6 months</div>
              <LineChart
                labels={MONTHS}
                surfaceVar="var(--surface-1)"
                series={[{ name: 'Chemical batches ordered', values: [520, 540, 580, 610, 640, 690], colorVar: 'var(--series-1)' }]}
              />
            </div>
          </div>
        </section>

        <section id="service">
          <div className="sec-head"><h2>3 &middot; Service Jobs</h2><div className="sub">Field crews &amp; franchisee visits</div></div>
          <p className="sec-note">Job mix across property types, and the profit margin comparison that underpins Scenario A.</p>
          <div className="grid grid-3">
            {JOB_STATS.map((j) => (
              <div className="card stat" key={j.name}>
                <h3>{j.name}</h3>
                <div className="value" style={{ fontSize: '22px' }}>{j.profit}</div>
                <div className="label" style={{ marginBottom: '8px' }}>{j.profitLbl}</div>
                <div className="card-sub" style={{ margin: 0 }}>{j.note}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginTop: '16px' }}>
            <h3>Avg. profit margin by job type</h3>
            <div className="card-sub">Percent of billed job value, last quarter</div>
            <HBars items={JOB_MARGINS} colorVar="var(--series-1)" />
          </div>
        </section>

        <section id="finance">
          <div className="sec-head"><h2>4 &middot; Expenses &amp; Income</h2><div className="sub">Factory, HQ, payroll, royalties</div></div>
          <p className="sec-note">Where revenue goes, and how monthly royalty income from franchisees is trending.</p>
          <div className="grid grid-2">
            <div className="card">
              <h3>Cost breakdown</h3>
              <div className="card-sub">Share of revenue, last month</div>
              <HBars items={COST_BREAKDOWN} colorVar="var(--series-2)" />
            </div>
            <div className="card">
              <h3>Monthly royalty income</h3>
              <div className="card-sub">From franchised branches, last 6 months</div>
              <LineChart
                labels={MONTHS}
                surfaceVar="var(--surface-1)"
                series={[{
                  name: 'Royalty income',
                  values: [4400, 4600, 5000, 5300, 5700, 6100],
                  colorVar: 'var(--series-3)',
                  fmt: (v) => '₱' + (v / 1000).toFixed(1) + 'M',
                }]}
              />
            </div>
          </div>
        </section>

        <section id="trends">
          <div className="sec-head"><h2>5 &middot; Local Trends</h2><div className="sub">Weather, pest pressure, new construction</div></div>
          <p className="sec-note">Rainfall climbing into the June habagat (wet season) tracks closely with pest service-call volume; new housing/condo starts flag expansion targets.</p>
          <div className="grid grid-3">
            <div className="card">
              <h3>Rainfall</h3>
              <div className="card-sub">Millimeters/month, last 6 months</div>
              <LineChart
                labels={MONTHS}
                surfaceVar="var(--surface-1)"
                series={[{
                  name: 'Rainfall (mm)',
                  values: [18, 26, 41, 68, 115, 224],
                  colorVar: 'var(--series-1)',
                  fmt: (v) => v + 'mm',
                }]}
              />
            </div>
            <div className="card">
              <h3>Pest service calls</h3>
              <div className="card-sub">Calls/month, last 6 months</div>
              <LineChart
                labels={MONTHS}
                surfaceVar="var(--surface-1)"
                series={[{ name: 'Service calls', values: [280, 300, 340, 390, 470, 560], colorVar: 'var(--series-2)' }]}
              />
            </div>
            <div className="card">
              <h3>New housing &amp; condo starts</h3>
              <div className="card-sub">Nearby developments broken ground, by quarter</div>
              <HBars items={HOUSING_STARTS} colorVar="var(--series-1)" />
            </div>
          </div>
        </section>

        <section id="scenarios">
          <div className="sec-head"><h2>Practical Scenarios</h2><div className="sub">Strategy built from the data above</div></div>
          <div className="grid grid-3">
            {SCENARIOS.map((s) => (
              <div className="card scenario-card" key={s.tag}>
                <div className="tag">{s.tag}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <div className="strategy"><strong>Strategy:</strong> {s.strategy}</div>
                <div className="metric-row">
                  {s.metrics.map((m) => (
                    <div key={m.l}>
                      <div className="m-val">{m.v}</div>
                      <div className="m-lbl">{m.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="swot">
          <div className="sec-head"><h2>SWOT — what the data supports</h2></div>
          <div className="grid grid-2" style={{ marginBottom: '24px' }}>
            {SWOT.map((s) => (
              <div className={`card swot-card ${s.cls}`} key={s.title}>
                <div className="swot-title">{s.title}</div>
                <ul>
                  {s.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <p className="banner">Demo dashboard — all figures are illustrative placeholders, not live business data.</p>
      </div>
    </div>
  );
}
