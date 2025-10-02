'use client';
import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/src/types/userTypes';
import { ArrowUpDown, BadgeCheckIcon, BadgeXIcon, MoreHorizontal } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { VerifiedStatus } from '@/src/types/statusTypes';
import { Badge } from '@/src/components/ui/badge';

const TableColumn: ColumnDef<User>[] = [
  {
    accessorKey: 'ref',
    header: 'Reference ID',
    cell: ({ row }) => <div className="capitalize">{row.getValue('ref')}</div>,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Phone
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('phone')}</div>,
  },
  {
    accessorKey: 'emailStatus',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email Verified?
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <>
      {row.getValue('emailStatus') == VerifiedStatus.VERIFIED ? (
        <Badge
          variant="secondary"
          className="bg-blue-500 text-white dark:bg-blue-600"
        >
          <BadgeCheckIcon />
          Verified
        </Badge>
      ) : (
        <Badge
          variant="secondary"
        >
          <BadgeXIcon />
          Unverified
        </Badge>
      )}
    </>,
  },
  {
    accessorKey: 'phoneStatus',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Phone Verified?
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <>
      {row.getValue('phoneStatus') == VerifiedStatus.VERIFIED ? (
        <Badge
          variant="secondary"
          className="bg-blue-500 text-white dark:bg-blue-600"
        >
          <BadgeCheckIcon />
          Verified
        </Badge>
      ) : (
        <Badge
          variant="secondary"
        >
          <BadgeXIcon />
          Unverified
        </Badge>
      )}
    </>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View User</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default TableColumn;
