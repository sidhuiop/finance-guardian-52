
import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

// Categories for budgets
const categories = [
  { value: 'Essentials', label: 'Essentials' },
  { value: 'Lifestyle', label: 'Lifestyle' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Financial Goals', label: 'Financial Goals' },
  { value: 'Professional', label: 'Professional' },
  { value: 'Leisure', label: 'Leisure' },
  { value: 'Other', label: 'Other' },
];

// Icons for budgets
const icons = [
  { value: 'Home', label: 'Home' },
  { value: 'ShoppingCart', label: 'Shopping' },
  { value: 'Utensils', label: 'Food' },
  { value: 'CreditCard', label: 'Subscriptions' },
  { value: 'PiggyBank', label: 'Savings' },
  { value: 'Briefcase', label: 'Work' },
  { value: 'Heart', label: 'Health' },
  { value: 'Plane', label: 'Travel' },
];

// Colors for budgets
const colors = [
  { value: 'bg-blue-500', label: 'Blue' },
  { value: 'bg-green-500', label: 'Green' },
  { value: 'bg-red-500', label: 'Red' },
  { value: 'bg-amber-500', label: 'Amber' },
  { value: 'bg-purple-500', label: 'Purple' },
  { value: 'bg-pink-500', label: 'Pink' },
  { value: 'bg-cyan-500', label: 'Cyan' },
  { value: 'bg-gray-600', label: 'Gray' },
];

interface AddBudgetDialogProps {
  onAddBudget?: (budget: any) => void;
  triggerButton?: React.ReactNode;
}

const AddBudgetDialog = ({ 
  onAddBudget,
  triggerButton 
}: AddBudgetDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [allocated, setAllocated] = useState('');
  const [category, setCategory] = useState('');
  const [icon, setIcon] = useState('');
  const [color, setColor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for your budget",
        variant: "destructive",
      });
      return;
    }
    
    if (!allocated || isNaN(Number(allocated)) || Number(allocated) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid budget amount",
        variant: "destructive",
      });
      return;
    }
    
    if (!category) {
      toast({
        title: "Error",
        description: "Please select a category",
        variant: "destructive",
      });
      return;
    }
    
    if (!icon) {
      toast({
        title: "Error",
        description: "Please select an icon",
        variant: "destructive",
      });
      return;
    }
    
    if (!color) {
      toast({
        title: "Error",
        description: "Please select a color",
        variant: "destructive",
      });
      return;
    }
    
    // Create new budget object
    const newBudget = {
      id: Date.now().toString(),
      name,
      icon,
      category,
      allocated: Number(allocated),
      spent: 0, // Initial spent amount is 0
      color,
    };
    
    // Call the onAddBudget callback if provided
    if (onAddBudget) {
      onAddBudget(newBudget);
    }
    
    // Show success message
    toast({
      title: "Success",
      description: "Budget added successfully",
    });
    
    // Reset form and close dialog
    setName('');
    setAllocated('');
    setCategory('');
    setIcon('');
    setColor('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-full shadow-soft hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Add Budget
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Budget</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Budget Name</Label>
            <Input 
              id="name" 
              placeholder="e.g. Groceries" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="allocated">Allocated Amount</Label>
            <Input 
              id="allocated" 
              type="number" 
              min="1" 
              step="1" 
              placeholder="0" 
              value={allocated}
              onChange={(e) => setAllocated(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <Select value={icon} onValueChange={setIcon}>
              <SelectTrigger>
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
              <SelectContent>
                {icons.map((iconOption) => (
                  <SelectItem key={iconOption.value} value={iconOption.value}>
                    {iconOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger>
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                {colors.map((colorOption) => (
                  <SelectItem key={colorOption.value} value={colorOption.value}>
                    {colorOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Budget</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBudgetDialog;
