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
import RefItemIdLabel from '@/src/components/common/RefItemIdLabel';
import { formatCents } from '@/src/lib/helper';
import { PaymentStatusBadge } from '@/src/components/common/payments/PaymentStatusBadge';
import { EPaymentProvider, EPaymentStatus, Payment } from '@/src/types/paymentTypes';
import moment from 'moment';

const TableColumn: ColumnDef<Payment>[] = [
  {
    accessorKey: 'ref',
    header: 'Reference ID',
    cell: ({ row }) => <RefItemIdLabel ref={row.getValue('ref')} />,
  },
  {
    accessorKey: 'provider',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Provider
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('provider')}</div>
    ),
  },
  {
    accessorKey: 'method',
    accessorFn: (r) => r.provider == EPaymentProvider.Paymongo ? r.providerMeta?.paymongo?.method : r.providerMeta?.manual?.method,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Method
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('method')}</div>
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Amount
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="">{formatCents(row.getValue('amount'))}</div>
    ),
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
      <PaymentStatusBadge status={row.getValue('status') as EPaymentStatus} />
    ),
  },
  {
    accessorKey: 'paidAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Paid At
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="">{moment(row.getValue('paidAt')).format('MMM DD,YYYY hh:mm A')}</div>
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
