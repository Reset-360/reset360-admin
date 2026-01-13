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
import { EEntitlementSource, EEntitlementStatus, Entitlement } from '@/src/types/entitlementTypes';
import { EntitlementStatusLabel } from '@/src/components/common/adapts/EntitlementStatusLabel';
import { EntitlementSourceLabel } from '@/src/components/common/adapts/EntitlementSourceLabel';

const TableColumn: ColumnDef<Entitlement>[] = [
  {
    accessorKey: 'ref',
    header: 'Reference ID',
    cell: ({ row }) => <RefItemIdLabel ref={row.getValue('ref')} />,
  },
  {
      accessorKey: 'userId',
      accessorFn: (row) => `${row.clientProfile?.firstName} ${row.clientProfile?.lastName}`, // ✅ extract nested value
      id: 'userId',
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
        <div className="capitalize">{row.getValue('userId')}</div>
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
    cell: ({ row }) => {
      const status = row.getValue('status') as EEntitlementStatus;
      return <EntitlementStatusLabel status={status} />;
    },
  },
  {
    accessorKey: 'source',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Source
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const source = row.getValue('source') as EEntitlementSource;
      return <EntitlementSourceLabel source={source} />;
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
