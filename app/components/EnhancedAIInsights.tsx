import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Sparkles, ArrowRight, RefreshCw, Target, Zap, DollarSign, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function EnhancedAIInsights() {
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const insights = [
    {
      type: 'opportunity',
      category: 'revenue',
      icon: DollarSign,
      title: 'Revenue Optimization',
      description: 'Technology sector showing 32% higher conversion rates. Reallocate 15% marketing budget from Retail to Tech for potential $45K revenue increase.',
      confidence: 94,
      impact: 'High',
      timeframe: '2-3 weeks',
      action: 'Reallocate Budget',
      priority: 1,
      expectedRoi: 285,
      details: {
        currentPerformance: 'Tech: 8.3% conversion, Retail: 2.1% conversion',
        recommendation: 'Shift $25K marketing spend',
        riskFactor: 'Low'
      }
    },
    {
      type: 'warning',
      category: 'user',
      icon: Users,
      title: 'Churn Risk Alert',
      description: 'ML model identifies 127 premium users at 73% churn risk. Implementing personalized retention campaign could save $38K in recurring revenue.',
      confidence: 89,
      impact: 'High',
      timeframe: '1 week',
      action: 'Launch Retention',
      priority: 1,
      expectedRoi: 420,
      details: {
        currentPerformance: '127 at-risk users, avg value $300/user',
        recommendation: 'Deploy AI-driven personalized outreach',
        riskFactor: 'Medium'
      }
    },
    {
      type: 'recommendation',
      category: 'growth',
      icon: TrendingUp,
      title: 'Market Expansion',
      description: 'Healthcare sector underperforming vs industry benchmark by 23%. Geographic expansion to West Coast projected 12% growth.',
      confidence: 82,
      impact: 'Medium',
      timeframe: '6-8 weeks',
      action: 'Expand Market',
      priority: 2,
      expectedRoi: 156,
      details: {
        currentPerformance: 'Healthcare: 22.6% vs 29% industry avg',
        recommendation: 'Target California and Washington markets',
        riskFactor: 'Medium'
      }
    },
    {
      type: 'insight',
      category: 'optimization',
      icon: Zap,
      title: 'Operational Efficiency',
      description: 'AI analysis reveals 18% productivity increase potential through workflow automation. ROI expected within 4 months.',
      confidence: 91,
      impact: 'High',
      timeframe: '3-4 months',
      action: 'Implement Automation',
      priority: 1,
      expectedRoi: 340,
      details: {
        currentPerformance: 'Manual processes: 45% of operations',
        recommendation: 'Automate data entry and reporting',
        riskFactor: 'Low'
      }
    },
    {
      type: 'prediction',
      category: 'forecast',
      icon: Target,
      title: 'Q4 Revenue Forecast',
      description: 'Advanced forecasting models predict 8.7% revenue growth in Q4. Key driver: Technology sector expansion and improved conversion rates.',
      confidence: 87,
      impact: 'Medium',
      timeframe: 'Q4 2024',
      action: 'Prepare Scale',
      priority: 2,
      expectedRoi: 287,
      details: {
        currentPerformance: 'Q3 growth: 5.2%',
        recommendation: 'Increase inventory and staff capacity',
        riskFactor: 'Low'
      }
    }
  ];

  const categories = [
    { key: 'all', label: 'All Insights', count: insights.length },
    { key: 'revenue', label: 'Revenue', count: insights.filter(i => i.category === 'revenue').length },
    { key: 'user', label: 'Users', count: insights.filter(i => i.category === 'user').length },
    { key: 'growth', label: 'Growth', count: insights.filter(i => i.category === 'growth').length },
    { key: 'optimization', label: 'Operations', count: insights.filter(i => i.category === 'optimization').length },
  ];

  const filteredInsights = selectedCategory === 'all' 
    ? insights 
    : insights.filter(insight => insight.category === selectedCategory);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsightIndex((prev) => (prev + 1) % filteredInsights.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [filteredInsights.length]);

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'text-green-400';
      case 'warning': return 'text-red-400';
      case 'recommendation': return 'text-blue-400';
      case 'insight': return 'text-purple-400';
      case 'prediction': return 'text-yellow-400';
      default: return 'text-muted-foreground';
    }
  };

  const getImpactVariant = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: number) => {
    return priority === 1 ? 'text-red-400' : 'text-yellow-400';
  };

  const generateNewInsight = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentInsightIndex((prev) => (prev + 1) % filteredInsights.length);
    }, 2000);
  };

  const currentInsight = filteredInsights[currentInsightIndex] || insights[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="col-span-2"
    >
      <Card className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-chart-1" />
              Advanced AI Analytics
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="bg-chart-1/20 text-chart-1 border-chart-1/30 animate-pulse">
                <Sparkles className="h-3 w-3 mr-1" />
                Neural Network Active
              </Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            AI-powered insights with predictive analytics and ROI forecasting
          </p>

          {/* Category Filters */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedCategory(category.key);
                  setCurrentInsightIndex(0);
                }}
                className={`transition-all duration-300 text-xs ${
                  selectedCategory === category.key 
                    ? 'bg-chart-1/20 text-chart-1 border-chart-1/30 hover:bg-chart-1/30' 
                    : 'bg-background/50 border-border/50 hover:bg-accent/50'
                }`}
              >
                {category.label}
                <Badge variant="secondary" className="ml-1 h-4 px-1 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${currentInsightIndex}`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="p-4 rounded-xl border border-border/30 bg-gradient-to-r from-card via-card to-accent/10 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-background/50 ${getInsightColor(currentInsight.type)}`}>
                    <currentInsight.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm flex items-center gap-2">
                      {currentInsight.title}
                      <Badge className={getPriorityColor(currentInsight.priority)} variant="outline">
                        P{currentInsight.priority}
                      </Badge>
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`text-xs ${getImpactVariant(currentInsight.impact)}`}>
                        {currentInsight.impact} Impact
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {currentInsight.expectedRoi}% ROI
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground leading-relaxed">
                {currentInsight.description}
              </p>

              {/* Detailed Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 rounded-lg bg-muted/20">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Current Performance</p>
                  <p className="text-xs">{currentInsight.details.currentPerformance}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">AI Recommendation</p>
                  <p className="text-xs">{currentInsight.details.recommendation}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Confidence:</span>
                    <span className="text-xs text-chart-1">{currentInsight.confidence}%</span>
                  </div>
                  <div className="w-20 bg-muted/50 rounded-full h-2">
                    <motion.div 
                      className="bg-chart-1 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${currentInsight.confidence}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground">Risk:</span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      currentInsight.details.riskFactor === 'Low' 
                        ? 'border-green-500/30 text-green-400' 
                        : 'border-yellow-500/30 text-yellow-400'
                    }`}
                  >
                    {currentInsight.details.riskFactor}
                  </Badge>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1 bg-chart-1/20 text-chart-1 border-chart-1/30 hover:bg-chart-1/30 transition-all duration-300 group"
                >
                  {currentInsight.action}
                  <ArrowRight className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="bg-background/50 border-border/50 hover:bg-accent/50"
                >
                  Details
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex items-center justify-between pt-2 border-t border-border/30">
            <div className="flex gap-1">
              {filteredInsights.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentInsightIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentInsightIndex 
                      ? 'bg-chart-1 w-6' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {currentInsightIndex + 1} of {filteredInsights.length}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={generateNewInsight}
                disabled={isLoading}
                className="bg-background/50 border-border/50 hover:bg-accent/50 text-xs h-7 px-2"
              >
                <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}