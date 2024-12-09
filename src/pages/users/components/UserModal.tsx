import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { updateProfile, createUserByAdmin } from '../../../lib/auth';
import type { User } from '../../../types';
import type { Role } from '../../../types/permissions';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const userSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  role: z.string().min(1, 'Le rôle est obligatoire'),
});

type UserForm = z.infer<typeof userSchema>;

export function UserModal({ isOpen, onClose, user }: UserModalProps) {
  const { t } = useTranslation();
  const [roles, setRoles] = useState<Role[]>([]);
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
    defaultValues: user ? {
      name: user.name,
      email: user.email,
      role: user.role,
    } : {
      name: '',
      email: '',
      role: '',
    },
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesSnapshot = await getDocs(collection(db, 'roles'));
        const rolesData = rolesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Role[];
        setRoles(rolesData);
      } catch (error) {
        console.error('Erreur lors de la récupération des rôles:', error);
      }
    };

    if (isOpen) {
      fetchRoles();
      reset(user ? {
        name: user.name,
        email: user.email,
        role: user.role,
      } : {
        name: '',
        email: '',
        role: '',
      });
    }
  }, [isOpen, user, reset]);

  const onSubmit = async (data: UserForm) => {
    try {
      if (user) {
        await updateProfile(user.id, {
          name: data.name,
          email: data.email,
          role: data.role,
        });
      } else {
        await createUserByAdmin(data.email, data.name, data.role);
      }
      onClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
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
              {user ? t('users.editUser') : t('users.addUser')}
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
              label={t('users.form.name')}
              {...register('name')}
              error={errors.name?.message}
            />

            <Input
              label={t('users.form.email')}
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('users.form.role')}
              </label>
              <select
                {...register('role')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">{t('users.form.selectRole')}</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
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