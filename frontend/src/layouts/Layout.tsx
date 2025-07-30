import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>🍽️ MealBuddy</h2>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/recipes">Ricette</Link></li>
          <li><Link to="/meal-plan">Pianificazione</Link></li>
          <li><Link to="/shopping-list">Lista Spesa</Link></li>
        </ul>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
