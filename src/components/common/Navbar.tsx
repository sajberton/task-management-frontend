import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Task Management
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/tasks"
              className={`py-2 px-3 rounded hover:bg-blue-700 transition ${
                location.pathname === '/tasks' ? 'bg-blue-700' : ''
              }`}
            >
              Tasks
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
