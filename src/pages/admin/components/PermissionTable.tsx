import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check, X } from 'lucide-react';
import type { Role, Resource, Permission } from '../../../types/permissions';

interface PermissionTableProps {
  role: Role;
  onPermissionChange: (resource: Resource, action: Permission, value: boolean) => void;
}

export function PermissionTable({ role, onPermissionChange }: PermissionTableProps) {
  const { t } = useTranslation();
  
  const resources: Resource[] = ['machines', 'software', 'documents', 'users'];
  const actions: Permission[] = ['read', 'write'];

  const getResourceLabel = (resource: Resource) => {
    switch (resource) {
      case 'machines':
        return t('nav.machines');
      case 'software':
        return t('nav.software');
      case 'documents':
        return t('nav.documents');
      case 'users':
        return t('nav.users');
      default:
        return resource;
    }
  };

  const getActionLabel = (action: Permission) => {
    switch (action) {
      case 'read':
        return t('common.read');
      case 'write':
        return t('common.write');
      default:
        return action;
    }
  };

  return (
    <div className="mt-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('roles.permissions.resource')}
            </th>
            {actions.map(action => (
              <th 
                key={action}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {getActionLabel(action)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {resources.map(resource => (
            <tr key={resource} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {getResourceLabel(resource)}
                </div>
              </td>
              {actions.map(action => (
                <td key={`${resource}-${action}`} className="px-6 py-4 whitespace-nowrap">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={role.permissions[resource]?.[action] || false}
                      onChange={(e) => onPermissionChange(resource, action, e.target.checked)}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2">
                      {role.permissions[resource]?.[action] ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                    </span>
                  </label>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}