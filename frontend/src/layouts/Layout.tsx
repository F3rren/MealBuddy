import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="">
      <nav className="bg-gradient-to-r from-green-500 to-blue-500 text-white flex items-center justify-between p-4 shadow-lg">
        <div className="flex items-center">
          <Link to="/" className="text-white no-underline decoration-none px-4 py-2 rounded-md transition-all duration-300 flex items-center gap-2">
            <span className="text-2xl text-white no-underline decoration-none font-bold uppercase">MealBuddy</span>
          </Link>
        </div>
        <ul className="flex list-none gap-6 m-0 p-0">
          <li>
            <Link to="/recipes" className="text-white no-underline decoration-none px-4 py-2 rounded-md transition-all duration-300 flex items-center gap-2 hover:bg-white/20 hover:-translate-y-0.5">
              <span className="text-white no-underline decoration-none font-bold uppercase">Ricette</span>
            </Link>
          </li>
          <li>
            <Link to="/meal-plan" className="text-white no-underline decoration-none px-4 py-2 rounded-md transition-all duration-300 flex items-center gap-2 hover:bg-white/20 hover:-translate-y-0.5">
              <span className="text-white no-underline decoration-none font-bold uppercase">Pianificazione</span>
            </Link>
          </li>
          <li>
            <Link to="/shopping-list" className="text-white no-underline decoration-none px-4 py-2 rounded-md transition-all duration-300 flex items-center gap-2 hover:bg-white/20 hover:-translate-y-0.5">
              <span className="text-white no-underline decoration-none font-bold uppercase">Lista Spesa</span>
            </Link>
          </li>
          <li>
            <Link to="/login" className="bg-red-500 text-white no-underline decoration-none px-4 py-2 rounded-md transition-all duration-300 flex items-center gap-2 hover:bg-red-600 hover:-translate-y-0.5">
              <span className="text-white no-underline decoration-none font-bold uppercase">Login</span>
            </Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
