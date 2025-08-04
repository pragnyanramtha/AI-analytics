import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Sparkles, ArrowRight, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AIInsights() {
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const insights = [
    {
      type: 'opportunity',
      icon: TrendingUp,
      title: 'Revenue Opportunity',
      description: 'Increase email campaigns by 20% to boost Q4 revenue by $15K based on historical conversion patterns.',
      confidence: 92,
      impact: 'High',
      timeframe: '2-3 weeks',
      action: 'Implement Campaign'
    },
    {
      type: 'warning',
      icon: AlertTriangle,
      title: 'Churn Risk Alert',
      description: '15% of premium users show decreased engagement. AI recommends personalized re-engagement sequence.',
      confidence: 87,
      impact: 'Medium',
      timeframe: '1 week',
      action: 'Start Outreach'
    },
    {
      type: 'recommendation',
      icon: Lightbulb,
      title: 'A/B Test Suggestion',
      description: 'Test new onboarding flow with gamification elements - predicted 8% conversion improvement.',
      confidence: 78,
      impact: 'Medium',
      timeframe: '4-6 weeks',
      action: 'Run Test'
    },
    {
      type: 'insight',
      icon: Sparkles,
      title: 'Behavioral Pattern',
      description: 'Users who engage with tutorials in first 24h have 3x higher retention rate.',
      confidence: 95,
      impact: 'High',
      timeframe: 'Immediate',
      action: 'Update Onboarding'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsightIndex((prev) => (prev + 1) % insights.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [insights.length]);

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'recommendation': return 'text-blue-400';
      case 'insight': return 'text-purple-400';
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

  const generateNewInsight = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentInsightIndex((prev) => (prev + 1) % insights.length);
    }, 2000);
  };

  const currentInsight = insights[currentInsightIndex];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-chart-1" />
              AI Insights
            </CardTitle>
            <Badge className="bg-chart-1/20 text-chart-1 border-chart-1/30 animate-pulse">
              <Sparkles className="h-3 w-3 mr-1" />
              Live
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            AI-powered recommendations and predictions
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentInsightIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="p-4 rounded-lg border border-border/30 bg-gradient-to-r from-card via-card to-accent/20 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <currentInsight.icon className={`h-4 w-4 ${getInsightColor(currentInsight.type)}`} />
                  <h4 className="text-sm">{currentInsight.title}</h4>
                </div>
                <Badge className={`text-xs ${getImpactVariant(currentInsight.impact)}`}>
                  {currentInsight.impact}
                </Badge>
              </div>
              
              <p className="text-xs text-muted-foreground leading-relaxed">
                {currentInsight.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">
                    Confidence: {currentInsight.confidence}%
                  </span>
                  <div className="w-16 bg-muted/50 rounded-full h-1">
                    <motion.div 
                      className="bg-chart-1 h-1 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${currentInsight.confidence}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
                <span className="text-xs text-chart-1">
                  {currentInsight.timeframe}
                </span>
              </div>
              
              <Button 
                size="sm" 
                className="w-full bg-chart-1/20 text-chart-1 border-chart-1/30 hover:bg-chart-1/30 transition-all duration-300 group"
              >
                {currentInsight.action}
                <ArrowRight className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-1">
              {insights.map((_, index) => (
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
            
            <Button
              variant="outline"
              size="sm"
              onClick={generateNewInsight}
              disabled={isLoading}
              className="bg-background/50 border-border/50 hover:bg-accent/50 text-xs"
            >
              <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              New Insight
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}