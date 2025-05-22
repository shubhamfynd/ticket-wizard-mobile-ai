
import { Home, Inbox, BarChart2, CheckSquare, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around">
      <NavLink to="/" className={({ isActive }) => `flex flex-col items-center justify-center w-1/5 ${isActive ? 'text-primary' : 'text-gray-500'}`} end>
        <Home size={20} />
        <span className="text-xs mt-1">Home</span>
      </NavLink>
      <NavLink to="/tickets" className={({ isActive }) => `flex flex-col items-center justify-center w-1/5 ${isActive ? 'text-primary' : 'text-gray-500'}`}>
        <Inbox size={20} />
        <span className="text-xs mt-1">Tickets</span>
      </NavLink>
      <NavLink to="/reports" className={({ isActive }) => `flex flex-col items-center justify-center w-1/5 ${isActive ? 'text-primary' : 'text-gray-500'}`}>
        <BarChart2 size={20} />
        <span className="text-xs mt-1">Reports</span>
      </NavLink>
      <NavLink to="/tasks" className={({ isActive }) => `flex flex-col items-center justify-center w-1/5 ${isActive ? 'text-primary' : 'text-gray-500'}`}>
        <CheckSquare size={20} />
        <span className="text-xs mt-1">Tasks</span>
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => `flex flex-col items-center justify-center w-1/5 ${isActive ? 'text-primary' : 'text-gray-500'}`}>
        <Settings size={20} />
        <span className="text-xs mt-1">Settings</span>
      </NavLink>
    </div>
  );
};

export default BottomNavigation;
