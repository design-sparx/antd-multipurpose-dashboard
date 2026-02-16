export function exportToCSV<T extends Record<string, unknown>>(
  data: T[],
  filename: string,
  columns?: { title: string; dataIndex: keyof T }[]
) {
  if (!data.length) return;

  const headers = columns
    ? columns.map((col) => col.title)
    : Object.keys(data[0]);

  const rows = data.map((row) =>
    columns
      ? columns.map((col) => {
          const value = row[col.dataIndex];
          const cell =
            value === null || value === undefined ? '' : String(value);
          return cell.includes(',') || cell.includes('"') || cell.includes('\n')
            ? `"${cell.replace(/"/g, '""')}"`
            : cell;
        })
      : Object.values(row).map((val) =>
          val === null || val === undefined ? '' : String(val)
        )
  );

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportToJSON<T>(data: T[], filename: string) {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.json`;
  link.click();
  URL.revokeObjectURL(url);
}
