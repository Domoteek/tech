import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Mail, Shield, Save } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Alert } from '../../components/ui/Alert';
import { updateProfile } from '../../lib/auth';

export function ProfilePage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  // Update form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      });
    }
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (!user) return;
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim()) {
      setError(t('profile.errors.requiredFields'));
      return;
    }

    setIsSaving(true);
    try {
      await updateProfile(user.id, formData);
      setSuccess(t('profile.success'));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(t('profile.error'));
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <User className="h-6 w-6 text-gray-600" />
              <h2 className="ml-3 text-lg font-medium text-gray-900">
                {t('profile.title')}
              </h2>
            </div>
            {!isEditing && (
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
              >
                {t('common.edit')}
              </Button>
            )}
          </div>

          {error && (
            <Alert type="error" className="mb-6">
              {error}
            </Alert>
          )}

          {success && (
            <Alert type="success" className="mb-6">
              {success}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Input
                label={t('users.form.name')}
                icon={User}
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <Input
                label={t('users.form.email')}
                icon={Mail}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('users.form.role')}
                </label>
                <div className="mt-1 flex items-center">
                  <Shield className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-900">
                    {t(`users.roles.${user.role}`)}
                  </span>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  type="submit"
                  icon={Save}
                  isLoading={isSaving}
                >
                  {t('common.save')}
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}