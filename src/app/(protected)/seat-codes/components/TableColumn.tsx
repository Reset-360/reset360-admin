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
import { SeatCode } from '@/src/types/seatCodeTypes';
import { AdaptsTypeBadge } from '@/src/components/common/adapts/AdaptsTypeBadge';
import { SeatCodeStatusLabel } from '@/src/components/common/adapts/SeatCodeStatusLabel';
import RefItemIdLabel from '@/src/components/common/RefItemIdLabel';

const TableColumn: ColumnDef<SeatCode>[] = [
  // {
  //   accessorKey: 'ref',
  //   header: 'Reference ID',
  //   cell: ({ row }) => <div className="capitalize">{row.getValue('ref')}</div>,
  // },
  {
    accessorKey: 'code',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Code
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize tracking-widest font-bold">{row.getValue('code')}</div>
    ),
  },
  {
    accessorKey: 'batchId',
    id: 'batchId',
    accessorFn: (row) => row.batchId?.ref, // ✅ extract nested value
    header: 'Batch Ref ID',
    cell: ({ row }) => <RefItemIdLabel ref={row.getValue('batchId')} />,
  },
  {
    id: 'organizationId',
    accessorFn: (row) => row.batchId?.organizationId?._id, // ✅ filter value
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Organization
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const org = row.original.batchId?.organizationId;
      return <div className="capitalize">{org?.name ?? '-'}</div>;
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue === 'all') return true;
      return row.getValue(columnId) === filterValue;
    },
  },
  {
    id: 'cohortId',
    accessorFn: (row) => row.batchId?.cohortId?._id, // ✅ filter value // 3.12 Base on actual cohort value in future seatcode.cohortId
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Cohort
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const cohort = row.original.batchId?.cohortId;
      return <div className="capitalize">{cohort?.name ?? ''}</div>;
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue === 'all') return true;
      return row.getValue(columnId) === filterValue;
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Type
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <AdaptsTypeBadge type={row.getValue('type')} />
    ),
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue === 'all') return true;
      return row.getValue(columnId) === filterValue;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <SeatCodeStatusLabel status={row.getValue('status')} />
    ),
  },
  {
      id: 'actions',
      enableHiding: false,
      cell: ({ row, table }) => {
        const meta = table.options.meta;
        const id = row.original._id;
  
        const onViewClick = () => meta?.viewItem?.(id);
  
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
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
];

export default TableColumn;
