# Pest Control Ops — Demo

A front-end-only React demo built for a client pitch: a pest control & chemical
business analytics dashboard and a mockup of a proposed field-service CRM
("Fieldline"). No backend — all data is hardcoded, illustrative, and localized
to the Philippines.

## Pages

- **`/`** — Analytics Dashboard: KPIs, direct sales, franchise orders, service
  job margins, expenses & income, local trends (rainfall/pest calls), three
  strategy scenarios, and a SWOT grid.
- **`/operations`** — Operations Dashboard ("Fieldline"): a sidebar app-shell
  mockup with six tabs — Overview, Customers & Sales, Franchise Orders,
  Scheduling, Billing & Royalties, and Reports.

## Stack

- [Vite](https://vite.dev) + React 19 (plain JS, no TypeScript)
- [react-router-dom](https://reactrouter.com) for the two routes
- No UI framework — hand-rolled CSS per page, scoped under `.viz-root` /
  `.ops-theme` root classes so each page's design tokens don't collide
- No backend, no database, no API calls — everything in `src/pages/*.jsx` is
  a plain JS array of demo data

## Development

```bash
npm install
npm run dev      # starts the dev server on http://localhost:5182
npm run build    # production build to dist/
npm run lint     # oxlint
```

## Project structure

```
src/
  components/charts/   Sparkline, HBars, LineChart — shared, color-agnostic
                        chart components (color is passed in via CSS var)
  pages/
    AnalyticsDashboard.jsx / .css
    OperationsDashboard.jsx / .css
  App.jsx              routes + top-level demo switcher nav
```

## Extending this for real use

This is a demo shell, not a production app. To turn it into something real:

- Replace the hardcoded arrays at the top of each page with data fetched from
  an actual API/database.
- The Operations Dashboard's tabs currently just toggle local `useState` —
  if it grows, consider giving each tab its own route instead.
- No auth, no persistence, no forms submit anywhere — this is read-only.

## Deployment

Deployed to Vercel as a static Vite build (no server-side rendering, no
environment variables needed).
