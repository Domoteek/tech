import { Document } from './index';

export interface Brand {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Model {
  id: string;
  brandId: string;
  name: string;
  description?: string;
  image?: string;
  specifications: {
    [key: string]: string | number | boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Machine {
  id: string;
  modelId: string;
  serialNumber: string;
  purchaseDate?: Date;
  installationDate?: Date;
  status: 'active' | 'maintenance' | 'retired';
  location?: string;
  notes?: string;
  associatedSoftware: string[];
  documents: Document[];
  maintenanceHistory: MaintenanceRecord[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MaintenanceRecord {
  id: string;
  date: Date;
  type: 'preventive' | 'corrective';
  description: string;
  technician: string;
  parts?: {
    name: string;
    quantity: number;
    cost?: number;
  }[];
  cost?: number;
  nextMaintenanceDate?: Date;
}

export interface Specification {
  id: string;
  name: string;
  type: 'text' | 'number' | 'boolean' | 'date';
  unit?: string;
  required: boolean;
}

export interface Category {
  id: string;
  name: string;
  specifications: Specification[];
  createdAt: Date;
  updatedAt: Date;
}