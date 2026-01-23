'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import api from '@/src/lib/axios';
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import columns from './components/TableColumn';
import { Assessment } from '@/src/types/assessmentTypes';
import ViewAssessmentDialog from './components/ViewAssessmentDialog';
import { Main } from '@/src/components/layout/main';
import { PageHeader } from '@/src/components/layout/page-header';
import { ExportDropdown } from '@/src/components/common/ExportDropdown';
import moment from 'moment';
import { Organization } from '@/src/types/organizationTypes';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';

const exportColumns = [
  { header: 'Reference Id', accessorKey: 'ref' },
  {
    header: 'Client Name',
    accessorKey: 'clientProfile',
    accessorFn: (r: any) =>
      r.clientProfile?.firstName + ' ' + r.clientProfile?.lastName,
  },
  {
    header: 'Seat Code',
    accessorKey: 'seatCode',
    accessorFn: (r: any) => r.seatCode?.code,
  },
  { header: 'Risk Level', accessorKey: 'riskLevel' },
  {
    header: 'Total Rating',
    accessorKey: 'totalRating',
  },
  {
    header: 'tScore',
    accessorKey: 'tScore',
  },
  { header: 'Type', accessorKey: 'type' },
  {
    header: 'Status',
    accessorKey: 'status',
    accessorFn: (r: any) => (r.submittedAt ? 'Completed' : 'Started'),
  },
] as any;

const typesOptions = [
  { id: 'ADAPTS-S', value: 'ADAPTS-S' },
  { id: 'ADAPTS-P', value: 'ADAPTS-P' },
  { id: 'ADAPTS-T', value: 'ADAPTS-T' },
  { id: 'ADAPTS-C', value: 'ADAPTS-C' },
];

const statusOptions = [
  { id: 'COMPLETED', value: 'Completed' },
  { id: 'IN-PROGRESS', value: 'In Progress' },
];

export default function AssessmentPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const [data, setData] = useState<Assessment[]>([]);
  const [currentData, setCurrentData] = useState<Assessment>();

  const [openViewDialog, setOpenViewDialog] = useState(false);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [filterOrg, setFilterOrg] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchOrganizations = useCallback(async () => {
    try {
      const response = await api.get('/organizations');
      setOrganizations(response.data);
    } catch {
      toast.error('Error fetching organizations');
    }
  }, []);

  const fetchAssessments = useCallback(async () => {
    try {
      const response = await api.get('/assessments');
      setData(response.data);
    } catch (error) {
      toast.error('Error fetching assessments:');
    }
  }, []);

  useEffect(() => {
    fetchAssessments();
  }, [fetchAssessments]);

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  useEffect(() => {
    setColumnFilters((prev) => {
      const next = prev.filter(
        (f) => !['organizationId', 'type', 'status'].includes(f.id)
      );

      if (filterOrg !== 'all') {
        next.push({ id: 'organizationId', value: filterOrg });
      }

      if (filterType !== 'all') {
        next.push({ id: 'type', value: filterType });
      }

      if (filterStatus !== 'all') {
        next.push({ id: 'submittedAt', value: filterStatus });
      }

      return next;
    });
  }, [filterOrg, filterType, filterStatus, setColumnFilters]);

  const getDataById = (id: string) => data.find((d) => d._id === id);

  const handleView = (id: string) => {
    const data = getDataById(id);

    if (data) {
      setCurrentData(data);
      setOpenViewDialog(true);
    }
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    meta: {
      viewItem: handleView,
    },
  });

  return (
    <Main>
      <PageHeader
        title="ADAPTS Results"
        subtitle="Central hub for reviewing ADAPTS test scores and risk evaluations."
        actions={
          <div className="flex gap-2 items-center">
            <ExportDropdown
              data={table.getFilteredRowModel().rows}
              columns={exportColumns}
              fileName={`Results_${moment().format('MMDD')}`}
            />
          </div>
        }
      />

      <div className="flex items-center py-4">
        <div className="flex items-center justify-between gap-2">
          <Input
            placeholder="Filter names..."
            value={(table.getState().globalFilter as string) ?? ''}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
          />

          <Select value={filterOrg} onValueChange={setFilterOrg}>
            <SelectTrigger className="w-40">
              <SelectValue>
                {organizations.find((o) => o._id === filterOrg)?.name ??
                  'All Organizations'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Organizations</SelectItem>
              {organizations.map((org) => (
                <SelectItem key={org._id} value={org._id}>
                  {org.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue>
                {typesOptions.find((t) => t.id === filterType)?.value ??
                  'All Types'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {typesOptions.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue>
                {statusOptions.find((s) => s.id === filterStatus)?.value ??
                  'All Status'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {statusOptions.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      <ViewAssessmentDialog
        open={openViewDialog}
        onOpenChange={setOpenViewDialog}
        assessment={currentData}
      />
    </Main>
  );
}
