import { Dropdown, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { exportToCSV, exportToJSON } from '../../../utils';

type ColumnDef = { title: string; dataIndex: string };

type ExportButtonProps = {
  data: unknown[];
  filename: string;
  columns?: ColumnDef[];
  disabled?: boolean;
};

export function ExportButton({
  data,
  filename,
  columns,
  disabled,
}: ExportButtonProps) {
  const items: MenuProps['items'] = [
    {
      key: 'csv',
      label: 'Export as CSV',
      onClick: () => {
        const csvData = data as Record<string, unknown>[];
        const csvCols = columns as ColumnDef[] | undefined;
        exportToCSV(csvData, filename, csvCols);
      },
    },
    {
      key: 'json',
      label: 'Export as JSON',
      onClick: () => exportToJSON(data, filename),
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      disabled={disabled || !data.length}
    >
      <Button icon={<DownloadOutlined />} type="text">
        Export
      </Button>
    </Dropdown>
  );
}
