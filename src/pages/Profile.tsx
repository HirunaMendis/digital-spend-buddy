import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Phone, 
  Download, 
  Shield, 
  Bell,
  CreditCard,
  Settings
} from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    preferredContact: "email",
    notifications: {
      transactions: true,
      suspicious: true,
      insights: true,
      weekly: false
    }
  });
  
  const { toast } = useToast();

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleDownloadData = () => {
    toast({
      title: "Data export initiated",
      description: "You'll receive an email with your data export within 24 hours.",
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/20 rounded-lg">
          <User className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Profile & Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and data</p>
        </div>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your basic account details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                className="bg-secondary border-border"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="pl-10 bg-secondary border-border"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  className="pl-10 bg-secondary border-border"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact">Preferred Contact Method</Label>
              <Select value={profile.preferredContact} onValueChange={(value) => setProfile(prev => ({ ...prev, preferredContact: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button onClick={handleSaveProfile} className="w-full md:w-auto">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Notification Preferences</CardTitle>
          </div>
          <CardDescription>
            Choose what notifications you'd like to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
              <div>
                <h4 className="font-medium">Transaction Alerts</h4>
                <p className="text-sm text-muted-foreground">
                  Get notified for every transaction on your account
                </p>
              </div>
              <Switch
                checked={profile.notifications.transactions}
                onCheckedChange={(checked) => handleNotificationChange('transactions', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
              <div>
                <h4 className="font-medium">Suspicious Activity</h4>
                <p className="text-sm text-muted-foreground">
                  Immediate alerts for potentially fraudulent transactions
                </p>
              </div>
              <Switch
                checked={profile.notifications.suspicious}
                onCheckedChange={(checked) => handleNotificationChange('suspicious', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
              <div>
                <h4 className="font-medium">AI Insights</h4>
                <p className="text-sm text-muted-foreground">
                  Smart suggestions and spending insights from our AI
                </p>
              </div>
              <Switch
                checked={profile.notifications.insights}
                onCheckedChange={(checked) => handleNotificationChange('insights', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
              <div>
                <h4 className="font-medium">Weekly Summary</h4>
                <p className="text-sm text-muted-foreground">
                  Weekly email summary of your financial activity
                </p>
              </div>
              <Switch
                checked={profile.notifications.weekly}
                onCheckedChange={(checked) => handleNotificationChange('weekly', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security & Privacy */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Security & Privacy</CardTitle>
          </div>
          <CardDescription>
            Manage your account security and data preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span className="font-medium">Change Password</span>
              </div>
              <p className="text-xs text-muted-foreground text-left">
                Update your account password for better security
              </p>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
              <div className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span className="font-medium">Two-Factor Auth</span>
              </div>
              <p className="text-xs text-muted-foreground text-left">
                Add an extra layer of security to your account
              </p>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Download your data or manage your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <h4 className="font-semibold text-sm mb-2">📊 Download Your Data</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Export all your transaction data, insights, and account information as a comprehensive report.
            </p>
            <Button 
              variant="outline"
              onClick={handleDownloadData}
              className="w-full md:w-auto"
            >
              <Download className="w-4 h-4 mr-2" />
              Request Data Export
            </Button>
          </div>
          
          <div className="bg-danger/5 p-4 rounded-lg border border-danger/20">
            <h4 className="font-semibold text-sm mb-2 text-danger">⚠️ Account Deletion</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Button variant="destructive" className="w-full md:w-auto">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}