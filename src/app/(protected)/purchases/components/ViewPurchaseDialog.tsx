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
import { Purchase, PurchaseItem } from '@/src/types/purchaseTypes';
import { PurchaseStatusBadge } from '@/src/components/common/payments/PurchaseStatusBadge';
import { formatCents } from '@/src/lib/helper';
import moment from 'moment';
import { Fragment } from 'react';

type ViewPurchaseDialogProps = {
  data?: Purchase;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ViewPurchaseDialog({
  data,
  open,
  onOpenChange,
}: ViewPurchaseDialogProps) {
  if (!data) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-description="View record dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">
            <Building2 /> Purchase Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <InfoItem
            icon={<Hash className="w-4 h-4" />}
            label="Ref ID"
            value={data.ref}
            valueClass="font-mono"
          />

          <InfoItem label="Buyer Type" value={data.buyer.type} />
          <InfoItem label="Organization" value={data.buyer.organizationName} />

          <InfoItem label="Contact Name" value={data.buyer.contactName} />
          <InfoItem label="Contact Email" value={data.buyer.contactEmail} />
          <InfoItem label="Contact Phone" value={data.buyer.contactPhone} />

          {data.items.map((item: PurchaseItem, index) => (
            <Fragment key={index}>
              <InfoItem label="Product:" value={item.code} />
              <InfoItem label="Qty:" value={item.quantity} />
            </Fragment>
          ))}

          <InfoItem
            label="Amount"
            value={formatCents(data.pricingSnapshot?.totalAmount)}
          />

          <InfoItem
            label="Created At"
            value={moment(data.createdAt).format('MMM DD,YYYY hh:mm A')}
          />

          <InfoItem
            label="Status"
            component={<PurchaseStatusBadge status={data.status} />}
          />

          <InfoItem
            label="Payment Ref#"
            value={(data.paymentId as any)?.ref}
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
