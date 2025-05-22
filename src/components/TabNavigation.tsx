
import { useState } from "react";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b">
      <button
        className={`flex-1 py-3 text-center font-medium ${
          activeTab === "submit" ? "text-primary border-b-2 border-primary" : "text-gray-500"
        }`}
        onClick={() => setActiveTab("submit")}
      >
        Submit Ticket
      </button>
      <button
        className={`flex-1 py-3 text-center font-medium ${
          activeTab === "my-tickets" ? "text-primary border-b-2 border-primary" : "text-gray-500"
        }`}
        onClick={() => setActiveTab("my-tickets")}
      >
        My Tickets
      </button>
      <button
        className={`flex-1 py-3 text-center font-medium ${
          activeTab === "approvals" ? "text-primary border-b-2 border-primary" : "text-gray-500"
        }`}
        onClick={() => setActiveTab("approvals")}
      >
        Approvals
      </button>
    </div>
  );
};

export default TabNavigation;
