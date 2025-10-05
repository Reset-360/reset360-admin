'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from '@/src/components/ui/sidebar';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/src/lib/utils';
import useLogout from '@/src/hooks/useLogout';
import { menuItems } from '@/src/constants/menu';

export default function AppSidebar() {
  const pathname = usePathname();
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
          <span className="text-purple-900 font-bold text-lg dark:text-purple-200">
            Reset 360
          </span>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        'flex items-center gap-2',
                        isActive && 'bg-blue-600 text-white hover:bg-blue-700'
                      )}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-2"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              <SidebarMenuItem></SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenuButton
          onClick={logout}
          className="flex items-center gap-2 bg-violet-900 text-white"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
