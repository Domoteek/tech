import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Palette, Type } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Alert } from '../../components/ui/Alert';
import { updateAppName } from '../../lib/settings';

export function SettingsPage() {
  const { t, i18n } = useTranslation();
  const [appNames, setAppNames] = useState({
    fr: t('appName', { lng: 'fr' }),
    en: t('appName', { lng: 'en' })
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setAppNames({
      fr: t('appName', { lng: 'fr' }),
      en: t('appName', { lng: 'en' })
    });
  }, [t]);

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const handleAppNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await updateAppName(appNames[i18n.language], i18n.language);
      setIsEditingName(false);
      setSuccess(t('settings.appName.success'));
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError(t('settings.appName.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">{t('settings.title')}</h1>

      {success && (
        <Alert type="success">
          {success}
        </Alert>
      )}

      {error && (
        <Alert type="error">
          {error}
        </Alert>
      )}

      {/* Section Nom de l'application */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex items-center">
            <Type className="h-6 w-6 text-gray-600" />
            <div className="ml-3">
              <h2 className="text-lg font-medium text-gray-900">{t('settings.appName.title')}</h2>
              <p className="text-sm text-gray-500">{t('settings.appName.description')}</p>
            </div>
          </div>
          <div className="mt-6">
            {isEditingName ? (
              <form onSubmit={handleAppNameSubmit} className="space-y-4">
                <div className="space-y-4">
                  <Input
                    label="Nom en français"
                    value={appNames.fr}
                    onChange={(e) => setAppNames(prev => ({ ...prev, fr: e.target.value }))}
                  />
                  <Input
                    label="Name in English"
                    value={appNames.en}
                    onChange={(e) => setAppNames(prev => ({ ...prev, en: e.target.value }))}
                  />
                </div>
                <div className="flex space-x-3">
                  <Button type="submit" isLoading={isLoading}>
                    {t('settings.appName.save')}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setAppNames({
                        fr: t('appName', { lng: 'fr' }),
                        en: t('appName', { lng: 'en' })
                      });
                      setIsEditingName(false);
                    }}
                  >
                    {t('settings.appName.cancel')}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nom en français</p>
                    <p className="text-lg font-medium">{appNames.fr}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name in English</p>
                    <p className="text-lg font-medium">{appNames.en}</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditingName(true)}
                  >
                    {t('common.edit')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section Langue */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex items-center">
            <Globe className="h-6 w-6 text-gray-600" />
            <div className="ml-3">
              <h2 className="text-lg font-medium text-gray-900">{t('settings.language.title')}</h2>
              <p className="text-sm text-gray-500">{t('settings.language.description')}</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              onClick={() => handleLanguageChange('fr')}
              className={`flex items-center justify-center px-4 py-2 border rounded-md ${
                i18n.language === 'fr'
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t('settings.language.fr')}
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`flex items-center justify-center px-4 py-2 border rounded-md ${
                i18n.language === 'en'
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t('settings.language.en')}
            </button>
          </div>
        </div>
      </div>

      {/* Section Thème */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex items-center">
            <Palette className="h-6 w-6 text-gray-600" />
            <div className="ml-3">
              <h2 className="text-lg font-medium text-gray-900">{t('settings.theme.title')}</h2>
              <p className="text-sm text-gray-500">{t('settings.theme.description')}</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              {t('settings.theme.light')}
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              {t('settings.theme.dark')}
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              {t('settings.theme.system')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}