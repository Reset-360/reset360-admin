'use client';

import api from '@/src/lib/axios';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ContentSection } from './components/ContentSection';
import { IAdaptsPricingSettings } from '@/src/types/settingsTypes';
import IndividualPricing from './components/adapts/IndividualPricing';
import OrganizationPricing from './components/adapts/OrganizationPricing';

const SettingsPage = () => {
  const [individualAdapts, setIndividualAdapts] =
    useState<IAdaptsPricingSettings>();
  const [organizationAdapts, setOrganizationAdapts] =
    useState<IAdaptsPricingSettings>();

  const fetchSettings = useCallback(async () => {
    try {
      const response = await api.get('/settings/global');
      const adaptsSetting = response.data.adapts;
      setIndividualAdapts(adaptsSetting.individualPricing);
      setOrganizationAdapts(adaptsSetting.organizationPricing);
    } catch (error) {
      toast.error('Error fetching users:');
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return (
    <ContentSection
      title="ADAPTS Pricing"
      desc="Manage ADAPTS pricing settings for users and organizations"
    >
      <div className='flex flex-col gap-4'>
        {individualAdapts && (
          <IndividualPricing setting={individualAdapts} refresh={fetchSettings} />
        )}

        {organizationAdapts && (
          <OrganizationPricing setting={organizationAdapts} refresh={fetchSettings} />
        )}
      </div>
    </ContentSection>
  );
};

export default SettingsPage;
