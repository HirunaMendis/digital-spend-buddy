import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  Sparkles,
  ArrowUpRight,
  ArrowDownRight 
} from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const spendingData = [
  { name: "Food & Dining", value: 1200, color: "#8b5cf6" },
  { name: "Transportation", value: 800, color: "#06b6d4" },
  { name: "Shopping", value: 600, color: "#10b981" },
  { name: "Entertainment", value: 400, color: "#f59e0b" },
  { name: "Bills", value: 300, color: "#ef4444" },
];

const monthlyData = [
  { name: "Jan", income: 4500, expenses: 3200 },
  { name: "Feb", income: 4800, expenses: 3400 },
  { name: "Mar", income: 4600, expenses: 3600 },
  { name: "Apr", income: 5200, expenses: 3800 },
  { name: "May", income: 4900, expenses: 3300 },
  { name: "Jun", income: 5100, expenses: 3500 },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, John! Here's your financial overview.</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,426.73</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +2.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">$5,100.00</div>
            <p className="text-xs text-muted-foreground">
              +$200 from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">$3,500.00</div>
            <p className="text-xs text-muted-foreground">
              +$300 from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>This month's expense breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {spendingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {spendingData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2 text-sm">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Income vs Expenses */}
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
            <CardDescription>6-month comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Bar dataKey="income" fill="hsl(var(--success))" radius={4} />
                  <Bar dataKey="expenses" fill="hsl(var(--warning))" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>AI Financial Assistant</CardTitle>
          </div>
          <CardDescription>
            Hi! Based on your recent activity, I have a few tips to help you manage better.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-card p-4 rounded-lg border">
            <h4 className="font-semibold text-sm mb-2">💡 Smart Insight</h4>
            <p className="text-sm text-muted-foreground">
              Your travel spending is up by 22% this month. You've spent $400 more than usual on transportation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-success/10 p-4 rounded-lg border border-success/20">
              <h4 className="font-semibold text-sm mb-2 text-success">💰 Saving Tip</h4>
              <p className="text-sm text-muted-foreground">
                Try saving 10% of your monthly income ($510) for emergency funds.
              </p>
            </div>
            
            <div className="bg-warning/10 p-4 rounded-lg border border-warning/20">
              <h4 className="font-semibold text-sm mb-2 text-warning">🍽️ Spending Alert</h4>
              <p className="text-sm text-muted-foreground">
                Consider reducing restaurant visits. You could save $200/month.
              </p>
            </div>
          </div>
          
          <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
            View Detailed Analysis
          </Button>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { vendor: "Starbucks Coffee", amount: -5.45, category: "Food", status: "normal" },
              { vendor: "Salary Deposit", amount: 2500.00, category: "Income", status: "normal" },
              { vendor: "Unknown Transaction", amount: -299.99, category: "Shopping", status: "suspicious" },
              { vendor: "Netflix", amount: -15.99, category: "Entertainment", status: "normal" },
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">{transaction.vendor}</p>
                    <p className="text-xs text-muted-foreground">{transaction.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`font-medium ${transaction.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </span>
                  {transaction.status === "suspicious" && (
                    <Badge variant="destructive">⚠️ Suspicious</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}