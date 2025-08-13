import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Calendar,
  DollarSign
} from "lucide-react";

const suspiciousTransactions = [
  {
    id: "1",
    date: "2024-01-14",
    vendor: "Unknown Online Store",
    amount: -299.99,
    category: "Shopping",
    fraudScore: 0.85,
    reason: "Unusual merchant pattern detected",
    location: "Unknown Location"
  },
  {
    id: "2",
    date: "2024-01-13", 
    vendor: "Suspicious ATM Withdrawal",
    amount: -500.00,
    category: "Cash",
    fraudScore: 0.92,
    reason: "ATM withdrawal at unusual hour (3:22 AM)",
    location: "Remote Location, 200 miles from home"
  },
  {
    id: "3",
    date: "2024-01-12",
    vendor: "Foreign Currency Exchange",
    amount: -1250.00,
    category: "Finance",
    fraudScore: 0.78,
    reason: "Large international transaction",
    location: "International - Unknown Country"
  },
  {
    id: "4",
    date: "2024-01-11",
    vendor: "Gas Station XYZ",
    amount: -89.99,
    category: "Transportation", 
    fraudScore: 0.71,
    reason: "Multiple transactions within 5 minutes",
    location: "Cross-state location"
  }
];

export default function Suspicious() {
  const [transactions, setTransactions] = useState(suspiciousTransactions);
  const { toast } = useToast();

  const handleMarkSafe = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    toast({
      title: "Transaction marked as safe",
      description: "This transaction has been removed from suspicious activity.",
    });
  };

  const handleReportFraud = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    toast({
      title: "Fraud reported",
      description: "We've started investigating this transaction and will contact you soon.",
      variant: "destructive",
    });
  };

  const getFraudLevel = (score: number) => {
    if (score >= 0.9) return { label: "Critical", color: "bg-red-500", textColor: "text-red-500" };
    if (score >= 0.8) return { label: "High", color: "bg-orange-500", textColor: "text-orange-500" };
    if (score >= 0.7) return { label: "Medium", color: "bg-yellow-500", textColor: "text-yellow-500" };
    return { label: "Low", color: "bg-blue-500", textColor: "text-blue-500" };
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-danger/20 rounded-lg">
          <ShieldAlert className="h-6 w-6 text-danger" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Suspicious Transactions</h1>
          <p className="text-muted-foreground">
            Review and take action on potentially fraudulent activity
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-danger/10 to-danger/5 border-danger/20">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-danger" />
              <div>
                <p className="text-sm font-medium text-danger">Active Alerts</p>
                <p className="text-2xl font-bold">{transactions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm font-medium text-warning">Amount at Risk</p>
                <p className="text-2xl font-bold">
                  ${transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0).toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Avg. Risk Score</p>
                <p className="text-2xl font-bold">
                  {(transactions.reduce((sum, t) => sum + t.fraudScore, 0) / transactions.length * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suspicious Transactions List */}
      {transactions.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">All Clear!</h3>
              <p className="text-muted-foreground">
                No suspicious transactions detected. Your account looks secure.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {transactions.map((transaction) => {
            const fraudLevel = getFraudLevel(transaction.fraudScore);
            
            return (
              <Card key={transaction.id} className="border-l-4 border-l-danger">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-danger/20 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-danger" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{transaction.vendor}</CardTitle>
                        <CardDescription className="flex items-center space-x-4 mt-1">
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{transaction.date}</span>
                          </span>
                          <Badge className={`text-xs ${fraudLevel.textColor} border-current`}>
                            {fraudLevel.label} Risk ({(transaction.fraudScore * 100).toFixed(0)}%)
                          </Badge>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-danger">
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {transaction.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 text-danger">🚨 Fraud Alert Reason</h4>
                    <p className="text-sm text-muted-foreground">{transaction.reason}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      📍 Location: {transaction.location}
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-success text-success hover:bg-success hover:text-success-foreground"
                      onClick={() => handleMarkSafe(transaction.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Safe
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="flex-1"
                      onClick={() => handleReportFraud(transaction.id)}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Report Fraud
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}