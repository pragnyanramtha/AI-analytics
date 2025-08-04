import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingDown, Users, MousePointer, CreditCard, Target, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';

export function ConversionFunnelChart() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const funnelData = [
    { 
      stage: 'Website Visitors', 
      count: 45230, 
      rate: 100, 
      icon: Users,
      color: 'var(--chart-1)',
      dropoff: 0,
      description: 'Total unique visitors'
    },
    { 
      stage: 'Product Views', 
      count: 18650, 
      rate: 41.2, 
      icon: MousePointer,
      color: 'var(--chart-2)',
      dropoff: 58.8,
      description: 'Viewed product pages'
    },
    { 
      stage: 'Cart Additions', 
      count: 8920, 
      rate: 19.7, 
      icon: Target,
      color: 'var(--chart-3)',
      dropoff: 52.2,
      description: 'Added items to cart'
    },
    { 
      stage: 'Checkout Started', 
      count: 4280, 
      rate: 9.5, 
      icon: CreditCard,
      color: 'var(--chart-4)',
      dropoff: 52.0,
      description: 'Initiated checkout process'
    },
    { 
      stage: 'Payment Success', 
      count: 2845, 
      rate: 6.3, 
      icon: CreditCard,
      color: 'var(--chart-5)',
      dropoff: 33.5,
      description: 'Completed purchase'
    },
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
          <div className="space-y-2">
            <p className="text-sm">{data.stage}</p>
            <div className="flex items-center gap-2">
              <data.icon className="h-4 w-4" style={{ color: data.color }} />
              <span className="text-sm">{data.count.toLocaleString()} users</span>
            </div>
            <p className="text-xs text-muted-foreground">{data.description}</p>
            <div className="flex items-center justify-between text-xs">
              <span>Conversion Rate: {data.rate}%</span>
              {data.dropoff > 0 && (
                <span className="text-red-400">Drop-off: {data.dropoff}%</span>
              )}
            </div>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  const totalRevenue = funnelData[funnelData.length - 1].count * 89; // Avg order value $89
  const conversionRate = ((funnelData[funnelData.length - 1].count / funnelData[0].count) * 100).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-chart-1" />
                Conversion Funnel
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                User journey through conversion stages
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-chart-1/20 text-chart-1 border-chart-1/30">
                {conversionRate}% Overall
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 rounded-lg bg-muted/30 text-center">
              <p className="text-lg text-chart-1">${totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Revenue</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 text-center">
              <p className="text-lg text-chart-2">{funnelData[0].count.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Visitors</p>
            </div>
          </div>

          {/* Funnel Chart */}
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="horizontal" margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                <XAxis 
                  type="number"
                  className="text-xs"
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <YAxis 
                  type="category"
                  dataKey="stage"
                  className="text-xs"
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                  width={120}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="count" 
                  radius={[0, 4, 4, 0]}
                  animationDuration={1000}
                  animationEasing="ease-out"
                >
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Funnel Steps with Drop-off */}
          <div className="space-y-2 mt-4">
            {funnelData.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: step.color }}
                  />
                  <div className="flex items-center gap-2">
                    <step.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{step.stage}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{step.count.toLocaleString()}</span>
                  <span>{step.rate}%</span>
                  {step.dropoff > 0 && index > 0 && (
                    <div className="flex items-center gap-1 text-red-400">
                      <ArrowDown className="h-3 w-3" />
                      <span>{step.dropoff}%</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}