import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TrendingUp, TrendingDown, PieChart as PieIcon, BarChart3, Target, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export function SectorRevenueChart() {
  const [viewType, setViewType] = useState<'pie' | 'bar'>('pie');

  const sectorData = [
    { 
      sector: 'Technology', 
      revenue: 285000, 
      percentage: 32.5, 
      growth: 15.2,
      color: 'var(--chart-1)',
      trend: 'up'
    },
    { 
      sector: 'Healthcare', 
      revenue: 198000, 
      percentage: 22.6, 
      growth: 8.7,
      color: 'var(--chart-2)',
      trend: 'up'
    },
    { 
      sector: 'Finance', 
      revenue: 165000, 
      percentage: 18.8, 
      growth: 12.3,
      color: 'var(--chart-3)',
      trend: 'up'
    },
    { 
      sector: 'Retail', 
      revenue: 128000, 
      percentage: 14.6, 
      growth: -3.2,
      color: 'var(--chart-4)',
      trend: 'down'
    },
    { 
      sector: 'Manufacturing', 
      revenue: 87000, 
      percentage: 9.9, 
      growth: 5.8,
      color: 'var(--chart-5)',
      trend: 'up'
    },
    { 
      sector: 'Others', 
      revenue: 14000, 
      percentage: 1.6, 
      growth: 2.1,
      color: 'var(--chart-6)',
      trend: 'up'
    },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="500"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card/95 backdrop-blur-sm p-4 rounded-lg border border-border/50 shadow-lg"
        >
          <p className="text-sm">{data.sector}</p>
          <p className="text-sm text-chart-1">
            Revenue: ${data.revenue.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">
            {data.percentage}% of total
          </p>
          <div className="flex items-center gap-1 mt-1">
            {data.trend === 'up' ? (
              <TrendingUp className="h-3 w-3 text-green-400" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-400" />
            )}
            <span className={`text-xs ${data.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {data.growth > 0 ? '+' : ''}{data.growth}%
            </span>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  const topSectors = sectorData.slice(0, 3);
  const bottomSectors = sectorData.slice(-3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="col-span-2"
    >
      <Card className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-chart-1" />
                Revenue by Sector
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Performance across business sectors
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                6 Sectors
              </Badge>
              <div className="flex gap-1">
                <Button
                  variant={viewType === 'pie' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewType('pie')}
                  className="h-8 px-2"
                >
                  <PieIcon className="h-3 w-3" />
                </Button>
                <Button
                  variant={viewType === 'bar' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewType('bar')}
                  className="h-8 px-2"
                >
                  <BarChart3 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart */}
            <div className="lg:col-span-2">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  {viewType === 'pie' ? (
                    <PieChart>
                      <Pie
                        data={sectorData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={100}
                        innerRadius={40}
                        fill="#8884d8"
                        dataKey="revenue"
                        animationDuration={1000}
                      >
                        {sectorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  ) : (
                    <BarChart data={sectorData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                      <XAxis 
                        dataKey="sector" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                      />
                      <YAxis 
                        tickFormatter={(value) => `$${value / 1000}k`}
                        tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="revenue" 
                        radius={[4, 4, 0, 0]}
                        animationDuration={1000}
                      >
                        {sectorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sector Details */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm mb-3 text-green-400 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Top Performers
                </h4>
                <div className="space-y-3">
                  {topSectors.map((sector, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: sector.color }}
                        />
                        <div>
                          <p className="text-sm">{sector.sector}</p>
                          <p className="text-xs text-muted-foreground">
                            ${sector.revenue.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +{sector.growth}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm mb-3 text-red-400 flex items-center gap-2">
                  <TrendingDown className="h-4 w-4" />
                  Needs Attention
                </h4>
                <div className="space-y-3">
                  {bottomSectors.reverse().map((sector, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: sector.color }}
                        />
                        <div>
                          <p className="text-sm">{sector.sector}</p>
                          <p className="text-xs text-muted-foreground">
                            ${sector.revenue.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Badge className={sector.growth < 0 
                        ? "bg-red-500/20 text-red-400 border-red-500/30" 
                        : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"} 
                        className="text-xs">
                        {sector.growth < 0 ? (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        )}
                        {sector.growth > 0 ? '+' : ''}{sector.growth}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}