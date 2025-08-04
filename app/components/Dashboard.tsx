"use client";

import React, { useState } from 'react';
import { KPICards } from './KPICards';
import { RevenueChart } from './RevenueChart';
import { UserEngagementChart } from './UserEngagementChart';
import { ConversionFunnelChart } from './ConversionFunnelChart';
import { AIInsights } from './AIInsights';
import { EnhancedAIInsights } from './EnhancedAIInsights';
import { EngagementBreakdown } from './EngagementBreakdown';
import { RecentActivity } from './RecentActivity';
import { GeographicDistribution } from './GeographicDistribution';
import { SectorRevenueChart } from './SectorRevenueChart';
import { PerformanceRadarChart } from './PerformanceRadarChart';
import { MarketTrendsHeatmap } from './MarketTrendsHeatmap';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, Filter, RefreshCw, Download, TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Brain } from 'lucide-react';
import { motion } from 'motion/react';

export function Dashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const timeRanges = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Dashboard Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 bg-card/50 rounded-xl border border-border/50 backdrop-blur-sm"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-chart-1" />
            <h2>Advanced Analytics Hub</h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-chart-1/20 text-chart-1 border-chart-1/30">
              <div className="w-2 h-2 bg-chart-1 rounded-full mr-1 animate-pulse"></div>
              Live
            </Badge>
            <Badge variant="outline" className="text-xs">
              AI Powered
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36 bg-background/50 border-border/50">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon" className="bg-background/50 border-border/50 hover:bg-accent/50">
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-background/50 border-border/50 hover:bg-accent/50"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
          
          <Button variant="outline" size="icon" className="bg-background/50 border-border/50 hover:bg-accent/50">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* KPI Cards - Always visible */}
      <KPICards />

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-card/50 backdrop-blur-sm border border-border/50">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="sectors" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Sectors
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="ai-insights" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <RevenueChart timeRange={timeRange} />
            <UserEngagementChart timeRange={timeRange} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <ConversionFunnelChart />
            <GeographicDistribution />
            <AIInsights />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <EngagementBreakdown />
            <RecentActivity />
          </div>
        </TabsContent>

        <TabsContent value="sectors" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <SectorRevenueChart />
            <MarketTrendsHeatmap />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    Top Revenue Sectors
                  </h3>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    High Growth
                  </Badge>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Technology', revenue: 285000, growth: 15.2, color: 'bg-chart-1' },
                    { name: 'Healthcare', revenue: 198000, growth: 8.7, color: 'bg-chart-2' },
                    { name: 'Finance', revenue: 165000, growth: 12.3, color: 'bg-chart-3' }
                  ].map((sector, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${sector.color}`}></div>
                        <div>
                          <p className="text-sm">{sector.name}</p>
                          <p className="text-xs text-muted-foreground">
                            ${sector.revenue.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                        +{sector.growth}%
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-red-400" />
                    Underperforming Sectors
                  </h3>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    Needs Attention
                  </Badge>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Retail', revenue: 128000, growth: -3.2, color: 'bg-chart-4' },
                    { name: 'Manufacturing', revenue: 87000, growth: 5.8, color: 'bg-chart-5' },
                    { name: 'Others', revenue: 14000, growth: 2.1, color: 'bg-chart-6' }
                  ].map((sector, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${sector.color}`}></div>
                        <div>
                          <p className="text-sm">{sector.name}</p>
                          <p className="text-xs text-muted-foreground">
                            ${sector.revenue.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Badge className={sector.growth < 0 
                        ? "bg-red-500/20 text-red-400 border-red-500/30" 
                        : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"} 
                        className="text-xs">
                        {sector.growth > 0 ? '+' : ''}{sector.growth}%
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <PerformanceRadarChart />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <UserEngagementChart timeRange={timeRange} />
            <GeographicDistribution />
          </div>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <EnhancedAIInsights />
            <RecentActivity />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}