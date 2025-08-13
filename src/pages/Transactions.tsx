import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Download, 
  CreditCard, 
  Shield, 
  ShieldAlert,
  Calendar
} from "lucide-react";

const transactions = [
  {
    id: "1",
    date: "2024-01-15",
    vendor: "Starbucks Coffee",
    amount: -5.45,
    category: "Food & Dining",
    fraudScore: 0.1,
    status: "normal"
  },
  {
    id: "2", 
    date: "2024-01-15",
    vendor: "Salary Deposit",
    amount: 2500.00,
    category: "Income",
    fraudScore: 0.0,
    status: "normal"
  },
  {
    id: "3",
    date: "2024-01-14",
    vendor: "Unknown Online Store",
    amount: -299.99,
    category: "Shopping",
    fraudScore: 0.85,
    status: "suspicious"
  },
  {
    id: "4",
    date: "2024-01-14",
    vendor: "Netflix",
    amount: -15.99,
    category: "Entertainment",
    fraudScore: 0.0,
    status: "normal"
  },
  {
    id: "5",
    date: "2024-01-13",
    vendor: "Uber",
    amount: -23.50,
    category: "Transportation",
    fraudScore: 0.2,
    status: "normal"
  },
  {
    id: "6",
    date: "2024-01-13",
    vendor: "Suspicious ATM Withdrawal",
    amount: -500.00,
    category: "Cash",
    fraudScore: 0.92,
    status: "suspicious"
  },
  {
    id: "7",
    date: "2024-01-12",
    vendor: "Amazon Prime",
    amount: -12.99,
    category: "Shopping",
    fraudScore: 0.0,
    status: "normal"
  },
  {
    id: "8",
    date: "2024-01-12",
    vendor: "Grocery Store",
    amount: -84.32,
    category: "Food & Dining",
    fraudScore: 0.1,
    status: "normal"
  }
];

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getFraudBadge = (fraudScore: number, status: string) => {
    if (status === "suspicious" || fraudScore > 0.7) {
      return <Badge variant="destructive" className="text-xs"><ShieldAlert className="w-3 h-3 mr-1" />Suspicious</Badge>;
    } else if (fraudScore > 0.3) {
      return <Badge variant="outline" className="text-xs"><Shield className="w-3 h-3 mr-1" />Review</Badge>;
    } else {
      return <Badge variant="outline" className="text-xs text-success border-success/20"><Shield className="w-3 h-3 mr-1" />Safe</Badge>;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Food & Dining": "bg-purple-500/20 text-purple-300",
      "Transportation": "bg-blue-500/20 text-blue-300", 
      "Shopping": "bg-green-500/20 text-green-300",
      "Entertainment": "bg-yellow-500/20 text-yellow-300",
      "Income": "bg-emerald-500/20 text-emerald-300",
      "Cash": "bg-red-500/20 text-red-300"
    };
    return colors[category] || "bg-gray-500/20 text-gray-300";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">Monitor all your financial activity</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                <SelectItem value="Transportation">Transportation</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Income">Income</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="suspicious">Suspicious</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            {filteredTransactions.length} transactions found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary/80 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-card rounded-lg">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </div>
                  
                  <div>
                    <p className="font-medium">{transaction.vendor}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{transaction.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Badge className={`text-xs ${getCategoryColor(transaction.category)}`}>
                    {transaction.category}
                  </Badge>
                  
                  {getFraudBadge(transaction.fraudScore, transaction.status)}
                  
                  <div className="text-right">
                    <span className={`font-semibold ${
                      transaction.amount > 0 ? 'text-success' : 'text-foreground'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      Risk: {(transaction.fraudScore * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}