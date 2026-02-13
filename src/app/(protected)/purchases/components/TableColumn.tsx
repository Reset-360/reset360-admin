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
import { EPaymentStatus } from '@/src/types/paymentTypes';
import moment from 'moment';
import { Purchase } from '@/src/types/purchaseTypes';

const TableColumn: ColumnDef<Purchase>[] = [
  {
    accessorKey: 'ref',
    header: 'Reference ID',
    cell: ({ row }) => <RefItemIdLabel ref={row.getValue('ref')} />,
  },
  {
    accessorKey: 'paymentRef',
    accessorFn: (r) => (r.paymentId as any)?.ref,
    header: 'Pyament Ref ID',
    cell: ({ row }) => <RefItemIdLabel ref={row.getValue('paymentRef')} />,
  },
  {
    accessorKey: 'type',
    accessorFn: (r: any) => r.buyer.type,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Buyer Type
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('type')}</div>
    ),
  },
  {
    accessorKey: 'organization',
    accessorFn: (r: any) => r.buyer.organizationName,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Organization
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('organization')}</div>
    ),
  },
  {
    accessorKey: 'item',
    accessorFn: (r: any) => r.items[0]?.code,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Item
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('item')}</div>
    ),
  },
  {
    accessorKey: 'name',
    accessorFn: (r: any) => r.buyer.contactName,
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
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'email',
    accessorFn: (r: any) => r.buyer.contactEmail,
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
      <div className="capitalize">{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'phone',
    accessorFn: (r: any) => r.buyer.contactPhone,
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
    accessorKey: 'amount',
    accessorFn: (r: any) => r.pricingSnapshot.totalAmount,
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
    cell: ({ row, table}) => {
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
