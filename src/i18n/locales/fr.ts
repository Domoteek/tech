export const fr = {
  translation: {
    appName: 'Gest-Mag TechManager',
    nav: {
      dashboard: 'Tableau de bord',
      machines: {
        title: 'Machines',
        brands: 'Marques',
        models: 'Modèles'
      },
      software: 'Logiciels',
      documents: 'Documents',
      users: 'Utilisateurs',
      roles: 'Rôles',
      settings: 'Paramètres',
      profile: 'Profil'
    },
    machines: {
      brands: {
        title: 'Gestion des marques',
        add: 'Ajouter une marque',
        edit: 'Modifier la marque',
        delete: 'Supprimer la marque',
        deleteConfirm: 'Êtes-vous sûr de vouloir supprimer cette marque ?',
        noBrands: 'Aucune marque trouvée',
        searchPlaceholder: 'Rechercher une marque...',
        selectBrand: 'Sélectionner une marque',
        selectBrandFirst: 'Veuillez d\'abord sélectionner une marque',
        form: {
          name: 'Nom de la marque',
          description: 'Description',
          logo: 'URL du logo'
        }
      },
      models: {
        title: 'Gestion des modèles',
        add: 'Ajouter un modèle',
        edit: 'Modifier le modèle',
        delete: 'Supprimer le modèle',
        deleteConfirm: 'Êtes-vous sûr de vouloir supprimer ce modèle ?',
        noModels: 'Aucun modèle trouvé',
        searchPlaceholder: 'Rechercher un modèle...',
        selectBrand: 'Sélectionner une marque',
        selectBrandFirst: 'Veuillez d\'abord sélectionner une marque',
        form: {
          name: 'Nom du modèle',
          description: 'Description',
          image: 'URL de l\'image',
          specifications: 'Spécifications techniques'
        }
      }
    },
    software: {
      title: 'Gestion des logiciels',
      add: 'Ajouter un logiciel',
      searchPlaceholder: 'Rechercher un logiciel...',
      allTypes: 'Tous les types',
      noSoftware: 'Aucun logiciel trouvé'
    },
    documents: {
      title: 'Gestion des documents',
      add: 'Ajouter un document',
      searchPlaceholder: 'Rechercher un document...',
      allTypes: 'Tous les types',
      noDocuments: 'Aucun document trouvé'
    },
    users: {
      title: 'Gestion des utilisateurs',
      addUser: 'Ajouter un utilisateur',
      editUser: 'Modifier l\'utilisateur',
      searchPlaceholder: 'Rechercher par nom ou email...',
      allRoles: 'Tous les rôles',
      noUsers: 'Aucun utilisateur trouvé',
      table: {
        name: 'Nom',
        email: 'Email',
        role: 'Rôle',
        createdAt: 'Date de création',
        actions: 'Actions'
      },
      roles: {
        admin: 'Administrateur',
        user: 'Utilisateur',
        commercial: 'Commercial',
        technician: 'Technicien',
        installer: 'Installateur'
      },
      form: {
        name: 'Nom',
        email: 'Email',
        role: 'Rôle',
        selectRole: 'Sélectionner un rôle'
      }
    },
    roles: {
      management: {
        title: 'Gestion des rôles'
      },
      list: {
        title: 'Liste des rôles'
      },
      permissions: {
        title: 'Permissions',
        resource: 'Ressource',
        save: 'Enregistrer les permissions'
      },
      add: {
        title: 'Ajouter un rôle',
        button: 'Ajouter un rôle',
        name: 'Nom du rôle',
        description: 'Description'
      },
      noSelection: 'Aucun rôle sélectionné',
      selectToEdit: 'Sélectionnez un rôle pour modifier ses permissions',
      success: {
        saved: 'Permissions enregistrées avec succès',
        added: 'Rôle ajouté avec succès'
      },
      errors: {
        fetchFailed: 'Erreur lors du chargement des rôles',
        saveFailed: 'Erreur lors de l\'enregistrement des permissions',
        addFailed: 'Erreur lors de l\'ajout du rôle'
      },
      descriptions: {
        admin: 'Accès complet à toutes les fonctionnalités',
        user: 'Accès de base avec permissions en lecture seule',
        commercial: 'Accès aux machines, logiciels et documents',
        technician: 'Gestion des machines, logiciels et documents',
        installer: 'Consultation des machines, logiciels et documents d\'installation'
      }
    },
    settings: {
      title: 'Paramètres',
      appName: {
        title: 'Nom de l\'application',
        description: 'Personnalisez le nom de votre application',
        save: 'Enregistrer',
        cancel: 'Annuler',
        success: 'Nom de l\'application mis à jour avec succès',
        error: 'Erreur lors de la mise à jour du nom'
      },
      language: {
        title: 'Langue',
        description: 'Sélectionnez votre langue préférée',
        fr: 'Français',
        en: 'English'
      },
      theme: {
        title: 'Thème',
        description: 'Personnalisez l\'apparence de l\'application',
        light: 'Clair',
        dark: 'Sombre',
        system: 'Système'
      }
    },
    auth: {
      login: {
        title: 'Connexion',
        submit: 'Se connecter',
        noAccount: 'Pas encore de compte ?',
        signUp: "S'inscrire",
        forgotPassword: 'Mot de passe oublié ?'
      },
      register: {
        title: 'Créer un compte',
        submit: 'Créer le compte',
        hasAccount: 'Déjà un compte ?',
        signIn: 'Se connecter'
      },
      resetPassword: {
        title: 'Réinitialiser le mot de passe',
        submit: 'Envoyer le lien',
        backToLogin: 'Retour à la connexion'
      },
      fields: {
        email: 'Adresse e-mail',
        password: 'Mot de passe',
        confirmPassword: 'Confirmer le mot de passe',
        fullName: 'Nom complet'
      },
      errors: {
        invalidEmail: 'Adresse e-mail invalide',
        passwordLength: 'Le mot de passe doit contenir au moins 6 caractères',
        passwordMatch: 'Les mots de passe ne correspondent pas',
        nameLength: 'Le nom doit contenir au moins 2 caractères'
      }
    },
    profile: {
      title: 'Profil',
      edit: 'Modifier le profil',
      success: 'Profil mis à jour avec succès',
      error: 'Erreur lors de la mise à jour du profil',
      errors: {
        requiredFields: 'Tous les champs obligatoires doivent être remplis'
      }
    },
    common: {
      save: 'Enregistrer',
      cancel: 'Annuler',
      edit: 'Modifier',
      delete: 'Supprimer',
      back: 'Retour',
      loading: 'Chargement...',
      error: 'Une erreur est survenue',
      success: 'Opération réussie',
      read: 'Lecture',
      write: 'Écriture'
    }
  }
};