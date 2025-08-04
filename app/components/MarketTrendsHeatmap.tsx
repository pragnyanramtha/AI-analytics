import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { TrendingUp, TrendingDown, Calendar, MoreHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

export function MarketTrendsHeatmap() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const heatmapData = [
    { day: 'Monday', periods: [
      { hour: '00-06', value: 12, intensity: 'low' },
      { hour: '06-12', value: 45, intensity: 'high' },
      { hour: '12-18', value: 38, intensity: 'medium' },
      { hour: '18-24', value: 22, intensity: 'medium' }
    ]},
    { day: 'Tuesday', periods: [
      { hour: '00-06', value: 8, intensity: 'low' },
      { hour: '06-12', value: 52, intensity: 'high' },
      { hour: '12-18', value: 41, intensity: 'high' },
      { hour: '18-24', value: 28, intensity: 'medium' }
    ]},
    { day: 'Wednesday', periods: [
      { hour: '00-06', value: 15, intensity: 'low' },
      { hour: '06-12', value: 48, intensity: 'high' },
      { hour: '12-18', value: 35, intensity: 'medium' },
      { hour: '18-24', value: 25, intensity: 'medium' }
    ]},
    { day: 'Thursday', periods: [
      { hour: '00-06', value: 10, intensity: 'low' },
      { hour: '06-12', value: 55, intensity: 'high' },
      { hour: '12-18', value: 44, intensity: 'high' },
      { hour: '18-24', value: 31, intensity: 'medium' }
    ]},
    { day: 'Friday', periods: [
      { hour: '00-06', value: 18, intensity: 'low' },
      { hour: '06-12', value: 42, intensity: 'medium' },
      { hour: '12-18', value: 38, intensity: 'medium' },
      { hour: '18-24', value: 35, intensity: 'medium' }
    ]},
    { day: 'Saturday', periods: [
      { hour: '00-06', value: 6, intensity: 'low' },
      { hour: '06-12', value: 28, intensity: 'medium' },
      { hour: '12-18', value: 48, intensity: 'high' },
      { hour: '18-24', value: 42, intensity: 'high' }
    ]},
    { day: 'Sunday', periods: [
      { hour: '00-06', value: 4, intensity: 'low' },
      { hour: '06-12', value: 22, intensity: 'low' },
      { hour: '12-18', value: 35, intensity: 'medium' },
      { hour: '18-24', value: 38, intensity: 'medium' }
    ]}
  ];

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'high': return 'bg-chart-1/80 text-white';
      case 'medium': return 'bg-chart-1/40 text-chart-1';
      case 'low': return 'bg-chart-1/10 text-chart-1/70';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getIntensityBorder = (intensity: string) => {
    switch (intensity) {
      case 'high': return 'border-chart-1/60';
      case 'medium': return 'border-chart-1/30';
      case 'low': return 'border-chart-1/10';
      default: return 'border-border';
    }
  };

  const totalActivities = heatmapData.flatMap(day => day.periods).reduce((sum, period) => sum + period.value, 0);
  const avgActivity = Math.round(totalActivities / 28);
  const peakHour = heatmapData.flatMap(day => day.periods).reduce((max, period) => period.value > max.value ? period : max);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-chart-1" />
                Activity Heatmap
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Weekly activity patterns and trends
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-chart-1/20 text-chart-1 border-chart-1/30">
                {totalActivities} Activities
              </Badge>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <p className="text-2xl text-chart-1">{avgActivity}</p>
                <p className="text-xs text-muted-foreground">Avg/Period</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <p className="text-2xl text-green-400">{peakHour.value}</p>
                <p className="text-xs text-muted-foreground">Peak Activity</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-xl text-green-400">+12%</span>
                </div>
                <p className="text-xs text-muted-foreground">vs Last Week</p>
              </div>
            </div>

            {/* Heatmap */}
            <div className="space-y-2">
              <div className="grid grid-cols-5 gap-2 text-xs text-muted-foreground mb-2">
                <div></div>
                <div className="text-center">00-06</div>
                <div className="text-center">06-12</div>
                <div className="text-center">12-18</div>
                <div className="text-center">18-24</div>
              </div>
              
              {heatmapData.map((day, dayIndex) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: dayIndex * 0.05 }}
                  className="grid grid-cols-5 gap-2 items-center"
                >
                  <div className="text-xs text-muted-foreground font-medium w-16">
                    {day.day.slice(0, 3)}
                  </div>
                  {day.periods.map((period, periodIndex) => (
                    <motion.div
                      key={periodIndex}
                      whileHover={{ scale: 1.05 }}
                      className={`
                        h-10 rounded-lg border transition-all duration-300 cursor-pointer
                        flex items-center justify-center text-xs
                        ${getIntensityColor(period.intensity)}
                        ${getIntensityBorder(period.intensity)}
                        hover:border-chart-1/50 hover:shadow-sm
                      `}
                      title={`${day.day} ${period.hour}: ${period.value} activities`}
                    >
                      {period.value}
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between pt-4 border-t border-border/30">
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">Activity Level:</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-chart-1/10 border border-chart-1/10"></div>
                    <span className="text-xs text-muted-foreground">Low</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-chart-1/40 border border-chart-1/30"></div>
                    <span className="text-xs text-muted-foreground">Medium</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-chart-1/80 border border-chart-1/60"></div>
                    <span className="text-xs text-muted-foreground">High</span>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground">
                Peak: Thursday 06-12
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}