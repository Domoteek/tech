import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Search, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-md h-16 z-20 relative">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link to="/" className="text-xl font-bold text-gray-900 ml-2 lg:ml-0">
            {t('appName', { defaultValue: 'Gest-Mag TechManager' })}
          </Link>
        </div>

        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder={t('search.placeholder')}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => {
              // Implémenter la recherche mobile
            }}
          >
            <Search className="h-5 w-5" />
          </button>
          
          {user && (
            <>
              <Link
                to="/settings"
                className="text-gray-600 hover:text-gray-900"
              >
                <Settings className="h-5 w-5" />
              </Link>
              <button
                onClick={signOut}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}