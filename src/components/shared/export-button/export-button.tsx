import { Dropdown, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { exportToCSV, exportToJSON } from '../../../utils';

type ExportButtonProps = {
  data: unknown[];
  filename: string;
  columns?: { title: string; dataIndex: string }[];
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
      onClick: () =>
        exportToCSV(
          data as Record<string, unknown>[],
          filename,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          columns as any
        ),
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
