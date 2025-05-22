
import React from "react";

interface TicketTemplateCardProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}

const TicketTemplateCard: React.FC<TicketTemplateCardProps> = ({ icon, title, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-accent hover:bg-opacity-10 transition-colors"
      onClick={onClick}
    >
      <div className="text-primary mb-2">
        {icon}
      </div>
      <span className="text-sm text-center">{title}</span>
    </div>
  );
};

export default TicketTemplateCard;
