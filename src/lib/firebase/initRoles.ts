import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { DEFAULT_ROLE_PERMISSIONS } from '../../config/rolePermissions';
import type { Role } from '../../types/permissions';

export async function initializeRoles() {
  try {
    // Vérifier si les rôles existent déjà
    const rolesSnapshot = await getDocs(collection(db, 'roles'));
    if (!rolesSnapshot.empty) {
      console.log('Roles already initialized');
      return;
    }

    // Créer les rôles par défaut
    const defaultRoles: Role[] = [
      {
        id: 'admin',
        name: 'Administrator',
        description: 'Full access to all system features',
        permissions: DEFAULT_ROLE_PERMISSIONS.admin
      },
      {
        id: 'user',
        name: 'User',
        description: 'Basic access with read-only permissions',
        permissions: DEFAULT_ROLE_PERMISSIONS.user
      },
      {
        id: 'commercial',
        name: 'Commercial',
        description: 'Access to view machines, software, and documents',
        permissions: DEFAULT_ROLE_PERMISSIONS.commercial
      },
      {
        id: 'technician',
        name: 'Technician',
        description: 'Manage machines, software, and documents',
        permissions: DEFAULT_ROLE_PERMISSIONS.technician
      },
      {
        id: 'installer',
        name: 'Installer',
        description: 'View machines, software, and installation documents',
        permissions: DEFAULT_ROLE_PERMISSIONS.installer
      }
    ];

    // Sauvegarder les rôles dans Firestore
    for (const role of defaultRoles) {
      await setDoc(doc(db, 'roles', role.id), role);
    }

    console.log('Default roles initialized successfully');
  } catch (error) {
    console.error('Error initializing roles:', error);
    throw error;
  }
}