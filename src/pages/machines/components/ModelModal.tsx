import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import type { Model } from '../../../types/machines';

interface ModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Model, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  model?: Model | null;
  brandId: string;
}

const modelSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  description: z.string().optional(),
  image: z.string().url('URL invalide').optional().or(z.literal('')),
  specifications: z.record(z.string()).optional(),
});

type ModelForm = z.infer<typeof modelSchema>;

export function ModelModal({ isOpen, onClose, onSubmit, model, brandId }: ModelModalProps) {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ModelForm>({
    resolver: zodResolver(modelSchema),
    defaultValues: model ? {
      name: model.name,
      description: model.description || '',
      image: model.image || '',
      specifications: model.specifications || {},
    } : {
      name: '',
      description: '',
      image: '',
      specifications: {},
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      reset(model ? {
        name: model.name,
        description: model.description || '',
        image: model.image || '',
        specifications: model.specifications || {},
      } : {
        name: '',
        description: '',
        image: '',
        specifications: {},
      });
    }
  }, [isOpen, model, reset]);

  const handleFormSubmit = async (data: ModelForm) => {
    try {
      await onSubmit({
        ...data,
        brandId,
        specifications: data.specifications || {},
      });
      reset();
      onClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du modèle:', error);
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
              {model ? t('machines.models.edit') : t('machines.models.add')}
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
              label={t('machines.models.form.name')}
              {...register('name')}
              error={errors.name?.message}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('machines.models.form.description')}
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
              label={t('machines.models.form.image')}
              type="url"
              {...register('image')}
              error={errors.image?.message}
              placeholder="https://..."
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('machines.models.form.specifications')}
              </label>
              <textarea
                {...register('specifications')}
                rows={5}
                placeholder="Spécifications techniques..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

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