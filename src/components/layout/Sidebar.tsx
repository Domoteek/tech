import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard,
  Monitor, 
  Box, 
  Users, 
  FileText, 
  Settings, 
  X,
  Shield,
  User,
  Briefcase,
  Tags
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { usePermissions } from '../../hooks/usePermissions';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  adminOnly?: boolean;
  permission?: {
    resource: 'machines' | 'software' | 'documents' | 'users';
    action: 'read' | 'write';
  };
  children?: Omit<NavItem, 'children'>[];
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { hasPermission } = usePermissions();

  const mainNavigation: NavItem[] = [
    { 
      name: t('nav.dashboard'), 
      href: '/', 
      icon: LayoutDashboard 
    },
    { 
      name: t('nav.machines.title'), 
      href: '/machines', 
      icon: Monitor,
      permission: { resource: 'machines', action: 'read' },
      children: [
        { 
          name: t('nav.machines.brands'), 
          href: '/machines/brands', 
          icon: Briefcase,
          permission: { resource: 'machines', action: 'write' }
        },
        { 
          name: t('nav.machines.models'), 
          href: '/machines/models', 
          icon: Tags,
          permission: { resource: 'machines', action: 'write' }
        }
      ]
    },
    { 
      name: t('nav.software'), 
      href: '/software', 
      icon: Box,
      permission: { resource: 'software', action: 'read' }
    },
    { 
      name: t('nav.documents'), 
      href: '/documents', 
      icon: FileText,
      permission: { resource: 'documents', action: 'read' }
    },
  ];

  const adminNavigation: NavItem[] = [
    { 
      name: t('nav.users'), 
      href: '/users', 
      icon: Users, 
      adminOnly: true 
    },
    { 
      name: t('nav.roles'), 
      href: '/roles', 
      icon: Shield, 
      adminOnly: true 
    },
  ];

  const userNavigation: NavItem[] = [
    { 
      name: t('nav.profile'), 
      href: '/profile', 
      icon: User 
    },
    { 
      name: t('nav.settings'), 
      href: '/settings', 
      icon: Settings 
    },
  ];

  const renderNavLink = (item: NavItem, isChild = false) => {
    if (item.adminOnly && user?.role !== 'admin') return null;
    if (item.permission && !hasPermission(item.permission)) return null;

    return (
      <div key={item.href}>
        <NavLink
          to={item.href}
          onClick={() => onClose()}
          className={({ isActive }) =>
            `flex items-center space-x-3 p-2 rounded-lg transition-colors ${
              isChild ? 'ml-6' : ''
            } ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`
          }
        >
          <item.icon className="h-5 w-5" />
          <span>{item.name}</span>
        </NavLink>
        {item.children?.map(child => renderNavLink(child, true))}
      </div>
    );
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          w-64 bg-gray-900 text-white overflow-y-auto
        `}
      >
        <div className="flex items-center justify-between h-16 px-4 lg:hidden">
          <span className="text-xl font-bold">{t('appName')}</span>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4">
          <nav className="space-y-1">
            {mainNavigation.map(item => renderNavLink(item))}

            {user?.role === 'admin' && (
              <>
                <div className="border-t border-gray-700 my-4" />
                {adminNavigation.map(item => renderNavLink(item))}
              </>
            )}

            <div className="border-t border-gray-700 my-4" />
            {userNavigation.map(item => renderNavLink(item))}
          </nav>
        </div>
      </div>
    </>
  );
}