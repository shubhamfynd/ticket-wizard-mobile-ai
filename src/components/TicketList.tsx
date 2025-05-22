import React from "react";
import { Badge } from "@/components/ui/badge";

interface Product {
  code: string;
  name: string;
  description: string;
  image: string;
  mrp?: number;
  rrp?: number;
}

export interface Ticket {
  id: string;
  templateName: string;
  storeCode: string;
  employeeId: string;
  description: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
  images?: string[];
  // Count Correction fields
  product?: Product;
  newCount?: number;
  // Price Correction fields
  newMrp?: number;
  // Imprest Submission fields
  expenseTitle?: string;
  expenseAmount?: number;
  expensePurpose?: string;
}

interface TicketListProps {
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
  type: "my-tickets" | "approvals";
}

const TicketList: React.FC<TicketListProps> = ({ tickets, onTicketClick, type }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    });
  };

  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-gray-500">
        <p>No tickets found</p>
      </div>
    );
  }

  return (
    <div className="divide-y">
      {tickets.map((ticket) => (
        <div 
          key={ticket.id} 
          className="p-4 hover:bg-gray-50 cursor-pointer"
          onClick={() => onTicketClick(ticket)}
        >
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium text-gray-900">{ticket.templateName}</h3>
            <Badge className={`${getStatusColor(ticket.status)} border-0`}>
              {ticket.status}
            </Badge>
          </div>
          <p className="text-sm text-gray-500 mb-1 line-clamp-1">
            {ticket.storeCode} • {ticket.employeeId}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-400">
              {formatDate(ticket.createdAt)}
            </p>
            {type === "approvals" && (
              <div className="flex space-x-2">
                <button 
                  className="text-xs text-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle approve action
                  }}
                >
                  Approve
                </button>
                <button 
                  className="text-xs text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle reject action
                  }}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
