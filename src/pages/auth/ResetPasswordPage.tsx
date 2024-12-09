import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { resetPassword } from '../../lib/auth';

const resetSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ResetForm = z.infer<typeof resetSchema>;

export function ResetPasswordPage() {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data: ResetForm) => {
    try {
      await resetPassword(data.email);
      alert('Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error('Reset password error:', error);
      alert('Failed to send reset email. Please try again.');
    }
  };

  return (
    <AuthLayout 
      title={t('auth.resetPassword.title')}
      subtitle={t('auth.resetPassword.backToLogin')}
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            {t('auth.fields.email')}
          </label>
          <div className="mt-1">
            <input
              {...register('email')}
              type="email"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{t('auth.errors.invalidEmail')}</p>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? `${t('auth.resetPassword.submit')}...` : t('auth.resetPassword.submit')}
          </button>
        </div>

        <div className="text-sm text-center">
          <Link to="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
            {t('auth.resetPassword.backToLogin')}
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}