export type Organization = {
  _id: string;
  ref?: string;
  name: string;
  email?: string; 
  phone?: string;
  address?: string;
  createdBy?: string; 
  logoUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}