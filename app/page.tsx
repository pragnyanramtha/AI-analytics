"use client";

import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Button } from './components/ui/button';
import { Moon, Sun, Bell, Search } from 'lucide-react';
import { Input } from './components/ui/input';
import { Badge } from './components/ui/badge';

export default function App() {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add('dark');
    
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen bg-background transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <header className="border-b border-border/50 bg-card/95 backdrop-blur-sm p-4 flex justify-between items-center sticky top-0 z-40">
            <div className="flex items-center gap-6">
              <div>
                <h1 className="bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
                  AI Analytics Dashboard
                </h1>
                <p className="text-muted-foreground text-sm">
                  Real-time insights powered by AI • {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search analytics..."
                  className="pl-10 w-64 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                />
              </div>
              
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-chart-1 hover:bg-chart-1/80">
                  3
                </Badge>
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={toggleDarkMode}
                className="hover:bg-accent/50 transition-colors"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </header>
          <main className="flex-1 p-3 bg-gradient-to-br from-background via-background to-muted/20">
            <Dashboard />
          </main>
        </div>
      </div>
    </div>
  );
}