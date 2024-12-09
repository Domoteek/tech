export type Permission = 'read' | 'write';
export type Resource = 'machines' | 'software' | 'documents' | 'users';

export interface ResourcePermissions {
  read: boolean;
  write: boolean;
}

export interface RolePermissions {
  [key: string]: ResourcePermissions;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: RolePermissions;
}

// Type pour les permissions par défaut des rôles
export type DefaultRoles = 'admin' | 'user' | 'commercial' | 'technician' | 'installer';

// Type pour la vérification des permissions
export interface PermissionCheck {
  resource: Resource;
  action: Permission;
}