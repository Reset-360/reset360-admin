'use client';

import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Label } from '@/src/components/ui/label';
import {
  AlignHorizontalDistributeCenter,
  BarChart3,
  BookOpenCheck,
  Brain,
  ChartBar,
  CloudRain,
  Hash,
  HeartPulse,
  QrCode,
  RefreshCw,
  UserRound,
  Users,
  Zap,
} from 'lucide-react';
import { AdaptsTypeBadge } from '@/src/components/common/adapts/AdaptsTypeBadge';
import { Assessment, ERiskBand } from '@/src/types/assessmentTypes';
import { RiskBandBadge } from '@/src/components/common/clients/RiskBandBadge';
import { AssessmentStatusLabel } from '@/src/components/common/adapts/AssessmentStatusLabel';
import { SegmentBadge } from '@/src/components/common/clients/SegmentBadge';
import { EClientSegment } from '@/src/types/clientTypes';
import InfoItem from '@/src/components/common/InfoItem';
import RefItemIdLabel from '@/src/components/common/RefItemIdLabel';

type ViewAssessmentDialogProps = {
  assessment?: Assessment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const subscaleConfig = {
  SoA: {
    fullName: 'Somatic Anxiety',
    icon: HeartPulse,
    colorClass: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  },
  PD: {
    fullName: 'Panic Disorder',
    icon: Zap,
    colorClass: 'bg-red-500/10 text-red-500 border-red-500/20',
  },
  SeA: {
    fullName: 'Separation Anxiety',
    icon: Users,
    colorClass: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  },
  GAD: {
    fullName: 'Generalized Anxiety',
    icon: Brain,
    colorClass: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  },
  OCD: {
    fullName: 'Obsessive Compulsive',
    icon: RefreshCw,
    colorClass: 'bg-green-500/10 text-green-500 border-green-500/20',
  },
  MDD: {
    fullName: 'Major Depression',
    icon: CloudRain,
    colorClass: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
  },
};

export default function ViewAssessmentDialog({
  assessment,
  open,
  onOpenChange,
}: ViewAssessmentDialogProps) {
  if (!assessment) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-description="View record dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">
            <BookOpenCheck /> Assessment Results
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          {/* Ref */}
          <InfoItem
            icon={<Hash className="w-4 h-4" />}
            label="Ref ID"
            component={<RefItemIdLabel ref={assessment.ref || ''} />}
          />

          <InfoItem
            icon={<QrCode className="w-4 h-4" />}
            label="Redeemed Seat Code"
            value={assessment.seatCode?.code}
          />

          <InfoItem
            icon={<UserRound className="w-4 h-4" />}
            label="Client Name"
            value={`${assessment.clientProfile?.firstName} ${assessment.clientProfile?.lastName}`}
          />

          <InfoItem
            icon={<AlignHorizontalDistributeCenter className="w-4 h-4" />}
            label="Segment"
            component={
              <SegmentBadge
                segment={assessment.clientProfile?.segment as EClientSegment}
              />
            }
          />

          <InfoItem
            icon={<ChartBar className="w-4 h-4" />}
            label="Risk Level"
            component={
              <RiskBandBadge riskBand={assessment.riskBand as ERiskBand} />
            }
          />

          <InfoItem
            label="ADAPTS Type"
            component={<AdaptsTypeBadge type={assessment.type} />}
          />

          <InfoItem
            label="Status"
            component={
              <AssessmentStatusLabel
                status={assessment.submittedAt ? 'Completed' : 'In Progress'}
              />
            }
          />
        </div>

        {assessment.submittedAt ? (
          <>
            <div className="grid grid-cols-3 gap-2 border-y py-5">
              <div className="p-2 border-1 rounded-md text-center bg-card">
                <InfoItem
                  label="Total Rating"
                  value={assessment.totalRating}
                  center
                />
              </div>

              <div className="p-2 border-1 rounded-md text-center bg-card">
                <InfoItem label="tScore" value={assessment.tScore} center />
              </div>

              <div className="p-2 border-1 rounded-md text-center bg-card">
                <InfoItem
                  label="tScore Category"
                  value={assessment.tScoreSummary?.tScoreCategory}
                  center
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4 text-primary" />
                <h3 className="font-display font-semibold text-foreground">
                  Subscale Breakdown
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {(
                  Object.entries(assessment.subScales as any) as [
                    keyof typeof subscaleConfig,
                    number
                  ][]
                ).map(([key, value], index) => {
                  const config = subscaleConfig[key];
                  const Icon = config.icon;
                  return (
                    <div
                      key={key}
                      className={`p-4 rounded-xl border ${config.colorClass} animate-slide-up transition-all hover:scale-[1.02]`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wide">
                          {key}
                        </span>
                      </div>
                      <div className="text-2xl font-display font-bold">
                        {value}
                      </div>
                      <div className="text-xs opacity-70 mt-0.5">
                        {config.fullName}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center py-5 text-center border-t pt-10">
            <p className="text-muted-foreground text-xs text-center">
              Pending assessment results
            </p>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
