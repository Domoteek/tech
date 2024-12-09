import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  trendLabel: string;
}

export function StatCard({ title, value, icon: Icon, trend, trendLabel }: StatCardProps) {
  const isPositive = trend.startsWith('+');

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="ml-3 text-lg font-medium text-gray-900">{title}</h3>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-semibold text-gray-900">{value}</p>
        <p className="mt-2 flex items-center text-sm">
          <span className={`${isPositive ? 'text-green-600' : 'text-red-600'} font-medium`}>
            {trend}
          </span>
          <span className="ml-2 text-gray-500">{trendLabel}</span>
        </p>
      </div>
    </div>
  );
}