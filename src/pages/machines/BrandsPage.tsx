import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { BrandsList } from './components/BrandsList';
import { BrandModal } from './components/BrandModal';
import { useBrands } from '../../hooks/useBrands';
import type { Brand } from '../../types/machines';

export function BrandsPage() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    brands,
    loading,
    error,
    addBrand,
    updateBrand,
    deleteBrand
  } = useBrands();

  const handleAddBrand = () => {
    setSelectedBrand(null);
    setIsModalOpen(true);
  };

  const handleEditBrand = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  const handleDeleteBrand = async (brandId: string) => {
    if (window.confirm(t('machines.brands.deleteConfirm'))) {
      try {
        await deleteBrand(brandId);
      } catch (error) {
        console.error('Erreur lors de la suppression de la marque:', error);
      }
    }
  };

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">{t('machines.brands.title')}</h1>
        <Button
          icon={Plus}
          onClick={handleAddBrand}
        >
          {t('machines.brands.add')}
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder={t('machines.brands.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="p-4">
          <BrandsList
            brands={filteredBrands}
            loading={loading}
            onEdit={handleEditBrand}
            onDelete={handleDeleteBrand}
            onSelect={() => {}}
          />
        </div>
      </div>

      <BrandModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={selectedBrand ? 
          (data) => updateBrand(selectedBrand.id, data) :
          addBrand
        }
        brand={selectedBrand}
      />
    </div>
  );
}