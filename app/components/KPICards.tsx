import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Eye, ArrowUpRight, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export function KPICards() {
  const [animatedValues, setAnimatedValues] = useState({
    revenue: 124563,
    users: 8543,
    conversion: 3.24,
    pageViews: 45123
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValues(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 100) - 50,
        users: prev.users + Math.floor(Math.random() * 10) - 5,
        conversion: prev.conversion + (Math.random() * 0.1 - 0.05),
        pageViews: prev.pageViews + Math.floor(Math.random() * 50) - 25
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const kpis = [
    {
      title: 'Total Revenue',
      value: `$${animatedValues.revenue.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      description: 'vs last month',
      gradient: 'from-green-500/20 to-emerald-500/20',
      iconColor: 'text-green-500'
    },
    {
      title: 'Active Users',
      value: animatedValues.users.toLocaleString(),
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      description: 'vs last month',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Conversion Rate',
      value: `${animatedValues.conversion.toFixed(2)}%`,
      change: '-2.1%',
      trend: 'down',
      icon: ShoppingCart,
      description: 'vs last month',
      gradient: 'from-orange-500/20 to-red-500/20',
      iconColor: 'text-orange-500'
    },
    {
      title: 'Page Views',
      value: animatedValues.pageViews.toLocaleString(),
      change: '+15.3%',
      trend: 'up',
      icon: Eye,
      description: 'vs last month',
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="group"
        >
          <Card className={`relative overflow-hidden border-border/50 bg-gradient-to-br ${kpi.gradient} hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {kpi.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-background/50 group-hover:bg-background/80 transition-colors ${kpi.iconColor}`}>
                <kpi.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <motion.p 
                  className="text-2xl group-hover:text-3xl transition-all duration-300"
                  key={kpi.value}
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  {kpi.value}
                </motion.p>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={kpi.trend === 'up' ? 'default' : 'destructive'}
                    className={`text-xs transition-all duration-300 ${
                      kpi.trend === 'up' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30' 
                        : 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30'
                    }`}
                  >
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {kpi.change}
                  </Badge>
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    {kpi.description}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Activity className="h-3 w-3 text-chart-1" />
                  <span className="text-xs text-chart-1">Live data</span>
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}