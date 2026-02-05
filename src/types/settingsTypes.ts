export type CurrencyCode = 'PHP';
export type AdaptsPricingMode = 'flat' | 'tiered';

export interface IAdaptsPriceTier {
  id: string;
  name: string;
  minQty: number;
  maxQty: number;
  unitAmount: number; // centavos
}

export interface IAdaptsPricingSettings {
  enabled: boolean;
  currency: CurrencyCode;
  mode: AdaptsPricingMode;

  unitAmount: number; // centavos (flat)
  tiers: IAdaptsPriceTier[]; // tiered

  updatedAt?: Date;
  updatedBy?: string;
}

export interface IGlobalSettings {
  key: 'global';

  adapts: {
    individualPricing: IAdaptsPricingSettings;
    organizationPricing: IAdaptsPricingSettings;
  };

  createdAt?: Date;
  updatedAt?: Date;
}