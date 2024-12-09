import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { MachinesPage } from '../pages/machines/MachinesPage';
import { BrandsPage } from '../pages/machines/BrandsPage';
import { ModelsPage } from '../pages/machines/ModelsPage';
import { SoftwarePage } from '../pages/software/SoftwarePage';
import { DocumentsPage } from '../pages/documents/DocumentsPage';
import { SettingsPage } from '../pages/settings/SettingsPage';
import { UsersPage } from '../pages/users/UsersPage';
import { RolesManagementPage } from '../pages/admin/RolesManagementPage';
import { ProfilePage } from '../pages/profile/ProfilePage';
import { useAuth } from '../hooks/useAuth';
import { usePermissions } from '../hooks/usePermissions';

export function PrivateRoutes() {
  const { user, loading } = useAuth();
  const { hasPermission } = usePermissions();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <AppLayout>
      <Routes>
        {/* Routes principales */}
        <Route path="/" element={<DashboardPage />} />
        
        {/* Routes machines */}
        <Route path="/machines" element={<MachinesPage />} />
        <Route 
          path="/machines/brands" 
          element={
            hasPermission({ resource: 'machines', action: 'write' }) ? 
            <BrandsPage /> : 
            <Navigate to="/machines" />
          } 
        />
        <Route 
          path="/machines/models" 
          element={
            hasPermission({ resource: 'machines', action: 'write' }) ? 
            <ModelsPage /> : 
            <Navigate to="/machines" />
          } 
        />
        
        {/* Autres routes */}
        <Route path="/software" element={<SoftwarePage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        
        {/* Routes d'administration */}
        <Route 
          path="/users" 
          element={user.role === 'admin' ? <UsersPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/roles" 
          element={user.role === 'admin' ? <RolesManagementPage /> : <Navigate to="/" />} 
        />
        
        {/* Routes utilisateur */}
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        
        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}