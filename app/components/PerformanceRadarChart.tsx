import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { Activity, Zap, Target } from 'lucide-react';
import { motion } from 'motion/react';

export function PerformanceRadarChart() {
  const performanceData = [
    {
      metric: 'Revenue',
      current: 85,
      target: 90,
      previous: 78,
      fullMark: 100,
    },
    {
      metric: 'Customer Satisfaction',
      current: 92,
      target: 95,
      previous: 88,
      fullMark: 100,
    },
    {
      metric: 'Market Share',
      current: 68,
      target: 75,
      previous: 65,
      fullMark: 100,
    },
    {
      metric: 'Operational Efficiency',
      current: 89,
      target: 85,
      previous: 82,
      fullMark: 100,
    },
    {
      metric: 'Innovation',
      current: 76,
      target: 80,
      previous: 72,
      fullMark: 100,
    },
    {
      metric: 'Employee Engagement',
      current: 88,
      target: 90,
      previous: 85,
      fullMark: 100,
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card/95 backdrop-blur-sm p-3 rounded-lg border border-border/50 shadow-lg"
        >
          <p className="text-sm">{label}</p>
          <div className="space-y-1">
            <p className="text-xs text-chart-1">Current: {data.current}%</p>
            <p className="text-xs text-chart-2">Target: {data.target}%</p>
            <p className="text-xs text-muted-foreground">Previous: {data.previous}%</p>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-chart-1" />
                Performance Radar
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Multi-dimensional performance analysis
              </p>
            </div>
            <Badge className="bg-chart-1/20 text-chart-1 border-chart-1/30">
              <Zap className="h-3 w-3 mr-1" />
              Live Metrics
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={performanceData}>
                    <PolarGrid 
                      stroke="var(--border)"
                      className="opacity-50"
                    />
                    <PolarAngleAxis 
                      dataKey="metric" 
                      tick={{ 
                        fill: 'var(--muted-foreground)', 
                        fontSize: 11 
                      }}
                      className="text-xs"
                    />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 100]}
                      tick={{ 
                        fill: 'var(--muted-foreground)', 
                        fontSize: 10 
                      }}
                      tickCount={6}
                    />
                    <Radar
                      name="Current"
                      dataKey="current"
                      stroke="var(--chart-1)"
                      fill="var(--chart-1)"
                      fillOpacity={0.2}
                      strokeWidth={2}
                      animationDuration={1000}
                    />
                    <Radar
                      name="Target"
                      dataKey="target"
                      stroke="var(--chart-2)"
                      fill="transparent"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      animationDuration={1200}
                    />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-chart-1" />
                  Key Insights
                </h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-green-600/5 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <span className="text-sm text-green-400">Exceeding</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">Operational Efficiency</p>
                    <p className="text-xs">89% vs 85% target</p>
                  </div>

                  <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                      <span className="text-sm text-yellow-400">Needs Focus</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">Market Share</p>
                    <p className="text-xs">68% vs 75% target</p>
                  </div>

                  <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-600/5 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      <span className="text-sm text-blue-400">Improving</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">Innovation Score</p>
                    <p className="text-xs">+4% from last period</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm mb-3 text-muted-foreground">Legend</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-1 bg-chart-1 rounded"></div>
                    <span className="text-xs text-muted-foreground">Current Performance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-1 bg-chart-2 rounded border-2 border-chart-2 border-dashed"></div>
                    <span className="text-xs text-muted-foreground">Target Performance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}