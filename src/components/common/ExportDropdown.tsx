import React from 'react';
import { Button } from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { FileDown } from 'lucide-react';
import {
  ColumnDef,
  exportToCSV,
  exportToExcel,
  exportToPDF,
} from '@/src/lib/export-util';

type ExportDropdownProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  fileName?: string;
  orientation?: 'p' | 'l'
};

export function ExportDropdown<T>({
  data,
  columns,
  fileName,
  orientation
}: ExportDropdownProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FileDown className="h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>Export as</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();

            // extract original data from table
            const exportData = data.map((row: any) => row.original);
            exportToExcel(exportData, columns, fileName);
          }}
        >
          XLSX (Excel)
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();

            // extract original data from table
            const exportData = data.map((row: any) => row.original);
            exportToCSV(exportData, columns, fileName);
          }}
        >
          CSV
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            // extract original data from table
            const exportData = data.map((row: any) => row.original);
            exportToPDF(exportData, columns, fileName, orientation);
          }}
        >
          PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
