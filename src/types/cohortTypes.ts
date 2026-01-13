export type Cohort = {
  _id: string;
  ref: string;
  organizationId: any;
  name: string; // e.g., "Batch 2025", "Grade 9 - Emerald"
  educationLevel?: EEducationLevel
  description?: string;
  createdBy?: any; // admin or org coordinator
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export enum EEducationLevel {
  GradeSchool = "GradeSchool",
  JuniorHigh = "JuniorHigh",
  SeniorHigh = "SeniorHigh",
  Associate = "Associate",
  Bachelor = "Bachelor",
  Master = "Master",
  Doctorate = "Doctorate",
  Professional = "Professional",
}

export const EducationLevelLabels: Record<EEducationLevel, string> = {
  [EEducationLevel.GradeSchool]: "Grade School (Grades 1–6)",
  [EEducationLevel.JuniorHigh]: "Junior High School (Grades 7–10)",
  [EEducationLevel.SeniorHigh]: "Senior High School (Grades 11–12)",
  [EEducationLevel.Associate]: "Associate Degree",
  [EEducationLevel.Bachelor]: "Bachelor’s Degree",
  [EEducationLevel.Master]: "Master’s Degree",
  [EEducationLevel.Doctorate]: "Doctoral Degree (PhD, EdD, etc.)",
  [EEducationLevel.Professional]: "Professional Degree (MD, JD, etc.)",
};