
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";

interface TicketFormProps {
  templateName: string;
  onBack: () => void;
  onSubmit: (data: any) => void;
}

const TicketForm: React.FC<TicketFormProps> = ({ templateName, onBack, onSubmit }) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, we would upload the images to a server here
      // For this demo, we'll just create object URLs
      const newImages = Array.from(e.target.files).map((file) => 
        URL.createObjectURL(file)
      );
      setImages([...images, ...newImages]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a ticket title",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      templateName,
      title,
      description,
      images,
      status: "Pending",
      createdAt: new Date().toISOString(),
    });

    toast({
      title: "Success",
      description: "Ticket submitted successfully",
    });
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input
            placeholder="Enter ticket title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

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
