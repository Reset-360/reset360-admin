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
import { Cohort } from '@/src/types/cohortTypes';
import { toast } from 'sonner';
import AddCohortDialog from './components/AddCohortDialog';
import { Organization } from '@/src/types/organizationTypes';
import DeleteDialog from '@/src/components/common/DeleteDialog';
import EditCohortDialog from './components/EditCohortDialog';
import ViewCohortDialog from './components/ViewCohortDialog';

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

  const getDataById = (id: string) => data.find((d) => d._id === id);

  const refreshState = () => {
    fetchCohorts();
    setCurrentData(undefined);
    setOpenDeleteDialog(false);
    setOpenEditDialog(false);
    setOpenViewDialog(false);
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
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getState().globalFilter as string) ?? ''}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          {/* Add Dialog Button + Prompt */}
          <AddCohortDialog
            organizations={organizations}
            onSuccess={fetchCohorts}
          />

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
    </div>
  );
}
