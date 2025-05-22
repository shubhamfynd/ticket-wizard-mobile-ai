
import { Home, Inbox, BarChart2, CheckSquare, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around">
      <Link to="/" className="flex flex-col items-center justify-center w-1/5 text-primary">
        <Home size={20} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link to="/" className="flex flex-col items-center justify-center w-1/5 text-gray-500">
        <Inbox size={20} />
        <span className="text-xs mt-1">Tickets</span>
      </Link>
      <Link to="/" className="flex flex-col items-center justify-center w-1/5 text-gray-500">
        <BarChart2 size={20} />
        <span className="text-xs mt-1">Reports</span>
      </Link>
      <Link to="/" className="flex flex-col items-center justify-center w-1/5 text-gray-500">
        <CheckSquare size={20} />
        <span className="text-xs mt-1">Tasks</span>
      </Link>
      <Link to="/" className="flex flex-col items-center justify-center w-1/5 text-gray-500">
        <Settings size={20} />
        <span className="text-xs mt-1">Settings</span>
      </Link>
    </div>
  );
};

export default BottomNavigation;
