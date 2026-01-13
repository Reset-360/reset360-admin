'use client';

import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Label } from '@/src/components/ui/label';
import { Building2, Hash } from 'lucide-react';
import { Organization } from '@/src/types/organizationTypes';
import InfoItem from '@/src/components/common/InfoItem';

type ViewOrganizationDialogProps = {
  organization?: Organization;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ViewOrganizationDialog({
  organization,
  open,
  onOpenChange,
}: ViewOrganizationDialogProps) {
  if (!organization) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-description="View record dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">
            <Building2 /> Organization Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <InfoItem
            icon={<Hash className="w-4 h-4" />}
            label="Ref ID"
            value={organization.ref}
            valueClass="font-mono"
          />

          <InfoItem label="Name" value={organization.name} />

          <InfoItem label="Email" value={organization.email} />

          <InfoItem label="Phone" value={organization.phone} />

          <InfoItem label="Address" value={organization.address} />

          {/* Close Button */}
          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
