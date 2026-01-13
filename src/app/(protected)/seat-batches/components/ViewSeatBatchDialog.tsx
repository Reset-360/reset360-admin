'use client';

import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Label } from '@/src/components/ui/label';
import {
  AlignHorizontalDistributeCenter,
  Boxes,
  Building2,
  Hash,
  ListIndentDecrease,
  Timer,
  User,
} from 'lucide-react';
import { SeatBatch } from '@/src/types/seatBatchTypes';
import moment from 'moment';
import { AdaptsTypeBadge } from '@/src/components/common/adapts/AdaptsTypeBadge';
import InfoItem from '@/src/components/common/InfoItem';
import { Card } from '@/src/components/ui/card';
import { EducationLevelLabels, EEducationLevel } from '@/src/types/cohortTypes';
import RefItemIdLabel from '@/src/components/common/RefItemIdLabel';

type ViewSeatBatchDialogProps = {
  seatBatch?: SeatBatch;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ViewSeatBatchDialog({
  seatBatch,
  open,
  onOpenChange,
}: ViewSeatBatchDialogProps) {
  if (!seatBatch) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-description="View record dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">
            <Boxes /> Seat Batch Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 border-1 rounded-md text-center bg-card">
              <InfoItem
                icon={<Hash className="w-4 h-4" />}
                label="Total Seats"
                value={seatBatch.totalSeats || 0}
                center
              />
            </div>

            <div className="p-2 border-1 rounded-md text-center bg-card">
              <InfoItem
                icon={<Hash className="w-4 h-4" />}
                label="Seats Issued"
                value={seatBatch.seatsIssued || 0}
                center
              />
            </div>

            <div className="p-2 border-1 rounded-md text-center bg-card">
              <InfoItem
                icon={<Hash className="w-4 h-4" />}
                label="Seats Redeemed"
                value={seatBatch.seatsRedeemed || 0}
                center
              />
            </div>
          </div>

          <InfoItem
            icon={<Hash className="w-4 h-4" />}
            label="Ref ID"
            component={<RefItemIdLabel ref={seatBatch.ref || ''} />}
          />
          <InfoItem
            icon={<Building2 className="w-4 h-4" />}
            label="Organization"
            value={seatBatch.organizationId?.name}
          />
          <InfoItem
            icon={<Boxes className="w-4 h-4" />}
            label="Cohort"
            value={seatBatch.cohortId?.name}
          />
          <InfoItem
            icon={<ListIndentDecrease className="w-4 h-4" />}
            label="Classification"
            value={
              EducationLevelLabels[
                seatBatch.cohortId?.educationLevel as EEducationLevel
              ]
            }
          />
          <InfoItem
            icon={<Timer className="w-4 h-4" />}
            label="Expires At"
            value={
              seatBatch.expiresAt
                ? moment.utc(seatBatch.expiresAt).format('MMM D, YYYY')
                : 'No Expiry'
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
