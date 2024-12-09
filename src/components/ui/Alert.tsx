import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AlertProps {
  type: 'error' | 'success' | 'info' | 'warning';
  children: React.ReactNode;
  className?: string;
}

const alertStyles = {
  error: 'bg-red-50 text-red-700',
  success: 'bg-green-50 text-green-700',
  info: 'bg-blue-50 text-blue-700',
  warning: 'bg-yellow-50 text-yellow-700',
};

const icons = {
  error: XCircle,
  success: CheckCircle,
  info: Info,
  warning: AlertCircle,
};

export function Alert({ type, children, className }: AlertProps) {
  const Icon = icons[type];

  return (
    <div className={cn('p-4 rounded-md flex items-start', alertStyles[type], className)}>
      <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
      <div>{children}</div>
    </div>
  );
}