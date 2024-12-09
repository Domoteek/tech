import React from 'react';
import { useTranslation } from 'react-i18next';
import { Edit2, Trash2, Monitor } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import type { Model } from '../../../types/machines';

interface ModelsListProps {
  models: Model[];
  loading: boolean;
  onEdit: (model: Model) => void;
  onDelete: (modelId: string) => void;
  onSelect: (modelId: string) => void;
}

export function ModelsList({ models, loading, onEdit, onDelete, onSelect }: ModelsListProps) {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (models.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{t('machines.models.noModels')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {models.map((model) => (
        <div
          key={model.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div 
              className="flex-1 cursor-pointer"
              onClick={() => onSelect(model.id)}
            >
              {model.image ? (
                <img
                  src={model.image}
                  alt={model.name}
                  className="h-32 w-full object-cover rounded-md mb-3"
                />
              ) : (
                <div className="h-32 w-full bg-gray-100 rounded-md flex items-center justify-center mb-3">
                  <Monitor className="h-12 w-12 text-gray-400" />
                </div>
              )}
              <h3 className="font-medium text-gray-900">{model.name}</h3>
              {model.description && (
                <p className="text-sm text-gray-500 mt-1">{model.description}</p>
              )}
            </div>
            <div className="flex space-x-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                icon={Edit2}
                onClick={() => onEdit(model)}
              >
                {t('common.edit')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={Trash2}
                className="text-red-600 hover:text-red-700"
                onClick={() => onDelete(model.id)}
              >
                {t('common.delete')}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}