'use client';

import {
  Avatar,
  AvatarFallback
} from '@/src/components/ui/avatar';
import { Button } from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import useAuthStore from '../store/AuthState';
import useLogout from '../hooks/useLogout';

export function ProfileDropdown() {
  const identity = useAuthStore((state) => state.user);
  const logout = useLogout();

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{identity?.username?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-1.5">
              <p className="text-sm leading-none font-medium">
                {identity?.username}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {identity?.email}
              </p>
            </div>
          </DropdownMenuLabel>

          {/* <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href='/profile'>
                Profile
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup> */}

          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={logout}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
