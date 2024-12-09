import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile as updateFirebaseProfile,
  sendSignInLinkToEmail,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from './firebase';
import { DEFAULT_ROLE_PERMISSIONS } from '../config/rolePermissions';
import type { User } from '../types';
import type { Role } from '../types/permissions';

async function initializeDefaultRoles() {
  try {
    const rolesSnapshot = await getDocs(collection(db, 'roles'));
    
    if (rolesSnapshot.empty) {
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
        }
      ];

      for (const role of defaultRoles) {
        await setDoc(doc(db, 'roles', role.id), role);
      }
    }
  } catch (error) {
    console.error('Error initializing roles:', error);
    throw error;
  }
}

export async function signUp(email: string, password: string, name: string) {
  try {
    await initializeDefaultRoles();
    
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const isFirstUser = usersSnapshot.empty;
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    const userData: Omit<User, 'id'> = {
      email,
      name,
      role: isFirstUser ? 'admin' : 'user',
      createdAt: new Date(),
    };

    await setDoc(doc(db, 'users', userCredential.user.uid), userData);
    
    await updateFirebaseProfile(userCredential.user, {
      displayName: name,
    });

    return { ...userData, id: userCredential.user.uid };
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    
    if (!userDoc.exists()) {
      throw new Error('User data not found');
    }
    
    return { id: userCredential.user.uid, ...userDoc.data() } as User;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
}

export async function updateProfile(userId: string, data: Partial<User>) {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: new Date(),
    });
    
    if (auth.currentUser) {
      await updateFirebaseProfile(auth.currentUser, {
        displayName: data.name,
      });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}

export async function createUserByAdmin(email: string, name: string, role: string) {
  try {
    const userData: Omit<User, 'id'> = {
      email,
      name,
      role,
      createdAt: new Date(),
    };

    const userRef = doc(collection(db, 'users'));
    await setDoc(userRef, userData);

    const actionCodeSettings = {
      url: `${window.location.origin}/auth/complete-signup?uid=${userRef.id}`,
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);

    return { ...userData, id: userRef.id };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function completeUserSignup(userId: string, password: string) {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    const userData = userDoc.data() as Omit<User, 'id'>;
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, password);

    await updateFirebaseProfile(userCredential.user, {
      displayName: userData.name,
    });

    return { ...userData, id: userId };
  } catch (error) {
    console.error('Error completing signup:', error);
    throw error;
  }
}