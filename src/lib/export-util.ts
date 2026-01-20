import { utils, writeFile } from 'xlsx';
import jsPDF from "jspdf"
import "jspdf-autotable"
import autoTable from "jspdf-autotable"

export interface ColumnDef<T> {
  header: string
  accessorKey?: keyof T
  accessorFn?: (row: T) => any
}

export function exportToExcel<T>(
  data: T[],
  columns: ColumnDef<T>[],
  fileName?: string
) {
  // Build rows with explicit headers
  const rows = data.map((row) => {
    const obj: Record<string, any> = {};
    columns.forEach((col) => {
      if (col.accessorFn) {
        // ✅ use accessorFn if defined
        obj[col.header] = col.accessorFn(row)
      } else if (col.accessorKey) {
        obj[col.header] = row[col.accessorKey]
      }
    });
    return obj;
  });

  // Create worksheet
  const worksheet = utils.json_to_sheet(rows, {
    header: columns.map((col) => col.header), // explicitly set header order
  });

  // Optionally rename headers row (first row)
  utils.sheet_add_aoa(
    worksheet,
    [columns.map((col) => col.header)], // array of headers
    { origin: 'A1' }
  );

  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Data');

  let file = 'table-export.xlsx'
  if (fileName) {
    file = fileName + '.xlsx'
  }
  writeFile(workbook, file);
}

export function exportToCSV<T>(
  data: T[],
  columns: ColumnDef<T>[],
  fileName?: string
) {
  const rows = data.map((row) => {
    const obj: Record<string, any> = {}
    columns.forEach((col) => {
      if (col.accessorFn) {
        obj[col.header] = col.accessorFn(row)
      } else if (col.accessorKey) {
        obj[col.header] = row[col.accessorKey]
      }
    })
    return obj
  })

  const worksheet = utils.json_to_sheet(rows)
  const csv = utils.sheet_to_csv(worksheet)
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })

  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = fileName ?? "table-export.csv"
  link.click()
}

export function exportToPDF<T>(
  data: T[],
  columns: { header: string; accessorKey?: keyof T; accessorFn?: (row: T) => any }[],
  fileName?: string
) {
   const doc = new jsPDF()

  const head = [columns.map((c) => c.header)]
  const body = data.map((row) =>
    columns.map((c) =>
      c.accessorFn ? c.accessorFn(row) : (row as any)[c.accessorKey as string]
    )
  )

  // ✅ Call autoTable with doc as the first argument
  autoTable(doc, {
    head,
    body,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [240, 240, 240], textColor: 20 },
    margin: { top: 14 },
  })

  doc.save(fileName ?? "export.pdf")
}