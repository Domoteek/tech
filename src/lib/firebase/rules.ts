// Règles de sécurité Firebase à copier dans la console Firebase
export const FIRESTORE_RULES = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Fonction pour vérifier si l'utilisateur est authentifié
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Fonction pour vérifier si l'utilisateur est admin
    function isAdmin() {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Fonction pour vérifier les permissions de lecture
    function hasReadPermission(resource) {
      let userRole = get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role;
      let rolePermissions = get(/databases/$(database)/documents/roles/$(userRole)).data.permissions;
      return rolePermissions[resource].read == true;
    }
    
    // Fonction pour vérifier les permissions d'écriture
    function hasWritePermission(resource) {
      let userRole = get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role;
      let rolePermissions = get(/databases/$(database)/documents/roles/$(userRole)).data.permissions;
      return rolePermissions[resource].write == true;
    }
    
    // Règles pour la collection users
    match /users/{userId} {
      allow read: if isAuthenticated() && (request.auth.uid == userId || isAdmin());
      allow write: if isAdmin();
    }
    
    // Règles pour la collection machines
    match /machines/{machineId} {
      allow read: if isAuthenticated() && (hasReadPermission('machines') || isAdmin());
      allow write: if isAuthenticated() && (hasWritePermission('machines') || isAdmin());
    }
    
    // Règles pour la collection software
    match /software/{softwareId} {
      allow read: if isAuthenticated() && (hasReadPermission('software') || isAdmin());
      allow write: if isAuthenticated() && (hasWritePermission('software') || isAdmin());
    }
    
    // Règles pour la collection documents
    match /documents/{documentId} {
      allow read: if isAuthenticated() && (hasReadPermission('documents') || isAdmin());
      allow write: if isAuthenticated() && (hasWritePermission('documents') || isAdmin());
    }
    
    // Règles pour la collection roles
    match /roles/{roleId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }
  }
}`;