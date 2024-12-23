  import React, { useState } from 'react';
  import { Link, useLocation } from 'react-router-dom';
  import { Button } from "@/components/ui/button"
  import { cn } from "@/lib/utils"
  import { Home, Activity, MessageSquare, BarChart2, ChevronLeft, ChevronRight } from 'lucide-react';

  const SidebarItem = ({ icon: Icon, label, to, isActive, collapsed }) => (
    <Link to={to}>
      <Button 
        variant={isActive ? "secondary" : "ghost"} 
        className="w-full flex gap-2 justify-start"
      >
        <Icon className=" h-5 w-5" /> 
        { !collapsed && label}
      </Button>
    </Link>
  );

  export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const sidebarItems = [
      { icon: Home, label: 'Home', to: '/' },
      { icon: Activity, label: 'Simulation', to: '/simulation' },
      { icon: MessageSquare, label: 'Feedback', to: '/feedback' },
      { icon: BarChart2, label: 'Reports', to: '/reports' },
    ];

    return (
      <div className={cn(
        "flex flex-col h-screen bg-teal-800 shadow-lg text-white transition-all duration-300 px-2",
        collapsed ? "w-16" : "w-64"
      )}>
        <div className="flex items-center justify-end p-4">
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:bg-white/20"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>
        <nav className="flex flex-col gap-4">
          {sidebarItems.map((item) => (
            <SidebarItem 
              key={item.to} 
              {...item} 
              isActive={location.pathname === item.to}
              collapsed={collapsed}
            />
          ))}
        </nav>
      </div>
    );
  }

