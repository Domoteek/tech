import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Model } from '../types/machines';

export function useModels(brandId?: string) {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!brandId) {
      setModels([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'models'),
      where('brandId', '==', brandId),
      orderBy('name')
    );
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const modelsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Model[];
        setModels(modelsData);
        setLoading(false);
      },
      (err) => {
        console.error('Erreur lors du chargement des modèles:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [brandId]);

  const addModel = async (modelData: Omit<Model, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const now = new Date();
      await addDoc(collection(db, 'models'), {
        ...modelData,
        createdAt: now,
        updatedAt: now
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du modèle:', error);
      throw error;
    }
  };

  const updateModel = async (modelId: string, modelData: Partial<Model>) => {
    try {
      const modelRef = doc(db, 'models', modelId);
      await updateDoc(modelRef, {
        ...modelData,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du modèle:', error);
      throw error;
    }
  };

  const deleteModel = async (modelId: string) => {
    try {
      await deleteDoc(doc(db, 'models', modelId));
    } catch (error) {
      console.error('Erreur lors de la suppression du modèle:', error);
      throw error;
    }
  };

  return {
    models,
    loading,
    error,
    addModel,
    updateModel,
    deleteModel
  };
}