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
import { Organization } from '@/src/types/organizationTypes';
import AddOrganizationDialog from './components/AddOrganizationDialog';
import { toast } from 'sonner';
import DeleteDialog from '@/src/components/common/DeleteDialog';
import ViewOrganizationDialog from './components/ViewOrganizationDialog';
import EditOrganizationDialog from './components/EditOrganizationDialog';

export default function OrganizationPage() {
  const [data, setData] = useState<Organization[]>([]);
  const [currentData, setCurrentData] = useState<Organization>();

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
      setData(response.data);
    } catch {
      toast.error('Error fetching organizations');
    }
  }, []);

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  const getOrgById = (id: string) => data.find((org) => org._id === id);

  const refreshState = () => {
    fetchOrganizations();
    setCurrentData(undefined);
    setOpenDeleteDialog(false);
    setOpenEditDialog(false);
    setOpenViewDialog(false);
  };

  const handleView = (id: string) => {
    const org = getOrgById(id);

    if (org) {
      setCurrentData(org);
      setOpenViewDialog(true);
    }
  };

  const confirmDelete = async () => {
    if (!currentData) return;

    try {
      await api.delete(`/organizations/${currentData._id}`);

      refreshState();
      toast.success('Successfully deleted organization');
    } catch (error) {
      toast.error('Error deleting organization');
    }
  };

  const handleDelete = (id: string) => {
    const org = getOrgById(id);

    if (org) {
      setCurrentData(org);
      setOpenDeleteDialog(true);
    }
  };

  const handleEdit = (id: string) => {
    const org = getOrgById(id);

    if (org) {
      setCurrentData(org);
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
          <AddOrganizationDialog onSuccess={fetchOrganizations} />

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
                  colSpan={table.getVisibleLeafColumns().length}
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
        <div className="text-muted-foreground flex-1 text-xs">
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

      <ViewOrganizationDialog
        organization={currentData}
        open={openViewDialog}
        onOpenChange={setOpenViewDialog}
      />

      <DeleteDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        onConfirm={confirmDelete}
      />

      <EditOrganizationDialog
        onSuccess={refreshState}
        organization={currentData}
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
      />
    </div>
  );
}
