import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Users, Clock, MousePointer, Heart, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface UserEngagementChartProps {
  timeRange: string;
}

export function UserEngagementChart({ timeRange }: UserEngagementChartProps) {
  const [selectedMetric, setSelectedMetric] = useState('engagement');
  const [animationKey, setAnimationKey] = useState(0);

  const data = [
    { 
      day: 'Mon', 
      pageViews: 12450, 
      avgSessionDuration: 4.2, 
      bounceRate: 32, 
      interactions: 8950, 
      satisfaction: 4.1,
      returnVisitors: 65
    },
    { 
      day: 'Tue', 
      pageViews: 15680, 
      avgSessionDuration: 4.8, 
      bounceRate: 28, 
      interactions: 11200, 
      satisfaction: 4.3,
      returnVisitors: 72
    },
    { 
      day: 'Wed', 
      pageViews: 13920, 
      avgSessionDuration: 4.5, 
      bounceRate: 35, 
      interactions: 9850, 
      satisfaction: 4.0,
      returnVisitors: 68
    },
    { 
      day: 'Thu', 
      pageViews: 18750, 
      avgSessionDuration: 5.1, 
      bounceRate: 25, 
      interactions: 13650, 
      satisfaction: 4.5,
      returnVisitors: 78
    },
    { 
      day: 'Fri', 
      pageViews: 16840, 
      avgSessionDuration: 4.7, 
      bounceRate: 30, 
      interactions: 12100, 
      satisfaction: 4.2,
      returnVisitors: 75
    },
    { 
      day: 'Sat', 
      pageViews: 11230, 
      avgSessionDuration: 3.8, 
      bounceRate: 38, 
      interactions: 7890, 
      satisfaction: 3.9,
      returnVisitors: 58
    },
    { 
      day: 'Sun', 
      pageViews: 9680, 
      avgSessionDuration: 3.5, 
      bounceRate: 42, 
      interactions: 6750, 
      satisfaction: 3.8,
      returnVisitors: 52
    },
  ];

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [timeRange, selectedMetric]);

  const metrics = [
    { key: 'engagement', label: 'Engagement', icon: MousePointer },
    { key: 'satisfaction', label: 'Satisfaction', icon: Heart },
    { key: 'retention', label: 'Retention', icon: Users },
    { key: 'performance', label: 'Performance', icon: TrendingUp },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card/95 backdrop-blur-sm p-4 rounded-lg border border-border/50 shadow-lg"
        >
          <p className="text-sm mb-2">{label}</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Page Views:</span>
              <span className="text-xs text-chart-1">{data.pageViews.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Avg Session:</span>
              <span className="text-xs text-chart-2">{data.avgSessionDuration}m</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Bounce Rate:</span>
              <span className="text-xs text-chart-3">{data.bounceRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Interactions:</span>
              <span className="text-xs text-chart-4">{data.interactions.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Satisfaction:</span>
              <span className="text-xs text-chart-5">{data.satisfaction}/5.0</span>
            </div>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  const avgSatisfaction = (data.reduce((sum, day) => sum + day.satisfaction, 0) / data.length).toFixed(1);
  const avgSessionDuration = (data.reduce((sum, day) => sum + day.avgSessionDuration, 0) / data.length).toFixed(1);
  const avgBounceRate = (data.reduce((sum, day) => sum + day.bounceRate, 0) / data.length).toFixed(0);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-chart-1" />
                User Engagement Insights
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Comprehensive user behavior analytics • {timeRange}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-chart-1/20 text-chart-1 border-chart-1/30">
                {avgSatisfaction}/5.0 Rating
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

          {/* Key Metrics Summary */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center p-2 rounded-lg bg-muted/20">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Clock className="h-3 w-3 text-chart-2" />
                <span className="text-lg text-chart-2">{avgSessionDuration}m</span>
              </div>
              <p className="text-xs text-muted-foreground">Avg Session</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-muted/20">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Heart className="h-3 w-3 text-chart-5" />
                <span className="text-lg text-chart-5">{avgSatisfaction}</span>
              </div>
              <p className="text-xs text-muted-foreground">Satisfaction</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-muted/20">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="h-3 w-3 text-chart-3" />
                <span className="text-lg text-chart-3">{avgBounceRate}%</span>
              </div>
              <p className="text-xs text-muted-foreground">Bounce Rate</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} key={animationKey}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  className="stroke-border/30"
                  stroke="var(--border)"
                />
                <XAxis 
                  dataKey="day" 
                  className="text-xs"
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                  axisLine={{ stroke: 'var(--border)' }}
                />
                <YAxis 
                  yAxisId="left"
                  className="text-xs"
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  axisLine={{ stroke: 'var(--border)' }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  className="text-xs"
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                  axisLine={{ stroke: 'var(--border)' }}
                />
                <Tooltip content={<CustomTooltip />} />
                
                {/* Page Views as bars */}
                <Bar
                  yAxisId="left"
                  dataKey="pageViews"
                  fill="var(--chart-1)"
                  fillOpacity={0.6}
                  radius={[2, 2, 0, 0]}
                  animationDuration={1000}
                />
                
                {/* Interactions as bars */}
                <Bar
                  yAxisId="left"
                  dataKey="interactions"
                  fill="var(--chart-2)"
                  fillOpacity={0.4}
                  radius={[2, 2, 0, 0]}
                  animationDuration={1200}
                />
                
                {/* Session Duration as line */}
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="avgSessionDuration"
                  stroke="var(--chart-3)"
                  strokeWidth={3}
                  dot={{ fill: 'var(--chart-3)', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: 'var(--chart-3)' }}
                  animationDuration={1500}
                />
                
                {/* Satisfaction as line */}
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="satisfaction"
                  stroke="var(--chart-5)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: 'var(--chart-5)', strokeWidth: 2, r: 3 }}
                  animationDuration={1800}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>


        </CardContent>
      </Card>
    </motion.div>
  );
}