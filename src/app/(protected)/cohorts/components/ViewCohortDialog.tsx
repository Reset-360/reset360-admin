'use client';

import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Group, Hash } from 'lucide-react';
import {
  Cohort,
  EducationLevelLabels,
  EEducationLevel,
} from '@/src/types/cohortTypes';
import InfoItem from '@/src/components/common/InfoItem';
import RefItemIdLabel from '@/src/components/common/RefItemIdLabel';

type ViewCohortDialogProps = {
  cohort?: Cohort;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ViewCohortDialog({
  cohort,
  open,
  onOpenChange,
}: ViewCohortDialogProps) {
  if (!cohort) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-description="View record dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">
            <Group /> Cohort Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <InfoItem
            icon={<Hash className="w-4 h-4" />}
            label="Ref ID"
            component={<RefItemIdLabel ref={cohort.ref || ''} />}
          />

          <InfoItem label="Name" value={cohort.name} />

          <InfoItem
            label="Education Level"
            value={
              EducationLevelLabels[cohort.educationLevel as EEducationLevel]
            }
          />

          <InfoItem label="Organization" value={cohort.organizationId?.name} />

          <InfoItem label="Description" value={cohort.description} />

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
