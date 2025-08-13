import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Calendar,
  DollarSign,
  PieChart,
  BarChart3,
  Target,
  Lightbulb
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts";

const monthlyTrends = [
  { month: "Jul", income: 4200, expenses: 3100, savings: 1100 },
  { month: "Aug", income: 4500, expenses: 3200, savings: 1300 },
  { month: "Sep", income: 4300, expenses: 3400, savings: 900 },
  { month: "Oct", income: 4800, expenses: 3600, savings: 1200 },
  { month: "Nov", income: 4600, expenses: 3300, savings: 1300 },
  { month: "Dec", income: 5100, expenses: 3500, savings: 1600 },
  { month: "Jan", income: 5100, expenses: 3500, savings: 1600 },
];

const categorySpending = [
  { category: "Food & Dining", thisMonth: 1200, lastMonth: 980, change: 22.4 },
  { category: "Transportation", thisMonth: 800, lastMonth: 650, change: 23.1 },
  { category: "Shopping", thisMonth: 600, lastMonth: 750, change: -20.0 },
  { category: "Entertainment", thisMonth: 400, lastMonth: 350, change: 14.3 },
  { category: "Bills & Utilities", thisMonth: 300, lastMonth: 300, change: 0 },
  { category: "Healthcare", thisMonth: 200, lastMonth: 150, change: 33.3 },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("6months");
  const { toast } = useToast();

  const handleDownloadReport = () => {
    toast({
      title: "Report Generated",
      description: "Your financial report has been downloaded as PDF.",
    });
  };

  const totalIncome = monthlyTrends[monthlyTrends.length - 1].income;
  const totalExpenses = monthlyTrends[monthlyTrends.length - 1].expenses;
  const totalSavings = totalIncome - totalExpenses;
  const savingsRate = ((totalSavings / totalIncome) * 100).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Financial Analytics</h1>
          <p className="text-muted-foreground">Deep insights into your spending patterns</p>
        </div>
        <div className="flex space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            onClick={handleDownloadReport}
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${totalIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +6.8% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">${totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +3.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Savings</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSavings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {savingsRate}% savings rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Financial Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.5/10</div>
            <p className="text-xs text-success">
              Excellent financial health
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Income vs Expenses Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Income vs Expenses Trend</CardTitle>
          <CardDescription>
            Track your financial flow over the past {timeRange}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Area
                  type="monotone"
                  dataKey="income"
                  stackId="1"
                  stroke="hsl(var(--success))"
                  fill="hsl(var(--success))"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stackId="2"
                  stroke="hsl(var(--warning))"
                  fill="hsl(var(--warning))"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Category Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Spending Analysis by Category</CardTitle>
          <CardDescription>
            Compare this month's spending with last month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categorySpending.map((category) => (
              <div key={category.category} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div className="flex-1">
                  <h4 className="font-medium">{category.category}</h4>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-muted-foreground">
                      This month: ${category.thisMonth}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Last month: ${category.lastMonth}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={category.change > 0 ? "destructive" : "default"}
                    className={category.change > 0 ? "" : "bg-success text-success-foreground"}
                  >
                    {category.change > 0 ? "+" : ""}{category.change.toFixed(1)}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <CardTitle>AI Financial Insights</CardTitle>
          </div>
          <CardDescription>
            Personalized recommendations based on your spending patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-success/10 p-4 rounded-lg border border-success/20">
              <h4 className="font-semibold text-sm mb-2 text-success">💰 Great Job!</h4>
              <p className="text-sm text-muted-foreground">
                You saved 31.4% of your income this month - that's above the recommended 20%!
              </p>
            </div>
            
            <div className="bg-warning/10 p-4 rounded-lg border border-warning/20">
              <h4 className="font-semibold text-sm mb-2 text-warning">📈 Spending Alert</h4>
              <p className="text-sm text-muted-foreground">
                Your transportation costs increased by 23%. Consider carpooling or public transport.
              </p>
            </div>
            
            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-sm mb-2">🎯 Goal Suggestion</h4>
              <p className="text-sm text-muted-foreground">
                You're on track to save $19,200 this year. Consider investing 60% for better returns.
              </p>
            </div>
            
            <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
              <h4 className="font-semibold text-sm mb-2">💡 Smart Tip</h4>
              <p className="text-sm text-muted-foreground">
                Reduce dining out by 2 meals/week to save an additional $200/month.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}