export type UserRole = 'admin' | 'user' | 'commercial' | 'technician' | 'installer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

export interface Machine {
  id: string;
  brand: string;
  model: string;
  category: string;
  technicalDetails: string;
  associatedSoftware: string[];
  documents: Document[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Software {
  id: string;
  name: string;
  version: string;
  description: string;
  installationUrl?: string;
  tutorialUrl?: string;
  compatibleMachines: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'video';
  url: string;
  uploadedAt: Date;
}