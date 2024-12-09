import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import type { Resource, Permission } from '../../types/permissions';

export async function checkCollectionAccess(
  userId: string,
  resource: Resource,
  action: Permission
): Promise<boolean> {
  try {
    // Vérifier d'abord si l'utilisateur existe et récupérer son rôle
    const userDoc = await getDocs(
      query(collection(db, 'users'), where('id', '==', userId))
    );

    if (userDoc.empty) return false;

    const userData = userDoc.docs[0].data();
    
    // Si l'utilisateur est admin, accorder toutes les permissions
    if (userData.role === 'admin') return true;

    // Vérifier les permissions spécifiques au rôle
    const roleDoc = await getDocs(
      query(collection(db, 'roles'), where('name', '==', userData.role))
    );

    if (roleDoc.empty) return false;

    const roleData = roleDoc.docs[0].data();
    return roleData.permissions[resource]?.[action] || false;
  } catch (error) {
    console.error('Error checking collection access:', error);
    return false;
  }
}