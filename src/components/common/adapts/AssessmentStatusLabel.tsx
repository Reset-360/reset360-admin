const statusConfig = {
  ['Completed']: {
    label: 'Completed',
    className: 'text-green-500  text-sm',
  },
  ['In Progress']: {
    label: 'In Progress',
    className: 'text-orange-500 text-sm',
  },
};

export function AssessmentStatusLabel({
  status,
}: {
  status: 'Completed' | 'In Progress';
}) {
  const { label, className } = statusConfig[status] ?? statusConfig[status];

  return <div className={className}>{label}</div>;
}
