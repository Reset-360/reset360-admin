import clsx from 'clsx';
import { ReactNode } from 'react';

interface InfoItemProps {
  icon?: React.ReactNode;
  label: string;
  value?: any;
  component?: any;
  valueClass?: string;
  center?: boolean
}

const InfoItem = ({
  icon,
  label,
  value,
  component,
  valueClass,
  center = false
}: InfoItemProps) => (
  <div className={clsx('space-y-1', center ?? 'text-center' )}>
    <p className={`text-xs text-muted-foreground font-medium flex items-center gap-1.5 ${center ? 'justify-center' : ''}`} >
      {icon}
      {label || '-'}
    </p>
    {component ? (
      component
    ) : (
      <p
        className={`text-sm font-semibold  ${valueClass || ''}`}
      >
        {value}
      </p>
    )}
  </div>
);

export default InfoItem;
