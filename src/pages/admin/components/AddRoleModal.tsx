import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { DEFAULT_ROLE_PERMISSIONS } from '../../../config/rolePermissions';
import type { Role } from '../../../types/permissions';

interface AddRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (role: Role) => Promise<void>;
}

const roleSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
});

type RoleForm = z.infer<typeof roleSchema>;

export function AddRoleModal({ isOpen, onClose, onAdd }: AddRoleModalProps) {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<RoleForm>({
    resolver: zodResolver(roleSchema),
  });

  const onSubmit = async (data: RoleForm) => {
    try {
      const roleId = data.name.toLowerCase().replace(/\s+/g, '-');
      const newRole: Role = {
        id: roleId,
        name: data.name,
        description: data.description,
        permissions: { ...DEFAULT_ROLE_PERMISSIONS.user } // Permissions par défaut
      };

      await onAdd(newRole);
      reset();
      onClose();
    } catch (error) {
      console.error('Erreur lors de la création du rôle:', error);
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
              {t('roles.add.title')}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
            <Input
              label={t('roles.add.name')}
              {...register('name')}
              error={errors.name?.message}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('roles.add.description')}
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