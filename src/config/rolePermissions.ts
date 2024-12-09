import { RolePermissions } from '../types/permissions';

export const DEFAULT_ROLE_PERMISSIONS: Record<string, RolePermissions> = {
  admin: {
    machines: { read: true, write: true },
    software: { read: true, write: true },
    documents: { read: true, write: true },
    users: { read: true, write: true },
  },
  user: {
    machines: { read: true, write: false },
    software: { read: true, write: false },
    documents: { read: true, write: false },
    users: { read: false, write: false },
  },
  commercial: {
    machines: { read: true, write: false },
    software: { read: true, write: false },
    documents: { read: true, write: false },
    users: { read: false, write: false },
  },
  technician: {
    machines: { read: true, write: true },
    software: { read: true, write: true },
    documents: { read: true, write: true },
    users: { read: false, write: false },
  },
  installer: {
    machines: { read: true, write: false },
    software: { read: true, write: false },
    documents: { read: true, write: false },
    users: { read: false, write: false },
  }
};