'use client';

import React, { useEffect, useState } from 'react';
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
import ViewAssessmentDialog from './components/ViewEntitlementDialog';
import { EEntitlementSource, Entitlement } from '@/src/types/entitlementTypes';
import { Main } from '@/src/components/layout/main';
import { PageHeader } from '@/src/components/layout/page-header';
import { ExportDropdown } from '@/src/components/common/ExportDropdown';
import moment from 'moment';
import { EntitlementSourceLabelText } from '@/src/components/common/adapts/EntitlementSourceLabel';

const exportColumns = [
  { header: 'Reference Id', accessorKey: 'ref' },
  {
    header: 'Client Name',
    accessorKey: 'clientProfile',
    accessorFn: (r: any) => r.clientProfile?.firstName + ' ' + r.clientProfile?.lastName,
  },
  { header: 'Status', accessorKey: 'status' },
  { header: 'Source', accessorKey: 'source', accessorFn: (r: any) => EntitlementSourceLabelText[r.source as EEntitlementSource] },
  { header: 'Type', accessorKey: 'type' },
  { header: 'Attempts', accessorKey: 'attemptsUsed', accessorFn: (r: any) => `${r.attemptsUsed}/${r.maxAttempts}` },
] as any;

export default function EntitlementPage() {
  const [data, setData] = useState<Entitlement[]>([]);
  const [currentData, setCurrentData] = useState<Entitlement>();

  const [openViewDialog, setOpenViewDialog] = useState(false);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  async function fetchEntitlements() {
    try {
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/entitlements`
      );

      const data = response.data;

      setData(data);
    } catch (error) {
      console.error('Error fetching entitlements:', error);
    }
  }

  useEffect(() => {
    fetchEntitlements();
  }, []);

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
        title="Entitlements"
        subtitle="Manage client entitlements for ADAPTS test access, with status, source, and type details."
        actions={
          <div className="flex gap-2 items-center">
            <ExportDropdown
              data={table.getFilteredRowModel().rows}
              columns={exportColumns}
              fileName={`Entitlements_${moment().format('MMDD')}`}
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
        entitlement={currentData}
      />
    </Main>
  );
}
