import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "@/components/Header";
import TabNavigation from "@/components/TabNavigation";
import TicketTemplateCard from "@/components/TicketTemplateCard";
import TicketForm from "@/components/TicketForm";
import TicketList, { Ticket } from "@/components/TicketList";
import TicketDetail from "@/components/TicketDetail";
import BulkActions from "@/components/BulkActions";
import BottomNavigation from "@/components/BottomNavigation";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

// Icons for ticket templates
const Icons = {
  CountCorrection: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tag"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>
  ),
  Markdown: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tag"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>
  ),
  Imprest: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
  ),
  Other: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cube"><path d="m21 7.5-9-5.25L3 7.5m18 0v9l-9 5.25m9-14.25-9 5.25m0 0-9-5.25m9 5.25v9"/></svg>
  )
};

const ticketTemplates = [
  { id: 1, name: "Count Correction", icon: <Icons.CountCorrection /> },
  { id: 2, name: "Markdown Request", icon: <Icons.Markdown /> },
  { id: 3, name: "Imprest Submission", icon: <Icons.Imprest /> },
  { id: 4, name: "Other Request", icon: <Icons.Other /> }
];

// Sample ticket data with proper status types
const initialTickets: Ticket[] = [
  {
    id: "1",
    templateName: "Count Correction",
    storeCode: "STORE001",
    employeeId: "EMP001",
    description: "System shows 10 units but actual count is 8 units.",
    status: "Pending",
    createdAt: "2023-05-15T10:30:00Z",
    product: {
      code: "P001",
      name: "Product 1",
      description: "Description for Product 1",
      image: "https://via.placeholder.com/150"
    },
    newCount: 8
  },
  {
    id: "2",
    templateName: "Markdown Request",
    storeCode: "STORE001",
    employeeId: "EMP001",
    description: "Request to update MRP for summer collection",
    status: "Approved",
    createdAt: "2023-05-12T08:15:00Z",
    product: {
      code: "P002",
      name: "Product 2",
      description: "Description for Product 2",
      image: "https://via.placeholder.com/150",
      mrp: 100,
      rrp: 90
    },
    newMrp: 120
  },
  {
    id: "3",
    templateName: "Imprest Submission",
    storeCode: "STORE001",
    employeeId: "EMP001",
    description: "Office supplies purchase",
    status: "Rejected",
    createdAt: "2023-05-10T14:45:00Z",
    expenseTitle: "Office Supplies",
    expenseAmount: 500,
    expensePurpose: "Purchase of stationery items"
  }
];

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("submit");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [viewingTicket, setViewingTicket] = useState<Ticket | null>(null);
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [bulkSelectionMode, setBulkSelectionMode] = useState(false);

  // Add debug logging for template selection
  useEffect(() => {
    console.log('Current template selection:', selectedTemplate);
    console.log('Active tab:', activeTab);
  }, [selectedTemplate, activeTab]);

  // Filter tickets based on the active tab
  const filteredTickets = tickets.filter((ticket) => {
    if (activeTab === "my-tickets") {
      return true; // Show all tickets in My Tickets tab
    } else if (activeTab === "approvals") {
      return ticket.status === "Pending"; // Only show pending tickets in Approvals tab
    }
    return false;
  });

  const handleTemplateSelect = (templateName: string) => {
    console.log('Template selected:', templateName);
    setSelectedTemplate(templateName);
  };

  const handleTicketSubmit = (data: any) => {
    console.log('Submitting ticket with data:', data); // Debug log

    const newTicket: Ticket = {
      id: uuidv4(),
      templateName: data.templateName,
      storeCode: "STORE001", // This should come from user context/state
      employeeId: "EMP001", // This should come from user context/state
      description: data.description,
      status: "Pending",
      createdAt: new Date().toISOString(),
      images: data.images,
      // Add specific fields based on ticket type
      ...(data.product && { product: data.product }),
      ...(data.newCount && { newCount: data.newCount }),
      ...(data.newMrp && { newMrp: data.newMrp }),
      ...(data.expenseTitle && { 
        expenseTitle: data.expenseTitle,
        expenseAmount: data.expenseAmount,
        expensePurpose: data.expensePurpose
      })
    };

    console.log('Created new ticket:', newTicket); // Debug log
    
    setTickets(prevTickets => {
      const updatedTickets = [newTicket, ...prevTickets];
      console.log('Updated tickets state:', updatedTickets); // Debug log
      return updatedTickets;
    });
    
    setSelectedTemplate(null);
    setActiveTab("my-tickets");

    toast({
      title: "Success",
      description: "Ticket submitted successfully",
    });
  };

  const handleTicketClick = (ticket: Ticket) => {
    if (bulkSelectionMode) {
      toggleTicketSelection(ticket.id);
    } else {
      setViewingTicket(ticket);
    }
  };

  const handleStatusChange = (ticketId: string, newStatus: "Pending" | "Approved" | "Rejected", comment?: string) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );
    setViewingTicket(null);
  };

  const toggleTicketSelection = (id: string) => {
    setSelectedTickets((prev) => 
      prev.includes(id) 
        ? prev.filter((ticketId) => ticketId !== id) 
        : [...prev, id]
    );
  };

  const handleBulkApprove = () => {
    setTickets(
      tickets.map((ticket) =>
        selectedTickets.includes(ticket.id) 
          ? { ...ticket, status: "Approved" as "Pending" | "Approved" | "Rejected" } 
          : ticket
      )
    );
    
    toast({
      title: "Success",
      description: `${selectedTickets.length} tickets approved`,
    });

    setBulkSelectionMode(false);
    setSelectedTickets([]);
  };

  useEffect(() => {
    // Reset selections when tab changes
    setBulkSelectionMode(false);
    setSelectedTickets([]);
    setViewingTicket(null);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-secondary pb-16">
      <Header />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="p-4 pb-20">
        {/* Submit Ticket Tab */}
        {activeTab === "submit" && !selectedTemplate && (
          <>
            <h2 className="text-lg font-medium mb-4">Select Ticket Type</h2>
            <div className="grid grid-cols-2 gap-4">
              {ticketTemplates.map((template) => (
                <TicketTemplateCard
                  key={template.id}
                  icon={template.icon}
                  title={template.name}
                  onClick={() => handleTemplateSelect(template.name)}
                />
              ))}
            </div>
          </>
        )}

        {/* Ticket Form */}
        {activeTab === "submit" && selectedTemplate && (
          <div className="animate-fade-in">
            <TicketForm
              key={selectedTemplate} // Add key to force re-render
              templateName={selectedTemplate}
              onBack={() => {
                console.log('Going back from template:', selectedTemplate);
                setSelectedTemplate(null);
              }}
              onSubmit={handleTicketSubmit}
              storeCode="STORE001"
              employeeId="EMP001"
            />
          </div>
        )}

        {/* My Tickets Tab */}
        {activeTab === "my-tickets" && !viewingTicket && (
          <>
            <h2 className="text-lg font-medium mb-4">My Tickets</h2>
            <TicketList
              tickets={filteredTickets}
              onTicketClick={handleTicketClick}
              type="my-tickets"
            />
          </>
        )}

        {/* Approvals Tab */}
        {activeTab === "approvals" && !viewingTicket && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Pending Approvals</h2>
              <button 
                className="text-sm text-primary font-medium"
                onClick={() => setBulkSelectionMode(!bulkSelectionMode)}
              >
                {bulkSelectionMode ? "Cancel" : "Select Multiple"}
              </button>
            </div>

            {bulkSelectionMode ? (
              <div className="divide-y">
                {filteredTickets.map((ticket) => (
                  <div 
                    key={ticket.id} 
                    className="p-4 hover:bg-gray-50 flex items-center"
                  >
                    <Checkbox 
                      checked={selectedTickets.includes(ticket.id)}
                      onCheckedChange={() => toggleTicketSelection(ticket.id)}
                      className="mr-3"
                    />
                    <div 
                      className="flex-1"
                      onClick={() => toggleTicketSelection(ticket.id)}
                    >
                      <h3 className="font-medium text-gray-900 mb-1">{ticket.templateName}</h3>
                      <p className="text-sm text-gray-500">{ticket.storeCode} • {ticket.employeeId}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <TicketList
                tickets={filteredTickets}
                onTicketClick={handleTicketClick}
                type="approvals"
              />
            )}
          </>
        )}

        {/* Ticket Details View */}
        {viewingTicket && (
          <TicketDetail
            ticket={viewingTicket}
            onBack={() => setViewingTicket(null)}
            onStatusChange={handleStatusChange}
            isApprovalView={activeTab === "approvals"}
          />
        )}
      </div>

      {/* Bulk Actions Bar */}
      <BulkActions
        selectedCount={selectedTickets.length}
        onApproveAll={handleBulkApprove}
        onClose={() => {
          setBulkSelectionMode(false);
          setSelectedTickets([]);
        }}
      />

      <BottomNavigation />
    </div>
  );
};

// Add this CSS animation
const styles = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Index;
