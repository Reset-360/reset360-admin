import '@tanstack/table-core';
import { RowData } from '@tanstack/table-core';

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    // General actions
    viewItem?: (id: string) => void;
    editItem?: (id: string) => void;
    deleteItem?: (id: string) => void;

    // Custom action for Seat Batch module
    generateCode?: (id: string) => void; // Generate seat codes
  }
}
