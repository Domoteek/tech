import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Brand } from '../types/machines';

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'brands'), orderBy('name'));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const brandsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Brand[];
        setBrands(brandsData);
        setLoading(false);
      },
      (err) => {
        console.error('Erreur lors du chargement des marques:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addBrand = async (brandData: Omit<Brand, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const now = new Date();
      await addDoc(collection(db, 'brands'), {
        ...brandData,
        createdAt: now,
        updatedAt: now
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la marque:', error);
      throw error;
    }
  };

  const updateBrand = async (brandId: string, brandData: Partial<Brand>) => {
    try {
      const brandRef = doc(db, 'brands', brandId);
      await updateDoc(brandRef, {
        ...brandData,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la marque:', error);
      throw error;
    }
  };

  const deleteBrand = async (brandId: string) => {
    try {
      await deleteDoc(doc(db, 'brands', brandId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la marque:', error);
      throw error;
    }
  };

  return {
    brands,
    loading,
    error,
    addBrand,
    updateBrand,
    deleteBrand
  };
}