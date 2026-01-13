export enum EClientStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum EClientSegment {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  PARENT = 'PARENT',
  INDIVIDUAL = 'INDIVIDUAL',
}

export enum EGender {
  MALE = 'Male',
  FEMALE = 'Female',
}

export enum EMaritalStatus {
  SINGLE = 'Single',
  MARRIED = 'Married',
  DIVORCED = 'Divorced',
  WIDOWED = 'Widowed',
}

export type ClientProfile = {
  _id: string;
  ref: string;
  userId: any;
  firstName: string;
  lastName: string;
  segment: EClientSegment;
  birthDate: Date;
  gender: EGender,
  address?: string;
  city?: string;
  country?: string;
  maritalStatus?: EMaritalStatus,
  notes?: string;
  organizationId?: string;
  highestEducationalAttainment?: string;
  occupation?: string;
  presentingConcerns?: string[];
  imageUrl?: string;
  status: EClientStatus;
  createdAt: Date;
  updatedAt: Date;
}