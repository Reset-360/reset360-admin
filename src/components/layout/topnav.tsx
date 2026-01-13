'use client';

import { useCallback, useEffect, useState } from 'react';
import { SidebarTrigger } from '../ui/sidebar';
import { ThemeModeToggle } from './theme-mode-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { LogOut } from 'lucide-react';
import useAuthStore from '@/src/store/AuthState';
import useLogout from '@/src/hooks/useLogout';
import { usePathname } from 'next/navigation';
import { menuItems } from '@/src/constants/menu';

export default function TopNav() {
  const identity = useAuthStore((state) => state.user);
  const logout = useLogout()
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const menu = menuItems.find(menu => pathname.startsWith(menu.href));
    setTitle(menu?.label ?? '')
  }, [pathname])

  const handleToggleOpen = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  return (
    <header className="h-16 border-b flex items-center px-4 justify-between relative">
      <div className="absolute" style={{ left: '-16px' }}>
        <SidebarTrigger />
      </div>

      <div className="flex items-center">
        <h1 className="text-xl font-bold">{title}</h1>
      </div>

      <div className="flex items-center gap-1">
        <ThemeModeToggle />

        <DropdownMenu open={open} onOpenChange={handleToggleOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 ml-2 rounded-full"
            >
              <Avatar className="h-8 w-8">
                {/* <AvatarImage src={identity?.avatar} role="presentation" /> */}
                <AvatarFallback>{identity?.username?.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {identity?.username}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={logout}
              className="cursor-pointer"
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
