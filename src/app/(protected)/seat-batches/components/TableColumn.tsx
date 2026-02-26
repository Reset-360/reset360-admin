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
import { SeatBatch } from '@/src/types/seatBatchTypes';
import { AdaptsTypeBadge } from '@/src/components/common/adapts/AdaptsTypeBadge';
import RefItemIdLabel from '@/src/components/common/RefItemIdLabel';

const TableColumn: ColumnDef<SeatBatch>[] = [
  {
    accessorKey: 'ref',
    header: 'Reference ID',
    cell: ({ row }) => <RefItemIdLabel ref={row.getValue('ref')} />,
  },
  {
    id: 'organizationId',
    accessorFn: (row) => row.organizationId?._id, // ✅ filter value
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
      const org = row.original.organizationId;
      return <div className="capitalize">{org?.name ?? '-'}</div>;
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue === 'all') return true;
      return row.getValue(columnId) === filterValue;
    },
  },
  // {
  //   accessorKey: 'cohortId',
  //   accessorFn: (row) => row.cohortId?.name, // ✅ extract nested value
  //   id: 'cohortName',
  //   header: ({ column }) => (
  //     <Button
  //       variant="ghost"
  //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //     >
  //       Cohort
  //       <ArrowUpDown />
  //     </Button>
  //   ),
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue('cohortName')}</div>
  //   ),
  // },
  {
    accessorKey: 'totalSeats',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Total Seats
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('totalSeats')}</div>
    ),
  },
  {
    accessorKey: 'seatsIssued',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Seats Issued
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('seatsIssued')}</div>
    ),
  },
  {
    accessorKey: 'seatsRedeemed',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Seats Redeemed
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('seatsRedeemed')}</div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row, table }) => {
      const meta = table.options.meta;
      const id = row.original._id;

      const onViewClick = () => meta?.viewItem?.(id);
      const onEditClick = () => meta?.editItem?.(id);
      const onDeleteClick = () => meta?.deleteItem?.(id);
      const onGenerateCode = () => meta?.generateCode?.(id);

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
            <DropdownMenuItem onClick={onGenerateCode}>Generate Codes</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default TableColumn;
