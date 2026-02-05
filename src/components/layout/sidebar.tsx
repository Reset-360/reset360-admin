'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from '@/src/components/ui/sidebar';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import useLogout from '@/src/hooks/useLogout';
import { sidebarData } from '@/src/constants/sidebar-data';
import { NavGroup } from './nav-group';

export default function AppSidebar() {
  const logout = useLogout()

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <SidebarMenuButton className="flex items-center gap-2">
          <Image
            src={'/logo/logo_32.png'}
            alt={'Reset360 Logo'}
            width={32}
            height={32}
          />
          <span className="text-violet-600 font-bold text-lg dark:text-violet-200">
            Reset 360
          </span>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenuButton
          onClick={logout}
          className="flex items-center gap-2 bg-violet-600 text-white"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
