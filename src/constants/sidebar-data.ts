import {
  LayoutDashboard,
  Settings,
  Wrench,
  Users,
  Briefcase,
  Building2,
  Boxes,
  QrCode,
  BookOpenCheck,
  Group,
  MessageSquarePlus,
  Receipt,
  BanknoteArrowUp,
} from 'lucide-react';

export const sidebarData = {
  navGroups: [
    {
      title: 'General',
      items: [
        { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
        { title: 'Users', url: '/users', icon: Users },
        { title: 'Clients', url: '/clients', icon: Briefcase },
        { title: 'Organizations', url: '/organizations', icon: Building2 },
        { title: 'Cohorts', url: '/cohorts', icon: Group },
        { title: 'Seat Batches', url: '/seat-batches', icon: Boxes },
        { title: 'Seat Codes', url: '/seat-codes', icon: QrCode },
        {
          title: 'Entitlements',
          url: '/entitlements',
          icon: MessageSquarePlus,
        },
        { title: 'ADAPTS Results', url: '/assessments', icon: BookOpenCheck },
      ],
    },
    {
      title: 'Reports',
      items: [
        {
          title: 'Payments',
          icon: Receipt,
          url: '/payments',          
        },
        {
          title: 'Purchases',
          icon: BanknoteArrowUp,
          url: '/purchases',          
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'General',
              url: '/settings',
              icon: Wrench,
            },
          ],
        },
      ],
    },
  ],
};
