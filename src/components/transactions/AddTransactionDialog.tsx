
import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

// Categories for transactions
const categories = [
  { value: 'Salary', label: 'Salary' },
  { value: 'Shopping', label: 'Shopping' },
  { value: 'Food', label: 'Food' },
  { value: 'Coffee', label: 'Coffee' },
  { value: 'Rent', label: 'Rent' },
  { value: 'Subscriptions', label: 'Subscriptions' },
  { value: 'Education', label: 'Education' },
  { value: 'Gifts', label: 'Gifts' },
  { value: 'Transportation', label: 'Transportation' },
  { value: 'Utilities', label: 'Utilities' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Health', label: 'Health' },
  { value: 'Other', label: 'Other' },
];

interface AddTransactionDialogProps {
  onAddTransaction?: (transaction: any) => void;
  triggerButton?: React.ReactNode;
}

const AddTransactionDialog = ({ 
  onAddTransaction,
  triggerButton 
}: AddTransactionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your transaction",
        variant: "destructive",
      });
      return;
    }
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
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
    
    // Create new transaction object
    const newTransaction = {
      id: Date.now().toString(),
      title,
      amount: Number(amount),
      type,
      category,
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: '2-digit', 
        year: 'numeric'
      })
    };
    
    // Call the onAddTransaction callback if provided
    if (onAddTransaction) {
      onAddTransaction(newTransaction);
    }
    
    // Show success message
    toast({
      title: "Success",
      description: "Transaction added successfully",
    });
    
    // Reset form and close dialog
    setTitle('');
    setAmount('');
    setType('expense');
    setCategory('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-full shadow-soft hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              placeholder="e.g. Grocery Shopping" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input 
              id="amount" 
              type="number" 
              min="0.01" 
              step="0.01" 
              placeholder="0.00" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Type</Label>
            <RadioGroup 
              defaultValue="expense"
              value={type}
              onValueChange={(value) => setType(value as 'income' | 'expense')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="expense" id="expense" />
                <Label htmlFor="expense" className="cursor-pointer">Expense</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="income" id="income" />
                <Label htmlFor="income" className="cursor-pointer">Income</Label>
              </div>
            </RadioGroup>
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
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Transaction</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;
