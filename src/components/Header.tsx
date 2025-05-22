
import { Bell, ChevronDown, Search } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [store, setStore] = useState("MyStore 1");

  return (
    <header className="bg-[#1a237e] text-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
          <div className="flex items-center cursor-pointer">
            <span className="text-lg font-medium">{store}</span>
            <ChevronDown size={20} className="ml-1" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Bell size={20} />
          <div className="w-8 h-8 bg-[#3a3f8e] rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
        </div>
      </div>
      <div className="mt-3 relative">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-[#3a3f8e] rounded-full py-2 px-4 text-white placeholder-gray-300"
        />
        <Search size={18} className="absolute right-4 top-2.5 text-gray-300" />
      </div>
    </header>
  );
};

export default Header;
