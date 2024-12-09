import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { ModelsList } from './components/ModelsList';
import { ModelModal } from './components/ModelModal';
import { useModels } from '../../hooks/useModels';
import { useBrands } from '../../hooks/useBrands';
import type { Model } from '../../types/machines';

export function ModelsPage() {
  const { t } = useTranslation();
  const [selectedBrandId, setSelectedBrandId] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { brands } = useBrands();
  const {
    models,
    loading,
    error,
    addModel,
    updateModel,
    deleteModel
  } = useModels(selectedBrandId);

  const handleAddModel = () => {
    if (!selectedBrandId) {
      alert(t('machines.models.selectBrand'));
      return;
    }
    setSelectedModel(null);
    setIsModalOpen(true);
  };

  const handleEditModel = (model: Model) => {
    setSelectedModel(model);
    setIsModalOpen(true);
  };

  const handleDeleteModel = async (modelId: string) => {
    if (window.confirm(t('machines.models.deleteConfirm'))) {
      try {
        await deleteModel(modelId);
      } catch (error) {
        console.error('Erreur lors de la suppression du modèle:', error);
      }
    }
  };

  const filteredModels = models.filter(model =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">{t('machines.models.title')}</h1>
        <Button
          icon={Plus}
          onClick={handleAddModel}
          disabled={!selectedBrandId}
        >
          {t('machines.models.add')}
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-64">
              <select
                value={selectedBrandId}
                onChange={(e) => setSelectedBrandId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t('machines.models.selectBrand')}</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder={t('machines.models.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="p-4">
          {selectedBrandId ? (
            <ModelsList
              models={filteredModels}
              loading={loading}
              onEdit={handleEditModel}
              onDelete={handleDeleteModel}
              onSelect={() => {}}
            />
          ) : (
            <div className="text-center py-12 text-gray-500">
              {t('machines.models.selectBrandFirst')}
            </div>
          )}
        </div>
      </div>

      {selectedBrandId && (
        <ModelModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={selectedModel ? 
            (data) => updateModel(selectedModel.id, data) :
            addModel
          }
          model={selectedModel}
          brandId={selectedBrandId}
        />
      )}
    </div>
  );
}