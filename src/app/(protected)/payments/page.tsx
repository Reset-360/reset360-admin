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
import { toast } from 'sonner';
import ViewPaymentDialog from './components/ViewPaymentDialog';
import { Main } from '@/src/components/layout/main';
import { PageHeader } from '@/src/components/layout/page-header';
import { ExportDropdown } from '@/src/components/common/ExportDropdown';
import moment from 'moment';
import { Payment } from '@/src/types/paymentTypes';

const exportColumns = [
  {
    header: 'Reference ID',
    accessorKey: 'ref',
    accessorFn: (r: any) => r.ref,
  },
  { header: 'Provider', accessorKey: 'provider' },
  { header: 'Amount', accessorKey: 'amount' },
  { header: 'Status', accessorKey: 'status' },
  { header: 'Paid At', accessorKey: 'paidAt' },
] as any;

export default function PaymentPage() {
  const [data, setData] = useState<Payment[]>([]);
  const [currentData, setCurrentData] = useState<Payment>();

  const [openViewDialog, setOpenViewDialog] = useState(false);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const fetchPayments = useCallback(async () => {
    try {
      const response = await api.get('/payments');
      setData(response.data);
    } catch {
      toast.error('Error fetching payments');
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const getPaymentById = (id: string) => data.find((org) => org._id === id);

  const refreshState = () => {
    fetchPayments();
    setCurrentData(undefined);
    setOpenViewDialog(false);
  };

  const handleView = (id: string) => {
    const payment = getPaymentById(id);

    if (payment) {
      setCurrentData(payment);
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
        title="Payments"
        subtitle="Here’s a list of all payment records"
        actions={
          <div className="flex gap-2 items-center">
            {/* Add Dialog Button + Prompt */}
            <ExportDropdown
              data={table.getFilteredRowModel().rows}
              columns={exportColumns}
              fileName={`Payments_${moment().format('MMDD')}`}
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
          />
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

      <ViewPaymentDialog
        data={currentData}
        open={openViewDialog}
        onOpenChange={setOpenViewDialog}
      />
    </Main>
  );
}
