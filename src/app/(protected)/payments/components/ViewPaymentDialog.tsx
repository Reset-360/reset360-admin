'use client';

import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Building2, Hash } from 'lucide-react';
import InfoItem from '@/src/components/common/InfoItem';
import { Payment } from '@/src/types/paymentTypes';
import { formatCents } from '@/src/lib/helper';
import { PaymentStatusBadge } from '@/src/components/common/payments/PaymentStatusBadge';
import moment from 'moment';

type ViewPaymentDialogProps = {
  data?: Payment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ViewPaymentDialog({
  data,
  open,
  onOpenChange,
}: ViewPaymentDialogProps) {
  if (!data) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-description="View record dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">
            <Building2 /> Payment Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <InfoItem
            icon={<Hash className="w-4 h-4" />}
            label="Ref ID"
            value={data.ref}
            valueClass="font-mono"
          />

          <InfoItem label="Provider" value={data.provider} valueClass='capitalize'/>

          <InfoItem label="Amount" value={formatCents(data.amount)} />

          <InfoItem
            label="Status"
            component={<PaymentStatusBadge status={data.status} />}
          />

          <InfoItem
            label="Paid At"
            value={moment(data.paidAt).format('MMM DD,YYYY hh:mm A')}
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
