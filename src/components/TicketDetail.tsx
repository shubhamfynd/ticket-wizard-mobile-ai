
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Ticket } from "./TicketList";
import { useToast } from "@/components/ui/use-toast";

interface TicketDetailProps {
  ticket: Ticket;
  onBack: () => void;
  onStatusChange?: (ticketId: string, status: string, comment?: string) => void;
  isApprovalView?: boolean;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ 
  ticket, 
  onBack, 
  onStatusChange,
  isApprovalView = false 
}) => {
  const { toast } = useToast();
  const [comment, setComment] = useState("");

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
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const handleApprove = () => {
    if (onStatusChange) {
      onStatusChange(ticket.id, "Approved", comment);
      toast({
        title: "Success",
        description: "Ticket approved successfully",
      });
    }
  };

  const handleReject = () => {
    if (!comment && isApprovalView) {
      toast({
        title: "Error",
        description: "Please provide a reason for rejection",
        variant: "destructive",
      });
      return;
    }

    if (onStatusChange) {
      onStatusChange(ticket.id, "Rejected", comment);
      toast({
        title: "Success",
        description: "Ticket rejected",
      });
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <button 
          className="text-primary mr-2" 
          onClick={onBack}
          aria-label="Go Back"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-medium">Ticket Details</h2>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-500">{ticket.templateName}</span>
          <Badge className={`${getStatusColor(ticket.status)} border-0`}>
            {ticket.status}
          </Badge>
        </div>

        <h3 className="font-medium text-gray-900 mb-2">{ticket.title}</h3>
        <p className="text-gray-600 mb-4">{ticket.description}</p>

        <p className="text-xs text-gray-400 mb-4">
          Submitted on {formatDate(ticket.createdAt)}
        </p>

        {ticket.images && ticket.images.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Attachments</h4>
            <div className="flex flex-wrap gap-2">
              {ticket.images.map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={`Attachment ${index + 1}`} 
                  className="w-20 h-20 object-cover rounded-md border border-gray-200"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {isApprovalView && (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h4 className="text-sm font-medium mb-2">Review</h4>
          <Textarea
            placeholder="Add comments (required for rejection)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-4 resize-none"
            rows={3}
          />

          <div className="flex space-x-2">
            <Button
              onClick={handleApprove}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Approve
            </Button>
            <Button
              onClick={handleReject}
              className="flex-1 bg-red-500 hover:bg-red-600"
            >
              Reject
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetail;
