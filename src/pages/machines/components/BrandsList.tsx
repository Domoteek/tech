import React from 'react';
import { useTranslation } from 'react-i18next';
import { Edit2, Trash2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { PermissionGate } from '../../../components/auth/PermissionGate';
import type { Brand } from '../../../types/machines';

interface BrandsListProps {
  brands: Brand[];
  loading: boolean;
  onEdit: (brand: Brand) => void;
  onDelete: (brandId: string) => void;
  onSelect: (brandId: string) => void;
}

export function BrandsList({ brands, loading, onEdit, onDelete, onSelect }: BrandsListProps) {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{t('machines.brands.noBrands')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {brands.map((brand) => (
        <div
          key={brand.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div 
              className="flex-1 cursor-pointer"
              onClick={() => onSelect(brand.id)}
            >
              {brand.logo && (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-12 w-12 object-contain mb-2"
                />
              )}
              <h3 className="font-medium text-gray-900">{brand.name}</h3>
              {brand.description && (
                <p className="text-sm text-gray-500 mt-1">{brand.description}</p>
              )}
            </div>
            <PermissionGate permissions={{ resource: 'machines', action: 'write' }}>
              <div className="flex space-x-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  icon={Edit2}
                  onClick={() => onEdit(brand)}
                >
                  {t('common.edit')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={Trash2}
                  className="text-red-600 hover:text-red-700"
                  onClick={() => onDelete(brand.id)}
                >
                  {t('common.delete')}
                </Button>
              </div>
            </PermissionGate>
          </div>
        </div>
      ))}
    </div>
  );
}