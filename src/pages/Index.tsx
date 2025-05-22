
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
  Consumables: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18h2a1 1 0 0 0 1-1v-3h3l3-4.5V8a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v8"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
  ),
  Inventory: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
  ),
  Other: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cube"><path d="m21 7.5-9-5.25L3 7.5m18 0v9l-9 5.25m9-14.25-9 5.25m0 0-9-5.25m9 5.25v9"/></svg>
  )
};

const ticketTemplates = [
  { id: 1, name: "Count Correction", icon: <Icons.CountCorrection /> },
  { id: 2, name: "Markdown Request", icon: <Icons.Markdown /> },
  { id: 3, name: "Imprest Submission", icon: <Icons.Imprest /> },
  { id: 4, name: "Consumables Request", icon: <Icons.Consumables /> },
  { id: 5, name: "Inventory Adjustment", icon: <Icons.Inventory /> },
  { id: 6, name: "Other Request", icon: <Icons.Other /> }
];

// Sample ticket data
const initialTickets: Ticket[] = [
  {
    id: "1",
    templateName: "Count Correction",
    title: "Inventory Count Error - SKU12345",
    description: "System shows 10 units but actual count is 8 units.",
    status: "Pending",
    createdAt: "2023-05-15T10:30:00Z"
  },
  {
    id: "2",
    templateName: "Markdown Request",
    title: "Clearance Items - Summer Collection",
    description: "Request to mark down summer collection by 30%",
    status: "Approved",
    createdAt: "2023-05-12T08:15:00Z"
  },
  {
    id: "3",
    templateName: "Consumables Request",
    title: "Receipt Paper Restock",
    description: "Need additional receipt paper rolls for all POS terminals",
    status: "Rejected",
    createdAt: "2023-05-10T14:45:00Z"
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

  // Filter tickets based on the active tab
  const filteredTickets = tickets.filter((ticket) => {
    if (activeTab === "my-tickets") {
      return true; // Show all tickets in My Tickets tab
    } else if (activeTab === "approvals") {
      return ticket.status === "Pending"; // Only show pending tickets in Approvals tab
    }
    return false;
  });

  const handleTicketSubmit = (data: any) => {
    const newTicket: Ticket = {
      id: uuidv4(),
      templateName: data.templateName,
      title: data.title,
      description: data.description,
      status: "Pending",
      createdAt: new Date().toISOString(),
      images: data.images
    };

    setTickets([newTicket, ...tickets]);
    setSelectedTemplate(null);
    setActiveTab("my-tickets");
  };

  const handleTicketClick = (ticket: Ticket) => {
    if (bulkSelectionMode) {
      toggleTicketSelection(ticket.id);
    } else {
      setViewingTicket(ticket);
    }
  };

  const handleStatusChange = (ticketId: string, status: string, comment?: string) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status } : ticket
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
          ? { ...ticket, status: "Approved" } 
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
                  onClick={() => setSelectedTemplate(template.name)}
                />
              ))}
            </div>
          </>
        )}

        {/* Ticket Form */}
        {activeTab === "submit" && selectedTemplate && (
          <TicketForm
            templateName={selectedTemplate}
            onBack={() => setSelectedTemplate(null)}
            onSubmit={handleTicketSubmit}
          />
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
                      <h3 className="font-medium text-gray-900 mb-1">{ticket.title}</h3>
                      <p className="text-sm text-gray-500">{ticket.templateName}</p>
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

export default Index;
