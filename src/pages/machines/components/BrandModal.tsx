import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import type { Brand } from '../../../types/machines';

interface BrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Brand, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  brand?: Brand | null;
}

const brandSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  description: z.string().optional(),
  logo: z.string().url('URL invalide').optional().or(z.literal('')),
});

type BrandForm = z.infer<typeof brandSchema>;

export function BrandModal({ isOpen, onClose, onSubmit, brand }: BrandModalProps) {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<BrandForm>({
    resolver: zodResolver(brandSchema),
    defaultValues: brand ? {
      name: brand.name,
      description: brand.description || '',
      logo: brand.logo || '',
    } : {
      name: '',
      description: '',
      logo: '',
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      reset(brand ? {
        name: brand.name,
        description: brand.description || '',
        logo: brand.logo || '',
      } : {
        name: '',
        description: '',
        logo: '',
      });
    }
  }, [isOpen, brand, reset]);

  const handleFormSubmit = async (data: BrandForm) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la marque:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
        
        <div className="relative bg-white w-full max-w-md rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-medium">
              {brand ? t('machines.brands.edit') : t('machines.brands.add')}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4 space-y-4">
            <Input
              label={t('machines.brands.form.name')}
              {...register('name')}
              error={errors.name?.message}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('machines.brands.form.description')}
              </label>
              <textarea
                {...register('description')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <Input
              label={t('machines.brands.form.logo')}
              type="url"
              {...register('logo')}
              error={errors.logo?.message}
              placeholder="https://..."
            />

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                {t('common.cancel')}
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting}
              >
                {t('common.save')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}