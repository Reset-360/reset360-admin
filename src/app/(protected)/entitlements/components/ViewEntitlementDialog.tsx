'use client';

import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { BookOpenCheck, Hash, UserRound } from 'lucide-react';
import InfoItem from '@/src/components/common/InfoItem';
import RefItemIdLabel from '@/src/components/common/RefItemIdLabel';
import { Entitlement } from '@/src/types/entitlementTypes';
import { EntitlementStatusLabel } from '@/src/components/common/adapts/EntitlementStatusLabel';
import { EntitlementSourceLabel } from '@/src/components/common/adapts/EntitlementSourceLabel';
import { AdaptsTypeBadge } from '@/src/components/common/adapts/AdaptsTypeBadge';

type ViewEntitlementDialogProps = {
  entitlement?: Entitlement;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ViewEntitlementDialog({
  entitlement,
  open,
  onOpenChange,
}: ViewEntitlementDialogProps) {
  if (!entitlement) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-description="View record dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">
            <BookOpenCheck /> Assessment Entitlement
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 py-4">
          <InfoItem
            icon={<Hash className="w-4 h-4" />}
            label="Ref ID"
            component={<RefItemIdLabel ref={entitlement.ref || ''} />}
          />

          <InfoItem
            label="ADAPTS Type"
            component={<AdaptsTypeBadge type={entitlement.type} />}
          />

          <InfoItem
            icon={<UserRound className="w-4 h-4" />}
            label="Client Name"
            value={`${entitlement.clientProfile?.firstName} ${entitlement.clientProfile?.lastName}`}
            valueClass='capitalize'
          />

          <InfoItem
            label="Status"
            component={<EntitlementStatusLabel status={entitlement.status} />}
          />

          <InfoItem
            label="Source"
            component={<EntitlementSourceLabel source={entitlement.source} />}
          />

          <InfoItem
            label="Attempts"
            value={`${entitlement.attemptsUsed}/${entitlement.maxAttempts}`}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
