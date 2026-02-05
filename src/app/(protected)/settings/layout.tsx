import { Main } from '@/src/components/layout/main';
import { PageHeader } from '@/src/components/layout/page-header';
import { SidebarNav } from '@/src/components/settings/SidebarNav';
import { Separator } from '@/src/components/ui/separator';
import { Wrench } from 'lucide-react';
import React from 'react';

const sidebarNavItems = [
  {
    title: 'General',
    href: '/settings',
    icon: <Wrench />,
  }
];

const SettingsLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  return (
    <Main>
      <PageHeader
        title="Settings"
        subtitle="Manage ADAPTS and other app settings"
      />

      <Separator className="my-2" />
      
      <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12">
        <aside className="top-0 lg:sticky lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex w-full overflow-y-hidden p-1">
          {children}
        </div>
      </div>
    </Main>
  );
};

export default SettingsLayout;
