
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface BulkActionsProps {
  selectedCount: number;
  onApproveAll: () => void;
  onClose: () => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({ selectedCount, onApproveAll, onClose }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-md animate-slide-in-up flex items-center justify-between z-10">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3">
          <Check className="text-white" size={16} />
        </div>
        <span className="font-medium">{selectedCount} selected</span>
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="outline"
          size="sm"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button 
          size="sm"
          onClick={onApproveAll}
          className="bg-primary hover:bg-primary/90"
        >
          Approve All
        </Button>
      </div>
    </div>
  );
};

export default BulkActions;
