import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";

interface TicketFormProps {
  templateName: string;
  onBack: () => void;
  onSubmit: (data: any) => void;
  storeCode: string;
  employeeId: string;
}

interface Product {
  code: string;
  name: string;
  description: string;
  image: string;
  mrp?: number;
  rrp?: number;
}

const TicketForm: React.FC<TicketFormProps> = ({ 
  templateName, 
  onBack, 
  onSubmit,
  storeCode,
  employeeId 
}) => {
  const { toast } = useToast();
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productSearch, setProductSearch] = useState("");
  const [newCount, setNewCount] = useState("");
  const [newMrp, setNewMrp] = useState("");
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expensePurpose, setExpensePurpose] = useState("");

  // Mock products data - replace with actual API call
  const mockProducts: Product[] = [
    {
      code: "P001",
      name: "Product 1",
      description: "Description for Product 1",
      image: "https://via.placeholder.com/150",
      mrp: 100,
      rrp: 90
    },
    {
      code: "P002",
      name: "Product 2",
      description: "Description for Product 2",
      image: "https://via.placeholder.com/150",
      mrp: 150,
      rrp: 130
    },
    {
      code: "P003",
      name: "Product 3",
      description: "Description for Product 3",
      image: "https://via.placeholder.com/150",
      mrp: 200,
      rrp: 180
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => 
        URL.createObjectURL(file)
      );
      setImages([...images, ...newImages]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with template:', templateName); // Debug log

    let ticketData: any = {
      templateName,
      storeCode,
      employeeId,
      description,
      images,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    // Add specific data based on ticket type
    switch (templateName) {
      case "Count Correction":
        console.log('Processing Count Correction ticket:', { selectedProduct, newCount }); // Debug log
        if (!selectedProduct || !newCount) {
          toast({
            title: "Error",
            description: "Please select a product and enter the new count",
            variant: "destructive",
          });
          return;
        }
        ticketData = {
          ...ticketData,
          product: selectedProduct,
          newCount: parseInt(newCount),
        };
        break;

      case "Markdown Request":
        console.log('Processing Markdown Request ticket:', { selectedProduct, newMrp }); // Debug log
        if (!selectedProduct || !newMrp) {
          toast({
            title: "Error",
            description: "Please select a product and enter the new MRP",
            variant: "destructive",
          });
          return;
        }
        ticketData = {
          ...ticketData,
          product: selectedProduct,
          newMrp: parseFloat(newMrp),
        };
        break;

      case "Imprest Submission":
        if (!expenseTitle || !expenseAmount || !expensePurpose) {
          toast({
            title: "Error",
            description: "Please fill in all expense details",
            variant: "destructive",
          });
          return;
        }
        ticketData = {
          ...ticketData,
          expenseTitle,
          expenseAmount: parseFloat(expenseAmount),
          expensePurpose,
        };
        break;
    }

    console.log('Submitting ticket data:', ticketData); // Debug log
    onSubmit(ticketData);
    toast({
      title: "Success",
      description: "Ticket submitted successfully",
    });
  };

  const renderFormFields = () => {
    console.log('Rendering form fields for template:', templateName); // Debug log

    switch (templateName) {
      case "Count Correction":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Search Product</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by product code or name..."
                  value={productSearch}
                  onChange={(e) => {
                    console.log('Product search value:', e.target.value); // Debug log
                    setProductSearch(e.target.value);
                  }}
                  className="w-full"
                />
                {productSearch && !selectedProduct && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                    {mockProducts
                      .filter(p => 
                        p.code.toLowerCase().includes(productSearch.toLowerCase()) ||
                        p.name.toLowerCase().includes(productSearch.toLowerCase())
                      )
                      .map((product) => (
                        <div
                          key={product.code}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            console.log('Selected product:', product); // Debug log
                            setSelectedProduct(product);
                            setProductSearch(product.name);
                          }}
                        >
                          {product.code} - {product.name}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {selectedProduct && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex gap-4">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="font-medium">{selectedProduct.name}</h4>
                      <p className="text-sm text-gray-600">{selectedProduct.description}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">New Count</label>
                  <Input
                    type="number"
                    placeholder="Enter new count"
                    value={newCount}
                    onChange={(e) => {
                      console.log('New count value:', e.target.value); // Debug log
                      setNewCount(e.target.value);
                    }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    placeholder="Add any additional details"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case "Markdown Request":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Search Product</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by product code or name..."
                  value={productSearch}
                  onChange={(e) => {
                    console.log('Product search value:', e.target.value); // Debug log
                    setProductSearch(e.target.value);
                  }}
                  className="w-full"
                />
                {productSearch && !selectedProduct && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                    {mockProducts
                      .filter(p => 
                        p.code.toLowerCase().includes(productSearch.toLowerCase()) ||
                        p.name.toLowerCase().includes(productSearch.toLowerCase())
                      )
                      .map((product) => (
                        <div
                          key={product.code}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            console.log('Selected product:', product); // Debug log
                            setSelectedProduct(product);
                            setProductSearch(product.name);
                          }}
                        >
                          {product.code} - {product.name}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {selectedProduct && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex gap-4">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="font-medium">{selectedProduct.name}</h4>
                      <p className="text-sm text-gray-600">{selectedProduct.description}</p>
                      <div className="mt-2 text-sm">
                        <p>Current MRP: ₹{selectedProduct.mrp}</p>
                        <p>Current RRP: ₹{selectedProduct.rrp}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">New MRP</label>
                  <Input
                    type="number"
                    placeholder="Enter new MRP"
                    value={newMrp}
                    onChange={(e) => {
                      console.log('New MRP value:', e.target.value); // Debug log
                      setNewMrp(e.target.value);
                    }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    placeholder="Add any additional details"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case "Imprest Submission":
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Expense Title</label>
              <Input
                placeholder="Enter expense title"
                value={expenseTitle}
                onChange={(e) => setExpenseTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Expense Amount</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Purpose</label>
              <Textarea
                placeholder="Describe the purpose of the expense"
                value={expensePurpose}
                onChange={(e) => setExpensePurpose(e.target.value)}
                rows={4}
                className="resize-none"
                required
              />
            </div>
          </>
        );

      default:
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              placeholder="Describe your issue"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
        );
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
        <h2 className="text-lg font-medium">{templateName}</h2>
      </div>

      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">Store Code</label>
            <p className="text-sm">{storeCode}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Employee ID</label>
            <p className="text-sm">{employeeId}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {renderFormFields()}

        <div>
          <label className="block text-sm font-medium mb-1">Attach Photos</label>
          <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
            <input
              type="file"
              id="fileInput"
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
            <label 
              htmlFor="fileInput" 
              className="cursor-pointer text-primary text-sm inline-block"
            >
              Tap to upload images
            </label>
          </div>
          
          {images.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {images.map((img, index) => (
                <div key={index} className="relative w-16 h-16">
                  <img 
                    src={img} 
                    alt={`Uploaded ${index}`} 
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90"
        >
          Submit Ticket
        </Button>
      </form>
    </div>
  );
};

export default TicketForm;
