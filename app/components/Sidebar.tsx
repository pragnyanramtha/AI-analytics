import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Brain, 
  Settings, 
  HelpCircle,
  Activity,
  Zap,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

export function Sidebar() {
  const [activeItem, setActiveItem] = useState('Overview');

  const navigationItems = [
    { icon: BarChart3, label: 'Overview', active: true, notifications: 0 },
    { icon: TrendingUp, label: 'Analytics', active: false, notifications: 2 },
    { icon: Users, label: 'Users', active: false, notifications: 0 },
    { icon: DollarSign, label: 'Revenue', active: false, notifications: 1 },
    { icon: Brain, label: 'AI Insights', active: false, notifications: 3 },
    { icon: Settings, label: 'Settings', active: false, notifications: 0 },
    { icon: HelpCircle, label: 'Help', active: false, notifications: 0 },
  ];

  return (
    <div className="w-64 bg-sidebar/90 backdrop-blur-sm border-r border-sidebar-border/50 p-4 space-y-4 h-screen overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-6 p-2"
      >
        <div className="p-2 rounded-lg bg-gradient-to-br from-chart-1/20 to-chart-2/20 border border-chart-1/30">
          <Activity className="h-6 w-6 text-chart-1" />
        </div>
        <div>
          <span className="text-sidebar-foreground">AnalyticsAI</span>
          <p className="text-xs text-sidebar-foreground/70">Pro Dashboard</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-4 bg-gradient-to-br from-chart-1/10 via-chart-2/10 to-chart-3/10 border-chart-1/20 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sidebar-accent-foreground text-sm">AI Status</p>
              <Badge className="mt-1 bg-green-500/20 text-green-400 border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                Active
              </Badge>
            </div>
            <Brain className="h-5 w-5 text-chart-1" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-sidebar-accent-foreground/70">Processing</span>
              <span className="text-chart-1">84%</span>
            </div>
            <Progress value={84} className="h-1" />
          </div>
        </Card>
      </motion.div>

      <nav className="space-y-1">
        {navigationItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Button
              variant="ghost"
              onClick={() => setActiveItem(item.label)}
              className={`w-full justify-start gap-3 h-10 transition-all duration-300 group relative ${
                activeItem === item.label 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm border border-sidebar-border/30' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1 text-left">{item.label}</span>
              
              {item.notifications > 0 && (
                <Badge className="bg-chart-1/20 text-chart-1 border-chart-1/30 text-xs h-5 px-1.5">
                  {item.notifications}
                </Badge>
              )}
              
              <ChevronRight className={`h-3 w-3 transition-transform duration-300 opacity-0 group-hover:opacity-100 ${
                activeItem === item.label ? 'translate-x-1 opacity-100' : ''
              }`} />
              
              {activeItem === item.label && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 w-1 h-6 bg-chart-1 rounded-r-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Button>
          </motion.div>
        ))}
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-auto"
      >
        <Card className="p-4 bg-gradient-to-br from-chart-1/10 via-chart-2/10 to-chart-5/10 border border-chart-1/20 backdrop-blur-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-chart-1" />
              <p className="text-sm">Upgrade to Pro</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Get advanced AI insights, unlimited data retention, and custom dashboards.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Usage</span>
                <span className="text-chart-1">7/10 reports</span>
              </div>
              <Progress value={70} className="h-1" />
            </div>
            <Button size="sm" className="w-full bg-gradient-to-r from-chart-1 to-chart-2 text-white border-0 hover:from-chart-1/90 hover:to-chart-2/90">
              <Zap className="h-3 w-3 mr-2" />
              Upgrade Now
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}