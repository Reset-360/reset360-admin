'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { Organization } from '@/src/types/organizationTypes';
import RefItemIdLabel from '@/src/components/common/RefItemIdLabel';

const TableColumn: ColumnDef<Organization>[] = [
  {
    accessorKey: 'ref',
    header: 'Reference ID',
    cell: ({ row }) => <RefItemIdLabel ref={row.getValue('ref')} />,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Organization Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('name')}</div>
    ),
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
    cell: ({ row }) => (
      <div className="">{row.getValue('email')}</div>
    ),
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
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('phone')}</div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row, table}) => {
      const meta = table.options.meta;
      const id = row.original._id;

      const onViewClick = () => meta?.viewItem?.(id);
      const onEditClick = () => meta?.editItem?.(id);
      const onDeleteClick = () => meta?.deleteItem?.(id);

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
            <DropdownMenuItem onClick={onViewClick}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={onEditClick}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={onDeleteClick}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default TableColumn;
