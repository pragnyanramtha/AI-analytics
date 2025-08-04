import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

export function GeographicDistribution() {
  const countries = [
    { name: 'United States', users: 3420, percentage: 42, flag: '🇺🇸' },
    { name: 'United Kingdom', users: 1680, percentage: 21, flag: '🇬🇧' },
    { name: 'Germany', users: 1240, percentage: 15, flag: '🇩🇪' },
    { name: 'France', users: 890, percentage: 11, flag: '🇫🇷' },
    { name: 'Canada', users: 560, percentage: 7, flag: '🇨🇦' },
    { name: 'Others', users: 320, percentage: 4, flag: '🌍' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Geographic Distribution</CardTitle>
        <p className="text-sm text-muted-foreground">
          Users by country
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {countries.map((country, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{country.flag}</span>
                <span className="text-sm">{country.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {country.users.toLocaleString()}
                </Badge>
                <span className="text-xs text-muted-foreground w-8">
                  {country.percentage}%
                </span>
              </div>
            </div>
            <Progress value={country.percentage} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}