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
import {
  Cohort,
  EducationLevelLabels,
  EEducationLevel,
} from '@/src/types/cohortTypes';
import { toast } from 'sonner';
import AddCohortDialog from './components/AddCohortDialog';
import { Organization } from '@/src/types/organizationTypes';
import DeleteDialog from '@/src/components/common/DeleteDialog';
import EditCohortDialog from './components/EditCohortDialog';
import ViewCohortDialog from './components/ViewCohortDialog';
import { Main } from '@/src/components/layout/main';
import { PageHeader } from '@/src/components/layout/page-header';
import { ExportDropdown } from '@/src/components/common/ExportDropdown';
import moment from 'moment';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';

const exportColumns = [
  {
    header: 'Reference ID',
    accessorKey: 'ref',
    accessorFn: (r: any) => r.ref,
  },
  { header: 'Name', accessorKey: 'name' },
  {
    header: 'Organization',
    accessorKey: 'organizationId',
    accessorFn: (r: any) => r.organizationId?.name,
  },
  {
    header: 'Education Level',
    accessorKey: 'educationLevel',
    accessorFn: (r: any) =>
      EducationLevelLabels[r.educationLevel as EEducationLevel],
  },
  {
    header: 'Status',
    accessorKey: 'isActive',
    accessorFn: (r: any) => (r.isActive ? 'Active' : 'Inactive'),
  },
] as any;

export default function CohortPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [data, setData] = useState<Cohort[]>([]);
  const [currentData, setCurrentData] = useState<Cohort>();

  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [filterOrg, setFilterOrg] = useState('all');

  const fetchOrganizations = useCallback(async () => {
    try {
      const response = await api.get('/organizations');
      setOrganizations(response.data);
    } catch {
      toast.error('Error fetching organizations');
    }
  }, []);

  const fetchCohorts = useCallback(async () => {
    try {
      const response = await api.get('/cohorts');
      setData(response.data);
    } catch {
      toast.error('Error fetching cohorts');
    }
  }, []);

  useEffect(() => {
    fetchCohorts();
  }, [fetchCohorts]);

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  useEffect(() => {
    setColumnFilters((prev) => {
      const next = prev.filter((f) => f.id !== 'organizationId');

      if (filterOrg === 'all') return next;

      return [...next, { id: 'organizationId', value: filterOrg }];
    });
  }, [filterOrg, setColumnFilters]);

  const getDataById = (id: string) => data.find((d) => d._id === id);

  const refreshState = () => {
    fetchCohorts();
    setCurrentData(undefined);
    setOpenDeleteDialog(false);
    setOpenEditDialog(false);
    setOpenViewDialog(false);
    setFilterOrg('all');
  };

  const handleView = (id: string) => {
    const data = getDataById(id);

    if (data) {
      setCurrentData(data);
      setOpenViewDialog(true);
    }
  };

  const confirmDelete = async () => {
    if (!currentData) return;

    try {
      await api.delete(`/cohorts/${currentData._id}`);

      refreshState();
      toast.success('Successfully deleted cohort');
    } catch (error) {
      toast.error('Error deleting cohort');
    }
  };

  const handleDelete = (id: string) => {
    const data = getDataById(id);

    if (data) {
      setCurrentData(data);
      setOpenDeleteDialog(true);
    }
  };

  const handleEdit = (id: string) => {
    const data = getDataById(id);

    if (data) {
      setCurrentData(data);
      setOpenEditDialog(true);
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
      deleteItem: handleDelete,
      editItem: handleEdit,
    },
  });

  return (
    <Main>
      <PageHeader
        title="Cohorts"
        subtitle="Manage cohort records, details, and assignments."
        actions={
          <div className="flex gap-2 items-center">
            {/* Add Dialog Button + Prompt */}
            <AddCohortDialog
              organizations={organizations}
              onSuccess={fetchCohorts}
            />

            <ExportDropdown
              data={table.getFilteredRowModel().rows}
              columns={exportColumns}
              fileName={`Cohorts_${moment().format('MMDD')}`}
            />
          </div>
        }
      />

      <div className="flex items-center justify-between py-4">
        <div className="flex items-center justify-between gap-2">
          <Input
            placeholder="Filter names..."
            value={(table.getState().globalFilter as string) ?? ''}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="max-w-xs"
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
        </div>

        <div className="flex items-center gap-2">
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
          Total of {table.getRowCount()} records
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

      <DeleteDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        onConfirm={confirmDelete}
      />

      <ViewCohortDialog
        open={openViewDialog}
        onOpenChange={setOpenViewDialog}
        cohort={currentData}
      />

      <EditCohortDialog
        onSuccess={refreshState}
        cohort={currentData}
        organizations={organizations}
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
      />
    </Main>
  );
}
