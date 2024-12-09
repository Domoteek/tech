import { useCallback } from 'react';
import { useAuth } from './useAuth';
import { DEFAULT_ROLE_PERMISSIONS } from '../config/rolePermissions';
import type { Permission, Resource, PermissionCheck } from '../types/permissions';

export function usePermissions() {
  const { user } = useAuth();

  const hasPermission = useCallback(
    ({ resource, action }: PermissionCheck): boolean => {
      if (!user) return false;

      // Les administrateurs ont toutes les permissions
      if (user.role === 'admin') return true;

      // Vérifier les permissions basées sur le rôle
      const rolePermissions = DEFAULT_ROLE_PERMISSIONS[user.role];
      if (!rolePermissions) return false;

      const resourcePermissions = rolePermissions[resource];
      if (!resourcePermissions) return false;

      return resourcePermissions[action];
    },
    [user]
  );

  const checkMultiplePermissions = useCallback(
    (checks: PermissionCheck[]): boolean => {
      return checks.every((check) => hasPermission(check));
    },
    [hasPermission]
  );

  return {
    hasPermission,
    checkMultiplePermissions,
  };
}