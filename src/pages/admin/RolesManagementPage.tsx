import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { Shield, Save, Plus } from 'lucide-react';
import { db } from '../../lib/firebase';
import { PermissionGate } from '../../components/auth/PermissionGate';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { RoleCard } from './components/RoleCard';
import { PermissionTable } from './components/PermissionTable';
import { AddRoleModal } from './components/AddRoleModal';
import { DEFAULT_ROLE_PERMISSIONS } from '../../config/rolePermissions';
import type { Role, Resource, Permission } from '../../types/permissions';

export function RolesManagementPage() {
  const { t } = useTranslation();
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesSnapshot = await getDocs(collection(db, 'roles'));
        if (rolesSnapshot.empty) {
          // Initialize default roles if none exist
          const defaultRoles = Object.entries(DEFAULT_ROLE_PERMISSIONS).map(([id, permissions]) => ({
            id,
            name: t(`users.roles.${id}`),
            description: t(`roles.descriptions.${id}`),
            permissions
          }));

          for (const role of defaultRoles) {
            await setDoc(doc(db, 'roles', role.id), role);
          }

          setRoles(defaultRoles);
        } else {
          const rolesData = rolesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Role[];
          setRoles(rolesData);
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
        setError(t('roles.errors.fetchFailed'));
      }
    };

    fetchRoles();
  }, [t]);

  const handlePermissionChange = (
    resource: Resource,
    action: Permission,
    value: boolean
  ) => {
    if (!selectedRole) return;

    setSelectedRole(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        permissions: {
          ...prev.permissions,
          [resource]: {
            ...prev.permissions[resource],
            [action]: value
          }
        }
      };
    });
  };

  const handleSaveRole = async () => {
    if (!selectedRole) return;

    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await setDoc(doc(db, 'roles', selectedRole.id), selectedRole);
      setRoles(prev => 
        prev.map(role => 
          role.id === selectedRole.id ? selectedRole : role
        )
      );
      setSuccess(t('roles.success.saved'));
    } catch (error) {
      console.error('Error saving role:', error);
      setError(t('roles.errors.saveFailed'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddRole = async (newRole: Role) => {
    try {
      await setDoc(doc(db, 'roles', newRole.id), newRole);
      setRoles(prev => [...prev, newRole]);
      setSuccess(t('roles.success.added'));
    } catch (error) {
      console.error('Error adding role:', error);
      setError(t('roles.errors.addFailed'));
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {t('roles.management.title')}
        </h1>
        <Button
          icon={Plus}
          onClick={() => setIsAddModalOpen(true)}
        >
          {t('roles.add.button')}
        </Button>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des rôles */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">
            {t('roles.list.title')}
          </h2>
          <div className="space-y-3">
            {roles.map(role => (
              <RoleCard
                key={role.id}
                role={role}
                isSelected={selectedRole?.id === role.id}
                onClick={() => setSelectedRole(role)}
              />
            ))}
          </div>
        </div>

        {/* Édition des permissions */}
        <div className="lg:col-span-2">
          {selectedRole ? (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    {t('roles.permissions.title')}
                  </h2>
                  <Button
                    icon={Save}
                    onClick={handleSaveRole}
                    isLoading={isSaving}
                  >
                    {t('roles.permissions.save')}
                  </Button>
                </div>

                <PermissionTable
                  role={selectedRole}
                  onPermissionChange={handlePermissionChange}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg p-8">
              <div className="text-center">
                <Shield className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  {t('roles.noSelection')}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {t('roles.selectToEdit')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <AddRoleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddRole}
      />
    </div>
  );
}