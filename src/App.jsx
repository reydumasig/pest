import { NavLink, Route, Routes } from 'react-router-dom';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import OperationsDashboard from './pages/OperationsDashboard';
import './App.css';

export default function App() {
  return (
    <>
      <header className="shell-nav">
        <span className="shell-brand">Pest Control Ops — Demo</span>
        <nav>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            Analytics Demo
          </NavLink>
          <NavLink to="/operations" className={({ isActive }) => (isActive ? 'active' : '')}>
            Operations Dashboard
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<AnalyticsDashboard />} />
        <Route path="/operations" element={<OperationsDashboard />} />
      </Routes>
    </>
  );
}
