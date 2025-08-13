import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Receipt, 
  Shield, 
  BarChart3, 
  Upload, 
  User 
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: Receipt },
  { name: "Suspicious", href: "/suspicious", icon: Shield },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Upload", href: "/upload", icon: Upload },
  { name: "Profile", href: "/profile", icon: User },
];

export function Navigation() {
  return (
    <nav className="bg-card border-r border-border min-h-screen w-64 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          SmartSpend
        </h1>
        <p className="text-sm text-muted-foreground mt-1">AI Banking Assistant</p>
      </div>
      
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )
              }
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}