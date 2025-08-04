import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Clock, UserPlus, DollarSign, Settings, AlertCircle } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'user_signup',
      icon: UserPlus,
      title: 'New user registered',
      description: 'John Doe signed up for premium plan',
      timestamp: '2 minutes ago',
      user: 'JD',
      status: 'success'
    },
    {
      id: 2,
      type: 'payment',
      icon: DollarSign,
      title: 'Payment received',
      description: '$299 payment from Sarah Wilson',
      timestamp: '5 minutes ago',
      user: 'SW',
      status: 'success'
    },
    {
      id: 3,
      type: 'system',
      icon: Settings,
      title: 'System update',
      description: 'Analytics engine updated to v2.1.3',
      timestamp: '15 minutes ago',
      user: 'SYS',
      status: 'info'
    },
    {
      id: 4,
      type: 'alert',
      icon: AlertCircle,
      title: 'High traffic alert',
      description: 'Server load increased by 40% in the last hour',
      timestamp: '32 minutes ago',
      user: 'ALT',
      status: 'warning'
    },
    {
      id: 5,
      type: 'user_signup',
      icon: UserPlus,
      title: 'New user registered',
      description: 'Mike Johnson signed up for basic plan',
      timestamp: '1 hour ago',
      user: 'MJ',
      status: 'success'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'info': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Latest events and user actions
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {activity.user}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <activity.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{activity.title}</span>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}