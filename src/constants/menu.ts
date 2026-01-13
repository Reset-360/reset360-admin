import { LayoutDashboard, Users, Briefcase, Building2, Boxes, QrCode, BookOpenCheck, Group, MessageSquarePlus } from 'lucide-react';

export const menuItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Users', href: '/users', icon: Users },
  { label: 'Clients', href: '/clients', icon: Briefcase },
  { label: 'Organizations', href: '/organizations', icon: Building2},
  { label: 'Cohorts', href: '/cohorts', icon: Group },
  { label: 'Seat Batches', href: '/seat-batches', icon: Boxes },
  { label: 'Seat Codes', href: '/seat-codes', icon: QrCode },
  { label: 'Entitlements', href: '/entitlements', icon: MessageSquarePlus },
  { label: 'ADAPTS Results', href: '/assessments', icon: BookOpenCheck },
];