import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Users, Clock, MousePointer, Heart, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';

export function EngagementBreakdown() {
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

  const avgSatisfaction = (data.reduce((sum, day) => sum + day.satisfaction, 0) / data.length).toFixed(1);
  const avgSessionDuration = (data.reduce((sum, day) => sum + day.avgSessionDuration, 0) / data.length).toFixed(1);
  const avgBounceRate = (data.reduce((sum, day) => sum + day.bounceRate, 0) / data.length).toFixed(0);
  const totalPageViews = data.reduce((sum, d) => sum + d.pageViews, 0);
  const totalInteractions = data.reduce((sum, d) => sum + d.interactions, 0);
  const avgReturnVisitors = (data.reduce((sum, day) => sum + day.returnVisitors, 0) / data.length).toFixed(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-chart-1" />
                Engagement Breakdown
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Detailed user interaction metrics
              </p>
            </div>
            <Badge className="bg-chart-1/20 text-chart-1 border-chart-1/30">
              Weekly Summary
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              {[
                { 
                  label: 'Page Views', 
                  value: totalPageViews.toLocaleString(), 
                  color: 'bg-chart-1', 
                  icon: MousePointer,
                  trend: '+12.3%'
                },
                { 
                  label: 'Interactions', 
                  value: totalInteractions.toLocaleString(), 
                  color: 'bg-chart-2', 
                  icon: Users,
                  trend: '+8.7%'
                },
                { 
                  label: 'Return Visitors', 
                  value: `${avgReturnVisitors}%`, 
                  color: 'bg-chart-4', 
                  icon: Users,
                  trend: '+5.2%'
                }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors group/item"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color} group-hover/item:scale-110 transition-transform`}></div>
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{item.value}</div>
                    <div className="text-xs text-green-400">{item.trend}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="space-y-2">
              {[
                { 
                  label: 'Avg Session', 
                  value: `${avgSessionDuration}m`, 
                  color: 'bg-chart-3', 
                  icon: Clock,
                  trend: '+4.2%'
                },
                { 
                  label: 'Satisfaction', 
                  value: `${avgSatisfaction}/5.0`, 
                  color: 'bg-chart-5', 
                  icon: Heart,
                  trend: '+0.3%'
                },
                { 
                  label: 'Bounce Rate', 
                  value: `${avgBounceRate}%`, 
                  color: 'bg-chart-6', 
                  icon: BarChart3,
                  trend: '-2.1%'
                }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors group/item"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color} group-hover/item:scale-110 transition-transform`}></div>
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{item.value}</div>
                    <div className="text-xs text-green-400">{item.trend}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}