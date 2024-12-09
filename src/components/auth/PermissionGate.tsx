import React from 'react';
import { usePermissions } from '../../hooks/usePermissions';
import type { PermissionCheck } from '../../types/permissions';

interface PermissionGateProps {
  children: React.ReactNode;
  permissions: PermissionCheck | PermissionCheck[];
  fallback?: React.ReactNode;
}

export function PermissionGate({ 
  children, 
  permissions, 
  fallback = null 
}: PermissionGateProps) {
  const { hasPermission, checkMultiplePermissions } = usePermissions();

  const hasAccess = Array.isArray(permissions)
    ? checkMultiplePermissions(permissions)
    : hasPermission(permissions);

  if (!hasAccess) return <>{fallback}</>;

  return <>{children}</>;
}