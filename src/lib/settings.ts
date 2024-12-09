import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import i18next from 'i18next';

const SETTINGS_DOC_ID = 'app_settings';

interface AppSettings {
  appName: {
    fr: string;
    en: string;
  };
}

export async function updateAppName(name: string, language: string) {
  try {
    const settingsRef = doc(db, 'settings', SETTINGS_DOC_ID);
    const settingsDoc = await getDoc(settingsRef);
    
    let currentSettings: AppSettings = settingsDoc.exists() 
      ? settingsDoc.data() as AppSettings
      : { appName: { fr: 'Gest-Mag TechManager', en: 'Gest-Mag TechManager' } };

    const updatedSettings = {
      ...currentSettings,
      appName: {
        ...currentSettings.appName,
        [language]: name
      }
    };

    await setDoc(settingsRef, updatedSettings);

    // Mettre à jour i18next immédiatement pour la langue actuelle
    i18next.addResource(language, 'translation', 'appName', name);

    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du nom:', error);
    throw error;
  }
}

export async function loadAppSettings() {
  try {
    const settingsRef = doc(db, 'settings', SETTINGS_DOC_ID);
    const settingsDoc = await getDoc(settingsRef);
    
    if (settingsDoc.exists()) {
      const settings = settingsDoc.data() as AppSettings;
      
      // Mettre à jour i18next pour toutes les langues
      Object.entries(settings.appName).forEach(([lang, name]) => {
        i18next.addResource(lang, 'translation', 'appName', name);
      });
    }
  } catch (error) {
    console.error('Erreur lors du chargement des paramètres:', error);
  }
}