import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { TrendingUp, BarChart3, Activity, Zap, Target } from 'lucide-react';
import { motion } from 'motion/react';

interface RevenueChartProps {
  timeRange: string;
}

export function RevenueChart({ timeRange }: RevenueChartProps) {
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [animationKey, setAnimationKey] = useState(0);

  const data = [
    { month: 'Jan', revenue: 45000, target: 75000, profit: 12000, forecast: 48000 },
    { month: 'Feb', revenue: 52000, target: 80000, profit: 15600, forecast: 55000 },
    { month: 'Mar', revenue: 48000, target: 85000, profit: 14400, forecast: 52000 },
    { month: 'Apr', revenue: 61000, target: 90000, profit: 18300, forecast: 65000 },
    { month: 'May', revenue: 55000, target: 95000, profit: 16500, forecast: 62000 },
    { month: 'Jun', revenue: 67000, target: 100000, profit: 20100, forecast: 72000 },
    { month: 'Jul', revenue: 72000, target: 105000, profit: 21600, forecast: 78000 },
    { month: 'Aug', revenue: 68000, target: 110000, profit: 20400, forecast: 75000 },
    { month: 'Sep', revenue: 75000, target: 115000, profit: 22500, forecast: 82000 },
    { month: 'Oct', revenue: 82000, target: 120000, profit: 24600, forecast: 88000 },
    { month: 'Nov', revenue: 89000, target: 125000, profit: 26700, forecast: 95000 },
    { month: 'Dec', revenue: 95000, target: 130000, profit: 28500, forecast: 102000 },
  ];

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [timeRange, selectedMetric]);

  const metrics = [
    { key: 'revenue', label: 'Revenue', icon: TrendingUp, color: 'var(--chart-1)' },
    { key: 'target', label: 'Target', icon: Target, color: 'var(--chart-2)' },
    { key: 'profit', label: 'Profit', icon: BarChart3, color: 'var(--chart-3)' },
    { key: 'forecast', label: 'Forecast', icon: Activity, color: 'var(--chart-4)' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card/95 backdrop-blur-sm p-4 rounded-lg border border-border/50 shadow-lg"
        >
          <p className="text-sm text-foreground">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: $${entry.value.toLocaleString()}`}
            </p>
          ))}
          {payload[0] && payload[0].payload.target && (
            <div className="border-t border-border/30 mt-2 pt-2">
              <p className="text-xs text-muted-foreground">
                Gap to Target: ${(payload[0].payload.target - payload[0].payload.revenue).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                Achievement: {((payload[0].payload.revenue / payload[0].payload.target) * 100).toFixed(1)}%
              </p>
            </div>
          )}
        </motion.div>
      );
    }
    return null;
  };

  const currentRevenue = data[data.length - 1].revenue;
  const currentTarget = data[data.length - 1].target;
  const achievementRate = ((currentRevenue / currentTarget) * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-chart-1" />
                Revenue Analytics
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Performance vs ambitious targets • {timeRange}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                {achievementRate}% Target
              </Badge>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                +12.5% ↗
              </Badge>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 flex-wrap">
            {metrics.map((metric) => (
              <Button
                key={metric.key}
                variant={selectedMetric === metric.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMetric(metric.key)}
                className={`transition-all duration-300 ${
                  selectedMetric === metric.key 
                    ? 'bg-chart-1/20 text-chart-1 border-chart-1/30 hover:bg-chart-1/30' 
                    : 'bg-background/50 border-border/50 hover:bg-accent/50'
                }`}
              >
                <metric.icon className="h-3 w-3 mr-1" />
                {metric.label}
              </Button>
            ))}
          </div>

          {/* Performance Summary */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center p-2 rounded-lg bg-muted/20">
              <p className="text-lg text-chart-1">${currentRevenue.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Current Revenue</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-muted/20">
              <p className="text-lg text-chart-2">${currentTarget.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Target Goal</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-muted/20">
              <p className="text-lg text-chart-4">${(currentTarget - currentRevenue).toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Gap to Goal</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} key={animationKey}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  className="stroke-border/30"
                  stroke="var(--border)"
                />
                <XAxis 
                  dataKey="month" 
                  className="text-xs"
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                  axisLine={{ stroke: 'var(--border)' }}
                />
                <YAxis 
                  className="text-xs"
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                  axisLine={{ stroke: 'var(--border)' }}
                />
                <Tooltip content={<CustomTooltip />} />
                
                <ReferenceLine 
                  y={120000} 
                  stroke="var(--chart-4)" 
                  strokeDasharray="5 5" 
                  strokeOpacity={0.6}
                  label={{ value: "Goal", position: "topRight", fill: "var(--chart-4)" }}
                />
                
                {/* Target Area */}
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="transparent"
                  fill="url(#targetGradient)"
                  animationDuration={2000}
                />
                
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--chart-1)" 
                  strokeWidth={3}
                  dot={{ 
                    fill: 'var(--chart-1)', 
                    strokeWidth: 2, 
                    r: 4,
                    stroke: 'var(--card)'
                  }}
                  activeDot={{ 
                    r: 6, 
                    fill: 'var(--chart-1)',
                    stroke: 'var(--card)',
                    strokeWidth: 2
                  }}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
                
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="var(--chart-2)" 
                  strokeWidth={2}
                  strokeDasharray="8 8"
                  dot={{ fill: 'var(--chart-2)', strokeWidth: 2, r: 3 }}
                  animationDuration={1800}
                  animationEasing="ease-out"
                />
                
                {selectedMetric === 'profit' && (
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="var(--chart-3)" 
                    strokeWidth={2}
                    dot={{ fill: 'var(--chart-3)', strokeWidth: 2, r: 3 }}
                    animationDuration={2000}
                    animationEasing="ease-out"
                  />
                )}

                {selectedMetric === 'forecast' && (
                  <Line 
                    type="monotone" 
                    dataKey="forecast" 
                    stroke="var(--chart-4)" 
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={{ fill: 'var(--chart-4)', strokeWidth: 2, r: 3 }}
                    animationDuration={2200}
                    animationEasing="ease-out"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}