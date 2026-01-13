'use client';

import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Boxes, Hash } from 'lucide-react';
import { SeatCode } from '@/src/types/seatCodeTypes';
import { AdaptsTypeBadge } from '@/src/components/common/adapts/AdaptsTypeBadge';
import { SeatCodeStatusLabel } from '@/src/components/common/adapts/SeatCodeStatusLabel';
import InfoItem from '@/src/components/common/InfoItem';
import { EducationLevelLabels, EEducationLevel } from '@/src/types/cohortTypes';
import RefItemIdLabel from '@/src/components/common/RefItemIdLabel';

type ViewSeatCodeDialogProps = {
  seatCode?: SeatCode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ViewSeatCodeDialog({
  seatCode,
  open,
  onOpenChange,
}: ViewSeatCodeDialogProps) {
  if (!seatCode) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-description="View record dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">
            <Boxes /> Seat Code Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center justify-center py-2 bg-card rounded-sm gap-2 mb-2">
            <p className="tracking-widest font text-4xl fontweight-bold">
              {seatCode.code}
            </p>
            <span className="text-xs">Seat Code</span>
          </div>

          <InfoItem
            icon={<Hash className="w-4 h-4" />}
            label="Ref ID"
            component={<RefItemIdLabel ref={seatCode.ref || ''} />}
          />

          <InfoItem
            label="Organization"
            value={seatCode.batchId?.organizationId?.name}
          />

          <InfoItem label="Cohort" value={seatCode.cohortId?.name} />

          <InfoItem
            label="Education Level"
            value={
              EducationLevelLabels[
                seatCode.cohortId?.educationLevel as EEducationLevel
              ]
            }
          />

          <InfoItem
            label="ADAPTS Type"
            component={<AdaptsTypeBadge type={seatCode.type} />}
          />

          <InfoItem
            label="Status"
            component={<SeatCodeStatusLabel status={seatCode.status} />}
          />

          <InfoItem
            label="Redeemed By"
            component={
              <p className="capitalize">
                {seatCode.clientProfile?.firstName}{' '}
                {seatCode.clientProfile?.lastName}
              </p>
            }
          />

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
