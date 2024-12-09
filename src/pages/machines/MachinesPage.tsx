import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { PermissionGate } from '../../components/auth/PermissionGate';
import { BrandsList } from './components/BrandsList';
import { ModelsList } from './components/ModelsList';
import { BrandModal } from './components/BrandModal';
import { ModelModal } from './components/ModelModal';
import { useBrands } from '../../hooks/useBrands';
import { useModels } from '../../hooks/useModels';
import type { Brand, Model } from '../../types/machines';

export function MachinesPage() {
  const { t } = useTranslation();
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    brands,
    loading: brandsLoading,
    error: brandsError,
    addBrand,
    updateBrand,
    deleteBrand
  } = useBrands();

  const {
    models,
    loading: modelsLoading,
    error: modelsError,
    addModel,
    updateModel,
    deleteModel
  } = useModels(selectedBrandId || undefined);

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrandId(brandId);
    setSelectedModel(null);
  };

  const handleAddBrand = () => {
    setSelectedBrand(null);
    setIsBrandModalOpen(true);
  };

  const handleEditBrand = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsBrandModalOpen(true);
  };

  const handleDeleteBrand = async (brandId: string) => {
    if (window.confirm(t('machines.brands.deleteConfirm'))) {
      try {
        await deleteBrand(brandId);
        if (selectedBrandId === brandId) {
          setSelectedBrandId(null);
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de la marque:', error);
      }
    }
  };

  const handleAddModel = () => {
    if (!selectedBrandId) return;
    setSelectedModel(null);
    setIsModelModalOpen(true);
  };

  const handleEditModel = (model: Model) => {
    setSelectedModel(model);
    setIsModelModalOpen(true);
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

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredModels = models.filter(model =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {selectedBrandId ? t('machines.models.title') : t('machines.brands.title')}
        </h1>
        <PermissionGate permissions={{ resource: 'machines', action: 'write' }}>
          <Button
            icon={Plus}
            onClick={selectedBrandId ? handleAddModel : handleAddBrand}
          >
            {selectedBrandId ? t('machines.models.add') : t('machines.brands.add')}
          </Button>
        </PermissionGate>
      </div>

      {(brandsError || modelsError) && (
        <Alert type="error">
          {t('common.error')}
        </Alert>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder={t(selectedBrandId ? 'machines.models.searchPlaceholder' : 'machines.brands.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="p-4">
          {selectedBrandId ? (
            <div className="space-y-4">
              <Button
                variant="outline"
                onClick={() => setSelectedBrandId(null)}
              >
                {t('common.back')}
              </Button>
              <ModelsList
                models={filteredModels}
                loading={modelsLoading}
                onEdit={handleEditModel}
                onDelete={handleDeleteModel}
                onSelect={() => {}} // À implémenter pour la vue détaillée
              />
            </div>
          ) : (
            <BrandsList
              brands={filteredBrands}
              loading={brandsLoading}
              onEdit={handleEditBrand}
              onDelete={handleDeleteBrand}
              onSelect={handleBrandSelect}
            />
          )}
        </div>
      </div>

      <BrandModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
        onSubmit={selectedBrand ? 
          (data) => updateBrand(selectedBrand.id, data) :
          addBrand
        }
        brand={selectedBrand}
      />

      {selectedBrandId && (
        <ModelModal
          isOpen={isModelModalOpen}
          onClose={() => setIsModelModalOpen(false)}
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