import React from 'react';
import { Shield } from 'lucide-react';
import type { Role } from '../../../types/permissions';

interface RoleCardProps {
  role: Role;
  isSelected: boolean;
  onClick: () => void;
}

export function RoleCard({ role, isSelected, onClick }: RoleCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg transition-all ${
        isSelected
          ? 'bg-blue-50 border-2 border-blue-500 shadow-sm'
          : 'border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}`}>
          <Shield className={`h-5 w-5 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{role.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{role.description}</p>
        </div>
      </div>
    </button>
  );
}