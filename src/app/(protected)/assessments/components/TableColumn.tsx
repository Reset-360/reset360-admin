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
import { Assessment, ERiskBand } from '@/src/types/assessmentTypes';
import { Badge } from '@/src/components/ui/badge';
import { AdaptsTypeBadge } from '@/src/components/common/adapts/AdaptsTypeBadge';
import { AssessmentStatusLabel } from '@/src/components/common/adapts/AssessmentStatusLabel';
import { RiskBandBadge } from '@/src/components/common/clients/RiskBandBadge';
import RefItemIdLabel from '@/src/components/common/RefItemIdLabel';

const TableColumn: ColumnDef<Assessment>[] = [
  {
    accessorKey: 'ref',
    header: 'Reference ID',
    cell: ({ row }) => <RefItemIdLabel ref={row.getValue('ref')} />,
  },
  {
    accessorKey: 'clientId',
    accessorFn: (row) =>
      `${row.clientProfile?.firstName} ${row.clientProfile?.lastName}`, // ✅ extract nested value
    id: 'clientId',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Client Name
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('clientId')}</div>
    ),
  },
  {
    id: 'organizationId',
    accessorFn: (row) => row.organization?._id, // ✅ filter value
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
      const org = row.original.organization;
      return <div className="capitalize">{org?.name ?? '-'}</div>;
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue === 'all') return true;
      return row.getValue(columnId) === filterValue;
    },
  },
  {
    accessorKey: 'riskBand',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Risk Level
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const riskBandValue = row.getValue('riskBand') as ERiskBand;
      return <RiskBandBadge riskBand={riskBandValue} />;
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
    cell: ({ row }) => <AdaptsTypeBadge type={row.getValue('type')} />,
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue === 'all') return true;
      return row.getValue(columnId) === filterValue;
    },
  },
  {
    accessorKey: 'totalRating',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Total Rating
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('totalRating')}</div>
    ),
  },
  {
    accessorKey: 'tScore',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          tScore
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('tScore')}</div>
    ),
  },
  {
    accessorKey: 'submittedAt',
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
      <AssessmentStatusLabel
        status={row.getValue('submittedAt') ? 'Completed' : 'In Progress'}
      />
    ),
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue === 'all') return true;

      const submittedAt = row.getValue(columnId);
      const status = submittedAt ? 'COMPLETED' : 'IN-PROGRESS'; // <-- changed

      return status === filterValue;
    },

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
