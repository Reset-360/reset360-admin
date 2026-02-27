'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import api from '@/src/lib/axios';
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
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
import { ESeatCodeStatus, SeatCode } from '@/src/types/seatCodeTypes';
import ViewSeatCodeDialog from './components/ViewSeatCodeDialog';
import { PageHeader } from '@/src/components/layout/page-header';
import { Main } from '@/src/components/layout/main';
import moment from 'moment';
import { ExportDropdown } from '@/src/components/common/ExportDropdown';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { toast } from 'sonner';
import { Organization } from '@/src/types/organizationTypes';
import { Cohort } from '@/src/types/cohortTypes';
import numeral from 'numeral';

const PAGE_SIZE = 10;

const typesOptions = [
  { id: 'ADAPTS-S', value: 'ADAPTS-S' },
  { id: 'ADAPTS-P', value: 'ADAPTS-P' },
  { id: 'ADAPTS-T', value: 'ADAPTS-T' },
  { id: 'ADAPTS-C', value: 'ADAPTS-C' },
  { id: 'UNSET', value: 'NOT SET' },
];

const statusOptions = [
  { id: 'UNUSED', value: ESeatCodeStatus.UNUSED },
  { id: 'REDEEMED', value: ESeatCodeStatus.REDEEMED },
  { id: 'EXPIRED', value: ESeatCodeStatus.EXPIRED },
];

const exportColumns = [
  {
    header: 'Batch ID',
    accessorKey: 'batchId',
    accessorFn: (r: any) => r.batchId?.ref,
  },
  {
    header: 'Organization',
    accessorKey: 'organizationId',
    accessorFn: (r: any) => r.batchId?.organizationId?.name,
  },
  {
    header: 'Cohort',
    accessorKey: 'cohortId',
    accessorFn: (r: any) => r.cohortId?.name,
  },
  { header: 'Code', accessorKey: 'code' },
  { header: 'Type', accessorKey: 'type' },
  { header: 'Status', accessorKey: 'status' },
] as any;

export default function SeatCodePage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [data, setData] = useState<SeatCode[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [currentData, setCurrentData] = useState<SeatCode>();
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState('');
  const [filterOrg, setFilterOrg] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterCohort, setFilterCohort] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);

  // Debounce search so we don't fire on every keystroke
  const [debouncedSearch, setDebouncedSearch] = useState('');
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  // Reset to page 1 whenever any filter changes
  useEffect(() => {
    setPage(1);
  }, [filterOrg, filterType, filterCohort, filterStatus, debouncedSearch]);

  const fetchSeatCodes = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {
        page: String(page),
        limit: String(PAGE_SIZE),
      };
      if (filterOrg !== 'all') params.organizationId = filterOrg;
      if (filterCohort !== 'all') params.cohortId = filterCohort;
      if (filterStatus !== 'all') params.status = filterStatus;
      if (debouncedSearch) params.search = debouncedSearch;

      if (filterType !== 'all') {
        if (filterType === 'UNSET') {
          params.type = ''
        } else {
          params.type = filterType;
        }
      }

      const res = await api.get('/seat-codes', { params });
      setData(res.data.data);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch {
      toast.error('Error fetching seat codes');
    } finally {
      setLoading(false);
    }
  }, [
    page,
    filterOrg,
    filterCohort,
    filterType,
    filterStatus,
    debouncedSearch,
  ]);

  useEffect(() => {
    fetchSeatCodes();
  }, [fetchSeatCodes]);

  const fetchOrganizations = useCallback(async () => {
    try {
      const res = await api.get('/organizations');
      setOrganizations(res.data);
    } catch {
      toast.error('Error fetching organizations');
    }
  }, []);

  const fetchCohorts = useCallback(async () => {
    try {
      const res = await api.get('/cohorts');
      setCohorts(res.data);
    } catch {
      toast.error('Error fetching cohorts');
    }
  }, []);

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);
  useEffect(() => {
    fetchCohorts();
  }, [fetchCohorts]);

  const cohortOptions = useMemo(
    () =>
      filterOrg === 'all'
        ? cohorts
        : cohorts.filter((c) => c.organizationId?._id === filterOrg),
    [filterOrg, cohorts]
  );

  const handleView = (id: string) => {
    const item = data.find((d) => d._id === id);
    if (item) {
      setCurrentData(item);
      setOpenViewDialog(true);
    }
  };

  const table = useReactTable({
    data,
    columns,
    // Pagination/filtering is server-driven; only keep sorting client-side if desired
    manualPagination: true,
    manualFiltering: true,
    pageCount: totalPages,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
    meta: { viewItem: handleView },
  });

  return (
    <Main>
      <PageHeader
        title="Seat Codes"
        subtitle="Manage and track seat codes by type and status."
        actions={
          <ExportDropdown
            data={data}
            columns={exportColumns}
            fileName={`SeatCodes_${moment().format('MMDD')}`}
          />
        }
      />

      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select
            value={filterOrg}
            onValueChange={(v) => {
              setFilterOrg(v);
              setFilterCohort('all');
            }}
          >
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

          <Select value={filterCohort} onValueChange={setFilterCohort}>
            <SelectTrigger className="w-40">
              <SelectValue>
                {cohorts.find((c) => c._id === filterCohort)?.name ??
                  'All Cohorts'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cohorts</SelectItem>
              {cohortOptions.map((c) => (
                <SelectItem key={c._id} value={c._id}>
                  {c.name}
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
              {typesOptions.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.value}
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
              {statusOptions.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((c) => c.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  className="capitalize"
                  checked={col.getIsVisible()}
                  onCheckedChange={(v) => col.toggleVisibility(!!v)}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id}>
                    {h.isPlaceholder
                      ? null
                      : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
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
          {numeral(total).format('0,0')} total row(s) — page {page} of {numeral(totalPages).format('0,0')}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p - 1)}
            disabled={page <= 1 || loading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages || loading}
          >
            Next
          </Button>
        </div>
      </div>

      <ViewSeatCodeDialog
        open={openViewDialog}
        onOpenChange={setOpenViewDialog}
        seatCode={currentData}
      />
    </Main>
  );
}
