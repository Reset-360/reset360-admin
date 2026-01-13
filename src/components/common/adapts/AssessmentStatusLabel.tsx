const statusConfig = {
  ['Completed']: {
    label: 'Completed',
    className: 'text-green-500  text-sm',
  },
  ['Started']: {
    label: 'Started',
    className: 'text-orange-500 text-sm',
  },
};

export function AssessmentStatusLabel({
  status,
}: {
  status: 'Completed' | 'Started';
}) {
  const { label, className } = statusConfig[status] ?? statusConfig[status];

  return <div className={className}>{label}</div>;
}
